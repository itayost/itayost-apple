import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, value, rating, navigationType } = body

    // Get GA Measurement ID from environment
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-CSP6R559BD'

    // Send to Google Analytics 4
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      // This will be sent from client-side, so we just log here for monitoring
      console.log(`Web Vital: ${name}`, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        rating,
        metric_id: id,
        navigationType,
      })
    }

    // You can also send to other monitoring services here
    // Example: Send to your own database, Sentry, LogRocket, etc.

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reporting web vital:', error)
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