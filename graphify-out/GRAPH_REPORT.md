# Graph Report - itayost-apple  (2026-08-01)

## Corpus Check
- 202 files · ~245,770 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 833 nodes · 1565 edges · 70 communities (41 shown, 29 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `603e3479`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lib/analytics.ts
- services.ts
- BlogPostPage.tsx
- devDependencies
- compilerOptions
- Services.tsx
- ga4/route.ts
- crm.ts
- SEOConfig
- blog.ts
- posthog/route.ts
- layout.tsx
- guides.ts
- guides/[slug]/page.tsx
- blog/[slug]/page.tsx
- rules
- useAppleScrollEffects.ts
- validate-seo.js
- app-store-upload-guide-2025.md
- seo.ts
- dependencies
- rss.xml/route.ts
- optimize-images.js
- types/index.ts
- llms-full.txt/route.ts
- statistics.ts
- portfolio-images.ts
- cn.ts
- react-native-vs-native-2025.md
- googleapis
- gray-matter
- gsap
- @gsap/react
- lucide-react
- next.config.js
- posthog-js
- posthog-node
- @radix-ui/react-icons
- react
- react-dom
- react-intersection-observer
- rehype-sanitize
- rehype-slug
- remark
- remark-gfm
- remark-rehype
- sharp
- tailwind-merge
- @tailwindcss/typography
- @vercel/analytics
- @vercel/speed-insights
- web-vitals
- zod
- בונה אתרים עם AI או מפתח מקצועי? מדריך החלטה ל-2026
- portfolio/[slug]/page.tsx
- ClientsPage.tsx
- portfolio.ts
- itayost.com Marketing Site
- clsx

## God Nodes (most connected - your core abstractions)
1. `bouncyEasing` - 30 edges
2. `trackGenerateLead()` - 26 edges
3. `buildWhatsAppUrl()` - 25 edges
4. `trackWhatsAppClick()` - 24 edges
5. `trackCtaClick()` - 22 edges
6. `SEOConfig` - 18 edges
7. `getAllPosts()` - 18 edges
8. `compilerOptions` - 18 edges
9. `getServiceBySlug()` - 17 edges
10. `JsonLd()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `getAllPosts()`  [EXTRACTED]
  src/app/page.tsx → src/lib/blog.ts
- `LatestBlogPostsProps` --references--> `BlogPost`  [EXTRACTED]
  src/components/common/LatestBlogPosts.tsx → src/lib/blog.ts
- `getGuideBySlug()` --calls--> `markdownToHtml()`  [EXTRACTED]
  src/lib/guides.ts → src/lib/markdown.ts
- `GET()` --calls--> `authenticateAnalyticsRequest()`  [EXTRACTED]
  src/app/api/analytics/posthog/route.ts → src/lib/analytics-auth.ts
- `BlogListingClientProps` --references--> `BlogPost`  [EXTRACTED]
  src/app/blog/BlogListingClient.tsx → src/lib/blog.ts

## Import Cycles
- None detected.

## Communities (70 total, 29 thin omitted)

### Community 0 - "lib/analytics.ts"
Cohesion: 0.05
Nodes (75): AboutPage(), achievements, skills, technologies, values, ContactPage(), FormData, additionalFAQs (+67 more)

### Community 1 - "services.ts"
Cohesion: 0.06
Nodes (54): AutomationsPage(), metadata, CRMSystemsPage(), metadata, EcommercePage(), metadata, LandingPagesPage(), metadata (+46 more)

### Community 2 - "BlogPostPage.tsx"
Cohesion: 0.10
Nodes (24): BlogPostPage(), BlogPostPageProps, GuidePageProps, ArticleCalloutCompact(), ClusterPillarLink(), ClusterPillarLinkProps, PillarRef, FAQItem (+16 more)

### Community 3 - "devDependencies"
Cohesion: 0.05
Nodes (43): autoprefixer, eslint, eslint-config-next, eslint-config-prettier, @next/bundle-analyzer, devDependencies, autoprefixer, eslint (+35 more)

### Community 4 - "compilerOptions"
Cohesion: 0.05
Nodes (42): dom, dom.iterable, ES2022, next-env.d.ts, .next/types/**/*.ts, node_modules, ./src/components/*, ./src/config/* (+34 more)

### Community 5 - "Services.tsx"
Cohesion: 0.17
Nodes (12): CardCarousel(), cardCarouselItemClass, cardCarouselItemClass4Up, CardCarouselProps, LatestBlogPosts(), LatestBlogPostsProps, colorMap, defaultColors (+4 more)

### Community 6 - "ga4/route.ts"
Cohesion: 0.12
Nodes (32): computeCROSignals(), dynamic, formatDate(), formatGSCRows(), formatOverviewMetrics(), formatRows(), GET(), AnalyticsClient (+24 more)

### Community 7 - "crm.ts"
Cohesion: 0.11
Nodes (21): POST(), submitLeadToCRM(), truncate(), getPostHogServer(), RateLimitEntry, RateLimiter, vitalsRateLimiter, ContactPageForm (+13 more)

### Community 8 - "SEOConfig"
Cohesion: 0.09
Nodes (17): metadata, metadata, metadata, Contact, HomePage(), metadata, Portfolio, Services (+9 more)

### Community 9 - "blog.ts"
Cohesion: 0.18
Nodes (15): BlogListingClientProps, BlogPost, calculateReadTime(), blogCategories, BlogCategory, getAllPosts(), getAllPostSlugs(), getFeaturedPosts() (+7 more)

### Community 10 - "posthog/route.ts"
Cohesion: 0.28
Nodes (15): AI_ENGINE_DOMAINS, GET(), getAiReferrers(), getAutoCapture(), getBehaviorSignals(), getConfig(), getConversionFunnel(), getEventBreakdown() (+7 more)

### Community 11 - "layout.tsx"
Cohesion: 0.15
Nodes (9): heebo, metadata, viewport, MicrosoftClarity(), MotionProvider(), SkipNavigation(), sendToAnalytics(), WebVitals() (+1 more)

### Community 12 - "guides.ts"
Cohesion: 0.19
Nodes (14): GuideCard, GuidesPage(), metadata, Page(), GET(), revalidate, sitemap(), portfolioData (+6 more)

### Community 13 - "guides/[slug]/page.tsx"
Cohesion: 0.18
Nodes (7): dynamicParams, PageProps, ClusterId, clusters, getClusterByPillarSlug(), getClustersForPost(), TopicCluster

### Community 14 - "blog/[slug]/page.tsx"
Cohesion: 0.19
Nodes (7): BlogListingClient(), metadata, Page(), dynamicParams, PageProps, getRelatedPosts(), toSchemaDate()

### Community 15 - "rules"
Cohesion: 0.18
Nodes (10): extends, rules, @next/next/google-font-preconnect, @next/next/no-img-element, react-hooks/exhaustive-deps, react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars (+2 more)

### Community 17 - "validate-seo.js"
Cohesion: 0.43
Nodes (7): colors, fs, log(), main(), path, validateMetaTags(), validateStructuredData()

### Community 18 - "app-store-upload-guide-2025.md"
Cohesion: 0.04
Nodes (47): 1. בדקו לפני שמעלים, 2. צילומי מסך איכותיים, 3. כתבו תיאור שמוכר, 4. ענו מהר לצוות הבדיקה, 5. התכוננו לדחייה, App Store Optimization (ASO) - טיפים בסיסיים, Apple App Store, Google Play (+39 more)

### Community 19 - "seo.ts"
Cohesion: 0.33
Nodes (6): META_DESCRIPTION_MAX, META_DESCRIPTION_MIN, PageSlug, SERP_TITLE_MAX, SITE_TITLE_SUFFIX, LEGACY_LONG_TITLES

### Community 20 - "dependencies"
Cohesion: 0.29
Nodes (7): framer-motion, next, dependencies, framer-motion, next, rehype-stringify, rehype-stringify

### Community 21 - "rss.xml/route.ts"
Cohesion: 0.38
Nodes (6): RFC-2822, RFC-7231, escapeXml(), GET(), revalidate, toRfc2822()

### Community 22 - "optimize-images.js"
Cohesion: 0.38
Nodes (6): IMAGES_DIR, main(), optimizeImage(), path, sharp, SIZES

### Community 23 - "types/index.ts"
Cohesion: 0.29
Nodes (6): ContactFormData, NavigationItem, PortfolioItem, Service, SocialLink, Testimonial

### Community 24 - "llms-full.txt/route.ts"
Cohesion: 0.40
Nodes (5): GET(), POSTS_DIR, RawPost, readAllPosts(), revalidate

### Community 25 - "statistics.ts"
Cohesion: 0.33
Nodes (3): StatCategory, Statistic, statistics

### Community 28 - "react-native-vs-native-2025.md"
Cohesion: 0.05
Nodes (43): "Native תמיד עדיף", "React Native איטי", React Native - מה זה ולמה זה פופולרי?, איך להחליט? 5 שאלות קריטיות, אפליקציה מלאה, אפליקציית MVP (מינימלית), "אפליקציית React Native נראית לא Native", ✅ בחרו Native אם: (+35 more)

### Community 64 - "בונה אתרים עם AI או מפתח מקצועי? מדריך החלטה ל-2026"
Cohesion: 0.10
Nodes (19): 62% נכשלים ב-SEO מקומי, 80% מהאתרים נראים אותו דבר, אין לוגיקה עסקית, בונה אתרים עם AI או מפתח מקצועי? מדריך החלטה ל-2026, דוגמאות מפרויקטים שלי, הכלים המובילים ומחיריהם, השוואה מהירה, השוואת עלויות (+11 more)

### Community 65 - "portfolio/[slug]/page.tsx"
Cohesion: 0.14
Nodes (9): dynamicParams, PageProps, ProjectHeroCta(), ProjectHeroCtaProps, BlogBreadcrumbs(), BreadcrumbItem, BreadcrumbsProps, PortfolioBreadcrumbs() (+1 more)

### Community 66 - "ClientsPage.tsx"
Cohesion: 0.25
Nodes (6): ClientsPage(), industryIcons, stats, testimonials, metadata, testimonials

### Community 67 - "portfolio.ts"
Cohesion: 0.28
Nodes (4): metadata, Page(), getAllPortfolioSorted(), PortfolioItem

## Knowledge Gaps
- **326 isolated node(s):** `Language`, `השוואה מהירה`, `מה AI עושה מצוין`, `הכלים המובילים ומחיריהם`, `80% מהאתרים נראים אותו דבר` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `bouncyEasing` connect `lib/analytics.ts` to `portfolio/[slug]/page.tsx`, `BlogPostPage.tsx`, `ClientsPage.tsx`, `services.ts`, `Services.tsx`, `blog.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `SEOConfig` connect `SEOConfig` to `lib/analytics.ts`, `services.ts`, `ClientsPage.tsx`, `portfolio.ts`, `layout.tsx`, `guides.ts`, `guides/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `seo.ts`, `rss.xml/route.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `JsonLd()` connect `SEOConfig` to `portfolio/[slug]/page.tsx`, `ClientsPage.tsx`, `portfolio.ts`, `services.ts`, `guides.ts`, `guides/[slug]/page.tsx`, `blog/[slug]/page.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `Language`, `השוואה מהירה`, `מה AI עושה מצוין` to the rest of the system?**
  _326 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `lib/analytics.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05368671423717295 - nodes in this community are weakly interconnected._
- **Should `services.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05877742946708464 - nodes in this community are weakly interconnected._
- **Should `BlogPostPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09841269841269841 - nodes in this community are weakly interconnected._