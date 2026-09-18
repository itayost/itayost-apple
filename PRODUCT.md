# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Israeli small business owners (restaurants, real estate, academies, clinics, shops) who run the business on WhatsApp, Excel and memory, lose leads and hours to manual work, and want someone who will build a system that fits how they already work. Mostly Hebrew speakers, often arriving on mobile from Google search or a referral.

## Product Purpose
itayost.com is the ItayOst marketing site and lead engine. It exists to turn a visitor into a Lead (form submission, WhatsApp click, or phone click). Success is Organic Leads per month, not rankings (see CONTEXT.md).

## Positioning
One person, not an agency. The visitor talks directly, on WhatsApp, with the developer who builds their system. Systems first: custom CRM and automations that replace manual chaos; websites, landing pages, apps and maintenance are supporting services.

## Operating Context
- Visitors evaluate quickly on phones; WhatsApp is the natural contact channel.
- Contact form posts to `/api/leads`, proxied to the external CRM.
- GA4 funnel events (generate_lead, whatsapp_click, phone_click, form_start, form_submit, cta_click, etc.), PostHog autocapture, Clarity and Vercel Analytics are live and must keep firing.
- SEO clusters: Maintenance, CRM, Apps, Landing Pages. Existing URLs, metadata, JSON-LD and page copy are ranking assets.

## Capabilities and Constraints
- Next.js 15 App Router, TypeScript, Tailwind 3, Framer Motion, GSAP; deployed on Vercel from `main`.
- Hebrew RTL first (`dir="rtl"`, `lang="he"`); all content centralized in `src/config/content.ts`.
- Services: custom CRM systems, automations, custom software, web development, landing pages, e-commerce, mobile apps, UI/UX, maintenance.
- Redesign scope (2026-09-17): homepage and global shell (navigation, footer, WhatsApp bar) first; remaining pages roll out afterward. URLs, SEO copy and analytics events are preserved.

## Brand Commitments
- Name: ItayOst. Person: Itay Ostraich (איתי אוסטרייך), independent developer from Ramat Gan.
- Voice: plain Hebrew, no jargon, no surprises in the bill, does not disappear after launch.
- Phone 054-499-4417; wa.me links centralized in `src/lib/whatsapp.ts`.

## Evidence on Hand
- Confirmed for prominent use: reply within one hour; named client projects from `src/data/portfolio.ts` (Kitchen Optimizer, Lola Martin, The Fader Academy, Tal Nadlan, Shepes Group, Nes HaTamar, Garden of Eden, FutureKids, Amit EyeBrows, TA CRM, and others) with screenshots in `public/images/`.
- Not confirmed for prominent use: the "100+ systems / 50+ businesses / 5 years" figures and the testimonials / Google reviews section. Do not feature them in new design work until confirmed.
- Case studies (decided 2026-09-17): client quotes and the per-project review/rating JSON-LD stay hidden until each is confirmed with a real name and permission. Show only countable facts about what was built (roles, products, bundles, features, PWA, automated reminders); drop performance claims (percent lifts, ROI, conversion, traffic, uptime) until confirmed.
- Contact page (decided 2026-09-17): no availability dates; no warranty or installment-payment claims until confirmed.
- No invented metrics, logos, or quotes.

## Product Principles
1. Every surface moves the visitor one step closer to a conversation with Itay.
2. Show real work, not claims.
3. Lead with the business problem (manual chaos, lost leads), not the technology.
4. Hebrew and mobile are the primary experience, not an adaptation.
5. Never break what already earns: URLs, SEO copy, tracking.

## Accessibility & Inclusion
Hebrew RTL correctness, readable on low-end phones, respects reduced motion, WCAG AA contrast.
