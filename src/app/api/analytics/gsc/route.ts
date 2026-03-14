/**
 * Google Search Console API Route
 *
 * Pulls search performance data for SEO/CRO analysis.
 *
 * Usage:
 *   GET /api/analytics/gsc?report=queries&period=30
 *   GET /api/analytics/gsc?report=pages&period=30
 *   GET /api/analytics/gsc?report=devices&period=30
 *   GET /api/analytics/gsc?report=countries&period=30
 *   GET /api/analytics/gsc?report=query-pages&period=30
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuth, getGSCSiteUrl } from '@/lib/google/auth'
import { authenticateAnalyticsRequest } from '@/lib/analytics-auth'

export const dynamic = 'force-dynamic'

type ReportType = 'queries' | 'pages' | 'devices' | 'countries' | 'query-pages'

export async function GET(request: NextRequest) {
  const authError = authenticateAnalyticsRequest(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const report = (searchParams.get('report') || 'queries') as ReportType
  const period = parseInt(searchParams.get('period') || '30', 10)
  const limit = parseInt(searchParams.get('limit') || '100', 10)

  try {
    const auth = getGoogleAuth()
    const siteUrl = getGSCSiteUrl()

    const { google } = await import('googleapis')
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth,
    })

    // GSC dates (data has ~3 day delay)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - 3)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - period)

    const dateRange = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    }

    // Previous period for comparison
    const prevEndDate = new Date(startDate)
    prevEndDate.setDate(prevEndDate.getDate() - 1)
    const prevStartDate = new Date(prevEndDate)
    prevStartDate.setDate(prevStartDate.getDate() - period)

    const previousDateRange = {
      startDate: formatDate(prevStartDate),
      endDate: formatDate(prevEndDate),
    }

    let dimensions: string[]

    switch (report) {
      case 'queries':
        dimensions = ['query']
        break
      case 'pages':
        dimensions = ['page']
        break
      case 'devices':
        dimensions = ['device']
        break
      case 'countries':
        dimensions = ['country']
        break
      case 'query-pages':
        dimensions = ['query', 'page']
        break
      default:
        return NextResponse.json(
          { error: `Unknown report type: ${report}` },
          { status: 400 }
        )
    }

    // Fetch current and previous period in parallel
    const [currentData, previousData] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          dimensions,
          rowLimit: limit,
          dataState: 'final',
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: previousDateRange.startDate,
          endDate: previousDateRange.endDate,
          dimensions,
          rowLimit: limit,
          dataState: 'final',
        },
      }),
    ])

    const current = formatGSCData(currentData.data, dimensions)
    const previous = formatGSCData(previousData.data, dimensions)

    // Calculate changes
    const withChanges = addComparison(current, previous, dimensions)

    return NextResponse.json({
      report,
      period,
      dateRange,
      previousDateRange,
      data: withChanges,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[GSC API Error]', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch GSC data',
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
function formatGSCData(data: any, dimensions: string[]) {
  if (!data?.rows) return []

  return data.rows.map(
    (row: {
      keys: string[]
      clicks: number
      impressions: number
      ctr: number
      position: number
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {}

      dimensions.forEach((dim, i) => {
        obj[dim] = row.keys?.[i] || ''
      })

      obj.clicks = row.clicks || 0
      obj.impressions = row.impressions || 0
      obj.ctr = Math.round((row.ctr || 0) * 10000) / 100 // percentage
      obj.position = Math.round((row.position || 0) * 10) / 10

      return obj
    }
  )
}

function addComparison(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previous: any[],
  dimensions: string[]
) {
  // Build lookup from previous period
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prevMap = new Map<string, any>()
  previous.forEach((row) => {
    const key = dimensions.map((d) => row[d]).join('|')
    prevMap.set(key, row)
  })

  return current.map((row) => {
    const key = dimensions.map((d) => row[d]).join('|')
    const prev = prevMap.get(key)

    return {
      ...row,
      changes: prev
        ? {
            clicks: row.clicks - prev.clicks,
            impressions: row.impressions - prev.impressions,
            ctr: Math.round((row.ctr - prev.ctr) * 100) / 100,
            position: Math.round((prev.position - row.position) * 10) / 10, // positive = improvement
          }
        : null,
    }
  })
}
