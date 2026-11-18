---
title: 'Overview of Google search operators'
source: https://developers.google.com/search/docs/monitor-debug/search-operators
last_updated: 2025-12-10
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Overview of Google search operators

Google Search supports
[several search operators](https://support.google.com/websearch/answer/2466433)
that you can use to refine or target your searches. The following search operators may also be
useful for debugging your website.

For example, the `site:` search operator may be useful to monitor comment spam on
your website, and the image search `imagesize:` operator may be helpful to find
images on your site that are small.

Because search operators are bound by indexing and retrieval limits, the
[URL Inspection](https://support.google.com/webmasters/answer/9012289)
tool in Search Console is more reliable for debugging purposes.

The following table contains the search operators that you can use to inspect different aspects of
your pages in Search:

| Search operators | |
| --- | --- |
| `filetype:` | Find search results in a [specific file type](../crawling-indexing/indexable-file-types.md) as defined by the `content-type` HTTP header, or file extension. For example, you can search for RTF files and URLs ending in `.rtf` whose content contains the term "galway":     ``` filetype:rtf galway ``` |
| [`imagesize:`](search-operators/image-search.md#imagesize) | Find pages that contain images of a specific dimension. This search operator only works on Google Images. For example:     ``` imagesize:1200x800 ``` |
| [`site:`](search-operators/all-search-site.md) | Find search results from a particular domain, URL, or URL prefix. For example:     ``` site:https://www.google.com/ ``` |
| [`src:`](search-operators/image-search.md#src) | Find pages that reference a particular image URL in the `src` attribute. This search operator only works on Google Images. For example:     ``` src:https://www.example.com/images/peanut-butter.png ``` |
