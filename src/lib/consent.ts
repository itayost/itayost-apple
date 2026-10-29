// The visitor's cookie choice (Israel's Privacy Protection Law, Amendment 13, and the Privacy
// Protection Authority's Feb 2026 consent paper): nothing that measures a visitor loads before they
// choose, and analytics and marketing are separate choices. The choice itself is kept in
// localStorage, which is necessary storage. Vercel Analytics and Speed Insights set no cookies and
// keep no visitor id, and MarketingBeacon counts tagged landings without one, so they run regardless.

export type Consent = { analytics: boolean; marketing: boolean; decidedAt: string; version: number }
export type Tracker = 'ga4' | 'posthog' | 'clarity' | 'metaPixel'

// Raised when what a choice covers changes, so every visitor is asked again.
const VERSION = 1
const KEY = 'itayost:consent'
// Fired on this window when the choice changes, and to ask for the banner again (the footer link).
export const CONSENT_EVENT = 'itayost:consent'
export const OPEN_CONSENT_EVENT = 'itayost:open-consent'

type Storage = { getItem(key: string): string | null; setItem(key: string, value: string): void }

export function decide(choice: { analytics: boolean; marketing: boolean }, now: Date): Consent {
  return { analytics: choice.analytics, marketing: choice.marketing, decidedAt: now.toISOString(), version: VERSION }
}

export function allowedTrackers(consent: Consent | null): Tracker[] {
  if (!consent) return []
  return [...(consent.analytics ? (['ga4', 'posthog', 'clarity'] as const) : []), ...(consent.marketing ? (['metaPixel'] as const) : [])]
}

export function readConsent(storage: Storage): Consent | null {
  try {
    const raw = storage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Consent>
    if (parsed.version !== VERSION || typeof parsed.analytics !== 'boolean' || typeof parsed.marketing !== 'boolean') return null
    return { analytics: parsed.analytics, marketing: parsed.marketing, decidedAt: String(parsed.decidedAt), version: VERSION }
  } catch {
    return null
  }
}

export function writeConsent(storage: Storage, consent: Consent): void {
  try {
    storage.setItem(KEY, JSON.stringify(consent))
  } catch {
    // Blocked storage: the choice lasts for this page only, and the banner asks again next time.
  }
}

// The browser's localStorage, or null where it is blocked or on the server.
export function browserStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

// What GA4, PostHog and Clarity keep about a visitor in this browser: their cookies (_ga, _ga_*,
// ph_*, _clck, _clsk) and PostHog's localStorage entries (ph_*). Withdrawing analytics clears them,
// so no identifier outlives the consent it was set under.
const ANALYTICS_NAME = /^(_ga|_ga_.+|ph_.+|_clck|_clsk)$/

export function analyticsCookieNames(cookieHeader: string): string[] {
  return cookieHeader
    .split(';')
    .map((part) => part.split('=')[0]?.trim() ?? '')
    .filter((name) => ANALYTICS_NAME.test(name))
}

export function isAnalyticsStorageKey(key: string): boolean {
  return ANALYTICS_NAME.test(key)
}
