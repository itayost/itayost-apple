import { describe, expect, it } from 'vitest'
import { readAttribution, recordTouch, touchFromUrl } from './attribution'

// The tags of the links a visitor followed, kept for the visit so the contact form can send them
// to the hub for the Lead's Origin (client-hub docs/website-lead-intake.md).

const memory = () => {
  const items = new Map<string, string>()
  return {
    getItem: (k: string) => items.get(k) ?? null,
    setItem: (k: string, v: string) => void items.set(k, v),
  }
}

const at = new Date('2026-10-29T09:00:00Z')

describe('touchFromUrl', () => {
  it('reads the tags and the landing page', () => {
    expect(touchFromUrl('https://itayost.com/links?utm_source=instagram&utm_medium=bio&utm_campaign=launch&utm_content=p1&x=1', at)).toEqual({
      source: 'instagram',
      medium: 'bio',
      campaign: 'launch',
      content: 'p1',
      landingPage: '/links',
      at: '2026-10-29T09:00:00.000Z',
    })
  })

  it('is null without a source tag', () => {
    expect(touchFromUrl('https://itayost.com/?utm_medium=bio', at)).toBeNull()
    expect(touchFromUrl('https://itayost.com/services', at)).toBeNull()
  })

  it('trims long tags rather than sending them', () => {
    const touch = touchFromUrl(`https://itayost.com/?utm_source=${'a'.repeat(300)}`, at)
    expect(touch?.source).toHaveLength(100)
  })
})

describe('the visit', () => {
  it('keeps the first touch and moves the last', () => {
    const storage = memory()
    const first = touchFromUrl('https://itayost.com/?utm_source=facebook&utm_content=p1', at)!
    const second = touchFromUrl('https://itayost.com/links?utm_source=instagram&utm_content=p2', at)!
    recordTouch(storage, first)
    recordTouch(storage, second)
    expect(readAttribution(storage)).toEqual({ first, last: second })
  })

  it('counts a reload or a Back to the same tagged page once', () => {
    const storage = memory()
    const landing = touchFromUrl('https://itayost.com/links?utm_source=instagram&utm_content=p1', at)!
    expect(recordTouch(storage, landing)).toBe(true)
    expect(recordTouch(storage, { ...landing, at: '2026-10-29T09:05:00.000Z' })).toBe(false)
    expect(readAttribution(storage)?.last?.at).toBe(landing.at)
    expect(recordTouch(storage, touchFromUrl('https://itayost.com/links?utm_source=instagram&utm_content=p2', at)!)).toBe(true)
  })

  it('is undefined with nothing recorded, or with something unreadable', () => {
    expect(readAttribution(memory())).toBeUndefined()
    const storage = memory()
    storage.setItem('itayost:attribution', '{broken')
    expect(readAttribution(storage)).toBeUndefined()
  })

  it('never throws when storage is blocked', () => {
    const blocked = {
      getItem: () => {
        throw new Error('SecurityError')
      },
      setItem: () => {
        throw new Error('SecurityError')
      },
    }
    expect(() => recordTouch(blocked, touchFromUrl('https://itayost.com/?utm_source=instagram', at)!)).not.toThrow()
    expect(readAttribution(blocked)).toBeUndefined()
  })
})
