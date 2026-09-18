---
version: 1
slug: "src-components-service-page-servicepageview-tsx"
primary_target: "src/components/service-page/ServicePageView.tsx"
related_targets: []
---

# Surface brief: service page template

Scope: one shared template for the 7 service routes (`/services/crm-systems`, `automations`, `web-development`, `landing-pages`, `mobile-apps`, `ecommerce`, `ui-ux-design`). Primary target `src/components/service-page/ServicePageView.tsx`; each `src/app/services/<slug>/*Page.tsx` renders it. Visitor mode: Persuade. Extends the Carbon Order Pad world (DESIGN.md).

Audience: owner who searched for this specific service, often comparing options and prices.
Action: reach Itay (the closing slip: WhatsApp, phone, email) or jump there from the hero.
Proof: real client copies linked to the service (`service.portfolio`), transparent process with durations, the service FAQ.
Constraints: all copy from `src/data/services.ts` unchanged (SEO); Service/FAQPage/HowTo JSON-LD unchanged; `service_view` on mount; `cta_click` from hero anchors (`service_hero`); WhatsApp from the close fires contact_click + whatsapp_click + generate_lead (`service_cta`); email fires contact_click (`service_cta`); `#contact` and `#portfolio` anchors kept, portfolio anchor guarded when a service has no work.

## Direction contract

THESIS: A service page that reads like a pad order for this one job: the promise and the action on carbon, then what's included, how it runs, real copies, the fine print, and a tear-off slip. Refuses the centered emoji hero plus icon-card grids.

OWN-WORLD: Inherits DESIGN.md: carbon hero, paper sections with ruled lines and red double rules, yellow process field, pink work field with stapled client copies, ballpoint ticks and durations, tear slips, square corners.

STORY: Visitor confirms this is the service they searched for, sees exactly what is included and how long each step takes, checks real client work, gets their price and time questions answered, and tears off the slip to talk to Itay.

FIRST VIEWPORT: Carbon field. Start side: pad breadcrumbs, service name as Karantina headline, tagline in yellow, description, primary tear slip to #contact with the reply stamp, secondary link to work. End side: a tilted paper order sheet titled with the service, listing the first included items as ticked lines. Mobile: headline, tagline, CTA, then the sheet.

SIGNATURE INTERACTION: The process as a printed schedule: each step is an order line with its duration written in ballpoint; FAQ entries open like folded fine print.

FORM: Service Landing, Pad-Built, dealt index 7 (lead) of the surface list; seed key 6af9b5d8.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
