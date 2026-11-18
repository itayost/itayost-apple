---
title: 'Include structured data relevant to ecommerce'
source: https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce
last_updated: 2025-12-10
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Include structured data relevant to ecommerce

Google
[crawls and indexes](../../fundamentals/how-search-works.md)
your ecommerce website as it does other websites,
applying algorithms to understand your content and its intent. Structured data is a
standardized machine-readable format for providing information about a page.
This can improve the accuracy of Google's understanding of your content.

Structured data in general is not specific to ecommerce, although some structured data types
are. The following resources are useful to learn more about structured data for your ecommerce website.

- For an introduction to how Google uses structured data, see
  [Understand how structured data works](../../appearance/structured-data/intro-structured-data.md).
- To understand the breadth of structured data (also called schema markup) for an ecommerce website, see
  [schema.org](https://schema.org/). Google supports many, but not
  all of, the types of structured data defined by schema.org.

**Using a Content Management System (CMS)?**
If you are using an ecommerce platform, it may be easier to use an integrated
platform extension or plugin to add structured data for you.

The following types of structured data are particularly relevant for ecommerce websites. Remember that
shoppers may be at different stages in their shopping journey and looking for more than just
product pages.

| Ecommerce structured data types | |
| --- | --- |
| [`BreadcrumbList`](../../appearance/structured-data/breadcrumb.md) To help Google understand the hierarchy of pages on your site, see the [breadcrumb markup documentation](../../appearance/structured-data/breadcrumb.md). This can help Google display a more meaningful breadcrumb trail in search results. | Example of a breadcrumb list using structured data |
| [`LocalBusiness`](../../appearance/structured-data/local-business.md) If you have a physical store, tell Google more about your business on your business information pages, such as your store's location and opening hours, with [`LocalBusiness`](../../appearance/structured-data/local-business.md) structured data.  You may also want to:   - Register your business directly with   [Google My Business](https://www.google.com/business/). - Register   [your physical store locations and store codes](https://support.google.com/business/answer/4542487)   for use by Google Merchant Center. - Follow the   [Merchant Center guidelines](https://support.google.com/merchants/answer/6363310)   for more advice such as sharing return policies on your site. | Example of local business listing using structured data |
| [`Organization`](../../appearance/structured-data/organization.md) To tell Google more about your business details, such as your logo, contact information, business identifiers, and return policies for your business as a whole, see the [`Organization` structured data documentation](../../appearance/structured-data/organization.md). | illustration of a knowledge panel showing organization information |
| [`Product`](../../appearance/structured-data/product.md) and [`ProductGroup`](../../appearance/structured-data/product-variants.md) To tell Google more about your products, see the [`Product` structured data documentation](../../appearance/structured-data/product.md) (and [product variants](../../appearance/structured-data/product-variants.md), if applicable). See also [Set up structured data for Merchant Center](https://support.google.com/merchants/answer/7331077) in the Google Merchant Center documentation for improved participation in shopping related experiences on Google surfaces. | shopping knowledge panel in search results |
| [`Review`](../../appearance/structured-data/review-snippet.md) To assist Google understand product reviews on your site and when they are appropriate, see [Review snippet](../../appearance/structured-data/review-snippet.md). | Example of a review snippet in search results |
| [`VideoObject`](../../appearance/structured-data/video.md) If your website includes pages that are primarily about individual videos, appropriately marking up prerecorded videos (such as on a product page) or livestream events can help Google present the videos appropriately in Google Search results. See our [video schema markup documentation](../../appearance/structured-data/video.md) for more information. | Examples of video listings using structured data |
