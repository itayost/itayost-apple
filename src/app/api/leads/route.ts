import { NextRequest, NextResponse } from 'next/server'
import { vitalsRateLimiter } from '@/lib/ratelimit'
import {
  CRMLeadSchema,
  type CRMLead,
  type CRMResponse
} from '@/services/crm'
import { getPostHogServer } from '@/lib/posthog-server'

// CRM API endpoint - keep this server-side only
const CRM_API_URL = process.env.CRM_API_URL || 'https://crm-system-alpha-eight.vercel.app/api/public/leads'

// Generic Hebrew error returned to clients. Detailed errors stay in server logs only.
const GENERIC_ERROR_MESSAGE = 'שגיאה בשליחת הטופס. אנא נסו שוב או פנו אליי בוואטסאפ'

/**
 * Truncate a string for safe logging (avoid blowing up logs with HTML payloads).
 */
function truncate(value: string, max = 500): string {
  if (value.length <= max) return value
  return `${value.slice(0, max)}… [truncated, original length ${value.length}]`
}

/**
 * Submit lead to CRM system (server-side only).
 * Returns a structured result. The internal `error` field is for server-side
 * logs and should NEVER be surfaced verbatim to the client — upstream CRM 404
 * pages can be HTML and would render unreadably in the form's error alert.
 */
async function submitLeadToCRM(lead: CRMLead): Promise<CRMResponse & { internalError?: string }> {
  try {
    const response = await fetch(CRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '<no body>')
      const contentType = response.headers.get('content-type') ?? 'unknown'
      const internalError = `Upstream CRM returned ${response.status} (${contentType}): ${truncate(errorText)}`
      console.error('[/api/leads] CRM upstream error', {
        status: response.status,
        contentType,
        url: CRM_API_URL,
        bodyPreview: truncate(errorText, 200),
      })
      return {
        success: false,
        error: GENERIC_ERROR_MESSAGE,
        internalError,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data,
      message: 'Lead submitted successfully'
    }
  } catch (error) {
    const internalError = error instanceof Error ? `${error.name}: ${error.message}` : 'Unknown error'
    console.error('[/api/leads] CRM request failed', { url: CRM_API_URL, error: internalError })
    return {
      success: false,
      error: GENERIC_ERROR_MESSAGE,
      internalError,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting based on IP address (stricter for leads - 5 per minute)
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0]?.trim() ?? 'unknown' : 'unknown'
    const rateLimitResult = vitalsRateLimiter.check(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'יותר מדי בקשות. אנא נסה שוב בעוד מספר דקות'
        },
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

    // Validate the lead data
    const validatedLead = CRMLeadSchema.parse(body)

    // Submit to CRM
    const result = await submitLeadToCRM(validatedLead)

    // Track lead submission in PostHog (server-side). On failure also include
    // the internal error so that broken CRM deploys are immediately visible
    // in the PostHog event stream without the user ever seeing the raw error.
    const posthog = getPostHogServer()
    if (posthog) {
      posthog.capture({
        distinctId: ip,
        event: 'lead_submitted',
        properties: {
          success: result.success,
          projectType: validatedLead.projectType,
          source: 'contact_form',
          ...(result.success ? {} : { internal_error: result.internalError }),
        },
      })
    }

    // Strip internalError before responding to the client.
    const { internalError: _internalError, ...clientResult } = result

    if (!clientResult.success) {
      return NextResponse.json(
        clientResult,
        { status: 502 } // upstream failure
      )
    }

    return NextResponse.json(
      clientResult,
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        }
      }
    )
  } catch (error: unknown) {
    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error && Array.isArray((error as { issues: unknown[] }).issues)) {
      const firstError = (error as { issues: Array<{ message: string }> }).issues[0]
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message ?? 'שגיאה בנתונים שהוזנו'
        },
        { status: 400 }
      )
    }

    console.error('[/api/leads] Unhandled error', error)
    return NextResponse.json(
      {
        success: false,
        error: 'שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר'
      },
      { status: 500 }
    )
  }
}
