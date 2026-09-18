---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/layout/Navigation.tsx","src/components/layout/Footer.tsx"]
---

# Surface brief: homepage + global shell

Scope: `src/app/page.tsx` homepage and the global shell (Navigation, Footer, MobileWhatsAppBar, WhatsAppButton). Other routes inherit the shell now and get their own rollout later.
Visitor mode: Persuade.

Audience: Israeli small business owner running on WhatsApp, Excel and memory, often on a phone.
Job: recognise their own mess, believe one person can turn it into a system, start a conversation.
Action: primary `/contact` ("בואו נדבר, אחזור אליכם תוך שעה"), WhatsApp and phone always one tap away.
Proof: reply within an hour; named real client projects with screenshots (systems first: Garden of Eden, Amit EyeBrows, TA CRM, Kitchen Optimizer). Authored demo system UI labeled as an example. No 50+/100+ figures, no testimonials until confirmed.
Constraints: preserve URLs, metadata/JSON-LD, every analytics call and its location strings, Hebrew RTL, reduced motion.

## Direction contract

THESIS: The handwritten order pad every Israeli business runs on, re-issued as a system. Refuses the SaaS hero with a floating dashboard on a gradient and the faceless agency grid.

OWN-WORLD: Carbon-blue drenched field (#2B3FD6) holding stacked duplicate sheets: white original, pink and yellow copies. Red printed rules, margin lines and form numbers (#D7263D). Ink #15161A. Karantina printed-form display, Assistant body, Playpen Sans Hebrew as ballpoint. Components are pad parts: sheets, numbered order lines, tear-off slips with perforation, carbon impressions, a signature line. No rounded SaaS cards, no gradients, no glass, no emoji tiles.

STORY: The visitor sees their own chaos scrawled on the top sheet, watches the carbon copy underneath come out as a clean system record, reads the pain-to-fix order lines, checks real client copies, and tears off the slip to talk to Itay directly.

FIRST VIEWPORT: Full-bleed carbon-blue field. Start side (right): order-pad form header strip with form number, huge Karantina headline "נהלו את העסק / בלי בלאגן", subtitle, primary tear-off slip CTA to /contact with the one-hour promise, secondary link to /portfolio. End side (left): a slightly rotated pad; top white sheet scrawled with real-feeling owner chaos in ballpoint; beneath, the carbon copy showing the same entries as a tidy leads record labeled "דוגמה". Mobile: headline and CTA first, pad below at full width.

SIGNATURE INTERACTION: Carbon lift. One scroll-linked timeline peels the scrawled top sheet away to reveal the clean carbon copy; nothing else animates on its own. Reduced motion shows both sheets side by side, static.

FORM: The Carbon Order Pad, position 1 on my ordered list (chosen as IMPECCABLE'S PICK over the rolled Till Tape); seed key 5ffd9f67.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Recorded adaptations
- Hero form strip: the printed double rules and form number render in carbon-ink and yellow on the carbon field instead of red, because red #D7263D on carbon #2B3FD6 is about 1.4:1 contrast. Red printed rules stay on every paper surface (sheets, forms, slip).
- Client screens: legible crops of real screenshots live in public/images/pad/ (no stand-ins).

## Unresolved
- Testimonials section and 50+/100+ claims removed from homepage pending user confirmation.
