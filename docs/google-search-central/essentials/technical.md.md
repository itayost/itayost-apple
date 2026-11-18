---
title: 'Google Search technical requirements'
source: https://developers.google.com/search/docs/essentials/technical.md
last_updated: 2025-12-18
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Google Search technical requirements

It costs nothing to get your page in search results, no matter what anyone tries to tell you.
As long as your page meets the minimum technical requirements, it's eligible to be
indexed by Google Search:

1. Googlebot isn't blocked.
2. The page works, meaning that Google receives an HTTP `200 (success)` status code.
3. The page has indexable content.

Just because a page meets these requirements doesn't
mean that a page will be indexed; indexing isn't guaranteed.

## Googlebot isn't blocked (it can find and access the page)

Google only indexes pages on the web that are accessible to the public and which don't
block our crawler, [Googlebot](../crawling-indexing/googlebot.md),
from crawling them. If a page is made private, such as requiring a log-in to view it,
Googlebot will not crawl it. Similarly, if one of the
[several mechanisms](../crawling-indexing/control-what-you-share.md) are
used to block Google from indexing, the page will not be indexed.

### Check if Googlebot can find and access your page

Pages that are blocked by [robots.txt](../crawling-indexing/robots/intro.md)
are unlikely to show in Google Search results. To see a list of pages that are inaccessible to
Google (but that you would like to see in Search results), use both the
[Page Indexing report](https://support.google.com/webmasters/answer/7440203)
and [Crawl Stats report](https://support.google.com/webmasters/answer/9679690)
in Search Console. Each report may contain different information about your URLs, so it's a good idea to look at both reports.

To test a specific page, use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289).

## The page works (it's not an error page)

Google only indexes pages that are served with an
[HTTP `200 (success)` status code](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes#2xx-success).
Client and server error pages aren't indexed. You can check the HTTP status code for a given
page with the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289).

## The page has indexable content

Once Googlebot can find and access a working page, Google checks the page for indexable
content. Indexable content means:

- The textual content is in a [file type that Google Search supports](../crawling-indexing/indexable-file-types.md).
- The content doesn't violate our [spam policies](spam-policies.md).

While blocking Googlebot with a robots.txt file will prevent crawling, a page's URL might still appear
in search results. To instruct Google not to index a page, use
[`noindex`](../crawling-indexing/block-indexing.md) and allow Google
to crawl the URL.
