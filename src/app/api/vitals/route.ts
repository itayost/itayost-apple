import { NextRequest, NextResponse } from 'next/server'
import { vitalsRateLimiter } from '@/lib/ratelimit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting based on IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
    const rateLimitResult = vitalsRateLimiter.check(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { id, name, value, rating, navigationType } = body

    // Get GA Measurement ID from environment
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

    // Validate that GA is configured (but don't block if not)
    if (!GA_MEASUREMENT_ID) {
      // Analytics not configured - silently accept but don't process
      return NextResponse.json({ success: true })
    }

    // You can send to other monitoring services here
    // Example: Send to your own database, Sentry, LogRocket, etc.

    // For now, just acknowledge receipt
    // In production, you'd send this data to your analytics backend

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        }
      }
    )
  } catch (error) {
    // Don't log error details in production
    return NextResponse.json(
      { error: 'Failed to report web vital' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Web Vitals API',
    metrics: ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP']
  })
}