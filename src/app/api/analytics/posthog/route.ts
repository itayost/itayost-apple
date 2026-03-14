import { NextRequest, NextResponse } from 'next/server'
import { authenticateAnalyticsRequest } from '@/lib/analytics-auth'

// PostHog EU API base URL
const POSTHOG_API = 'https://eu.posthog.com/api'

function getConfig() {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID

  if (!apiKey) throw new Error('POSTHOG_PERSONAL_API_KEY is not configured')
  if (!projectId) throw new Error('POSTHOG_PROJECT_ID is not configured')

  return { apiKey, projectId }
}

function headers(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }
}

// Helper: run a HogQL query against PostHog
async function hogqlQuery(apiKey: string, projectId: string, query: string) {
  const res = await fetch(`${POSTHOG_API}/projects/${projectId}/query`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify({
      query: {
        kind: 'HogQLQuery',
        query,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PostHog HogQL query failed (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.results
}

// Helper: format dates
function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0] as string
}

// ============ REPORT TYPES ============

// 1. User journey: most common page sequences
async function getUserJourney(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      properties.$current_url as page,
      count() as views,
      uniq(distinct_id) as unique_users
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - interval ${days} day
    GROUP BY page
    ORDER BY views DESC
    LIMIT 20
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 2. Event breakdown: all custom events with counts
async function getEventBreakdown(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      event,
      count() as total_count,
      uniq(distinct_id) as unique_users,
      min(timestamp) as first_seen,
      max(timestamp) as last_seen
    FROM events
    WHERE timestamp >= now() - interval ${days} day
      AND event NOT LIKE '$%'
    GROUP BY event
    ORDER BY total_count DESC
    LIMIT 30
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 3. Autocaptured interactions: clicks, inputs, form submits
async function getAutoCapture(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      properties.$event_type as interaction_type,
      properties.tag_name as element_tag,
      properties.$el_text as element_text,
      properties.$current_url as page_url,
      count() as total_count,
      uniq(distinct_id) as unique_users
    FROM events
    WHERE event = '$autocapture'
      AND timestamp >= now() - interval ${days} day
    GROUP BY interaction_type, element_tag, element_text, page_url
    ORDER BY total_count DESC
    LIMIT 50
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 4. Session analysis: duration, pages per session, bounce behavior
async function getSessionAnalysis(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      properties.$device_type as device,
      properties.$browser as browser,
      properties.$os as os,
      properties.$referrer as referrer,
      count() as pageviews,
      uniq(distinct_id) as users,
      uniq(properties.$session_id) as sessions
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - interval ${days} day
    GROUP BY device, browser, os, referrer
    ORDER BY pageviews DESC
    LIMIT 30
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 5. Conversion funnel: pageview → custom event → lead
async function getConversionFunnel(apiKey: string, projectId: string, days: number) {
  // Get counts at each funnel stage
  const stages = await Promise.all([
    hogqlQuery(apiKey, projectId, `
      SELECT uniq(distinct_id) as users
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= now() - interval ${days} day
    `),
    hogqlQuery(apiKey, projectId, `
      SELECT uniq(distinct_id) as users
      FROM events
      WHERE event NOT LIKE '$%'
        AND timestamp >= now() - interval ${days} day
    `),
    hogqlQuery(apiKey, projectId, `
      SELECT uniq(distinct_id) as users
      FROM events
      WHERE event IN ('cta_click', 'contact_click', 'service_view', 'portfolio_click')
        AND timestamp >= now() - interval ${days} day
    `),
    hogqlQuery(apiKey, projectId, `
      SELECT uniq(distinct_id) as users
      FROM events
      WHERE event IN ('generate_lead', 'whatsapp_click', 'contact_click')
        AND timestamp >= now() - interval ${days} day
    `),
  ])

  return {
    visitors: stages[0]?.[0]?.[0] ?? 0,
    engaged: stages[1]?.[0]?.[0] ?? 0,
    interacted: stages[2]?.[0]?.[0] ?? 0,
    converted: stages[3]?.[0]?.[0] ?? 0,
  }
}

// 6. Page-level engagement: scroll depth, time on page (from autocapture)
async function getPageEngagement(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      properties.$current_url as page,
      properties.$device_type as device,
      count() as total_events,
      uniq(distinct_id) as unique_users,
      uniq(properties.$session_id) as sessions
    FROM events
    WHERE timestamp >= now() - interval ${days} day
    GROUP BY page, device
    ORDER BY total_events DESC
    LIMIT 30
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 7. Referrer analysis: where users come from
async function getReferrerAnalysis(apiKey: string, projectId: string, days: number) {
  const query = `
    SELECT
      properties.$referrer as referrer,
      properties.$referring_domain as referring_domain,
      count() as pageviews,
      uniq(distinct_id) as unique_users
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - interval ${days} day
      AND properties.$referring_domain != ''
    GROUP BY referrer, referring_domain
    ORDER BY pageviews DESC
    LIMIT 20
  `
  return hogqlQuery(apiKey, projectId, query)
}

// 8. Recent persons: latest active users with their events
async function getRecentPersons(apiKey: string, projectId: string) {
  const res = await fetch(
    `${POSTHOG_API}/projects/${projectId}/persons/?order=-last_seen&limit=20`,
    { headers: headers(apiKey) }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PostHog persons API failed (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.results?.map((p: Record<string, unknown>) => ({
    id: p.id,
    distinct_ids: p.distinct_ids,
    properties: p.properties,
    created_at: p.created_at,
  }))
}

// 9. CRO behavior signals: rage clicks, dead clicks, rapid navigation
async function getBehaviorSignals(apiKey: string, projectId: string, days: number) {
  // Dead clicks: clicks on non-interactive elements
  const deadClicks = await hogqlQuery(apiKey, projectId, `
    SELECT
      properties.tag_name as element,
      properties.$el_text as text,
      properties.$current_url as page,
      count() as click_count,
      uniq(distinct_id) as users
    FROM events
    WHERE event = '$autocapture'
      AND properties.$event_type = 'click'
      AND properties.tag_name NOT IN ('a', 'button', 'input', 'select', 'textarea')
      AND timestamp >= now() - interval ${days} day
    GROUP BY element, text, page
    ORDER BY click_count DESC
    LIMIT 15
  `)

  // Rapid page exits: pages with very short session times
  const quickExits = await hogqlQuery(apiKey, projectId, `
    SELECT
      properties.$current_url as page,
      count() as views,
      uniq(distinct_id) as users
    FROM events
    WHERE event = '$pageleave'
      AND timestamp >= now() - interval ${days} day
    GROUP BY page
    ORDER BY views DESC
    LIMIT 15
  `)

  return { deadClicks, quickExits }
}

// ============ MAIN HANDLER ============

export async function GET(request: NextRequest) {
  const authError = authenticateAnalyticsRequest(request)
  if (authError) return authError

  try {
    const { apiKey, projectId } = getConfig()
    const { searchParams } = new URL(request.url)
    const report = searchParams.get('report') || 'overview'
    const days = parseInt(searchParams.get('days') || '30', 10)

    let data: unknown

    switch (report) {
      case 'overview': {
        // Combined overview with key behavioral data
        const [journey, events, funnel, sessions, signals] = await Promise.all([
          getUserJourney(apiKey, projectId, days),
          getEventBreakdown(apiKey, projectId, days),
          getConversionFunnel(apiKey, projectId, days),
          getSessionAnalysis(apiKey, projectId, days),
          getBehaviorSignals(apiKey, projectId, days),
        ])
        data = { journey, events, funnel, sessions, signals }
        break
      }

      case 'journey':
        data = await getUserJourney(apiKey, projectId, days)
        break

      case 'events':
        data = await getEventBreakdown(apiKey, projectId, days)
        break

      case 'autocapture':
        data = await getAutoCapture(apiKey, projectId, days)
        break

      case 'sessions':
        data = await getSessionAnalysis(apiKey, projectId, days)
        break

      case 'funnel':
        data = await getConversionFunnel(apiKey, projectId, days)
        break

      case 'engagement':
        data = await getPageEngagement(apiKey, projectId, days)
        break

      case 'referrers':
        data = await getReferrerAnalysis(apiKey, projectId, days)
        break

      case 'persons':
        data = await getRecentPersons(apiKey, projectId)
        break

      case 'signals':
        data = await getBehaviorSignals(apiKey, projectId, days)
        break

      default:
        return NextResponse.json(
          { error: `Unknown report: ${report}. Available: overview, journey, events, autocapture, sessions, funnel, engagement, referrers, persons, signals` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      report,
      days,
      generatedAt: new Date().toISOString(),
      data,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('PostHog API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
