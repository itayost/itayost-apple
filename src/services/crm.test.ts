import { describe, expect, it } from 'vitest'
import { CRMLeadSchema } from './crm'

// The relay forwards what the schema keeps, so the visit's tags must survive it to reach the hub.
describe('CRMLeadSchema', () => {
  it('keeps the attribution for the Lead’s Origin', () => {
    const attribution = { last: { source: 'instagram', content: 'p1', landingPage: '/links', at: '2026-10-29T09:00:00.000Z' } }
    expect(CRMLeadSchema.parse({ name: 'דנה', phone: '0501234567', attribution }).attribution).toEqual(attribution)
  })

  it('takes a Lead without one', () => {
    expect(CRMLeadSchema.parse({ name: 'דנה', phone: '0501234567' }).attribution).toBeUndefined()
  })
})
