#!/usr/bin/env python3
"""Mirror Google Search Central docs (developers.google.com/search/docs) as Markdown.

Writes one Markdown file per page under docs/google-search-central/, mirroring the
URL path, plus a README index in the site's navigation order. Each file keeps its
source URL, Google's "last updated" date and the CC BY 4.0 attribution.

Usage (needs network access to developers.google.com):
    python3 -m venv .venv && .venv/bin/pip install beautifulsoup4 markdownify
    .venv/bin/python scripts/fetch-google-search-docs.py               # full crawl
    .venv/bin/python scripts/fetch-google-search-docs.py --index-only  # rebuild README only

Content is (c) Google, licensed under CC BY 4.0; code samples under Apache 2.0.
https://developers.google.com/site-policies
"""

import os
import posixpath
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date
from urllib.parse import urljoin, urlsplit

from bs4 import BeautifulSoup
from markdownify import markdownify

BASE = 'https://developers.google.com'
ROOT_PATH = '/search/docs'
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'google-search-central')
DELAY_SECONDS = 0.4
USER_AGENT = 'Mozilla/5.0 (compatible; docs-mirror for internal reference)'
LICENSE_NOTE = (
    'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); '
    'code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
)
DROP_SELECTORS = [
    'script', 'style', 'devsite-hats-survey', 'devsite-feedback', 'devsite-thumb-rating',
    'devsite-bookmark', 'devsite-toc', 'button', '.devsite-article-meta', 'devsite-actions',
    'form',  # "Try it in the Rich Results Test" forms repeat every code sample in a textarea
]


def normalize(href):
    """Absolute /search/docs path without query or fragment, or None if outside the docs."""
    path = urlsplit(urljoin(BASE + ROOT_PATH + '/', href)).path.rstrip('/')
    if path != ROOT_PATH and not path.startswith(ROOT_PATH + '/'):
        return None
    # Pages also link a ".md" alias of themselves; it serves the same page.
    return path[:-3] if path.endswith('.md') else path


def out_file(path):
    rel = path[len(ROOT_PATH):].strip('/')
    return (rel or 'index') + '.md'


def fetch(path, attempts=3):
    url = f'{BASE}{path}?hl=en'
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
            with urllib.request.urlopen(req, timeout=40) as resp:
                return resp.read().decode('utf-8', 'replace')
        except (urllib.error.URLError, TimeoutError) as err:
            if isinstance(err, urllib.error.HTTPError) and err.code == 404:
                return None
            if attempt == attempts:
                print(f'  failed {path}: {err}', file=sys.stderr)
                return None
            time.sleep(2 * attempt)


def doc_links(soup):
    for a in soup.find_all('a', href=True):
        path = normalize(a['href'])
        if path:
            yield path


def nav_order(soup):
    """Paths in the left navigation's order, with their section headings."""
    order = []
    nav = soup.select_one('devsite-book-nav') or soup
    for el in nav.find_all(['a', 'span', 'div']):
        if el.name == 'a' and el.get('href'):
            path = normalize(el['href'])
            if path and path not in [p for p, _ in order]:
                order.append((path, el.get_text(' ', strip=True)))
    return order


def rewrite_links(body, page_path):
    page_file = out_file(page_path)
    for a in body.find_all('a', href=True):
        href = a['href']
        target = normalize(href) if not href.startswith('#') else None
        if target:
            frag = urlsplit(href).fragment
            rel = posixpath.relpath(out_file(target), posixpath.dirname(page_file) or '.')
            a['href'] = rel + (f'#{frag}' if frag else '')
        elif not href.startswith(('#', 'http://', 'https://', 'mailto:')):
            a['href'] = urljoin(BASE + page_path, href)
    for img in body.find_all('img', src=True):
        img['src'] = urljoin(BASE + page_path, img['src'])


def to_markdown(html, path):
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.select_one('h1.devsite-page-title') or soup.find('h1')
    title = re.sub(r'\s+', ' ', h1.get_text()).strip() if h1 else path
    updated = re.search(r'Last updated (\d{4}-\d{2}-\d{2}) UTC', soup.get_text(' '))
    body = soup.select_one('div.devsite-article-body') or soup.select_one('article') or soup.body
    for sel in DROP_SELECTORS:
        for el in body.select(sel):
            el.decompose()
    for h in body.find_all('h1'):
        h.decompose()
    rewrite_links(body, path)
    text = markdownify(str(body), heading_style='ATX', bullets='-', code_language='')
    text = re.sub(r'\n{3,}', '\n\n', text).strip()
    header = '\n'.join([
        '---',
        f'title: {title!r}',
        f'source: {BASE}{path}',
        f'last_updated: {updated.group(1) if updated else "unknown"}',
        f'fetched: {date.today().isoformat()}',
        f'license: {LICENSE_NOTE!r}',
        '---',
        '',
        f'# {title}',
        '',
        '',
    ])
    return soup, title, header + text + '\n'


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    seen, queue, titles = set(), [ROOT_PATH], {}
    order = []
    while queue:
        path = queue.pop(0)
        if path in seen:
            continue
        seen.add(path)
        html = fetch(path)
        if html is None:
            continue
        soup, title, markdown = to_markdown(html, path)
        titles[path] = title
        if path == ROOT_PATH:
            order = nav_order(soup)
        dest = os.path.join(OUT_DIR, out_file(path))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'w', encoding='utf-8') as fh:
            fh.write(markdown)
        print(f'[{len(seen)}] {path}')
        for link in doc_links(soup):
            if link not in seen and link not in queue:
                queue.append(link)
        time.sleep(DELAY_SECONDS)

    write_index(titles, order)


def titles_on_disk():
    """Page path -> title, read back from the mirrored files' front matter."""
    titles = {}
    for dirpath, _, files in os.walk(OUT_DIR):
        for name in files:
            if not name.endswith('.md') or name == 'README.md':
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, OUT_DIR)[:-3].replace(os.sep, '/')
            path = ROOT_PATH if rel == 'index' else f'{ROOT_PATH}/{rel}'
            with open(full, encoding='utf-8') as fh:
                head = fh.read(600)
            match = re.search(r"^title: (['\"])(.*)\1$", head, re.M)
            titles[path] = match.group(2) if match else rel
    return titles


def write_index(titles, order):
    listed = [p for p, _ in order if p in titles]
    extra = sorted(p for p in titles if p not in listed)
    lines = [
        '# Google Search Central docs (local mirror)',
        '',
        f'Markdown copy of {BASE}{ROOT_PATH}, fetched {date.today().isoformat()} by '
        '`scripts/fetch-google-search-docs.py`. Re-run the script to refresh it.',
        '',
        f'{LICENSE_NOTE} Site policies: https://developers.google.com/site-policies',
        '',
        f'{len(titles)} pages. Each file starts with its source URL and Google\'s "last updated" date.',
        '',
        '## Pages (navigation order)',
        '',
    ]
    lines += [f'- [{titles[p]}]({out_file(p)})' for p in listed]
    if extra:
        lines += ['', '## Pages not in the navigation', '']
        lines += [f'- [{titles[p]}]({out_file(p)})' for p in extra]
    with open(os.path.join(OUT_DIR, 'README.md'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines) + '\n')
    print(f'done: {len(titles)} pages')


if __name__ == '__main__':
    if '--index-only' in sys.argv:
        # Rebuild README from the files already on disk (one request for the nav order).
        root_html = fetch(ROOT_PATH)
        write_index(titles_on_disk(), nav_order(BeautifulSoup(root_html or '', 'html.parser')))
    else:
        main()
