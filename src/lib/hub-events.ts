import { z } from 'zod'

// Relays the browser's anonymous events to client-hub (its docs/website-events.md, ADR 0014): a
// landing that carries tags, or a tap on a WhatsApp link. Only the kind and the tags are ever sent;
// the visitor's IP, user agent and everything else the browser sent stay here, unlogged. A failure
// is dropped: a lost count is better than a retry that delays the page or the hub.

const tag = z.string().trim().min(1).max(100).optional()

// Unknown keys are stripped (the hub refuses them), so nothing extra can slip through.
const eventSchema = z
  .object({ kind: z.enum(['landing', 'whatsapp']), source: tag, medium: tag, campaign: tag, content: tag })
  .refine((e) => e.kind !== 'landing' || e.source !== undefined)

export type HubConfig = { url: string; secret: string }
type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export const hubConfig = (): HubConfig => ({ url: process.env.HUB_EVENTS_URL ?? '', secret: process.env.HUB_EVENTS_SECRET ?? '' })

// True when the hub counted it.
export async function relayWebsiteEvent(body: unknown, config: HubConfig, fetcher: Fetcher = fetch): Promise<boolean> {
  if (!config.url || !config.secret) return false
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) return false
  try {
    const response = await fetcher(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-events-secret': config.secret },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(5000),
    })
    return response.ok
  } catch {
    return false
  }
}
