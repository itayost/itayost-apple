import { startPostHogIfAllowed } from '@/lib/posthog-client'

// PostHog waits for the visitor's consent (src/lib/consent.ts); see src/lib/posthog-client.ts.
startPostHogIfAllowed()
