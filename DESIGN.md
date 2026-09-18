---
name: ItayOst
description: The Carbon Order Pad. The handwritten order pad every Israeli business runs on, re-issued as a system.
colors:
  carbon: "#2B3FD6"
  carbon-deep: "#1B2A9E"
  carbon-ink: "#C9D0FF"
  sheet: "#FBFBF8"
  pink-copy: "#F4C6D2"
  yellow-copy: "#F2DF6E"
  print-red: "#D7263D"
  ink: "#15161A"
  ink-soft: "#4A4C57"
  rule-blue: "#B9C6E8"
  ballpoint: "#1F2A8C"
  whatsapp-green: "#0F7A40"
  whatsapp-deep: "#0B5E31"
  board-line: "#3A3C46"
  board-text: "#C9CBD6"
  board-alert: "#FF8A98"
typography:
  display:
    fontFamily: "Karantina, Arial Narrow, sans-serif"
    fontSize: "clamp(4.25rem, 2.5rem + 4.5vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "0"
  headline:
    fontFamily: "Karantina, Arial Narrow, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0"
  title:
    fontFamily: "Karantina, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Assistant, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "tnum"
  article-body:
    fontFamily: "Assistant, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Assistant, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
  hand:
    fontFamily: "Playpen Sans Hebrew, cursive"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0px"
  focus: "2px"
spacing:
  section-y: "6rem"
  section-y-lg: "8rem"
  gutter: "1.25rem"
  gutter-sm: "2rem"
  pad-line: "2.5rem"
components:
  slip-primary:
    backgroundColor: "{colors.yellow-copy}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 20px 16px 24px"
    height: "3.5rem"
  button-carbon:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.sheet}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
  button-carbon-hover:
    backgroundColor: "{colors.carbon-deep}"
  button-outline-ink:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-outline-ink-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow-copy}"
  sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  nav-bar:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    height: "5rem"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
  input-newsletter:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input-form-line:
    textColor: "{colors.ballpoint}"
    typography: "{typography.hand}"
    rounded: "{rounded.none}"
    padding: "8px 4px"
  tab-divider:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 16px 8px"
    height: "2.75rem"
  tab-divider-active:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
  margin-index-item:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 0 8px 12px"
  margin-index-item-active:
    textColor: "{colors.ink}"
  stamp-carbon:
    textColor: "{colors.yellow-copy}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "6px 16px 4px"
  note-takeaways:
    backgroundColor: "rgba(242, 223, 110, 0.4)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 28px"
  receipt-carbon:
    backgroundColor: "{colors.pink-copy}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "20px 24px 24px"
---

# Design System: ItayOst

## Overview

**Creative North Star: "The Carbon Order Pad"**

The site is the duplicate order pad an Israeli small business actually runs on: a white original, pink and yellow carbon copies, red printed rules and form numbers, ballpoint scrawl on top and a clean pressed-through record underneath. Every surface is a pad part (a sheet, a numbered order line, a tear-off slip, a stapled filed copy, a signature line) laid on a drenched carbon-blue field. The world refuses the SaaS hero with a floating dashboard on a gradient and the faceless agency card grid.

Density is editorial and loud: very large condensed display type, generous section padding, long ruled lists instead of card grids. Paper carries a faint fibre texture, never a flat fill. Sheets sit slightly rotated with a soft paper shadow, so the page reads as physical stationery rather than interface chrome. Motion is almost absent; the one authored moment is the carbon lift in the hero, where one scroll-linked timeline peels the scrawled top sheet away to reveal the carbon copy.

Scope: the world covers every route, and the rollout is complete. The homepage (`src/app/page.tsx`), the global shell (navigation, footer, mobile WhatsApp bar, floating WhatsApp button, skip link), `/contact`, the `/services` index (numbered order lines, process as a ruled list on the pink copy) and its seven service pages (through `src/components/service-page/`), `/portfolio` and its case studies (`src/components/case-study/`), `/about`, `/clients` (the work log), `/faq` (the numbered fine print), the legal documents (`/privacy-policy`, `/terms`, on the shared document chassis), the reading surfaces (`/blog`, `/blog/[slug]`, `/guides`, `/guides/[slug]`, with the shared article typography in `src/lib/prose.ts`), every route-level loading state (`src/components/pad/PadLoading.tsx`) and all three error surfaces (`src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/blog/[slug]/error.tsx`). Each is wrapped in `.pad-world`. No `brand-*` or `apple-*` class is applied in any rendered component; Heebo is gone from `src/app/fonts.ts`, `globals.css` and the Tailwind `sans` stack, and `body` itself now carries the pad body face, so the pad face is the default even outside `.pad-world`.

