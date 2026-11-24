# SEO loop: change ledger

Every change the loop makes gets one row here, in the same PR as the change. 28 days later the weekly run fills in the verdict (rules in [`../SEO_LOOP.md`](../SEO_LOOP.md), step 3). This file is how the loop learns which kinds of change work on this site.

Baseline and result use the same window: the 28 days of Search Console data before the change, and the 28 days before the review date. Numbers are for the target query on the target page when the query appears, otherwise for the page.

## Changes

| ID | Date | PR | Type | Page | Target query | Change | Baseline (clicks / impr. / pos. / CTR) | Review on | Result (clicks / impr. / pos. / CTR) | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|

## Context: changes outside the loop that can move the numbers

Reviews should account for these before crediting or blaming a loop change.

| Date | What | Pages |
|---|---|---|
| 2026-11-18 | PR #10: CRM statistics replaced with current Nucleus Research figures; service page lists its sources | `/services/crm-systems`, 3 CRM posts, 2 guides |
| 2026-11-18 | PR #11: every cited statistic traced to its primary source, figures corrected or removed across all posts and guides; AI-builders post title changed | All 27 posts, 3 guides, 5 service pages |
| 2026-11 | Consent banner: analytics only after the visitor accepts | Site-wide (PostHog and GA4 counts drop; Search Console unaffected) |
| 2026-11-22 | First loop run: baseline only, no page changes. Earliest loop changes 2026-12-16 (28 days after PR #10/#11) | None |
