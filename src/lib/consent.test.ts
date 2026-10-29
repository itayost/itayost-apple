import { describe, expect, it } from 'vitest'
import { allowedTrackers, analyticsCookieNames, decide, isAnalyticsStorageKey, readConsent, writeConsent } from './consent'

// Israel's Privacy Protection Law, Amendment 13, and the regulator's Feb 2026 consent paper: nothing
// measures a visitor until they say so, and analytics and marketing are separate choices.

const memory = () => {
  const items = new Map<string, string>()
  return { getItem: (k: string) => items.get(k) ?? null, setItem: (k: string, v: string) => void items.set(k, v) }
}

const at = new Date('2026-10-29T09:00:00Z')

describe('consent', () => {
  it('loads nothing before a choice', () => {
    expect(readConsent(memory())).toBeNull()
    expect(allowedTrackers(null)).toEqual([])
  })

  it('loads only what each choice allows', () => {
    expect(allowedTrackers(decide({ analytics: false, marketing: false }, at))).toEqual([])
    expect(allowedTrackers(decide({ analytics: true, marketing: false }, at))).toEqual(['ga4', 'posthog', 'clarity'])
    expect(allowedTrackers(decide({ analytics: false, marketing: true }, at))).toEqual(['metaPixel'])
    expect(allowedTrackers(decide({ analytics: true, marketing: true }, at))).toEqual(['ga4', 'posthog', 'clarity', 'metaPixel'])
  })

  it('remembers the choice and when it was made', () => {
    const storage = memory()
    const choice = decide({ analytics: true, marketing: false }, at)
    writeConsent(storage, choice)
    expect(readConsent(storage)).toEqual({ analytics: true, marketing: false, decidedAt: '2026-10-29T09:00:00.000Z', version: 1 })
  })

  it('asks again when what was stored is unreadable or from an older version', () => {
    const storage = memory()
    storage.setItem('itayost:consent', '{broken')
    expect(readConsent(storage)).toBeNull()
    storage.setItem('itayost:consent', JSON.stringify({ analytics: true, marketing: true, decidedAt: '2026-01-01T00:00:00.000Z', version: 0 }))
    expect(readConsent(storage)).toBeNull()
  })

  it('treats blocked storage as no choice, and never throws', () => {
    const blocked = { getItem: () => { throw new Error('SecurityError') }, setItem: () => { throw new Error('SecurityError') } }
    expect(readConsent(blocked)).toBeNull()
    expect(() => writeConsent(blocked, decide({ analytics: true, marketing: true }, at))).not.toThrow()
  })
})

describe('withdrawing analytics', () => {
  it('finds what GA4, PostHog and Clarity stored, and nothing else', () => {
    expect(analyticsCookieNames('_ga=GA1.1.1; _ga_CSP6=GS1; ph_phc_x_posthog=%7B%7D; _clck=a; theme=dark; _gat=1')).toEqual(['_ga', '_ga_CSP6', 'ph_phc_x_posthog', '_clck'])
    expect(isAnalyticsStorageKey('ph_phc_x_posthog')).toBe(true)
    expect(isAnalyticsStorageKey('itayost:consent')).toBe(false)
    expect(isAnalyticsStorageKey('itayost:attribution')).toBe(false)
  })
})
