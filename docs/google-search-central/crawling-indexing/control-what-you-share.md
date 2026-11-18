---
title: 'Control what you share with Google Search'
source: https://developers.google.com/search/docs/crawling-indexing/control-what-you-share
last_updated: 2026-10-21
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Control what you share with Google Search

Google supports a variety of ways that let site owners control what shows up in Google's
search results. While most people focus on getting their pages indexed, sometimes it's
important to do the opposite: prevent content from appearing in Search. There are a few
reasons you might want to block content from Google Search:

- **To restrict data**: You might have data hosted on your site that you want to show
  only to users who are already on your site. You can block Google from crawling such data so
  it doesn't show up in search results.  
  Also keep in mind that certain files published on your site may have metadata that can show
  up in Search.
  [Learn more about keeping redacted information out of Search](keep-redacted-information-out.md).
- **To hide content of less value to your audience**: Your website might have low quality
  content that shouldn't show up in Search. For example, if your website allows users to
  create content, some of that content might be
  [low quality or even spam](../essentials/spam-policies.md#user-generated-spam).
  Allowing indexing of such content may have a negative effect on your site's ranking in
  Google's search results.
- **To have Google focus on your important content**: If you have a very large site (over
  hundreds of thousands of URLs) and pages with less important content, or if you have a lot
  of duplicate content, you might want to prevent Google from crawling the duplicate or less
  important pages in order to focus on your more important content.

## How to block content from Google Search

Here are the main ways to block content from Google Search:

| Methods | |
| --- | --- |
| Remove the content from your site | **Applicable: all content types**  Removing content from your site is the best way to ensure that it won't appear in Google Search and anywhere else on the Internet. |
| Password-protect your files | **Applicable: all content types**  If you have confidential or private content on your site, you need to password protect it to ensure only authorized users can access it. This will also prevent that content from appearing in Google Search, or if it already appears, it will eventually remove that content from our search results. |
| Use the [`noindex` rule](block-indexing.md) | **Applicable: all content types**  The `noindex` robots `meta` tag is a rule that tells Google not to index your content or let it appear in Google Search results. Your content can still be linked to and visited through other web pages, or directly visited by users with a link, but the content won't appear in Google Search results. |
| Disallow crawling with [robots.txt](prevent-images-on-your-page.md#for-non-emergency-image-removal) | **Applicable: images and video**  Google only indexes images and videos that Googlebot is allowed to crawl. To prevent Googlebot from accessing your media files, use [robots.txt rules to block the files](prevent-images-on-your-page.md#for-non-emergency-image-removal). |
| Use robots `meta` tag, `data-nosnippet`, or `X-Robots-Tag` | **Applicable: various content types, depending on the implementation**  You can use page- and text-level settings to adjust how Google presents your content in search results. [Learn more about `meta` tags and attributes Google supports](robots-meta-tag.md). |
| Use the Search generative AI control | **Applicable: site-wide**  You can manage your site's inclusion in generative AI features on Google Search, including AI Overviews and AI Mode, by using the [Search generative AI control](https://support.google.com/webmasters/answer/16908024) in Search Console. |
| [Opt out of specific Google properties](https://support.google.com/webmasters/answer/3035947) | **Applicable: web pages**  You can tell Google not to include content from your site in specific Google properties, such as [Google Shopping](https://www.google.com/shopping), [Google Hotels](https://www.google.com/travel/hotels), and vacation rentals. |

## Remove existing content from Google Search

If the content hosted on your site is already appearing in Google Search, you can request the
removal of those search results. Learn how to
[remove a page hosted on your site from Google Search](remove-information.md).
