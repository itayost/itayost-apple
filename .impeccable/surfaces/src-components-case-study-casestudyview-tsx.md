---
version: 1
slug: "src-components-case-study-casestudyview-tsx"
primary_target: "src/components/case-study/CaseStudyView.tsx"
related_targets: ["src/app/portfolio/PortfolioPage.tsx"]
---

# Surface brief: case study template

Scope: every `/portfolio/<slug>` route (10 projects). Primary target `src/components/case-study/CaseStudyView.tsx`, rendered by `src/app/portfolio/[slug]/page.tsx`. Visitor mode: Persuade (proof page). Extends the Carbon Order Pad world (DESIGN.md).

Audience: owner checking whether Itay has built something like what they need; high intent, often mobile.
Action: talk about a similar project (WhatsApp or contact form), or open the live site.
Proof: the real project screens, what was built (features), client, year, duration, category, technologies. No client quotes, ratings, review JSON-LD or performance numbers (PRODUCT.md, decided 2026-09-17).
Constraints: metadata, CreativeWork and BreadcrumbList JSON-LD kept (review node removed); outbound_click on the live link (`portfolio_detail`); WhatsApp fires whatsapp_click + generate_lead + cta_click `whatsapp_portfolio_cta` (`portfolio_detail`); contact link cta_click `contact_portfolio_cta`; null-link projects get a contact CTA in the hero slot (no dead space); `dynamicParams = false`.

## Direction contract

THESIS: The project told as a short story on pad paper: the screen leads, the reading column explains what was built, and the facts sit in the margin like printed side notes. Refuses the badge, big-image, stat-card case study.

OWN-WORLD: Inherits DESIGN.md: carbon strip, stapled screen plate crossing from carbon into paper, ruled reading column with red margin rule, margin notes as a dl with red labels, pen-ticked features, client copies for more projects, carbon closing slip.

STORY: Visitor recognises the project, sees the real screens, reads what problem it solved and what was built, checks client / year / duration / tech in the margin, and asks for something similar.

FIRST VIEWPORT: Carbon strip: pad breadcrumbs, project title in Karantina, subtitle in yellow, one-line description, hero slip (live site or talk to Itay) with the category stamped beside the title. The stapled desktop screenshot starts inside the fold and overlaps down into the paper; the pinned mobile screenshot was dropped during the build: each project's mobile image is a small landscape thumbnail (320x220), not a phone screen, so pinning one would show a shrunken desktop view.

SIGNATURE INTERACTION: The screen plate crosses the carbon/paper edge like a copy stapled onto the pad; margin notes stay pinned beside the reading column while it scrolls on desktop.

FORM: The Project Story, dealt index 6 (lead) of the surface list; seed key ca51654a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
