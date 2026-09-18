---
version: 1
slug: "src-app-contact-contactpage-tsx"
primary_target: "src/app/contact/ContactPage.tsx"
related_targets: []
---

# Surface brief: contact page

Scope: `src/app/contact/ContactPage.tsx` (route `/contact`). Visitor mode: Persuade. Extends the established Carbon Order Pad world (DESIGN.md); no new world.

Audience: owner who decided to reach out, mostly on a phone.
Action: submit the two-field form (name, phone) to `/api/leads`; WhatsApp and phone one tap away beside it.
Proof: reply within an hour on workdays. No availability dates, no warranty or payment claims (removed 2026-09-17 pending confirmation).
Constraints: keep form validation, focus-on-error, noValidate rationale, form_start/form_submit/generate_lead events and location strings (`contact_page`, `contact_card`, `sidebar` replaced by `contact_card`), phone normalization, success reset.

## Direction contract

THESIS: The first viewport is the form. Headline and the two-field sheet share the carbon field; nothing to scroll for. Refuses the card-row-then-form-below contact page.

OWN-WORLD: Inherits DESIGN.md: carbon field, paper sheet with printed red double-rule header, form values written in ballpoint, yellow tear-slip send, square corners, red dashed focus.

STORY: Visitor reads "we talk, I reply within the hour", writes name and phone on the sheet, sends, and gets a pink carbon receipt of the request; or taps WhatsApp or phone instead.

FIRST VIEWPORT: Carbon field. Start side: form header strip, Karantina headline "בואו נדבר / על העסק שלכם", subtitle, reply stamp, WhatsApp / phone / email as filled form lines. End side: white paper sheet with "ספרו לי איך אני יכול לעזור", name and phone ruled lines, yellow send slip. Mobile: headline, then the sheet, then channels.

SIGNATURE INTERACTION: Sending turns the sheet's send slip into a pink carbon-copy receipt echoing the name and phone with a red "התקבל" stamp.

FORM: Form In The Hero, dealt index 4 of the re-rolled surface list (safer steer); seed key 317d8cb9, re-roll 1.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
