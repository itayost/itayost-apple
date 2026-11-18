// SEO loop: turns Search Console rows into a ranked list of things worth changing.
// Pure functions only (no fetch, no fs) so the rules are unit-tested; the weekly
// run feeds them data from /api/analytics/gsc via scripts/seo-snapshot.mjs.
// Rules and thresholds are explained in seo-strategy/SEO_LOOP.md.
//
// Self-contained on purpose: Node runs this file directly (type stripping), so
// it imports nothing.

export interface SearchRow {
  query?: string
  page?: string
  clicks: number
  impressions: number
  /** Percent, as the analytics route returns it (3.5 means 3.5%). */
  ctr: number
  position: number
  /** Versus the previous window of the same length; null when the row is new. */
  changes?: { clicks: number; impressions: number; ctr: number; position: number } | null
}

export type ClusterId = 'crm' | 'automations' | 'maintenance' | 'apps' | 'landing-pages' | 'websites' | 'other'

export interface ClusterRule {
  id: ClusterId
  /** Queries that belong to the cluster. */
  query: RegExp
  /** Paths that serve the cluster (prefix match on the URL path). */
  pages: string[]
  /** Ranking weight. Follows the H2 plan: CRM first, landing pages parked. */
  weight: number
}

// Search-intent clusters from CONTEXT.md. Order matters: the first match wins,
// so the narrow intents come before the broad "websites" one.
export const CLUSTER_RULES: ClusterRule[] = [
  {
    id: 'crm',
    query: /crm|סי אר אם|ניהול לקוחות|מערכת ניהול/i,
    pages: ['/services/crm-systems', '/blog/crm-', '/blog/custom-crm-', '/guides/crm-for-small-business-israel'],
    weight: 1.5,
  },
  {
    id: 'automations',
    query: /אוטומצי|automation|zapier|make\.com|n8n/i,
    pages: ['/services/automations'],
    weight: 1,
  },
  {
    id: 'maintenance',
    query: /תחזוק|maintenance/i,
    pages: ['/blog/website-maintenance-cost-per-month'],
    weight: 1,
  },
  {
    id: 'apps',
    query: /אפליקצי|app\b|react native/i,
    pages: ['/services/mobile-apps', '/blog/app-', '/blog/react-native-'],
    weight: 1,
  },
  {
    id: 'landing-pages',
    query: /דף נחיתה|דפי נחיתה|landing/i,
    pages: ['/services/landing-pages', '/blog/landing-page-'],
    weight: 0.5,
  },
  {
    id: 'websites',
    query: /אתר|בניית|website|next\.?js|וורדפרס|wordpress|wix/i,
    pages: ['/services/web-development', '/services/ecommerce', '/guides/website-that-brings-customers'],
    weight: 1,
  },
]

/** Brand searches are already won; they never count as opportunities. */
export const BRAND = /itayost|איתי אוסט|איתי אוסטרייך|itay ost/i

export interface Thresholds {
  /** Minimum impressions in the window for a row to be considered at all. */
  minImpressions: number
  /** Positions that count as "striking distance" (page 1 bottom to page 2). */
  strikingFrom: number
  strikingTo: number
  /** A row on page 1 whose CTR is below this share of the expected CTR has a snippet problem. */
  ctrGapRatio: number
  /** A page has decayed when it lost at least this share of clicks... */
  decayShare: number
  /** ...and at least this many clicks. */
  decayMinClicks: number
  /** A second page competing for a query needs at least this many impressions. */
  cannibalMinImpressions: number
}

export const DEFAULT_THRESHOLDS: Thresholds = {
  minImpressions: 30,
  strikingFrom: 4,
  strikingTo: 15,
  ctrGapRatio: 0.5,
  decayShare: 0.3,
  decayMinClicks: 3,
  cannibalMinImpressions: 20,
}

// Fallback CTR by rounded position, used only where the site has too little data
// of its own. Deliberately conservative; it ranks opportunities, it is not a claim.
const FALLBACK_CTR: Record<number, number> = {
  1: 25, 2: 13, 3: 9, 4: 6, 5: 4.5, 6: 3.5, 7: 2.8, 8: 2.2, 9: 1.8, 10: 1.5,
}
const FALLBACK_PAGE_TWO = 0.8
const MIN_ROWS_PER_BUCKET = 5

export function pathOf(url: string | undefined): string {
  if (!url) return ''
  try {
    return new URL(url).pathname.replace(/\/$/, '') || '/'
  } catch {
    return url
  }
}

export function clusterOf(row: Pick<SearchRow, 'query' | 'page'>): ClusterRule | undefined {
  if (row.query) {
    const byQuery = CLUSTER_RULES.find(c => c.query.test(row.query as string))
    if (byQuery) return byQuery
  }
  const path = pathOf(row.page)
  return CLUSTER_RULES.find(c => c.pages.some(p => path.startsWith(p)))
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const at = (i: number) => sorted[i] ?? 0
  return sorted.length % 2 ? at(mid) : (at(mid - 1) + at(mid)) / 2
}