**Key Characteristics:**
- Carbon-blue field, three paper stocks (white sheet, pink copy, yellow copy), red print, near-black ink.
- Three voices of type: printed form (Karantina), plain body (Assistant), ballpoint (Playpen Sans Hebrew).
- Square corners everywhere; form comes from rules, perforations, staples and rotation.
- Hebrew RTL first: logical start/end properties, the red margin rule on the inline-start side.
- Long reads are printed on the pad: one capped measure, a red margin rule, a margin column, filed copies.
- One scroll-linked timeline per page (carbon lift, or the reading-progress rule on an article); everything else is small hover lifts and reduced-motion safe.

## Colors

A drenched carbon field with paper stocks on top; color names are the pad's own materials, and each has a job.

### Primary
- **Carbon Blue** (carbon): the field. Hero and contact sections, the nav CTA, the mobile call button, carbon-impression text on the pink copy, and text links on paper (with a 30% underline that goes solid on hover).
- **Carbon Deep** (carbon-deep): the pad's binding strip and the hover/active state of carbon buttons.
- **Carbon Ink** (carbon-ink): secondary text and the printed form strip on the carbon field (about 5:1 on carbon).

### Secondary
- **Print Red** (print-red): printed rules, margin lines, form numbers, column headers, category tags, dates, the pen circle on the active nav item, focus outlines and scrollbar thumbs. Used on paper only (sheet about 4.9:1).

### Tertiary
- **Yellow Copy** (yellow-copy): the primary tear-off slip, the services section ground, the second headline line and form number on carbon, footer headings and icons.
- **Pink Copy** (pink-copy): the carbon copy sheet in the hero and the client-work section ground.

