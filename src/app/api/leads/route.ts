import { NextRequest, NextResponse } from 'next/server'
import { vitalsRateLimiter } from '@/lib/ratelimit'
import {
  CRMLeadSchema,
  type CRMLead,
  type CRMResponse
} from '@/services/crm'

// CRM API endpoint - keep this server-side only
const CRM_API_URL = process.env.CRM_API_URL || 'https://crm-system-alpha-eight.vercel.app/api/public/leads'

/**
 * Submit lead to CRM system (server-side only)
 */
async function submitLeadToCRM(lead: CRMLead): Promise<CRMResponse> {
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
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
      message: 'Lead submitted successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
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

    if (!result.success) {
      return NextResponse.json(
        result,
        { status: 500 }
      )
    }

    return NextResponse.json(
      result,
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

    return NextResponse.json(
      {
        success: false,
        error: 'שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר'
      },
      { status: 500 }
    )
  }
}
