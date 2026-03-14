import { NextRequest, NextResponse } from 'next/server'

/**
 * Shared authentication for all analytics API routes.
 *
 * Requires ANALYTICS_API_KEY to be set in environment variables.
 * If the key is not configured, ALL requests are rejected in production
 * and allowed only in development mode.
 *
 * Clients must send the key via: x-api-key header
 */

const UNAUTHORIZED = NextResponse.json(
  { error: 'Unauthorized — missing or invalid API key' },
  { status: 401 }
)

const FORBIDDEN = NextResponse.json(
  { error: 'Forbidden — analytics API key is not configured on the server' },
  { status: 403 }
)

export function authenticateAnalyticsRequest(request: NextRequest): NextResponse | null {
  const expectedKey = process.env.ANALYTICS_API_KEY

  // In production: if the API key env var is not set, block everything
  if (!expectedKey) {
    if (process.env.NODE_ENV === 'development') {
      // Allow in dev mode for local testing
      return null
    }
    console.error('ANALYTICS_API_KEY is not configured — blocking analytics API request')
    return FORBIDDEN
  }

  // Validate the x-api-key header
  const providedKey = request.headers.get('x-api-key')

  if (!providedKey || providedKey !== expectedKey) {
    return UNAUTHORIZED
  }

  // Authenticated
  return null
}