### Neutral
- **Sheet White** (sheet): the original sheet; nav bar, paper sections, filed client copies, the contact slip, the mobile bar. Always paired with the fibre texture when it is a surface.
- **Ink** (ink): body text on paper, the footer ground, signature lines and 2px form rules.
- **Soft Ink** (ink-soft): supporting text, taglines, meta.
- **Rule Blue** (rule-blue): the printed pad lines and list dividers on paper. Decoration only, never text.
- **Ballpoint** (ballpoint): handwriting ink for scrawl, signatures, pen ticks and filled-in form values.
- **WhatsApp Green** (whatsapp-green, Tailwind `pad-whatsapp`): WhatsApp actions only (mobile bar button, floating button), darkening to WhatsApp Deep (`pad-whatsapp-deep`, #0B5E31) on press/hover.
- **Board tokens** (`pad-board-line`, `pad-board-text`, `pad-board-alert`): the ink footer only. Divider rules, secondary link text, and the newsletter error text on the dark board.

### Named Rules
**The Red Stays On Paper Rule.** Print Red never sits directly on Carbon Blue (about 1.4:1). On the carbon field, printed rules, form numbers and stamps switch to Carbon Ink and Yellow Copy. A stamp on the carbon field is a Yellow Copy border and Yellow Copy label, never red: the 404's "בוטל" over the numeral and the error boundaries' "תקלה" both stamp in yellow.

**The Paper Stock Rule.** Section grounds rotate through the pad's stocks (carbon, sheet, yellow, pink, sheet, carbon, ink footer). No other background colors, no gradients, no glass.

## Typography

**Display Font:** Karantina (with Arial Narrow)
**Body Font:** Assistant (with system-ui, Segoe UI, Arial)
**Hand Font:** Playpen Sans Hebrew (with cursive)

**Character:** Karantina is the printed pad header, condensed and shouting; Assistant is the plain spoken Hebrew that explains; Playpen is the owner's ballpoint. Loaded via `next/font` in `src/app/fonts.ts`; Karantina and Assistant preload, Playpen never does (and carries no metric override, being decorative). These three are the only faces the site loads: Heebo is no longer loaded or referenced anywhere, and Tailwind's `sans` stack now resolves to the pad body face.

### Hierarchy
- **Display** (Karantina 700, clamp(4.25rem, 2.5rem + 4.5vw, 6rem), 0.88): the hero h1 only, balanced wrap, second line in Yellow Copy.
- **Headline** (Karantina 700, 3.75rem to 4.5rem, 0.9; person and contact titles go to 4.5rem to 6rem at 0.85): section h2s.
- **Title** (Karantina 700, 1.875rem to 2.25rem, 1): service names, client titles, step numbers (3rem), footer column heads, form headers and "No." form numbers (1.5rem to 1.875rem).
- **Body** (Assistant 400, 1.125rem to 1.25rem, 1.625, tabular numerals): intros capped at 34ch to 52ch; subtitles step to 600 weight at 1.25rem to 1.5rem.
- **Label** (Assistant 700, 1rem to 1.25rem): CTAs, links, form-line labels, nav items (600, 1.125rem).
- **Article body** (Assistant 400, 1.125rem, 1.9): long-form prose through the shared contract in `src/lib/prose.ts`; measure capped at 62ch, headings in Karantina at zero leading, paragraphs 1.5rem apart.
- **Hand** (Playpen 400, 1rem to 3rem): scrawled notes, pain lines, filled-in contact values, counts on the index sheet, signatures rotated -2deg to -3deg.

### Named Rules
**The Three Voices Rule.** Print speaks in Karantina, explanation in Assistant, the owner in Playpen. Handwriting is never used for a heading, a button label, running body copy or quoted matter; the pen is reserved for short authored notes, counts and signatures.

**The Tight Display Rule.** Display and headline line-height stays at or under 0.9 with zero letter-spacing; the condensed face earns its size.

**The 62ch Measure Rule.** Article prose carries `max-w-[62ch]` inside whatever column holds it, so the column never sets the measure. Measured on the shipped articles: about 69 Hebrew characters per line at 1440, and 43 to 45 at 390 where the viewport, not the cap, is the limit. Standalone reading blocks outside the contract (FAQ answers, intros, excerpts) cap at 60ch to 70ch.

## Layout

Containers are `max-w-7xl` for hero, client work, nav and footer, `max-w-6xl` for reading sections, centered, with a 1.25rem gutter that opens to 2rem from `sm`. Sections breathe at 6rem vertical padding, 8rem from `lg` (notes section 5rem / 6rem). Desktop composition is a 12-column grid: text on the inline-start side (5 columns), the pad or form on the inline-end side (7 columns). Mobile stacks headline and CTA first, then the pad at full width.

Lists replace card grids: pain lines, service order lines, process steps, work-log entries, FAQ clauses and notes are all full-width ruled rows (Rule Blue, Ink at 20% on the pink copy, or Print Red dividers). Client copies are the one grid: three lead copies at 4 columns each, then filed copies at 6/3/3; on mobile they become a horizontal snap scroller (82% width items, thin red scrollbar).

Reading surfaces use the same containers with their own measure: the index heroes are a 12-column grid (text on 7, the index sheet on 5), the listings drop to `max-w-5xl`, an article runs a two-column grid from `lg` (a 17rem margin column plus a 36rem text column, 3.5rem apart) and a pillar guide runs a single `max-w-3xl` column. Section rhythm on these pages is 3.5rem vertical padding, 5rem from `lg`.

The hero is `185vh` tall on desktop with a sticky `100svh` stage so the carbon lift can play; this requires `overflow-x: clip` (not `hidden`) on `main` and `section` in `src/styles/mobile-first.css`, since `hidden` creates a scroll container and breaks sticky. Desktop breakpoint for the lift is 1024px.

A legal document runs on its own chassis: a `max-w-6xl` two-column grid from `lg` (a 17rem margin column and a `minmax(0,36rem)` text column, 3.5rem apart, 3.5rem vertical padding and 5rem from `lg`), the body on the inline-end column against a printed Print Red rule running its full height (1px at 50%, `-start-6`), and the margin index pinned on the inline-start column at `top-28`. Below `lg` the margin column is hidden and divider tabs take over as the sticky jump strip. Every clause carries `scroll-mt-32` so a jump lands under the sticky header, and the clause bodies render through the shared prose contract.

### Named Rules
**The You Are Here Rule.** A document long enough to need a jump list must also say where the reader is. Both jump surfaces derive their active state from the same IntersectionObserver band (`src/hooks/useActiveSection.ts`, a band from 140px below the top to 35% up from the bottom) and mark it with `aria-current`, not colour alone.

**The Ruled List Rule.** Anything countable prints as a ruled list, never a card grid. This includes the sequences that usually become numbered cards: the seven service order lines, the six process steps and the work log.

### RTL conventions
- The document is `dir="rtl" lang="he"`. Use logical utilities only: `ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `inset-inline`, `text-start`.
- The red margin rule sits on the inline-start side (`start-12` on sheets; double rule at `start-4`/`start-5`, `sm:start-10`/`sm:start-11` on the pain-lines page), as on Hebrew pads.
- Forward arrows point left (`ArrowLeft`) and nudge further left (`-translate-x-1` to `-translate-x-2`) on hover.
- Latin form numbers, dates, phone and email are wrapped `dir="ltr"`.

## Elevation & Depth

Depth is physical stacking, not UI elevation: sheets rest on the field with one soft paper shadow, copies peek beneath each other with offsets, and rotations of 0.3deg to 1.5deg make them lie on a desk. Flat colored sections carry no shadow.

### Shadow Vocabulary
- **Paper rest** (`box-shadow: 0 1px 1px rgba(21,22,26,0.08), 0 12px 28px -10px rgba(10,20,80,0.45)`): every sheet, slip, filed copy and dropdown.
- **Header lift** (`box-shadow: 0 10px 24px -14px rgba(10,20,80,0.45)`): the nav bar once scrolled past 20px; the mobile bar uses the same shadow cast upward.
- **Lifting sheet** (`filter: drop-shadow(0 18px 22px rgba(8,14,70,0.55))`, fading with progress): the hero top sheet during the carbon lift.
- **Binding and staples** (`0 4px 8px rgba(0,0,0,0.35)`, `0 1px 0 rgba(0,0,0,0.25 to 0.4)`): the pad binding strip and metal staples only.

### Named Rules
**The Carbon Lift Rule.** One scroll-linked timeline per page and no more: the hero sheet lift on the homepage, the reading-progress rule on an article. Nothing else animates on its own. Under reduced motion both hero sheets render side by side, static.

**The Navy Shadow Rule.** Shadows are tinted toward the carbon field (rgba(10,20,80)), never neutral grey glows.

## Shapes

Corners are square (0px) on every surface, button, input and icon button; the only radius is 2px on the focus outline and the tiny status dot in the carbon record. Form language comes from print: double 3px rules (`border-double`) under form headers, 2px ink signature and header rules, 1px ruled dividers, dashed dividers on copies, a perforation row of punched 11px-spaced holes along the top edge of slips (holes filled with the color behind the slip), stamps with a 2px red border rotated -7deg, and hand-drawn SVG marks (pen circle, tick, arrow) in stroke only.

## Components

### Buttons
Tactile stationery, not pills.
- **Shape:** square (0px).
- **Primary, the tear-off slip:** Yellow Copy (or Sheet on yellow-free grounds) with Ink label, min height 3.5rem, perforated top edge, paper shadow, trailing left arrow, optional red "reply within an hour" stamp overlapping the top inline-end corner. Hover lifts -4px and rotates -1deg over 300ms `cubic-bezier(0.16,1,0.3,1)`, and a folded corner scales in at the bottom inline-end.
- **Carbon button:** solid Carbon Blue, white bold label; hover goes Carbon Deep with a -2px lift and -1deg tilt. Used for the nav CTA and the mobile menu CTA.
- **Ink outline:** 2px Ink border on yellow, inverts to Ink ground with Yellow label on hover.
- **Slip as submit (`TearSlipButton`):** the same slip style and props as `TearSlipLink` (shared class, `stamp`, `tone`, `icon`, `groundColor`, defaulting to Sheet since forms sit on paper). While sending, the arrow is replaced by a spinning loader icon and the label changes to the sending state; disabled shows a wait cursor at 80% opacity and suppresses the hover lift. Full width on mobile, auto from `sm`.
- **Text link:** bold, Carbon Blue on paper (underline at 30%, solid on hover) or white/ink with a Yellow or Red 2px underline at 6px offset.
- **Focus:** 2px dashed Print Red outline at 4px offset across `.pad-world` links and buttons.

### Chips
- **Style:** category and "example" tags are small bold Print Red text in a 1px red border, square, no fill.

### Cards / Containers
- **Filed client copy:** fibre-textured Sheet, paper shadow, slight tilt, a staple on the top inline-start side, dashed red header with "עותק לקוח" and a "No. 0148"-style number, bordered screenshot, Karantina title. Hover lifts -8px and straightens over 500ms; the image scales 1.03.
- **Internal padding:** 20px lead, 16px filed.

### Inputs / Fields
- **Style:** fibre-textured Sheet field with a 2px border, square, joined flush to a Yellow submit button (footer newsletter, on Ink).
- **Focus:** 4px Yellow ring on the Ink ground.
- **Filled form lines:** contact details render as a `dl` of red bold labels and ballpoint values on ruled lines.
- **Printed form line (writable):** a ruled row (1px Rule Blue bottom rule), stacked on mobile and a 7rem label column from `sm`. Label is Print Red Assistant bold with an `aria-hidden` asterisk and an `sr-only` required note. The input is transparent with no box: the value is written in the ballpoint face at 1.5rem in Ballpoint with a Carbon caret; the placeholder drops back to Assistant 1.125rem in Soft Ink, so hints read as print and entries as handwriting. Phone lines are `dir="ltr"` and end-aligned.
- **Form line focus:** 2px dashed Print Red outline at 4px offset plus a 2px Carbon underline.
- **Form line error:** a 2px Print Red underline that stays red while focused, `aria-invalid` with `aria-describedby`, and an inline Print Red bold message (0.875rem) led by a 15px alert icon. A send failure shows the same voice as a 2px red bordered block under the slip.

### Navigation
- **Bar:** Sheet white, 4rem tall (5rem from `lg`), fixed, closed by a printed double red rule along the bottom; Karantina "ITAYOST" wordmark with logo.
- **Items:** Assistant 600 at 1.125rem in Ink, Carbon on hover; the current page is circled in red ballpoint.
- **Services dropdown:** a paper sheet with a 4px carbon top edge, ruled rows that tint Yellow at 40% on hover, a yellow "all services" block.
- **Mobile:** a full-width paper sheet that drops from the top, rows in 2.25rem Karantina divided by Rule Blue, over a 60% Carbon scrim.

### Footer
Ink ground topped by a 12px Carbon band, huge Karantina wordmark, Yellow Karantina column heads over #3A3C46 dividers, #C9CBD6 links with a red underline on hover, square 44px social buttons.

### Mobile WhatsApp Bar
Below `sm`: a paper strip fixed to the bottom with a dashed red top edge and upward navy shadow, holding a full-width WhatsApp Green button and a square 48px Carbon call button; respects the safe-area inset.

### Carbon Receipt (success state)
The visitor's own carbon copy of the request, replacing the send slip after a successful submit. Pink Copy sheet with a perforated top edge (holes punched in Sheet), paper-rest shadow, resting at -1.5deg. Header is a dashed Carbon rule (2px at 40%) with a Karantina "copy" label and "No." form number; body is a `dl` echoing the sent name and phone in the ballpoint face; all carbon-impression text uses Carbon Blue with a faint ink bleed (`.pad-carbon-ink`). A red Karantina "received" stamp sits rotated over the top inline-end corner. It enters with a 600ms drop-and-settle on the expo ease, skipped under reduced motion, and carries `role="status"`.

### Channel Lines (on carbon)
Direct channels as filled form lines on the carbon field: a list divided by 1px Carbon Ink rules at 30%, each row at least 3.5rem tall with a 20px Yellow Copy icon, a fixed-width bold Carbon Ink label, and the value in bold white Assistant (1.125rem to 1.25rem) with a 2px Yellow Copy underline at 6px offset, 40% at rest and solid on hover. Phone and email values are `dir="ltr"`. Focus keeps the dashed outline but draws it in Yellow Copy, per the Red Stays On Paper Rule.

### Hours Strip and Numbered FAQ (on paper)
Below the carbon field, a full-width fibre-textured Sheet section. The hours strip is a `max-w-3xl` row, closed along its bottom by a 3px double Print Red rule: a Karantina Print Red title beside a three-column `dl` of Soft Ink days over bold tabular Ink times (`dir="ltr"`); on mobile the rows stack with Rule Blue dividers. The FAQ follows as a `dl` under a 2px Ink top rule, each item a Rule Blue ruled row with a large Print Red Karantina number in a 2.5rem column, a bold 1.5rem Ink question and a Soft Ink answer capped at 60ch. No accordions, no cards.

### Index Sheet (blog and guides hero)

The pad's own index of what is filed, set beside the h1 on the carbon field, and now one shared component (`src/components/pad/IndexSheet.tsx`) used by the blog and guides indexes only. A fibre-textured Sheet with the paper-rest shadow, tilted from `lg` and flat below, carrying a hairline Print Red margin rule at `start-4`. The head is Karantina (1.875rem) closed by a 3px double red rule; rows are a `dl` on 1px Rule Blue rules (last rule dropped), an Assistant bold term against its count written in the ballpoint face (1.25rem, Ballpoint). An optional total row sits above a Rule Blue top rule with both label and figure in Print Red (Karantina 1.875rem): the blog sheet carries it, the guides sheet does not. Every count is derived from the filed articles, never typed in.

### Divider Tabs

The pad's tabs, in two forms that share one look: the blog's category filter (stateful, local to `BlogListingClient`) and the shared section-jump strip (`src/components/pad/SectionTabs.tsx`, used by `/faq` and by the legal documents below `lg`). Both are a sticky strip on Sheet sitting under the site header (`top-16`, `top-20` from `lg`), closed by a 3px double Print Red rule that the active tab breaks through (`-mb-[3px]`). Each tab is a square, bottom-open 2px-bordered box at least 2.75rem tall holding an Assistant bold label and, when the count is real, its figure in Print Red Karantina. Active is a Print Red border on full Sheet; resting tabs are Ink at 20% on Sheet at 60% with Soft Ink text, darkening to Ink on hover. Empty categories are not rendered. The row scrolls horizontally on the world's thin red scrollbar (`.pad-scroll-x`).

The jump strip's tabs are plain `#id` anchors, so the jumps work before hydration and without JS; hydration only adds the scroll-spy active state and `aria-current="true"`.

### Margin Index

The long document's clauses listed in its margin (`src/components/pad/MarginIndex.tsx`), sticky at `top-28` on the inline-start column from `lg`. A Karantina head (1.5rem) on a 3px double red rule, then an ordered list on 1px Rule Blue rules; each row is at least 2.75rem tall with a zero-padded two-figure number in Karantina (`dir="ltr"`) beside the clause title. Resting rows are Soft Ink bold with a transparent inline-start border, going Carbon on hover. The clause being read is marked by the pen: a 2px Ballpoint rule down its inline-start edge, Ink text, and its number in full Print Red instead of Print Red at 50%. Active state also carries `aria-current`.

### Ruled Article List

Index listings are one full-width ruled list, never a card grid: a 2px Ink top rule, 1px Rule Blue dividers, each row a block link that tints Yellow Copy at 25% on hover. The row prints its meta first (Print Red date, a red-bordered category tag, Soft Ink read time), then the title in Karantina (1.875rem, 2.25rem from `sm`; guides step to 2.25rem / 3rem), a Soft Ink excerpt capped at 70ch, and a Carbon read-on label with a left arrow that nudges on hover.

### Article Title Strip

Every long read opens on the carbon field: breadcrumbs, then a Karantina h1 (clamp(2.75rem, 1.6rem + 4vw, 4.75rem), 0.92, balanced wrap, capped at 22ch) with a stamp rotated -4deg beside it, 2px Yellow Copy border and Yellow Copy Karantina label (the post's category, or the guide's kind). A printed meta line follows: a `dl` divided from the title by a 1px Carbon Ink rule at 30%, with 15px icons, the author as a white link underlined in Yellow Copy, and date, updated date and read time as plain Carbon Ink; an updated date is set in Yellow Copy. Labels are `sr-only`, values `dir`-correct.

### Reading Progress Rule

The article page's one scroll-linked timeline: a 4px Print Red rule fixed under the header (`top-16`, `top-20` from `lg`), scaled on the X axis from the inline-start origin (`origin-right` under RTL) by page scroll, smoothed through a spring (stiffness 120, damping 30). It is `aria-hidden` and carries no text or number.

### Article Prose (the shared contract)

All article HTML renders through one class contract (`PROSE_CLASSES` in `src/lib/prose.ts`), so a blog post and a pillar guide read identically. Karantina headings at zero leading (h2 2.25rem / 3rem closed by a 3px double Print Red rule, h3 1.875rem / 2.25rem, h4 1.5rem / 1.875rem); Assistant body at 1.125rem on 1.9 leading in Ink; Carbon links with a 30% underline going solid on hover; Print Red bold list markers; square Carbon-tinted inline code with a 20% Carbon border; an Ink code block; a Rule Blue `hr` at 3rem; images with a hairline Ink border and no radius. Blockquotes stay printed: Assistant at body size, semibold, not italic, no fill, behind a 2px Print Red margin rule (`border-s-2`, `ps-5`). The contract uses logical utilities only (`border-s`, `ps`, `ms`); physical sides never appear in it.

### Article Tables

Article tables keep their own width (`w-full` with `min-w-[34rem]`) and are never collapsed to fit. The markdown pipeline wraps each one in `.pad-table-scroll`, a 2rem-spaced overflow box with the world's thin Print Red scrollbar (6px track). The head is a 3px double red rule over Print Red bold start-aligned cells; body cells are ruled with 1px Rule Blue. No border box, no shadow, no radius.

### Margin Column

From `lg` the article body sits beside its margin: the margin column is pinned on the inline-start side against a printed Print Red rule that runs the full height of the article (1px at 50%, `-start-6`), and holds the share buttons and the margin slip, sticky at `top-28`. Below `lg` the margin is hidden and the share row moves under the article on a Rule Blue rule.

### Margin Slip and In-article Slips

In-article CTAs are pad slips, not banner cards: fibre Sheet, a perforated top edge punched in the Sheet ground, paper-rest shadow, resting at -1deg in the margin and -0.6deg in the body. A Karantina head over a 3px double red rule, a Yellow Copy action bar at least 3rem tall that lifts 2px over 300ms on hover, a WhatsApp Green action on the in-body version, and a Soft Ink service link under a 1px Rule Blue rule. The in-body slip appears once mid-read and once at the end.

### Takeaways Note

The answer-first summary is a note torn into the article: Yellow Copy at 40% inside a 2px Ink box, a Karantina head on a 3px double red rule, and each line ticked by a hand-drawn ballpoint tick overflowing a 1.25rem square Ink checkbox.

### Numbered Sources

Cited sources print as the page's fine print: a Print Red Karantina head (1.5rem) on a 3px double red rule, then an ordered list on 1px Rule Blue rules with the figure in Print Red Karantina in a 2rem column and a Carbon bold link carrying a 16px external-link mark.

### Article FAQ

In-article Q&A is a native `<details>` list on ruled rows (2px Ink top rule, 1px Rule Blue dividers), first row open, so the answers stay in the HTML without JS. The native marker is suppressed and replaced by a hand-drawn pen cross that turns when the row opens; the question is Ink bold at 1.125rem in a row at least 3.5rem tall, the answer Soft Ink at 1rem capped at 62ch. The standalone contact FAQ keeps its numbered, non-collapsing form.

### Reading Path (pillar guides)

A pillar guide's cluster prints as numbered order lines under a 3px double red rule: a Print Red Karantina figure in a 2.5rem column, the title with a two-line Soft Ink description, and the read time with a left arrow that nudges on hover. Rows tint Yellow Copy at 25% on hover. Never a card grid.

### Filed Copies (related reading)

Related articles are filed copies on the Pink Copy ground: fibre Sheet, paper-rest shadow, a metal staple at `start-8` rotated -6deg, a dashed Print Red header at 50% carrying the category and the article's real publication date in Print Red Karantina, a Karantina title (1.875rem) and a Soft Ink excerpt clamped to three lines, with the read time and left arrow pinned to the bottom. Each copy takes its tilt by index from a fixed five-step set (-1deg to 0.6deg) and straightens with a -8px lift over 500ms on the expo ease.

### Work Log (clients)

The clients page is the pad's work log: delivered projects grouped by year, newest first. The hero tally is pressed into the carbon field rather than printed on a paper sheet: a Yellow Copy Karantina head on a Carbon Ink rule at 40%, then a `dl` whose rows are a Carbon Ink field name, a hairline Carbon Ink leader rule at 25% filling the gap, and the count in white Karantina (1.5rem), closing on a total row with the figure in Yellow Copy Karantina (2.25rem). The log itself is on paper: each year opens with a Karantina year (3rem, `dir="ltr"`) beside a ballpoint count on a 3px double red rule, then one ruled line per project (`src/components/pad/WorkLogRow.tsx`) on a 12-column grid: the client in Karantina (1.875rem to 2.25rem), what was built in bold Ink with its subtitle in Soft Ink, the field as a red-bordered tag, and the duration in the ballpoint face with a left arrow that nudges on hover. The row tints Yellow Copy at 25% on hover. Every value on the page is derived from `src/data/portfolio.ts`.

### Numbered Fine Print (FAQ)

The FAQ page is the document's fine print: clauses filed under printed Karantina headings (2.25rem, 3rem from `lg`) on a 3px double red rule, inside a `max-w-3xl` column on Sheet. Each clause is a native `<details>` on a 1px Rule Blue rule; the summary is a `2.5rem / 1fr / 1.75rem` grid at least 4rem tall carrying a zero-padded number in Print Red Karantina, the question in Ink bold (1.125rem to 1.25rem) and the hand-drawn pen cross that turns when the row opens. Answers are Soft Ink on 1.9 leading, capped at 62ch and indented to the number column. Numbering runs continuously through the whole page, so no two rows share a number, and the first clause of the first section ships open. The hero prints the clause and section counts, both counted from the data. The standalone contact-page FAQ keeps its own numbered, non-collapsing form.

### Order Lines (services index)

The services index is what can be ordered: a ruled list under a 2px Ink top rule, one line per service, each a block link tinting Yellow Copy at 25% on hover. The line prints a zero-padded Print Red Karantina number (`dir="ltr"`) beside the service name in Karantina (2.25rem to 3rem), its tagline in Soft Ink, up to three features each pen-ticked with the hand-drawn `PenTick`, and a Carbon "details" label with a nudging left arrow. The process follows on the pink copy as a numbered ruled list (2px Ink top rule, Ink dividers at 20%): number, Karantina step title, Soft Ink description on one 12-column row. Neither is ever a card grid.

### Document Contact (how a document ends)

The foot of a legal document is a filled-in form, not another carbon band (`src/components/pad/DocumentContact.tsx`): a Sheet section opened by a 2px Ink top rule, a Karantina heading, a note capped at 54ch, then a `dl` under a second 2px Ink rule. Each line is a `7rem / 1fr` grid on a 1px Rule Blue rule: a Print Red bold label (0.875rem) led by a 14px icon, and the value written in the ballpoint face (1.5rem, Ballpoint) underlined at 30% and solid on hover, in a hit area at least 2.75rem tall. Email and phone values are `dir="ltr"`.

### Loading Form

Every route-level loading state renders the same empty form (`src/components/pad/PadLoading.tsx`): a `.pad-world` Sheet at least 70vh tall, a Print Red Karantina status line (2.25rem, `role="status" aria-live="polite"`), then six printed rules under a 2px Ink top rule, each carrying two Rule Blue blocks at 60% and 40% whose width steps down by 9% per line, so the form reads as ruled and waiting. No spinner, no skeleton cards, no shimmer.

### Error Surfaces

Errors are filed on the carbon field, never on paper. The 404 sets the form number itself in Yellow Copy Karantina (clamp(6rem, 4rem + 10vw, 12rem), 0.8, `dir="ltr"`) with a Yellow Copy stamp ("בוטל", 3px border, rotated -9deg) landing on the numeral, and puts the sheet that is still good beside it: a tilted index-sheet-style Sheet of ruled links. The error boundaries open on a smaller Yellow Copy stamp ("תקלה", 2px border, rotated -4deg) over a Karantina headline, a Yellow Copy retry button and a white link underlined in Yellow Copy; the development-only error text sits in a Carbon Deep box inside a Yellow Copy border at 60%.

### The Pad (signature)
The hero pad: a Carbon Deep binding with two staples holding the ruled chaos sheet (red inline-start margin, ballpoint notes at alternating -0.8deg/0.6deg, red strike-throughs and pen circles). One scroll-linked timeline rotates the sheet up to 104deg around its top edge, fading it and the binding out as it passes edge-on, to reveal a manager app underneath (`ManagerApp.tsx`, adapted from the 21st.dev Dashboard with Collapsible Sidebar). The app is laid out at a fixed canvas (1000x800 desktop with sidebar, 520x900 compact below a 520px frame) and scaled to fit, so it reads as a product shot; its cards play in once the lift passes 38%.

## Do's and Don'ts

### Do:
- **Do** build every new surface from pad parts: sheets, ruled order lines, tear-off slips, stapled copies, signature lines.
- **Do** put the fibre texture on every Sheet surface and the paper-rest shadow on anything that sits on a ground.
- **Do** switch printed rules to Carbon Ink and Yellow Copy when they sit on the carbon field.
- **Do** use logical start/end properties, left-pointing forward arrows, and the red margin rule on the inline-start side.
- **Do** mark authored demo UI as an example, in a red bordered tag.
- **Do** gate every hover lift and the carbon lift behind `motion-reduce` / `useReducedMotion`.
- **Do** render every article through the shared prose contract in `src/lib/prose.ts`, and keep its measure capped at 62ch inside whatever column holds it.
- **Do** let a wide article table keep its width and scroll inside `.pad-table-scroll` on the thin red scrollbar.
- **Do** print a real date on a filed copy of real content.
- **Do** derive every printed count, year, field and tally from the shipped data (`src/data/portfolio.ts` for the work log, the FAQPage JSON-LD object for the FAQ), so the page cannot outrun the record.
- **Do** mark the reader's place in any document long enough to need a jump list, in both the tabs and the margin index, with `aria-current`.
- **Do** stamp in Yellow Copy when the stamp lands on the carbon field.
- **Do** end a legal document on filled form lines; pages are allowed to end differently.
- **Do** render every route-level loading state as the printed empty form (`PadLoading`).

### Don't:
- **Don't** use rounded SaaS cards, pills, gradients, glass or emoji tiles.
- **Don't** put Print Red text directly on Carbon Blue.
- **Don't** add a second self-running or scroll-linked animation to a page that already has one.
- **Don't** set headings, buttons, running body copy or quoted matter in the ballpoint face; blockquotes are printed in Assistant behind the red rule.
- **Don't** use a physical-direction utility (`border-l`, `pl`, `ml`) in article typography; the contract is logical only.
- **Don't** shrink or collapse an article table to fit its column.
- **Don't** invent a serial or form number on a filed copy of a real article.
- **Don't** use `overflow-x: hidden` on a section or main that contains sticky content; use `clip`.
- **Don't** pull legacy `brand-*`, `apple-*`, `section-*` colors or Heebo into pad-world surfaces.
- **Don't** put a Print Red stamp, rule or figure on the carbon field; on carbon a stamp is Yellow Copy.
- **Don't** turn a countable sequence (services, process steps, work log, clauses) into a card grid.
- **Don't** publish a client quote, star rating or outcome percentage that the client has not confirmed in writing.
- **Don't** replace a loading state with a spinner, shimmer or skeleton cards.

## The Software Screen Exception

The hero's manager app is the only surface allowed to break the pad world: rounded corners (`rounded-xl` cards, `rounded-lg` icon tiles, round badges), a slate-50 canvas with white cards, lucide icons in soft tinted tiles (blue in Carbon, emerald, violet, orange, rose), and thin progress bars. The contrast is the point: paper chaos above, finished software beneath. It stays inside the hero pad, is `aria-hidden` with an `sr-only` summary, always carries the "דוגמה להמחשה" chip, and its data is synthetic: no real names, phone numbers or prices.
