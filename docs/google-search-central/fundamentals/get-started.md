---
title: "Maintaining your website's SEO"
source: https://developers.google.com/search/docs/fundamentals/get-started
last_updated: 2025-12-18
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Maintaining your website's SEO

If your site is on Google and you're familiar with the [fundamentals of SEO](seo-starter-guide.md), there are more
things you can do to improve how your site appears on Google. As you manage and maintain your
website, you may come across more unique scenarios that affect Google Search. This guide covers
more in-depth SEO tasks, such as preparing for a site move or managing a multi-lingual site.

## Control how Google crawls and indexes your site

Read our guide to understand [how Google Search works](how-search-works.md);
if you don't understand the crawl/index/serving pipeline well, it
will be difficult to debug issues or anticipate Search behavior on your site.

### Duplicate content

Be sure that you understand what
[canonical pages are](../crawling-indexing/consolidate-duplicate-urls.md#definition),
and how they affect crawling and indexing of your site.

### Resources

Be sure that any resources (images, CSS files, and so on) or pages that Google is meant to
crawl are accessible to Google; that is, they are not blocked by any robots.txt rules and are
accessible to an anonymous user. Inaccessible pages will not appear in the
[Page Indexing report](https://search.google.com/search-console/index),
and the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
will show them as not crawled. Blocked resources are shown only at the
individual URL level, in the URL Inspection tool. If important resources on a page are blocked,
this can prevent Google from crawling your page properly. Use the URL Inspection tool to render
the live page to verify whether Google sees the page as you expect.

### Robots.txt

Use robots.txt rules to prevent crawling, and sitemaps to encourage crawling. Block crawling
of duplicate content on your site, or unimportant resources (such as small, frequently used
graphics such as icons or logos) that might overload your server with requests. Don't use
robots.txt as a mechanism to prevent indexing; use the `noindex` tag or login
requirements for that. [Read more about blocking access to your content.](../crawling-indexing/control-what-you-share.md)

### Sitemaps

Sitemaps are a very important way to tell Google which pages are important to your site, and
also provide additional information (such as update frequency), and are very important for
crawling non-textual content (such as images or video). Although Google won't limit crawling
to pages listed in your sitemaps, it will prioritize crawling these pages. This is especially
important for sites with rapidly changing content, or with pages that might not be discovered
through links. Using sitemaps helps Google discover and prioritize which pages to crawl on
your site. [Read all about sitemaps here.](../crawling-indexing/sitemaps/overview.md)

### Internationalized or multi-lingual sites

If your site includes multiple languages, or is targeted at users in specific locales:

- [Read about
  multi-regional and multi-lingual sites](../specialty/international/managing-multi-regional-sites.md) for high-level advice on how to manage sites that
  have localized content for different languages or regions.
- [Use hreflang](../specialty/international/localized-versions.md) to tell
  Google about different language variations of pages on your site.
- If your site adapts the content of its pages based on the locale of the request, read
  [how this can affect Google's crawl of your site](../specialty/international/locale-adaptive-pages.md).

### Migrating a page or a site

On the occasion that you might need to move a single URL or even a whole site, follow these guidelines:

#### Migrating a single URL

If you move a page permanently to another location, don't forget
[to implement `301` redirects for your
page](../crawling-indexing/301-redirects.md). If the move is only temporary for some reason, return `302` instead to tell
Google to continue to crawl your page.

When a user requests a page that has been removed, you can create a custom `404` page to
provide a better experience. Just be sure that when a user requests a page that is no longer
there, you return a true `404` error, not a [`soft 404`](../crawling-indexing/troubleshoot-crawling-errors.md#soft-404-errors).

#### Migrating a site

If you're migrating an entire site, implement all the `301` and sitemap changes you need, then
tell Google about the move so that we can start crawling the new site and forwarding your
signals to the new site.
[Learn how to migrate your site.](../crawling-indexing/site-move-with-url-changes.md)

### Follow crawling and indexing best practices

- **[Make your links crawlable](../crawling-indexing/links-crawlable.md#crawlable-links).**
- **[Use `rel=nofollow`](../crawling-indexing/qualify-outbound-links.md)
  for paid links**, links that require login, or untrusted content (such as
  user-submitted content) to avoid passing your quality signals on to them, or having their
  bad quality reflect on you.
- **[Managing your crawl budget](../crawling-docs/crawl-budget.md)**:
  If your site is particularly large (hundreds of millions of pages that change periodically,
  or perhaps tens of millions of pages that change frequently), Google might not be able to
  crawl your entire site as often as you'd
  like, so you might need to point Google to the most important pages on your site. The best
  mechanism for doing so at present is to list your most recently updated or most important
  pages in your sitemaps, and hiding your less important pages using
  robots.txt rules.
- **JavaScript usage**: Follow [Google's recommendations for JavaScript on websites](../crawling-indexing/javascript/javascript-seo-basics.md).
- **Multi-page articles**: If you have an article broken into several pages, be
  sure that there are prominent next and previous links for users to click (and that these are
  crawlable links). That's all you need for the page set to be crawled by Google.
- **Infinite scroll pages**: Google can have trouble scrolling through infinite
  scroll pages; provide a paginated version if you want the page to be crawled.
  [Learn more about search-friendly infinite scroll pages.](../crawling-indexing/javascript/lazy-loading.md#paginated-infinite-scroll)
- **Block access to URLs that change state,** such as posting comments,
  creating accounts, adding items to a cart, and so on. Use [robots.txt](../crawling-indexing/robots/intro.md)
  to block these URLs.
- Review the [list of which file types are indexable by Google](../crawling-indexing/indexable-file-types.md).
- In the unlikely situation that **Google seems to be crawling your site too
  much**, you can [reduce the crawl rate](../crawling-docs/crawlers-fetchers/reduce-crawl-rate.md)
  for your site. However, this should be a rare occurrence.
- If your site is still HTTP, we recommend [migrating to HTTPS](https://web.dev/articles/enable-https),
  for your [users' security, as well as your own](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https).

## Help Google understand your site

Put key information in text, not graphics, on the site. Although Google can parse and index
[many file types](../crawling-indexing/indexable-file-types.md),
text is still the safest bet to help us understand the content of the page. If
you use non-text content, or if you want to provide additional guidance about the content of
the site, add [structured data](../appearance/structured-data/intro-structured-data.md) to your
pages to help us understand your content (and in some cases, provide special search features
such as [rich results](../appearance/structured-data/search-gallery.md)).

If you feel comfortable with HTML and basic coding, you can add structured data by hand
following the [developer guidelines](../appearance/structured-data/intro-structured-data.md).
If you want a little help, you can use the WYSIWYG [Structured Data Markup helper](https://support.google.com/webmasters/answer/3069489)
to help you generate basic structured data for you.

If you don't have the ability to add structured data to your pages, you might use the
[Data Highlighter tool](https://support.google.com/webmasters/answer/2753960),
which lets you highlight portions of a page and tell Google what each section
represents (an event, a date, a price, and so on). This is simple, but it can break if you
change the layout of your page.

[Read more about helping Google understand your site content.](seo-starter-guide.md#understand_your_content)

## Follow our guidelines

**Caution**: Be sure to follow our
[Search Essentials](../essentials.md). Some
of these are recommendations and best practices; others can lead to a site being removed from
the Google index if you do not follow them.

### Content-specific guidelines

If you have specific types of content on your site, here are some recommendations for getting
them on Google in the best way:

- **Video**: Be sure to follow our [video best practices](../appearance/video.md)
  to enable Google to find, crawl, and show results for videos hosted on
  your site.
- **Images**: Follow our [image best practices](../appearance/google-images.md)
  to get your images to appear in Search. You can show additional information
  about your image in Google Images by [providing image metadata](../appearance/structured-data/image-license-metadata.md)
  on the image host page. To block an image from being indexed,
  [use a robots.txt `Disallow` rule](../crawling-indexing/prevent-images-on-your-page.md).
- **For children:** If your content is specifically for children,
  [tag your pages or site as child-directed](https://support.google.com/webmasters/answer/3221080)
  in order to comply with the Children's Online
  Privacy Protection Act ([COPPA](https://business.ftc.gov/privacy-and-security/childrens-privacy)).
- **Adult sites**: If your site (or specific pages) contain adult-only content, you
  might consider [tagging it as adult content](../specialty/explicit/guidelines.md),
  which will filter it in SafeSearch results.
- **News:** If you run a news site, here are some important considerations:
  - If you have news content, be sure to read the [Google Publisher Center help documentation](https://support.google.com/news/publisher-center/).
  - In addition, create a [News sitemap](../crawling-indexing/sitemaps/news-sitemap.md)
    to help Google discover content more quickly.
  - Be sure to [prevent abuse](../monitor-debug/prevent-abuse.md)
    on your site.
  - If you want to provide a limited number of views to visitors without a subscription or login, read about
    [flexible sampling](../appearance/flexible-sampling.md) to
    learn some best practices about providing limited access to your content.
  - See how to [indicate subscription and paywalled content](../appearance/structured-data/paywalled-content.md)
    on your site to Google while still enabling crawling.
  - See how to use `meta` tags to [limit text or image use when generating search result snippets](../crawling-indexing/special-tags.md).
  - Consider using [AMP](https://amp.dev) or [Web Stories](https://amp.dev/about/stories/) for fast-loading
    content.
- **Other sites** (for example, sites about businesses, books, apps, scholarly
  works): See [other Google services](get-on-google.md) where you
  can post your information.
- See if [Google supports a Search feature specific for your content type](../appearance/structured-data/search-gallery.md).
  Google supports specialized Search features for recipes, events, job posting sites, and more.

## Manage the user experience

Providing a good user experience should be your site's top goal, and a good user experience
is a ranking factor. There are many elements to providing a good user experience; here are a
few of them.

[Google recommends that websites use HTTPS](https://developers.google.com/search/blog/2018/12/why-how-to-secure-your-website-https),
rather than HTTP, to improve user and site security. Sites that use HTTP
can be marked as "not secure" in the Chrome browser.
[Learn how to secure your site with HTTPS](https://web.dev/articles/enable-https).

A fast page usually beats a slow page in user satisfaction. You can use the
[Core Web Vitals report](https://search.google.com/search-console/core-web-vitals)
to see your site-wide performance numbers, or [PageSpeed Insights](https://pagespeed.web.dev/)
to test performance for individual pages. You can learn more about building fast
pages on the [web.dev site](https://web.dev/explore/fast). Also consider
using [AMP](https://amp.dev/about/stories/) for fast pages.

### Mobile considerations

With [over 60 percent of the global internet population using a mobile device to go online](https://www.statista.com/topics/779/mobile-internet/#topicOverview),
it's important that your site be mobile-friendly. Google now uses a mobile crawler as the
default crawler for websites.
[Read about how to make your site mobile friendly](../crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md).

## Control your search appearance

Google provides [many kinds of search result features and experiences in Google Search](../appearance/visual-elements-gallery.md),
including review stars and special result types for specific types of information such as
events or recipes. See which ones are appropriate for your site and consider implementing them.
You can [provide a favicon](../appearance/favicon-in-search.md)
to show in search results for your site. You can also [provide an article date](../appearance/publication-dates.md)
to appear in search results.

Be sure to read the articles on how to help Google
provide good [titles links](../appearance/title-link.md) and
[snippets](../appearance/snippet.md). You can also restrict the snippet length, or omit it
entirely if you wish. See how to use `meta` tags to [limit text or image use when generating search result snippets](../appearance/snippet.md#nosnippet).

## Using Search Console

Search Console offers a broad range of reports to help you monitor and optimize your site
performance on Google Search. Learn more about [what reports to use](../monitor-debug/search-console-start.md).
