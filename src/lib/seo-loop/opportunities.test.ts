import { describe, test, expect } from 'vitest'
import {
  cannibalization,
  clusterOf,
  ctrGap,
  decay,
  expectedCtrCurve,
  findOpportunities,
  strikingDistance,
  toMarkdown,
  wrongPage,
  type SearchRow,
} from './opportunities'

const SITE = 'https://www.itayost.com'
const row = (r: Partial<SearchRow>): SearchRow => ({ clicks: 0, impressions: 100, ctr: 1, position: 5, ...r })
/** First item, failing loudly instead of returning undefined. */
const only = <T>(items: T[]): T => {
  const [first] = items
  if (first === undefined) throw new Error('expected at least one item')
  return first
}

describe('clusterOf', () => {
  test('a query decides the cluster before its page does', () => {
    // Arrange
    const crmOnHome = { query: 'בניית מערכת crm', page: `${SITE}/` }

    // Act
    const cluster = clusterOf(crmOnHome)

    // Assert
    expect(cluster?.id).toBe('crm')
  })

  test('a query with no intent falls back to the page', () => {
    // Arrange
    const generic = { query: 'מחיר', page: `${SITE}/blog/website-maintenance-cost-per-month` }

    // Act
    const cluster = clusterOf(generic)

    // Assert
    expect(cluster?.id).toBe('maintenance')
  })

  test('narrow intents win over the broad websites intent', () => {
    // Arrange
    const appSite = { query: 'כמה עולה אפליקציה לאתר' }

    // Act
    const cluster = clusterOf(appSite)

    // Assert
    expect(cluster?.id).toBe('apps')
  })
})

describe('expectedCtrCurve', () => {
  test("uses the site's own median once a position has enough rows", () => {
    // Arrange
    const ownRows = [2, 3, 4, 5, 6].map(ctr => row({ query: `q${ctr}`, position: 2, ctr }))

    // Act
    const expected = expectedCtrCurve(ownRows, 30)

    // Assert
    expect(expected(2)).toBe(4)
  })

  test('falls back to the default curve where the site has too little data', () => {
    // Arrange
    const sparse = [row({ query: 'a', position: 2, ctr: 50 })]

    // Act
    const expected = expectedCtrCurve(sparse, 30)

    // Assert
    expect(expected(2)).toBe(13)
    expect(expected(14)).toBe(0.8)
  })
})

describe('strikingDistance', () => {
  test('keeps positions 4-15 with real impressions and drops the rest', () => {
    // Arrange
    const rows = [
      row({ query: 'crm לעסקים', position: 7, impressions: 200, page: `${SITE}/services/crm-systems` }),
      row({ query: 'crm לעסק קטן', position: 2, impressions: 200 }),
      row({ query: 'crm בעברית', position: 22, impressions: 200 }),
      row({ query: 'crm זול', position: 8, impressions: 10 }),
    ]

    // Act
    const found = strikingDistance(rows)

    // Assert
    expect(found.map(o => o.query)).toEqual(['crm לעסקים'])
    expect(only(found).page).toBe('/services/crm-systems')
    expect(only(found).score).toBeGreaterThan(0)
  })

  test('never treats brand searches as opportunities', () => {
    // Arrange
    const rows = [row({ query: 'itayost', position: 6, impressions: 500 })]

    // Act
    const found = strikingDistance(rows)

    // Assert
    expect(found).toEqual([])
  })

  test('weights CRM above parked landing-page queries with the same numbers', () => {
    // Arrange
    const rows = [
      row({ query: 'מערכת crm', position: 6, impressions: 300, ctr: 1 }),
      row({ query: 'דף נחיתה', position: 6, impressions: 300, ctr: 1 }),
    ]

    // Act
    const ranked = strikingDistance(rows).sort((a, b) => b.score - a.score)
    const first = only(ranked)
    const second = only(ranked.slice(1))

    // Assert
    expect(first.cluster).toBe('crm')
    expect(second.cluster).toBe('landing-pages')
    expect(first.score).toBe(second.score * 3)
  })
})

