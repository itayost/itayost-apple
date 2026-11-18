---
title: 'Visual Elements gallery of Google Search'
source: https://developers.google.com/search/docs/appearance/visual-elements-gallery.md
last_updated: 2026-02-04
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# Visual Elements gallery of Google Search

Visual elements are the building blocks of the Google Search results page that a user can
perceive or interact with. The Visual Elements gallery is an illustrated guide to the most
common UI elements of Google web search: it explains what the elements look like, what they're
called, and whether you can optimize your website for each element.

## Anatomy of a Google Search results page

The Google Search results page contains a set of different types of search result visual
elements, and each search result has its own set of possible child visual elements. For example,
a *text result* is a visual element in its own right, and it has various child visual
elements, such as attribution, title link, and snippet.

How the visual elements look can change over time, and a given result can be displayed
differently depending on whether you're using a desktop computer or a phone, what country
you're in, the language of your search query, and many other factors. Here are the most
common types of search result visual elements that you might see in Google Search:

An illustration of the Google Search results page, with callouts for the most common types of search results: text result, rich result, image result, video result, and exploration features.

[Text result](#text-result)

[Rich result](#rich-result)

[Image result](#image-result)

[Video result](#video-result)

[Exploration features](#exploration)

| Common types of search result visual elements | |
| --- | --- |
| Text result | A result in Google Search that's based on the textual content of the page. Learn more about the [text result visual elements](#text-result). |
| Rich result | A result that typically relies on structured data in the markup of your page to display graphical elements or interactive experiences. Explore the [list of structured data features](structured-data/search-gallery.md). |
| Image result | A result that's based on an image that's embedded on that web page. An image result is more likely to show for image-seeking queries. Learn more about the [image result visual elements](#image-result). |
| Video result | A result that's based on a video that's embedded on that web page. A video result is more likely to show for video-seeking queries. Learn more about the [video result visual elements](#video-result). |
| Exploration features | A feature that helps searchers expand and refine their initial search. Learn more about [exploration features](#exploration). |

## Attribution

Attribution describes the source of a search result, and can appear for a variety of search
result types, including text, image, and video results. Attribution can include various
aspects of the source, such as the name of the site, favicon, and URL to the web page.

An illustration that shows the attribution of a text result in Google Search with callouts that label specific attribution visual elements, including the favicon, site name, visible URL, domain, and breadcrumb

[Favicon](#favicon)

[Site name](#site-name)

[Visible URL](#visible-url)

[Domain](#domain)

[Breadcrumb](#breadcrumb)

| Attribution visual elements | |
| --- | --- |
| Favicon | The small icon that's associated with the site. Learn how to [provide a favicon](favicon-in-search.md). |
| Site name | The name of the site. Learn how to [provide a site name with structured data](site-names.md). |
| Visible URL | The URL of the page that's shown in a readable format. A visible URL has two parts: domain and breadcrumb.   |  |  | | --- | --- | | Domain | The site address as defined by the domain name. This is the name you chose when setting up the website (for example, example.com). | | Breadcrumb | The trail that shows the page's position within the site's hierarchy. Learn how to specify the trail with [Breadcrumb structured data](structured-data/breadcrumb.md). | |

## Text result

A *text result* (formerly known as a "web result" or "plain blue link") is a result in
Google Search that's based on the textual content of the
page. It includes visual elements such as attribution, title link, and snippet.

A text result may also include additional visual elements like rich attributes or a
sitelinks group; keep in mind that a given text result may display differently depending on
a variety of factors, like what device you're using, what you searched for, or what language
you're using. You won't see a text result that includes all of the possible visual elements.

An illustration of a text result in Google Search with callouts that label specific visual elements of the text result and link to more information about how to control them

[Attribution](#text-result-attribution)

[Title link](#text-result-title-link)

[Snippet](#snippet)

[Byline date](#byline-date)

[Sitelink](#sitelink)

[Sitelinks group](#sitelinks-group)

| Text result visual elements | |
| --- | --- |
| Attribution | The source information for the web page. Learn [how to control attribution](#attribution). |
| Title link | The title of a search result on Google Search and other properties (for example, Google News) that links to the web page. Learn how to [influence title links](title-link.md). |
| Snippet | The description or summary part of the search result on Google Search and other properties (for example, Google News). Learn [how to control snippets](snippet.md). |
| Byline date | The date that Google estimates the web page was updated or published. Learn [how to provide a byline date](publication-dates.md). |
| Sitelinks group | Two or more links from the same domain or its [localized variations](../specialty/international/localized-versions.md) that are clustered together under a text result. For example, the links could be other pages on that domain, headings, or anchors within that page.  A sitelinks group contains two or more sitelinks:   |  |  | | --- | --- | | Sitelink | A single link within a sitelinks group. While sitelinks are automated, there are some [best practices you can follow for improving the quality](sitelinks.md#sitelinks-best-practices). | |

### Text result image

A *text result image* is the most relevant image from that particular web page for the given query. Tapping it takes the user to the web
page that's embedding the image. A text result image is more likely to appear for image-seeking
queries.

To optimize for a text result image, follow the [Image SEO best practices](google-images.md).

An illustration of a text result in Google Search with a callout showing which element is a text result image, which is a small preview image of a red tulip

Text result image

### Rich attributes

*Rich attributes* are one or more lines of additional information about the web page,
such as review stars and recipe information. This information is typically powered by
[structured data](structured-data/intro-structured-data.md),
provided by you.

An illustration of a text result in Google Search with a callout showing what element is a rich attribute, which is review star information

Rich attributes

## Image result

An *image result* is a result that's based on an image that's embedded on a web page.
It's more likely to appear for image-seeking queries. To optimize your image for image results, follow
the [image SEO best practices](google-images.md).

An illustration of 4 image results of bunnies in Google Search, with callouts for the attribution and image thubmnail visual elements

[Image thumbnail](#image-thumbnail)

[Attribution](#image-result-attribution)

| Image result visual elements | |
| --- | --- |
| Image thumbnail | An image thumbnail for the indexed image that's embedded on a web page. Tapping or clicking it takes the user to the image. To optimize your image for image results, follow the [image SEO best practices](google-images.md). |
| Attribution | The source information for the web page that's embedding the image. Learn [how to control attribution](#attribution). |

## Video result

A *video result* is a result that's based on a video that's embedded on a web page. It's
more likely to appear for video-seeking queries. To optimize your video for video results,
follow the [video best practices](video.md).

An illustration of how a video result looks in Google Search with callouts for the attribution, title link, upload date, and video thumbnail visual elements

[Video thumbnail](#video-thumbnail)

[Title link](#video-result-title-link)

[Attribution](#video-result-attribution)

[Upload date](#upload-date)

| Video result visual elements | |
| --- | --- |
| Video thumbnail | A video thumbnail for the indexed video that's embedded on a web page. Tapping or clicking it takes the user to the web page that's embedding the video. Learn how to [specify a video thumbnail](video.md#video-thumbnail). |
| Title link | The title link for the video landing page. Learn how to [influence title links](title-link.md). |
| Attribution | The source information for the video landing page. Learn [how to control attribution](#attribution). |
| Upload date | The date that the video was published as provided in its metadata. Learn [optimize your videos](video.md). |

## Exploration features

Exploration features help searchers explore more questions or searches that are related to
their original search query (also known as "People also ask"). While you can't control what
shows up here, it can be helpful to pay attention to the related search queries when you're
thinking about topics you could write about for your site.

### Related searches group

![An illustration of how a related searches group could look in Google Search, which shows a series of related things that other people have searched for](https://developers.google.com/static/search/docs/images/related-searches-group.png)

A *related searches group* is a cluster of related searches that other people have done. Tapping or clicking a related search takes
the user to another search results page. These searches are automatically generated based on
the initial query and other things people have searched for.

### Related questions group

![An illustration of how a related questions group could look in Google Search, which shows a series of questions that are related to what the user initially searched for](https://developers.google.com/static/search/docs/images/related-questions-group.png)

A *related questions group* is a cluster of questions that are related to what the user initially searched for (also known as
"People Also Ask"). When a user expands the question, they're shown a featured snippet.
Learn how to [manage featured snippets](featured-snippets.md).
