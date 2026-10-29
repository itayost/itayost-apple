'use client'

import { useSyncExternalStore } from 'react'
import { CONSENT_EVENT, analyticsCookieNames, browserStorage, isAnalyticsStorageKey, readConsent, writeConsent, type Consent } from './consent'
import posthog from 'posthog-js'
import { startPostHog } from './posthog-client'

// The visitor's choice as React state: null until they choose, and on the server.
function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// A string, so the snapshot is stable between reads of the same choice.
const snapshot = () => {
  const storage = browserStorage()
  return storage ? JSON.stringify(readConsent(storage)) : 'null'
}

export function useConsent(): Consent | null {
  return JSON.parse(useSyncExternalStore(subscribe, snapshot, () => 'null')) as Consent | null
}

// Clears what analytics stored in this browser: cookies on this host and its parent domain (GA sets
// them on .itayost.com), and PostHog's localStorage entries. Running scripts are stopped first, since
// both write their ids back as the page unloads. ConsentBanner also runs it on every load while
// analytics is not allowed, so anything that slipped through is gone by the next page.
export function forgetAnalytics(): void {
  if (posthog.__loaded) {
    posthog.opt_out_capturing()
    posthog.reset()
  }
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (gaId) (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true
  const host = window.location.hostname
  const domains = ['', host, `.${host.replace(/^www\./, '')}`]
  for (const name of analyticsCookieNames(document.cookie)) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
  }
  try {
    for (const key of Object.keys(window.localStorage)) if (isAnalyticsStorageKey(key)) window.localStorage.removeItem(key)
  } catch {
    // Blocked storage held nothing to clear.
  }
}

// Records a choice. Allowing analytics starts PostHog at once; taking analytics back clears what it
// stored and reloads the page, since scripts already running cannot be unloaded.
export function saveConsent(consent: Consent): void {
  const storage = browserStorage()
  const before = storage ? readConsent(storage) : null
  if (storage) writeConsent(storage, consent)
  window.dispatchEvent(new Event(CONSENT_EVENT))
  if (consent.analytics) startPostHog()
  if (before?.analytics && !consent.analytics) {
    forgetAnalytics()
    window.location.reload()
  }
}