describe('ctrGap', () => {
  test('flags a page-1 row clicked far below the usual CTR there', () => {
    // Arrange
    const rows = [
      row({ query: 'תחזוקת אתר מחיר', position: 2, impressions: 400, ctr: 0.5 }),
      row({ query: 'תחזוקת אתר', position: 2, impressions: 400, ctr: 12 }),
    ]

    // Act
    const found = ctrGap(rows)

    // Assert
    expect(found.map(o => o.query)).toEqual(['תחזוקת אתר מחיר'])
    expect(only(found).why).toContain('rewrite title/description')
  })
})

describe('decay', () => {
  test('flags a page that lost a real share of its clicks', () => {
    // Arrange
    const pages = [
      row({ page: `${SITE}/services/crm-systems`, clicks: 10, changes: { clicks: -10, impressions: 0, ctr: 0, position: 0 } }),
      row({ page: `${SITE}/blog/crm-vs-excel-spreadsheets`, clicks: 10, changes: { clicks: -1, impressions: 0, ctr: 0, position: 0 } }),
      row({ page: `${SITE}/blog/new-post`, clicks: 2, changes: null }),
    ]

    // Act
    const found = decay(pages)

    // Assert
    expect(found.map(o => o.page)).toEqual(['/services/crm-systems'])
    expect(only(found).why).toContain('Lost 10 clicks (50%)')
  })
})

describe('cannibalization', () => {
  test('groups one query split across two of our pages', () => {
    // Arrange
    const rows = [
      row({ query: 'כמה עולה crm', page: `${SITE}/blog/crm-system-cost-israel-2026`, impressions: 120 }),
      row({ query: 'כמה עולה crm', page: `${SITE}/guides/crm-for-small-business-israel`, impressions: 60 }),
      row({ query: 'crm מותאם', page: `${SITE}/services/crm-systems`, impressions: 120 }),
    ]

    // Act
    const found = cannibalization(rows)

    // Assert
    expect(found).toHaveLength(1)
    expect(only(found).page).toBe('/blog/crm-system-cost-israel-2026')
    expect(only(found).related).toEqual(['/guides/crm-for-small-business-israel'])
    expect(only(found).impressions).toBe(180)
  })
})

describe('wrongPage', () => {
  test('flags a cluster query whose best page is outside the cluster', () => {
    // Arrange
    const rows = [
      row({ query: 'מערכת crm לעסק', page: `${SITE}/`, impressions: 150 }),
      row({ query: 'crm מותאם אישית', page: `${SITE}/services/crm-systems`, impressions: 150 }),
      row({ query: 'בניית אתרים', page: `${SITE}/blog/whatever`, impressions: 150 }),
    ]

    // Act
    const found = wrongPage(rows)

    // Assert
    expect(found.map(o => o.query)).toEqual(['מערכת crm לעסק'])
    expect(only(found).related).toEqual(['/services/crm-systems'])
  })
})

describe('findOpportunities and toMarkdown', () => {
  test('caps each rule and ranks everything by score', () => {
    // Arrange
    const queryPages = Array.from({ length: 8 }, (_, i) =>
      row({ query: `crm ${i}`, position: 6, impressions: 100 + i * 50, page: `${SITE}/services/crm-systems` })
    )

    // Act
    const found = findOpportunities(queryPages, [], undefined, 3)

    // Assert
    expect(found.filter(o => o.type === 'striking-distance')).toHaveLength(3)
    expect(found.map(o => o.score)).toEqual([...found.map(o => o.score)].sort((a, b) => b - a))
  })

  test('renders a table without breaking on pipes, and says so when nothing qualifies', () => {
    // Arrange
    const opportunity = findOpportunities([row({ query: 'crm | ניהול', position: 6, impressions: 200 })], [])

    // Act
    const table = toMarkdown({ window: { days: 28 }, opportunities: opportunity })
    const empty = toMarkdown({ window: { days: 28 }, opportunities: [] })

    // Assert
    expect(table).toContain('crm / ניהול')
    expect(empty).toContain('No opportunity cleared the thresholds')
  })
})