/**
 * Expected CTR (percent) at each rounded position: the site's own median where it
 * has enough rows, otherwise the fallback curve.
 */
export function expectedCtrCurve(rows: SearchRow[], minImpressions: number): (position: number) => number {
  const buckets = new Map<number, number[]>()
  for (const r of rows) {
    if (r.impressions < minImpressions || (r.query && BRAND.test(r.query))) continue
    const pos = Math.max(1, Math.round(r.position))
    buckets.set(pos, [...(buckets.get(pos) ?? []), r.ctr])
  }
  return position => {
    const pos = Math.max(1, Math.round(position))
    const own = buckets.get(pos)
    if (own && own.length >= MIN_ROWS_PER_BUCKET) return median(own)
    return FALLBACK_CTR[pos] ?? FALLBACK_PAGE_TWO
  }
}

export type OpportunityType = 'striking-distance' | 'ctr-gap' | 'decay' | 'cannibalization' | 'wrong-page'

export interface Opportunity {
  type: OpportunityType
  cluster: ClusterId
  query?: string
  page?: string
  /** Other pages involved (cannibalization) or the page that should rank (wrong-page). */
  related?: string[]
  impressions: number
  clicks: number
  position?: number
  ctr?: number
  /** Estimated monthly clicks at stake, times the cluster weight. Used for ranking only. */
  score: number
  /** One line a person can act on. */
  why: string
}

const round1 = (n: number) => Math.round(n * 10) / 10

function weightOf(cluster: ClusterRule | undefined): number {
  return cluster?.weight ?? 0.5
}

/**
 * Query+page rows ranked 4-15 with real impressions: one step up is worth more
 * than anything else on the list.
 */
export function strikingDistance(rows: SearchRow[], t: Thresholds = DEFAULT_THRESHOLDS): Opportunity[] {
  const expected = expectedCtrCurve(rows, t.minImpressions)
  return rows
    .filter(r => r.query && !BRAND.test(r.query))
    .filter(r => r.impressions >= t.minImpressions && r.position >= t.strikingFrom && r.position <= t.strikingTo)
    .map(r => {
      const cluster = clusterOf(r)
      const target = expected(3)
      const gained = Math.max(0, (r.impressions * (target - r.ctr)) / 100)
      return {
        type: 'striking-distance' as const,
        cluster: cluster?.id ?? 'other',
        query: r.query,
        page: pathOf(r.page),
        impressions: r.impressions,
        clicks: r.clicks,
        position: r.position,
        ctr: r.ctr,
        score: round1(gained * weightOf(cluster)),
        why: `Position ${r.position} with ${r.impressions} impressions; top 3 would add ~${Math.round(gained)} clicks/period.`,
      }
    })
}

/** Page-1 rows clicked far less than the site's usual CTR at that position: the snippet is the problem. */
export function ctrGap(rows: SearchRow[], t: Thresholds = DEFAULT_THRESHOLDS): Opportunity[] {
  const expected = expectedCtrCurve(rows, t.minImpressions)
  return rows
    .filter(r => r.query && !BRAND.test(r.query))
    .filter(r => r.impressions >= t.minImpressions && r.position < t.strikingFrom + 7)
    .filter(r => r.ctr < expected(r.position) * t.ctrGapRatio)
    .map(r => {
      const cluster = clusterOf(r)
      const missed = (r.impressions * (expected(r.position) - r.ctr)) / 100
      return {
        type: 'ctr-gap' as const,
        cluster: cluster?.id ?? 'other',
        query: r.query,
        page: pathOf(r.page),
        impressions: r.impressions,
        clicks: r.clicks,
        position: r.position,
        ctr: r.ctr,
        score: round1(missed * weightOf(cluster)),
        why: `CTR ${r.ctr}% at position ${r.position}, against ~${round1(expected(r.position))}% usual there; rewrite title/description.`,
      }
    })
}

/** Pages that lost a real share of their clicks against the previous window. */
export function decay(pages: SearchRow[], t: Thresholds = DEFAULT_THRESHOLDS): Opportunity[] {
  return pages
    .filter(r => r.changes && r.changes.clicks < 0)
    .filter(r => {
      const lost = -(r.changes as NonNullable<SearchRow['changes']>).clicks
      const before = r.clicks + lost
      return lost >= t.decayMinClicks && before > 0 && lost / before >= t.decayShare
    })
    .map(r => {
      const cluster = clusterOf(r)
      const lost = -(r.changes as NonNullable<SearchRow['changes']>).clicks
      return {
        type: 'decay' as const,
        cluster: cluster?.id ?? 'other',
        page: pathOf(r.page),
        impressions: r.impressions,
        clicks: r.clicks,
        position: r.position,
        score: round1(lost * weightOf(cluster)),
        why: `Lost ${lost} clicks (${Math.round((lost / (r.clicks + lost)) * 100)}%) against the previous window.`,
      }
    })
}

