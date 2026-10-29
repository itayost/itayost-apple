'use client'

import { useSyncExternalStore } from 'react'
import { CONSENT_EVENT, browserStorage, readConsent, writeConsent, type Consent } from './consent'
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

// Records a choice. Allowing analytics starts PostHog at once; taking analytics back reloads the
// page, since scripts already running cannot be unloaded.
export function saveConsent(consent: Consent): void {
  const storage = browserStorage()
  const before = storage ? readConsent(storage) : null
  if (storage) writeConsent(storage, consent)
  window.dispatchEvent(new Event(CONSENT_EVENT))
  if (consent.analytics) startPostHog()
  if (before?.analytics && !consent.analytics) window.location.reload()
}
