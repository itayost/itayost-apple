# Apollo Digital's "SEO process", checked against Google's docs

**Reviewed:** 2026-11-18
**Article:** [The Exact SEO Process We Use to Scale Our Clients](https://apollodigital.io/blog/seo-process/) (Apollo Digital, 2020, with a July 2026 note), also posted on [r/startups](https://www.reddit.com/r/startups/comments/hqgahk/seo_is_easy_the_exact_process_we_use_to_scale_our/).
**Checked against:** Google Search Central, mirrored locally in [`docs/google-search-central/`](../docs/google-search-central/README.md).

This file is notes plus a link, not a copy of the article.

## The process in one paragraph

Apollo's process has 8 steps:
1. Fix technical SEO (sitemap, shallow structure, fast pages).
2. Build a keyword sheet from competitors' rankings, with priority, status and cluster columns.
3. Make a landing page per buying-intent keyword.
4. Write long-form blog posts from detailed outlines.
5. Earn links with linkable assets and heavy promotion ("create epic content, promote the hell out of it").
6. Run periodic internal-linking passes.
7. Test titles to raise CTR.
8. Audit anything that hasn't ranked after 6-12 months.

## Where it matches Google, and where it doesn't

| Apollo says | Google's docs say | For itayost |
|---|---|---|
| Use robots.txt to hide pages you don't want indexed | "it is not a mechanism for keeping a web page out of Google. To keep a web page out of Google, block indexing with noindex or password-protect the page" ([robots intro](../docs/google-search-central/crawling-indexing/robots/intro.md)) | Use `noindex` metadata, not robots.txt, for anything that must stay out of results. Separately: `src/app/robots.ts` blocks `/_next/` for `*`. Googlebot and Bingbot have their own allow-all groups so they are unaffected, but other crawlers lose the JS/CSS they need to render pages. Worth dropping `/_next/` from the `*` disallow. |
| "Google hates duplicate content, and will penalize you for it" | "Having duplicate content on your site is not a violation of our spam policies" ([SEO starter guide](../docs/google-search-central/fundamentals/seo-starter-guide.md)); Google picks one canonical URL ([consolidate duplicate URLs](../docs/google-search-central/crawling-indexing/consolidate-duplicate-urls.md)) | No penalty to fear. Keep canonicals correct (already set site-wide in metadata). |
| Maintain keyword density; use Yoast/RankMath scores | "Excessively repeating the same words over and over (even in variations) is tiring for users, and keyword stuffing is against Google's spam policies" ([starter guide](../docs/google-search-central/fundamentals/seo-starter-guide.md), [spam policies](../docs/google-search-central/essentials/spam-policies.md)) | Ignore density. Write the way a Hebrew-speaking business owner searches, including variants (for example "מערכת CRM" and "תוכנה לניהול לקוחות"). |
| Write 1.5-2x your competitor's word count | "there's no magical word count target, minimum or maximum" ([starter guide](../docs/google-search-central/fundamentals/seo-starter-guide.md)); "Are you writing to a particular word count because you've heard or read that Google has a preferred word count? (No, we don't.)" ([helpful content](../docs/google-search-central/fundamentals/creating-helpful-content.md)) | Drop length targets. Several posts here are already long; finish when the question is answered. |
| For similar keywords, copy the landing page, alter subheadings, paraphrase | Doorway abuse includes "Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page" and "Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy" ([spam policies](../docs/google-search-central/essentials/spam-policies.md)) | One strong page per real service (the 7 service pages are distinct; keep it that way). No near-duplicate city pages ("בניית אתרים ברמת גן / בתל אביב / ..."). |
| Guest posts that "let you include 1-2 do-follow links" | Link spam includes "links with optimized anchor text in articles, guest posts, or press releases distributed on other sites", "Low-quality directory or bookmark site links" and "Widely distributed links in the footers or templates of various sites" ([spam policies](../docs/google-search-central/essentials/spam-policies.md)) | Guest posts and podcasts (H2 plan, month 3) are fine as editorial work with a brand-name link. Directories: only real ones people use (B144, דפי זהב). Client credits: brand anchor, one per site (`outreach/client-credits.md`). |
| Google compares your CTR to the position average and re-ranks you | Not in Google's docs. Google documents how it builds [title links](../docs/google-search-central/appearance/title-link.md) and [snippets](../docs/google-search-central/appearance/snippet.md), not CTR as a ranking input. | Test titles anyway, but for leads, not rankings: the H2 plan's goal is Organic Leads, and the site already ranks 2-4 on price queries with almost no clicks. Track in GSC as the plan does. |
| Visitors staying longer is a ranking factor | Not in Google's docs. | Internal links still matter, for discovery and for users: [links](../docs/google-search-central/crawling-indexing/links-crawlable.md). |
| Next-gen images (JPEG 2000, JPEG XR, WebP), lazy loading, under 2-3s load | Google's current guidance is [page experience](../docs/google-search-central/appearance/page-experience.md) and Core Web Vitals | Already done: AVIF/WebP via Next.js, CWV tracked. JPEG 2000/XR are obsolete. |

## What is worth taking

1. **The keyword sheet as the content hub.** Columns: target phrase, priority (1-3), status (not written to published), cluster, volume, CPC. It fits the existing clusters in `src/config/clusters.ts` and `seo-strategy/KEYWORD_RESEARCH_DETAILED.md`. Add a "leads" column from PostHog, since leads are the H2 goal.
2. **Competitor keyword mining.** Pull the keywords otherwise.co.il, ryse.co.il and idanbenor.co.il rank for (OpenSEO or Ahrefs) and keep the ones where the searcher could plausibly hire a developer within months.
3. **Read Reddit, Quora and Facebook groups before outlining.** Use the questions business owners actually ask, in Hebrew. This is the "first-hand research" step, and it's what Google's helpful-content questions reward.
4. **Linkable asset plus a distribution checklist.** This is Apollo's strongest point, and it matches the external review (calculators, original data). For itayost: ship the CRM cost calculator, then work a written checklist of Israeli channels:
   - Facebook groups for small-business owners and startups
   - LinkedIn
   - Israeli dev and no-code communities
   - clients and contacts who would share it
   - newsletters
   
   Apollo's numbers from one promoted post: about 12,000 views, 15+ leads, 50+ links.
5. **Twice-yearly internal-linking runs.** For each key page, search `site:itayost.com "מערכת CRM"` (and synonyms) and link the mentions that aren't linked yet. One link per target per page. The content-invariants test already enforces at least one service link per cluster post.
6. **The 6-12 month audit.** For a page that isn't ranking, check:
   - **content:** does it answer the query better than what ranks?
   - **internal links:** in and out
   - **backlinks:** relevant and from Israel
   - **speed**

   This lines up with the H2 plan's checkpoints.

## What to skip

- Keyword density and Yoast/RankMath scores (and the site isn't WordPress anyway).
- Word-count targets.
- Paraphrased duplicate landing pages.
- Paid promotion of content (Apollo's own result: Facebook/Twitter ads and Quuu didn't work).
- Mass emailing influencers mentioned in a post (Apollo's own result: it didn't work).

## Follow-ups this review suggests

- [ ] Drop `/_next/` from the `*` disallow in `src/app/robots.ts` so non-Google crawlers can render pages.
- [ ] Add priority, status and leads columns to the keyword sheet.
- [ ] CRM cost calculator, then a distribution checklist in `outreach/`.
- [ ] First internal-linking run with `site:` searches on the CRM cluster terms.
