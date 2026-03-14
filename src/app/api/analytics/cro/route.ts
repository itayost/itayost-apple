/**
 * CRO Analysis Endpoint
 *
 * Combines GA4 + GSC data into actionable CRO insights.
 * Designed to give Claude (or any consumer) everything needed
 * to make conversion optimization recommendations.
 *
 * Usage:
 *   GET /api/analytics/cro?period=30
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuth, getGA4PropertyId, getGSCSiteUrl } from '@/lib/google/auth'
import { authenticateAnalyticsRequest } from '@/lib/analytics-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const authError = authenticateAnalyticsRequest(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const period = parseInt(searchParams.get('period') || '30', 10)

  try {
    const auth = getGoogleAuth()
    const propertyId = getGA4PropertyId()
    const siteUrl = getGSCSiteUrl()

    const { google } = await import('googleapis')

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth })
    const searchconsole = google.searchconsole({ version: 'v1', auth })

    const dateRange = {
      startDate: `${period}daysAgo`,
      endDate: 'today',
    }

    const previousDateRange = {
      startDate: `${period * 2}daysAgo`,
      endDate: `${period + 1}daysAgo`,
    }

    // GSC dates
    const gscEnd = new Date()
    gscEnd.setDate(gscEnd.getDate() - 3)
    const gscStart = new Date(gscEnd)
    gscStart.setDate(gscStart.getDate() - period)

    // Fetch all data in parallel
    const [
      overviewRes,
      pagesRes,
      eventsRes,
      devicesRes,
      trafficRes,
      gscQueriesRes,
      gscPagesRes,
    ] = await Promise.all([
      // GA4: Overview with comparison
      analyticsData.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [dateRange, previousDateRange],
          metrics: [
            { name: 'totalUsers' },
            { name: 'newUsers' },
            { name: 'sessions' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'conversions' },
            { name: 'engagementRate' },
            { name: 'screenPageViews' },
          ],
        },
      }),

      // GA4: Top pages
      analyticsData.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [dateRange],
          dimensions: [{ name: 'pagePath' }],
          metrics: [
            { name: 'screenPageViews' },
            { name: 'totalUsers' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'conversions' },
            { name: 'engagementRate' },
            { name: 'userEngagementDuration' },
          ],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: '20',
        },
      }),

      // GA4: CRO events
      analyticsData.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [dateRange],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
          dimensionFilter: {
            orGroup: {
              expressions: [
                'generate_lead',
                'whatsapp_click',
                'contact_click',
                'cta_click',
                'service_view',
                'portfolio_click',
              ].map((event) => ({
                filter: {
                  fieldName: 'eventName',
                  stringFilter: { value: event },
                },
              })),
            },
          },
          orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        },
      }),

      // GA4: Device breakdown
      analyticsData.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [dateRange],
          dimensions: [{ name: 'deviceCategory' }],
          metrics: [
            { name: 'totalUsers' },
            { name: 'bounceRate' },
            { name: 'conversions' },
            { name: 'engagementRate' },
          ],
        },
      }),

      // GA4: Traffic sources
      analyticsData.properties.runReport({
        property: propertyId,
        requestBody: {
          dateRanges: [dateRange],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'bounceRate' },
            { name: 'conversions' },
            { name: 'engagementRate' },
          ],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: '10',
        },
      }),

      // GSC: Top queries
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(gscStart),
          endDate: formatDate(gscEnd),
          dimensions: ['query'],
          rowLimit: 50,
          dataState: 'final',
        },
      }),

      // GSC: Top pages
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(gscStart),
          endDate: formatDate(gscEnd),
          dimensions: ['page'],
          rowLimit: 30,
          dataState: 'final',
        },
      }),
    ])

    // Format everything into a CRO-friendly structure
    const croReport = {
      period,
      generatedAt: new Date().toISOString(),

      overview: formatOverviewMetrics(overviewRes.data),

      pages: formatRows(pagesRes.data, ['pagePath']),

      conversionEvents: formatRows(eventsRes.data, ['eventName']),

      devices: formatRows(devicesRes.data, ['deviceCategory']),

      trafficSources: formatRows(trafficRes.data, ['sessionDefaultChannelGroup']),

      search: {
        topQueries: formatGSCRows(gscQueriesRes.data, ['query']),
        topPages: formatGSCRows(gscPagesRes.data, ['page']),
      },

      // Pre-computed CRO signals
      signals: computeCROSignals(
        pagesRes.data,
        eventsRes.data,
        devicesRes.data,
        overviewRes.data
      ),
    }

    return NextResponse.json(croReport)
  } catch (error) {
    console.error('[CRO API Error]', error)
    return NextResponse.json(
      {
        error: 'Failed to generate CRO report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] as string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatOverviewMetrics(data: any) {
  if (!data?.rows?.[0]) return null

  const current = data.rows[0].metricValues || []
  const previous = data.rows[1]?.metricValues || []

  const names = [
    'totalUsers',
    'newUsers',
    'sessions',
    'bounceRate',
    'averageSessionDuration',
    'conversions',
    'engagementRate',
    'screenPageViews',
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {}

  names.forEach((name, i) => {
    const curr = parseFloat(current[i]?.value || '0')
    const prev = parseFloat(previous[i]?.value || '0')
    result[name] = {
      value: curr,
      previousValue: prev,
      changePercent:
        prev > 0 ? Math.round(((curr - prev) / prev) * 1000) / 10 : 0,
    }
  })

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatRows(data: any, dimensions: string[]) {
  if (!data?.rows) return []

  const metricHeaders = data.metricHeaders?.map((h: { name: string }) => h.name) || []

  return data.rows.map(
    (row: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {}
      dimensions.forEach((d, i) => {
        obj[d] = row.dimensionValues?.[i]?.value || ''
      })
      metricHeaders.forEach((m: string, i: number) => {
        obj[m] = parseFloat(row.metricValues?.[i]?.value || '0')
      })
      return obj
    }
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatGSCRows(data: any, dimensions: string[]) {
  if (!data?.rows) return []

  return data.rows.map(
    (row: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {}
      dimensions.forEach((d, i) => {
        obj[d] = row.keys?.[i] || ''
      })
      obj.clicks = row.clicks || 0
      obj.impressions = row.impressions || 0
      obj.ctr = Math.round((row.ctr || 0) * 10000) / 100
      obj.position = Math.round((row.position || 0) * 10) / 10
      return obj
    }
  )
}

/**
 * Pre-compute CRO signals — flag pages and patterns that need attention
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeCROSignals(...datasets: any[]) {
  const [pagesData, eventsData, devicesData, overviewData] = datasets
  const signals: string[] = []

  // High-traffic pages with high bounce rate
  const pages = pagesData?.rows || []
  pages.forEach(
    (row: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => {
      const path = row.dimensionValues?.[0]?.value || ''
      const views = parseFloat(row.metricValues?.[0]?.value || '0')
      const bounceRate = parseFloat(row.metricValues?.[2]?.value || '0')

      if (views > 50 && bounceRate > 0.7) {
        signals.push(
          `HIGH_BOUNCE: "${path}" has ${views} views but ${Math.round(bounceRate * 100)}% bounce rate`
        )
      }
    }
  )

  // Device-specific issues
  const devices = devicesData?.rows || []
  devices.forEach(
    (row: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => {
      const device = row.dimensionValues?.[0]?.value || ''
      const bounceRate = parseFloat(row.metricValues?.[1]?.value || '0')

      if (device === 'mobile' && bounceRate > 0.65) {
        signals.push(
          `MOBILE_BOUNCE: Mobile bounce rate is ${Math.round(bounceRate * 100)}% — review mobile UX`
        )
      }
    }
  )

  // Low conversion events
  const events = eventsData?.rows || []
  const leadEvents = events.filter(
    (row: { dimensionValues: { value: string }[] }) =>
      row.dimensionValues?.[0]?.value === 'generate_lead'
  )

  if (leadEvents.length === 0) {
    signals.push('NO_LEADS: No generate_lead events recorded in this period')
  }

  // Overall engagement check
  const overview = overviewData?.rows?.[0]?.metricValues || []
  const engagementRate = parseFloat(overview[6]?.value || '0')
  if (engagementRate < 0.5) {
    signals.push(
      `LOW_ENGAGEMENT: Overall engagement rate is ${Math.round(engagementRate * 100)}% — below 50% threshold`
    )
  }

  return signals
}
