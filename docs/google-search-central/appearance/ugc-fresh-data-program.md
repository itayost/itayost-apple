---
title: 'UGC Fresh Data Program'
source: https://developers.google.com/search/docs/appearance/ugc-fresh-data-program
last_updated: 2026-10-08
fetched: 2026-11-18
license: 'Content (c) Google, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); code samples under Apache 2.0. Converted to Markdown, unmodified otherwise.'
---

# UGC Fresh Data Program

The UGC Fresh Data Program is an initiative designed to help platforms display fresh, high quality, and
authentic user-generated content (UGC) across various features on Search. Through this program, approved platforms can use a
dedicated data ingestion pipeline to send content and interaction signals to Google. This
proactive approach helps ensure that fresh content is processed and quickly updated in Search, so
people can easily find useful first-hand perspectives from your platform.

The UGC Fresh Data Program is a specialized pipeline designed exclusively for trending
UGC content. It's independent of the Google Indexing API and traditional organic crawling for
general web content.
This program doesn't guarantee that content will appear in Search.

## Eligibility criteria

Due to the technical requirements and the nature of the integration, participation is limited to
platforms that meet specific content quality and volume guidelines. Platforms must meet the
following criteria:

- **Content focus:** The platform must primarily host UGC, social postings,
  or forum discussions. The UGC content should be hosted on dedicated pages with stable URLs, not
  on profile or feed pages.
  UGC is any digital material hosted and distributed by
  an online platform or aggregator, but created entirely by independent users rather than the
  platform itself.
- **Volume and audience:** A high volume of UGC content and a significant user base.
- **Content accessibility:** Content must be on public web pages accessible to Googlebot and users;
  gated content (requiring a login or paywall to view) is ineligible. Additionally, all UGC must be
  attributable to a creator with a public profile.
- **Technical readiness:** The platform owner must possess the capacity to implement secure OAuth 2.0
  API authentication and construct strictly validated JSON-LD payloads. Additionally, the platform
  must already utilize (or be prepared to implement) valid on-page schema.org structured data
  markup across its URLs. For example, `SocialMediaPosting` or `DiscussionForumPosting` with
  `interactionStatistic` sub-fields.
- **Content health and moderation:** The platform must not publish illegal content and must
  maintain active content moderation, including a user reporting mechanism.
- **Content freshness:** Content submitted must be as fresh as possible, ideally sent within minutes.
  Additionally, you must be able to submit regular updates of engagement counters (within 72 hours of creation).
  We will share developer documents with more details once accepted into the program.

## Apply for the program

If your platform fits the eligibility criteria, express interest by [submitting an application using this form](https://forms.gle/YwuNqbeBzuzpEJa2A).

Keep in mind the following during the application process:

- **No guarantee of acceptance:** Submitting an application doesn't guarantee participation
  in the program.
- **Next steps:** We will get back to you within 6-8 weeks with a response on the status of
  your application. If your platform is selected for the program, we will provide you with
  detailed technical integration documentation and onboarding instructions.
