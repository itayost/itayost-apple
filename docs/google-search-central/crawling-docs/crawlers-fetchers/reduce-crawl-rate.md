---
title: 'Reduce the Google crawl rate'
source: https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate
last_updated: 2026-10-06
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Reduce the Google crawl rate

Google's crawler infrastructure has sophisticated algorithms to determine the optimal crawl rate
for a site. Our goal is to crawl as many pages from your site as we can on each visit without
overwhelming your server. In some cases, Google's crawling of your site might cause a
critical load on your infrastructure, or unwanted costs during an outage. To alleviate this,
you may decide to reduce the number of requests made by Google's crawlers.

## Understand the cause of the sharp increase in crawling

A sharp increase in crawling may be caused by inefficiencies in your site's structure or other
issues with your site. Based on the reports we've received in the past, the most common causes
are:

- Inefficient configuration of URLs on the site, which is typically caused by specific site
  functionality:
  - Faceted navigation or other sorting and filtering functionality
  - A calendar with a lot of URLs for specific dates
- [A Dynamic Search Ad target](../../crawling-indexing/troubleshoot-crawling-errors.md#adsbot)

We strongly recommend that you check with your hosting company and look at your server's recent
access logs to understand the source of the traffic, and see if it matches any of these
common causes of a sharp increase in crawling. Then, check our guides about
[managing crawling of faceted navigation URLs](../faceted-navigation.md)
and
[optimizing crawling efficiency](../../crawling-indexing/troubleshoot-crawling-errors.md#improve_crawl_efficiency).

## Urgently reduce crawler traffic (for emergencies)

**Warning**: When considering reducing Google's crawl rate, keep in mind that this will
have broad effects. For Search, Googlebot will discover fewer new pages, existing pages will
be refreshed less frequently (for example, prices and product availability may take longer to be
reflected in Search), and removed pages may stay in the index longer. For Google Ads, your
campaigns may be canceled or paused, and your ads may not serve.

To urgently reduce the crawl rate for a short period of time (for example, a couple of hours, or
1-2 days), return a `500`, `503`, or `429` HTTP response status
code instead of `200` to the crawl requests.

When Google's crawling infrastructure encounters a significant number of URLs with
`500`, `503`, or `429` HTTP response status codes (for example,
if you [disabled your website](../../crawling-indexing/pause-online-business.md)):

- **It reduces your site's crawl rate across the whole hostname** (for example,
  `subdomain.example.com`), including both the URLs that return errors and the URLs
  that return content.
- **It automatically increases the crawl rate again** once the number of these errors is
  reduced.

When returning a `503` or `429` status code, you can also include a
`Retry-After` HTTP header (as defined in
[RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html#name-retry-after))
to indicate when Google's crawlers can retry the request, using either a delay in seconds or an
absolute UTC date and time:

- **A delay in seconds:**

  ```
  HTTP/1.1 503 Service Unavailable
  Retry-After: 120
  ```
- **An absolute UTC date and time:**

  ```
  HTTP/1.1 503 Service Unavailable
  Retry-After: Wed, 21 Oct 2026 07:28:00 GMT
  ```

**Warning**: We don't recommend that you do this for a long period of time (meaning, longer
than 1-2 days) as it may have a negative effect on how your site appears in Google products. For
example, in the case of Search, if Googlebot observes these status codes on the same URL for
multiple days, the URL may be dropped from Google's index.

## Exceptional requests to reduce crawl rate

If serving errors to Google's crawlers is not feasible on your infrastructure,
[file a special request](https://search.google.com/search-console/googlebot-report)
to report a problem with an unusually high crawl rate, mentioning the optimal rate for your site
in your request. You cannot request an increase in crawl rate, and it may take several days for
the request to be evaluated and fulfilled.
