/**
 * GA4 Data API Route
 *
 * Pulls analytics data from Google Analytics 4 for CRO analysis.
 * Supports multiple report types via query parameters.
 *
 * Usage:
 *   GET /api/analytics/ga4?report=overview&period=30
 *   GET /api/analytics/ga4?report=pages&period=30
 *   GET /api/analytics/ga4?report=events&period=30
 *   GET /api/analytics/ga4?report=conversions&period=30
 *   GET /api/analytics/ga4?report=user-journey&period=30
 *   GET /api/analytics/ga4?report=devices&period=30
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuth, getGA4PropertyId } from '@/lib/google/auth'
import { authenticateAnalyticsRequest } from '@/lib/analytics-auth'

// Ensure this runs on the server
export const dynamic = 'force-dynamic'

type ReportType =
  | 'overview'
  | 'pages'
  | 'events'
  | 'conversions'
  | 'user-journey'
  | 'devices'
  | 'sources'

export async function GET(request: NextRequest) {
  const authError = authenticateAnalyticsRequest(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const report = (searchParams.get('report') || 'overview') as ReportType
  const period = parseInt(searchParams.get('period') || '30', 10)

  try {
    const auth = getGoogleAuth()
    const propertyId = getGA4PropertyId()

    // googleapis approach (more compatible with Next.js edge)
    const { google } = await import('googleapis')
    const analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth,
    })

    const dateRange = {
      startDate: `${period}daysAgo`,
      endDate: 'today',
    }

    const previousDateRange = {
      startDate: `${period * 2}daysAgo`,
      endDate: `${period + 1}daysAgo`,
    }

    let data

    switch (report) {
      case 'overview':
        data = await getOverview(analyticsData, propertyId, dateRange, previousDateRange)
        break
      case 'pages':
        data = await getPagePerformance(analyticsData, propertyId, dateRange)
        break
      case 'events':
        data = await getEvents(analyticsData, propertyId, dateRange)
        break
      case 'conversions':
        data = await getConversions(analyticsData, propertyId, dateRange)
        break
      case 'user-journey':
        data = await getUserJourney(analyticsData, propertyId, dateRange)
        break
      case 'devices':
        data = await getDevices(analyticsData, propertyId, dateRange)
        break
      case 'sources':
        data = await getSources(analyticsData, propertyId, dateRange)
        break
      default:
        return NextResponse.json(
          { error: `Unknown report type: ${report}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      report,
      period,
      dateRange,
      data,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[GA4 API Error]', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch GA4 data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalyticsClient = any

async function getOverview(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string },
  previousDateRange: { startDate: string; endDate: string }
) {
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange, previousDateRange],
      metrics: [
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'screenPageViews' },
        { name: 'conversions' },
        { name: 'engagementRate' },
        { name: 'sessionsPerUser' },
      ],
    },
  })

  return formatOverview(response.data)
}

async function getPagePerformance(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'engagementRate' },
        { name: 'conversions' },
        { name: 'userEngagementDuration' },
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: '50',
    },
  })

  return formatTableReport(response.data)
}

async function getEvents(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'eventName' }],
      metrics: [
        { name: 'eventCount' },
        { name: 'totalUsers' },
        { name: 'eventCountPerUser' },
      ],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: '50',
    },
  })

  return formatTableReport(response.data)
}

async function getConversions(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  // Get conversion events specifically (the CRO-critical ones)
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'eventName' }, { name: 'pagePath' }],
      metrics: [
        { name: 'eventCount' },
        { name: 'totalUsers' },
      ],
      dimensionFilter: {
        orGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: { value: 'generate_lead' },
              },
            },
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: { value: 'whatsapp_click' },
              },
            },
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: { value: 'contact_click' },
              },
            },
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: { value: 'cta_click' },
              },
            },
          ],
        },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: '100',
    },
  })

  return formatTableReport(response.data)
}

async function getUserJourney(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  // Landing pages + traffic source
  const [landingPages, trafficSources] = await Promise.all([
    client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
          { name: 'conversions' },
          { name: 'engagementRate' },
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: '30',
      },
    }),
    client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [dateRange],
        dimensions: [
          { name: 'sessionDefaultChannelGroup' },
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'bounceRate' },
          { name: 'conversions' },
          { name: 'engagementRate' },
        ],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: '30',
      },
    }),
  ])

  return {
    landingPages: formatTableReport(landingPages.data),
    trafficSources: formatTableReport(trafficSources.data),
  }
}

async function getDevices(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'conversions' },
        { name: 'engagementRate' },
        { name: 'screenPageViews' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    },
  })

  return formatTableReport(response.data)
}

async function getSources(
  client: AnalyticsClient,
  propertyId: string,
  dateRange: { startDate: string; endDate: string }
) {
  const response = await client.properties.runReport({
    property: propertyId,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: [
        { name: 'sessionDefaultChannelGroup' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'engagementRate' },
        { name: 'conversions' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: '50',
    },
  })

  return formatTableReport(response.data)
}

// --- Formatters ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatOverview(data: any) {
  if (!data?.rows || data.rows.length === 0) return null

  const current = data.rows[0]?.metricValues || []
  const previous = data.rows[1]?.metricValues || []

  const metricNames = [
    'totalUsers',
    'newUsers',
    'sessions',
    'engagedSessions',
    'averageSessionDuration',
    'bounceRate',
    'screenPageViews',
    'conversions',
    'engagementRate',
    'sessionsPerUser',
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {}

  metricNames.forEach((name, i) => {
    const currentVal = parseFloat(current[i]?.value || '0')
    const previousVal = parseFloat(previous[i]?.value || '0')
    const changePercent =
      previousVal > 0
        ? ((currentVal - previousVal) / previousVal) * 100
        : 0

    result[name] = {
      current: currentVal,
      previous: previousVal,
      change: Math.round(changePercent * 10) / 10,
    }
  })

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatTableReport(data: any) {
  if (!data?.rows) return { headers: [], rows: [] }

  const dimensionHeaders =
    data.dimensionHeaders?.map((h: { name: string }) => h.name) || []
  const metricHeaders =
    data.metricHeaders?.map((h: { name: string }) => h.name) || []

  const rows = data.rows.map(
    (row: {
      dimensionValues: { value: string }[]
      metricValues: { value: string }[]
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {}

      dimensionHeaders.forEach((header: string, i: number) => {
        obj[header] = row.dimensionValues?.[i]?.value || ''
      })

      metricHeaders.forEach((header: string, i: number) => {
        obj[header] = parseFloat(row.metricValues?.[i]?.value || '0')
      })

      return obj
    }
  )

  return {
    headers: [...dimensionHeaders, ...metricHeaders],
    rows,
    rowCount: data.rowCount || rows.length,
  }
}
