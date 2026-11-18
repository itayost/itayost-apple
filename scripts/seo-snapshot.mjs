#!/usr/bin/env node
/**
 * SEO loop snapshot: pulls Search Console data from the site's own analytics API
 * and prints the week's ranked opportunities (rules in src/lib/seo-loop/opportunities.ts,
 * procedure in seo-strategy/SEO_LOOP.md).
 *
 * Usage:
 *   npm run seo:snapshot -- [--days 28] [--json out.json]
 *   (NODE_USE_ENV_PROXY=1 makes Node's fetch use the HTTPS proxy in cloud sessions.)
 *
 * Auth: the /api/analytics routes need the x-api-key header. In the cloud SEO loop
 * the environment's network secret for www.itayost.com adds it; locally, set
 * ANALYTICS_API_KEY. The key never goes in a prompt, a file or the repo.
 *
 * Needs Node 22.18+ (imports the TypeScript rules file directly).
 */

import { writeFileSync } from 'node:fs'
import { findOpportunities, toMarkdown } from '../src/lib/seo-loop/opportunities.ts'

const SITE = process.env.SEO_SITE_URL || 'https://www.itayost.com'
const args = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}
const days = Number(arg('--days', '28'))
const jsonOut = arg('--json', null)

async function gsc(report, limit) {
  const url = `${SITE}/api/analytics/gsc?report=${report}&days=${days}${limit ? `&limit=${limit}` : ''}`
  const headers = process.env.ANALYTICS_API_KEY ? { 'x-api-key': process.env.ANALYTICS_API_KEY } : {}
  const res = await fetch(url, { headers })
  if (res.status === 401 || res.status === 403) {
    throw new Error(
      `${report}: ${res.status} from the analytics API. The key is missing or wrong: in the cloud loop, ` +
        'the environment secret for www.itayost.com; locally, ANALYTICS_API_KEY.'
    )
  }
  if (!res.ok) throw new Error(`${report}: HTTP ${res.status} ${await res.text().catch(() => '')}`.slice(0, 300))
  return res.json()
}

const [overview, queryPages, pages] = await Promise.all([
  gsc('overview'),
  gsc('query-pages', 5000),
  gsc('pages', 1000),
])

const t = overview.data
const snapshot = {
  window: { days, start: overview.dateRange?.startDate, end: overview.dateRange?.endDate },
  totals: {
    clicks: t.totalClicks.current,
    impressions: t.totalImpressions.current,
    ctr: t.averageCTR.current,
    position: t.averagePosition.current,
  },
  previous: {
    clicks: t.totalClicks.previous,
    impressions: t.totalImpressions.previous,
    ctr: t.averageCTR.previous,
    position: t.averagePosition.previous,
  },
  opportunities: findOpportunities(queryPages.data ?? [], pages.data ?? []),
  pages: (pages.data ?? []).map(({ page, clicks, impressions, ctr, position, changes }) => ({
    page,
    clicks,
    impressions,
    ctr,
    position,
    changes,
  })),
}

if (jsonOut) writeFileSync(jsonOut, JSON.stringify(snapshot, null, 2))
console.log(toMarkdown(snapshot))
console.log(
  `\nPrevious ${days} days: ${snapshot.previous.clicks} clicks, ${snapshot.previous.impressions} impressions, ` +
    `CTR ${snapshot.previous.ctr}%, avg position ${snapshot.previous.position}`
)
