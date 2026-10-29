import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { authenticateAnalyticsRequest } from './analytics-auth'

// The analytics routes take the site's own key, and client-hub's own key (ANALYTICS_HUB_KEY), so the
// hub can read the website's numbers without sharing the key other tools already use.
const request = (key?: string) => new NextRequest('https://itayost.com/api/analytics/ga4', { headers: key ? { 'x-api-key': key } : {} })

afterEach(() => vi.unstubAllEnvs())

describe('authenticateAnalyticsRequest', () => {
  it('lets in the site key and the hub key, and nothing else', () => {
    vi.stubEnv('ANALYTICS_API_KEY', 'site-key')
    vi.stubEnv('ANALYTICS_HUB_KEY', 'hub-key')
    expect(authenticateAnalyticsRequest(request('site-key'))).toBeNull()
    expect(authenticateAnalyticsRequest(request('hub-key'))).toBeNull()
    expect(authenticateAnalyticsRequest(request('nope'))?.status).toBe(401)
    expect(authenticateAnalyticsRequest(request())?.status).toBe(401)
  })

  it('never lets an empty key match an unset hub key', () => {
    vi.stubEnv('ANALYTICS_API_KEY', 'site-key')
    vi.stubEnv('ANALYTICS_HUB_KEY', '')
    expect(authenticateAnalyticsRequest(request(''))?.status).toBe(401)
  })
})