/** One query, two or more of our pages splitting the impressions. */
export function cannibalization(rows: SearchRow[], t: Thresholds = DEFAULT_THRESHOLDS): Opportunity[] {
  const byQuery = new Map<string, SearchRow[]>()
  for (const r of rows) {
    if (!r.query || BRAND.test(r.query) || r.impressions < t.cannibalMinImpressions) continue
    byQuery.set(r.query, [...(byQuery.get(r.query) ?? []), r])
  }
  const out: Opportunity[] = []
  for (const [query, group] of byQuery) {
    const pages = new Set(group.map(r => pathOf(r.page)))
    if (pages.size < 2) continue
    const [top, ...rest] = [...group].sort((a, b) => b.impressions - a.impressions)
    if (!top) continue
    const cluster = clusterOf({ query })
    const impressions = group.reduce((s, r) => s + r.impressions, 0)
    out.push({
      type: 'cannibalization',
      cluster: cluster?.id ?? 'other',
      query,
      page: pathOf(top.page),
      related: rest.map(r => pathOf(r.page)),
      impressions,
      clicks: group.reduce((s, r) => s + r.clicks, 0),
      position: top.position,
      score: round1((impressions / 100) * weightOf(cluster)),
      why: `${pages.size} pages share this query; pick one to rank and point the others at it.`,
    })
  }
  return out
}

/**
 * A cluster query whose best-ranking page belongs to no page of that cluster
 * (for example a CRM query landing on the homepage).
 */
export function wrongPage(rows: SearchRow[], t: Thresholds = DEFAULT_THRESHOLDS): Opportunity[] {
  const best = new Map<string, SearchRow>()
  for (const r of rows) {
    if (!r.query || BRAND.test(r.query) || r.impressions < t.minImpressions) continue
    const current = best.get(r.query)
    if (!current || r.impressions > current.impressions) best.set(r.query, r)
  }
  const out: Opportunity[] = []
  for (const r of best.values()) {
    const cluster = clusterOf({ query: r.query })
    if (!cluster || cluster.id === 'websites') continue
    const path = pathOf(r.page)
    const home = cluster.pages[0]
    if (!home || cluster.pages.some(p => path.startsWith(p))) continue
    out.push({
      type: 'wrong-page',
      cluster: cluster.id,
      query: r.query,
      page: path,
      related: [home],
      impressions: r.impressions,
      clicks: r.clicks,
      position: r.position,
      score: round1((r.impressions / 50) * cluster.weight),
      why: `Ranks with ${path} instead of ${home}; strengthen internal links/anchors to the cluster page.`,
    })
  }
  return out
}

export interface Snapshot {
  window: { days: number; start?: string; end?: string }
  totals?: { clicks: number; impressions: number; ctr: number; position: number }
  opportunities: Opportunity[]
}

/** Every rule, merged and ranked; at most `perType` of each so one rule cannot crowd out the rest. */
export function findOpportunities(
  queryPages: SearchRow[],
  pages: SearchRow[],
  t: Thresholds = DEFAULT_THRESHOLDS,
  perType = 5
): Opportunity[] {
  const groups = [
    strikingDistance(queryPages, t),
    ctrGap(queryPages, t),
    decay(pages, t),
    cannibalization(queryPages, t),
    wrongPage(queryPages, t),
  ]
  return groups
    .flatMap(g => [...g].sort((a, b) => b.score - a.score).slice(0, perType))
    .sort((a, b) => b.score - a.score)
}

/** The report table the weekly run pastes into seo-strategy/reports/. */
export function toMarkdown(s: Snapshot): string {
  const lines = [
    `Window: ${s.window.days} days${s.window.start ? ` (${s.window.start} to ${s.window.end})` : ''}`,
    '',
  ]
  if (s.totals) {
    lines.push(
      `Totals: ${s.totals.clicks} clicks, ${s.totals.impressions} impressions, CTR ${s.totals.ctr}%, avg position ${s.totals.position}`,
      ''
    )
  }
  if (s.opportunities.length === 0) return [...lines, 'No opportunity cleared the thresholds this week.'].join('\n')
  lines.push('| # | Type | Cluster | Query | Page | Impr. | Pos. | CTR | Score | Why |', '|---|---|---|---|---|---|---|---|---|---|')
  s.opportunities.forEach((o, i) => {
    const cell = (v: unknown) => (v === undefined || v === '' ? '' : String(v).replace(/\|/g, '/'))
    lines.push(
      `| ${i + 1} | ${o.type} | ${o.cluster} | ${cell(o.query)} | ${cell(o.page)} | ${o.impressions} | ${cell(o.position)} | ${o.ctr === undefined ? '' : `${o.ctr}%`} | ${o.score} | ${cell(o.why)} |`
    )
  })
  return lines.join('\n')
}
