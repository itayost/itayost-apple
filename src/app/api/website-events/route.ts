import { NextRequest, after } from 'next/server'
import { hubConfig, relayWebsiteEvent } from '@/lib/hub-events'
import { RateLimiter } from '@/lib/ratelimit'

// The browser's anonymous events, passed on to the hub (src/lib/hub-events.ts). The visitor's IP keys
// the in-memory rate limit only: it is never logged, stored or sent on. Only this site's own pages
// may report (a browser marks a same-origin call), which keeps other sites from forging counts;
// a scripted caller can still send some, which the per-IP limit bounds. Always 204 at once: the hub
// is told after the response, so the page never waits on it and learns nothing.
const limiter = new RateLimiter(30, 60_000)

export async function POST(request: NextRequest) {
  const site = request.headers.get('sec-fetch-site')
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if ((!site || site === 'same-origin') && limiter.check(ip).success) {
    const body = await request.json().catch(() => null)
    after(() => relayWebsiteEvent(body, hubConfig()))
  }
  return new Response(null, { status: 204 })
}
