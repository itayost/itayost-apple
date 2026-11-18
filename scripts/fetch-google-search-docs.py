#!/usr/bin/env python3
"""Mirror Google Search Central docs (developers.google.com/search/docs) as Markdown.

Writes one Markdown file per page under docs/google-search-central/, mirroring the
URL path, plus a README index in the site's navigation order. Each file keeps its
source URL, Google's "last updated" date and the CC BY 4.0 attribution.

Pages under /crawling/docs (crawler management, robots.txt spec, faceted navigation,
crawl budget) are part of the Search docs navigation, so they are mirrored too, under
crawling-docs/. Old URLs that redirect are followed, saved once under their final URL,
and links to them are rewritten to the final page.

Usage (needs network access to developers.google.com):
    python3 -m venv .venv && .venv/bin/pip install beautifulsoup4 markdownify
    .venv/bin/python scripts/fetch-google-search-docs.py               # full crawl
    .venv/bin/python scripts/fetch-google-search-docs.py --index-only  # rebuild README only
Set MIRROR_OUT_DIR to write somewhere else (e.g. a temp dir, then swap it in).

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
# Doc trees to mirror, and the folder each one maps to inside the mirror.
TREES = {'/search/docs': '', '/crawling/docs': 'crawling-docs'}
OUT_DIR = os.environ.get('MIRROR_OUT_DIR') or os.path.join(
    os.path.dirname(os.path.abspath(__file__)), '..', 'docs', 'google-search-central')
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
MD_LINK = re.compile(r'\]\(([^)\s#]+\.md)(#[^)\s]*)?\)')


def normalize(href):
    """Absolute docs path without query, fragment or ".md" alias; None if outside the mirrored trees."""
    path = urlsplit(urljoin(BASE + ROOT_PATH + '/', href)).path.rstrip('/')
    if not any(path == root or path.startswith(root + '/') for root in TREES):
        return None
    # Pages also link a ".md" alias of themselves; it serves the same page.
    return path[:-3] if path.endswith('.md') else path


def out_file(path):
    for root, folder in TREES.items():
        if path == root or path.startswith(root + '/'):
            rel = path[len(root):].strip('/') or 'index'
            return posixpath.join(folder, rel) + '.md' if folder else rel + '.md'
    raise ValueError(path)


def fetch(path, attempts=3):
    """(html, final_path) after redirects; final_path is a URL if it left the mirrored trees."""
    url = f'{BASE}{path}?hl=en'
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
            with urllib.request.urlopen(req, timeout=40) as resp:
                final_url = resp.geturl()
                final = normalize(final_url) if final_url.startswith(BASE) else None
                return resp.read().decode('utf-8', 'replace'), final or final_url.split('?')[0]
        except (urllib.error.URLError, TimeoutError) as err:
            if isinstance(err, urllib.error.HTTPError) and err.code == 404:
                return None, None
            if attempt == attempts:
                print(f'  failed {path}: {err}', file=sys.stderr)
                return None, None
            time.sleep(2 * attempt)


def doc_links(soup):
    for a in soup.find_all('a', href=True):
        path = normalize(a['href'])
        if path:
            yield path


def nav_order(soup):
    """Paths in the left navigation's order."""
    order = []
    nav = soup.select_one('devsite-book-nav') or soup
    for a in nav.find_all('a', href=True):
        path = normalize(a['href'])
        if path and path not in order:
            order.append(path)
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
    links = list(dict.fromkeys(doc_links(soup)))  # before rewrite_links turns hrefs into local paths
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
    return soup, title, header + text + '\n', links


def resolve_redirected_links(aliases):
    """Point links at redirected URLs to the page they now land on (or its live URL)."""
    alias_files = {out_file(old): new for old, new in aliases.items()}
    for dirpath, _, files in os.walk(OUT_DIR):
        for name in files:
            if not name.endswith('.md') or name == 'README.md':
                continue
            full = os.path.join(dirpath, name)
            here = posixpath.dirname(os.path.relpath(full, OUT_DIR).replace(os.sep, '/'))

            def fix(match):
                target = posixpath.normpath(posixpath.join(here, match.group(1)))
                new = alias_files.get(target)
                if new is None:
                    return match.group(0)
                frag = match.group(2) or ''
                if new.startswith('http'):
                    return f']({new}{frag})'
                return f']({posixpath.relpath(out_file(new), here or ".")}{frag})'

            with open(full, encoding='utf-8') as fh:
                text = fh.read()
            fixed = MD_LINK.sub(fix, text)
            if fixed != text:
                with open(full, 'w', encoding='utf-8') as fh:
                    fh.write(fixed)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    seen, queue, titles, aliases = set(), [ROOT_PATH], {}, {}
    order = []
    while queue:
        path = queue.pop(0)
        if path in seen:
            continue
        seen.add(path)
        html, final = fetch(path)
        if html is None:
            continue
        if final != path:
            aliases[path] = final
            if final.startswith('http') or final in seen:
                continue
            seen.add(final)
            path = final
        soup, title, markdown, links = to_markdown(html, path)
        titles[path] = title
        if path == ROOT_PATH:
            order = nav_order(soup)
        dest = os.path.join(OUT_DIR, out_file(path))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'w', encoding='utf-8') as fh:
            fh.write(markdown)
        print(f'[{len(titles)}] {path}')
        for link in links:
            if link not in seen and link not in queue:
                queue.append(link)
        time.sleep(DELAY_SECONDS)

    resolve_redirected_links(aliases)
    order = [aliases.get(p, p) for p in order]
    write_index(titles, order)
    print(f'done: {len(titles)} pages, {len(aliases)} redirected URLs')


def titles_on_disk():
    """Page path -> title, read back from the mirrored files' front matter."""
    titles = {}
    for dirpath, _, files in os.walk(OUT_DIR):
        for name in files:
            if not name.endswith('.md') or name == 'README.md':
                continue
            full = os.path.join(dirpath, name)
            with open(full, encoding='utf-8') as fh:
                head = fh.read(800)
            title = re.search(r"^title: (['\"])(.*)\1$", head, re.M)
            source = re.search(r'^source: (\S+)$', head, re.M)
            if source:
                titles[urlsplit(source.group(1)).path] = title.group(2) if title else name
    return titles


def write_index(titles, order):
    listed = [p for p in dict.fromkeys(order) if p in titles]
    extra = sorted(p for p in titles if p not in listed)
    lines = [
        '# Google Search Central docs (local mirror)',
        '',
        f'Markdown copy of {BASE}{ROOT_PATH} (plus the {BASE}/crawling/docs pages its '
        f'navigation links to), fetched {date.today().isoformat()} by '
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
        lines += ['', '## Linked from the docs, not in the navigation', '']
        lines += [f'- [{titles[p]}]({out_file(p)})' for p in extra]
    with open(os.path.join(OUT_DIR, 'README.md'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines) + '\n')


if __name__ == '__main__':
    if '--index-only' in sys.argv:
        # Rebuild README from the files already on disk (one request for the nav order).
        root_html, _ = fetch(ROOT_PATH)
        write_index(titles_on_disk(), nav_order(BeautifulSoup(root_html or '', 'html.parser')))
    else:
        main()
