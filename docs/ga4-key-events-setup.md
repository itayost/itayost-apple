# GA4 Key Events Setup

The site fires 7 custom GA4 events. To make them count as **conversions** in GA4 reports, each one has to be marked as a **key event** in the GA4 Admin UI. This is a one-time configuration step per event, done outside the codebase.

Until this is done, GA4's `conversions` metric will read **0** even though events are flowing in correctly — as observed in the 2026-04-19 weekly CRO report.

## Events being sent

All events are fired from `src/lib/analytics.ts` and captured by both GA4 and PostHog.

| Event name | When it fires | Fire from | Should be key event? |
|---|---|---|:---:|
| `generate_lead` | Contact form submit, WhatsApp button click, phone call click, newsletter signup | `ContactPage`, `WhatsAppButton`, `MobileWhatsAppBar`, `Footer` | ✅ Yes |
| `whatsapp_click` | WhatsApp button/link click | `WhatsAppButton`, `MobileWhatsAppBar`, `ContactPage` | ✅ Yes |
| `contact_click` | Phone/email/WhatsApp link click | `Navigation`, `Footer`, `ServiceCTA`, `ContactPage` | ✅ Yes |
| `cta_click` | Primary/secondary CTA button clicks | Service pages, landing sections | Optional |
| `service_view` | Service page mounted | `ServiceHero` (each service page) | No (engagement, not conversion) |
| `portfolio_click` | Portfolio item clicked | Portfolio sections | No |
| `outbound_click` | External link clicked | `Footer`, social links | No |

## How to mark an event as a key event in GA4

1. Open [analytics.google.com](https://analytics.google.com) and select the itayost.com property.
2. Bottom-left: click **Admin** (gear icon).
3. Under the Property column, click **Events**.
4. In the events table, find the event by name (e.g., `generate_lead`). If it isn't listed yet, trigger it once on the live site (submit the contact form, click WhatsApp) and wait up to 24 hours — or use DebugView for instant verification.
5. Toggle the **"Mark as key event"** switch to ON for that row.
6. Repeat for `whatsapp_click` and `contact_click`.

Changes take effect going forward — historical events from before you flagged the key event **will not** retroactively count as conversions. That's a GA4 limitation, not a site issue.

## Verifying it's working

**Option A — DebugView (fastest, real-time):**

1. In GA4 Admin → Property → **DebugView**.
2. On the site, open Chrome DevTools → Console, run:
   ```js
   window.gtag && window.gtag('set', { debug_mode: true })
   ```
   (Or install the [Google Analytics Debugger](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) extension.)
3. Trigger an event (submit the form, click WhatsApp). You should see it appear in DebugView within a few seconds, and if it's marked as a key event you'll see a small 🏁 icon next to it.

**Option B — Realtime report:**

1. GA4 → **Reports → Realtime**.
2. Scroll to the "Event count by Event name" card. You should see `generate_lead`, `whatsapp_click`, etc. populate as you or a tester clicks.

**Option C — Wait 24–48h and check the Conversions report:**

1. GA4 → **Reports → Engagement → Conversions** (may be labeled "Key events" in newer GA4 builds).
2. Events marked as key events will now appear as conversion rows with counts and totals.

## Lead value (nice to have)

`trackGenerateLead()` now sends `value` and `currency` parameters to GA4 so conversion value reports populate automatically. The default ILS estimates per lead method:

- `form` (full contact form): **₪250**
- `whatsapp`: **₪200**
- `phone`: **₪200**
- `newsletter`: **₪25**

These are conservative placeholders — edit `DEFAULT_LEAD_VALUE_ILS` in `src/lib/analytics.ts` as you learn what a qualified lead is actually worth, or pass a specific `value` per call site if different funnels warrant different values.

## Cross-checking with PostHog

PostHog autocapture is already treating these events as conversions inside the funnel dashboard (ID 569213). PostHog doesn't need a separate "key event" step — any captured event can be a funnel step.

If a GA4 number ever diverges from PostHog by more than ~5%, suspect:
- Ad blockers / tracking-protection browsers blocking `googletagmanager.com` but not `posthog.com` (PostHog uses its own domain pattern).
- Facebook in-app browser blocking GA4 beacons — ~42% of our mobile traffic lands from Facebook, so this is a real effect.
- A deployment that broke the gtag bootstrap in `app/layout.tsx`.
