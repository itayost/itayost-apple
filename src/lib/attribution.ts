// The tags of the links a visitor followed (utm_*), kept for the visit in sessionStorage so the
// contact form can send them to the hub, which sets the Lead's Origin from them (client-hub
// docs/website-lead-intake.md). Tags identify a link, never a person, and sessionStorage ends with
// the tab, so nothing here needs consent. Storage may be blocked (private modes): every read and
// write gives up quietly rather than break the page or the form.

export type Touch = {
  source: string
  medium?: string
  campaign?: string
  content?: string
  landingPage: string
  at: string
}

export type Attribution = { first?: Touch; last?: Touch }

type Storage = { getItem(key: string): string | null; setItem(key: string, value: string): void }

const KEY = 'itayost:attribution'
const MAX_TAG = 100
const MAX_PAGE = 500

const TAGS = { source: 'utm_source', medium: 'utm_medium', campaign: 'utm_campaign', content: 'utm_content' } as const

// The hub refuses longer tags; trimming here keeps a long link from costing the visitor their Lead.
const clip = (value: string | null, max: number) => (value ? value.trim().slice(0, max) || undefined : undefined)

// A tagged landing, or null when the URL carries no source tag.
export function touchFromUrl(href: string, now: Date): Touch | null {
  const url = new URL(href)
  const tag = (key: keyof typeof TAGS) => clip(url.searchParams.get(TAGS[key]), MAX_TAG)
  const source = tag('source')
  if (!source) return null
  const [medium, campaign, content] = [tag('medium'), tag('campaign'), tag('content')]
  return {
    source,
    ...(medium && { medium }),
    ...(campaign && { campaign }),
    ...(content && { content }),
    landingPage: url.pathname.slice(0, MAX_PAGE),
    at: now.toISOString(),
  }
}

export function readAttribution(storage: Storage): Attribution | undefined {
  try {
    const raw = storage.getItem(KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as Attribution
    return parsed && (parsed.first || parsed.last) ? parsed : undefined
  } catch {
    return undefined
  }
}

// The same link and page as the last touch: a reload or a Back, not a new landing.
const sameLanding = (a: Touch | undefined, b: Touch) =>
  !!a && a.source === b.source && a.medium === b.medium && a.campaign === b.campaign && a.content === b.content && a.landingPage === b.landingPage

// The first tagged landing of the visit stays; every later one becomes the last. True when it is a
// new landing worth counting, false for a repeat of the last one (which keeps its first time).
export function recordTouch(storage: Storage, touch: Touch): boolean {
  try {
    const current = readAttribution(storage)
    if (sameLanding(current?.last, touch)) return false
    storage.setItem(KEY, JSON.stringify({ first: current?.first ?? touch, last: touch }))
    return true
  } catch {
    // Blocked storage: the Lead simply arrives without an Origin, and the landing is still counted.
    return true
  }
}

// What the contact form sends with a Lead, read in the browser; undefined on the server.
export function visitAttribution(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return readAttribution(window.sessionStorage)
  } catch {
    return undefined
  }
}
