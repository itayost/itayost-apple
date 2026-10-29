import { describe, expect, it, vi } from 'vitest'
import { relayWebsiteEvent } from './hub-events'

// The browser tells the website, and the website tells the hub (client-hub docs/website-events.md):
// only a kind and tags ever leave, never the visitor's IP, user agent or anything else.

const config = { url: 'https://hub.test/api/website-events', secret: 'shh' }

describe('relayWebsiteEvent', () => {
  it('forwards a tagged landing with the secret, and only the kind and tags', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 201 }))
    const sent = await relayWebsiteEvent({ kind: 'landing', source: 'instagram', medium: 'bio', campaign: 'launch', content: 'p1', ip: '1.2.3.4' }, config, fetcher)
    expect(sent).toBe(true)
    expect(fetcher).toHaveBeenCalledOnce()
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe(config.url)
    expect((init.headers as Record<string, string>)['x-events-secret']).toBe('shh')
    expect(JSON.parse(init.body as string)).toEqual({ kind: 'landing', source: 'instagram', medium: 'bio', campaign: 'launch', content: 'p1' })
  })

  it('forwards a WhatsApp tap without tags', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 201 }))
    expect(await relayWebsiteEvent({ kind: 'whatsapp' }, config, fetcher)).toBe(true)
    expect(JSON.parse((fetcher.mock.calls[0] as unknown as [string, RequestInit])[1].body as string)).toEqual({ kind: 'whatsapp' })
  })

  it('sends nothing for an unknown kind, an untagged landing, or no configuration', async () => {
    const fetcher = vi.fn(async () => new Response(null, { status: 201 }))
    expect(await relayWebsiteEvent({ kind: 'visit', source: 'instagram' }, config, fetcher)).toBe(false)
    expect(await relayWebsiteEvent({ kind: 'landing' }, config, fetcher)).toBe(false)
    expect(await relayWebsiteEvent('nonsense', config, fetcher)).toBe(false)
    expect(await relayWebsiteEvent({ kind: 'whatsapp' }, { url: '', secret: '' }, fetcher)).toBe(false)
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('answers false, never throws, when the hub fails', async () => {
    const down = vi.fn(async () => {
      throw new Error('ECONNREFUSED')
    })
    expect(await relayWebsiteEvent({ kind: 'whatsapp' }, config, down)).toBe(false)
  })
})
