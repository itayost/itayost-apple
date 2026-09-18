---
version: 1
slug: "src-app-blog-slug-blogpostpage-tsx"
primary_target: "src/app/blog/[slug]/BlogPostPage.tsx"
related_targets: ["src/app/blog/BlogListingClient.tsx","src/app/guides/[slug]/GuidePage.tsx","src/app/guides/GuidesPage.tsx"]
---

# Surface brief: blog & guides

Scope: the article template (`src/app/blog/[slug]/BlogPostPage.tsx`, 27 posts), the guide template (`src/app/guides/[slug]/GuidePage.tsx`, 3 guides), and their indexes (`src/app/blog/BlogListingClient.tsx`, `src/app/guides/GuidesPage.tsx`). Visitor mode: Read. Extends the Carbon Order Pad world (DESIGN.md).

Audience: an owner searching a question (price, timeline, which technology, how to choose); often lands from Google and leaves after one answer.
Action: understand the answer, then reach the matching service or a conversation.
Proof: the article's own sources, the author line, the named client work behind the service links.
Constraints: keep every article's markdown rendering, heading ids, prose classes, RSS, JSON-LD (Article/HowTo/FAQ), breadcrumbs, canonical, reading time, categories, related posts, cluster links, share buttons, the inline service CTA and the sidebar CTA with their existing tracking; do not alter article copy.

## Direction contract

THESIS: The article is a page of the pad: the answer is written on the rules, and everything that is not the answer (takeaways, share, the service slip, sources) lives in the margin as notes and pinned slips. Refuses the boxed-card blog with a floating share bar.

OWN-WORLD: Inherits DESIGN.md: carbon strip for the title, paper body on the printed rules, red margin rule, red-labelled margin notes, pen-ticked takeaways, tear-off service slip, fine print for FAQ and sources, filed copies for related reading.

STORY: The reader finds the question, gets the short answer in the margin note, reads the body on the rules, checks sources, and takes the slip to the matching service.

FIRST VIEWPORT: Carbon strip: breadcrumbs, category stamp, article title in Karantina, date and reading time as a printed line. Immediately under it, on paper: the takeaways as a boxed pad note, then the ruled body column with the margin starting beside it.

SIGNATURE INTERACTION: A red reading-progress rule along the top of the page, printed like a pad rule; the margin slip stays pinned beside the body as it scrolls.

FORM: The Notebook Spread, dealt index 4 (lead) of the surface list; seed key d78b68f8.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
