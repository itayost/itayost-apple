'use client'

import { useEffect } from 'react'
import { readAttribution, recordTouch, touchFromUrl, type Touch } from '@/lib/attribution'

// Counts, without tracking anyone, a landing that carries tags and every tap on a WhatsApp link
// (client-hub ADR 0014): the browser tells this site's /api/website-events, which passes only the
// kind and the tags on to the hub. It also keeps the visit's tags for the contact form (the Lead's
// Origin). No cookie and no id, so it runs before and without consent.
const ENDPOINT = '/api/website-events'

function send(kind: 'landing' | 'whatsapp', touch: Partial<Touch> | undefined) {
  const { source, medium, campaign, content } = touch ?? {}
  const body = JSON.stringify({ kind, source, medium, campaign, content })
  // A beacon survives the page unloading, which a tap on wa.me usually does next.
  if (!navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) {
    void fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  }
}

function storage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function MarketingBeacon() {
  useEffect(() => {
    const store = storage()
    const touch = touchFromUrl(window.location.href, new Date())
    // A reload or a Back to the same tagged page is the same visit: counted once.
    if (touch && (store ? recordTouch(store, touch) : true)) send('landing', touch)

    // Every WhatsApp entry point builds a wa.me link (src/lib/whatsapp.ts), so one listener sees them all.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="https://wa.me/"]')
      if (link) send('whatsapp', store ? readAttribution(store)?.last : undefined)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
