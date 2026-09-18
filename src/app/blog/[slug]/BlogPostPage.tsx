'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, RefreshCw, User } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import {
  AuthorBio,
  ClusterPillarLink,
  FAQSection,
  InlineServiceCTA,
  KeyTakeaways,
  ShareButtons,
  ShareButtonsMobile,
  SidebarCTA,
  SourcesList,
} from '@/components/blog'
import type { PillarRef } from '@/components/blog/ClusterPillarLink'
import { PadBreadcrumbs } from '@/components/pad/PadBreadcrumbs'
import { TearSlipLink } from '@/components/pad/TearSlipLink'
import { splitHtmlAtMiddleHeading } from '@/lib/blog-content'
import { PROSE_CLASSES } from '@/lib/prose'

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  // Pillar guides this post belongs to (a post can sit in two clusters)
  clusterPillars?: PillarRef[]
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso))

// Related posts are filed copies: stapled, dated and never stacked square.
const FILED_TILTS = ['-rotate-1', 'rotate-[0.6deg]', '-rotate-[0.4deg]', 'rotate-[0.5deg]', '-rotate-[0.8deg]']

export default function BlogPostPage({ post, relatedPosts, clusterPillars }: BlogPostPageProps) {
  // Use consistent URL for hydration - update on client after mount
  const [postUrl, setPostUrl] = useState(`https://www.itayost.com/blog/${post.slug}`)

  useEffect(() => {
    setPostUrl(window.location.href)
  }, [])

  // The reading progress rule: a printed pad rule that fills as you read.
  // Reduced motion keeps the rule but drops the spring, so it tracks the
  // scroll exactly instead of easing.
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const progress = prefersReducedMotion ? scrollYProgress : smoothed

  // Split the article so a CTA sits mid-read (null for short posts → one block).
  const contentParts = splitHtmlAtMiddleHeading(post.content)

  return (
    <div className="pad-world">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-16 z-40 h-1 origin-right bg-pad-red lg:top-20"
      />

      {/* The article's title strip */}
      <section aria-labelledby="post-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-24 sm:px-8 lg:pb-16 lg:pt-32">
          <PadBreadcrumbs homeLabel="דף הבית" items={[{ label: 'בלוג', href: '/blog' }, { label: post.title }]} />
          <div className="mt-6 flex flex-wrap items-start gap-x-5 gap-y-3">
            <h1
              id="post-heading"
              className="max-w-[22ch] font-pad-display text-[clamp(2.75rem,1.6rem+4vw,4.75rem)] font-bold leading-[0.92] [text-wrap:balance]"
            >
              {post.title}
            </h1>
            <span className="mt-2 rotate-[-4deg] border-2 border-pad-yellow px-2.5 pb-0.5 pt-1 font-pad-display text-xl font-bold leading-none text-pad-yellow">
              {post.category}
            </span>
          </div>

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-pad-carbon-ink/30 pt-4 text-pad-carbon-ink">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">מחבר</dt>
              <User aria-hidden="true" size={15} />
              <dd>
                <Link
                  href="/about"
                  className="font-bold text-white underline decoration-pad-yellow/50 decoration-2 underline-offset-4 hover:decoration-pad-yellow"
                >
                  {post.author}
                </Link>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">תאריך</dt>
              <Calendar aria-hidden="true" size={15} />
              <dd>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
            </div>
            {post.lastUpdated && (
              <div className="flex items-center gap-1.5 text-pad-yellow">
                <dt className="sr-only">עודכן</dt>
                <RefreshCw aria-hidden="true" size={15} />
                <dd>
                  עודכן: <time dateTime={post.lastUpdated}>{formatDate(post.lastUpdated)}</time>
                </dd>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">זמן קריאה</dt>
              <Clock aria-hidden="true" size={15} />
              <dd>{post.readTime}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* The page of the pad: body on the rules, margin beside it */}
      <div className="pad-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[17rem_minmax(0,36rem)] lg:gap-x-14 lg:py-20">
          <article className="relative min-w-0 lg:col-start-2">
            <span aria-hidden="true" className="absolute inset-y-0 -start-6 hidden w-px bg-pad-red/50 lg:block" />

            {post.description && (
              <p className="max-w-[60ch] border-b border-pad-rule pb-6 text-xl font-semibold leading-relaxed text-pad-ink sm:text-2xl">
                {post.description}
              </p>
            )}

            {/* TL;DR / answer-first summary (from frontmatter `tldr`) */}
            <KeyTakeaways items={post.tldr} />

            {/* Member-to-pillar backlink(s) for cluster posts */}
            <ClusterPillarLink pillars={clusterPillars} />

            {/* Article Content — split with a mid-article CTA when long enough */}
            {contentParts ? (
              <>
                <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: contentParts[0] }} />
                <InlineServiceCTA category={post.category} variant="compact" />
                <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: contentParts[1] }} />
              </>
            ) : (
              <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: post.content }} />
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-pad-rule pt-6">
                <h2 className="text-sm font-bold text-pad-red">תגיות</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag} className="border border-pad-red px-2 py-0.5 text-sm font-bold text-pad-red">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ + Sources (from frontmatter; mirror the JSON-LD) */}
            <FAQSection items={post.faq} />
            <SourcesList items={post.sources} />

            <InlineServiceCTA category={post.category} />
            <AuthorBio author={post.author} />

            <div className="mt-8 border-t border-pad-rule pt-6 lg:hidden">
              <ShareButtonsMobile url={postUrl} title={post.title} />
            </div>
          </article>

          {/* The margin: pinned in the margin itself, against the red rule */}
          <aside className="hidden lg:col-start-1 lg:row-start-1 lg:block">
            <div className="sticky top-28 space-y-6">
              <ShareButtons url={postUrl} title={post.title} />
              <SidebarCTA category={post.category} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related reading, filed on the pink copy */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-pad-pink">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 id="related-heading" className="font-pad-display text-5xl font-bold leading-none text-pad-ink">
              מאמרים קשורים
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <li key={relatedPost.slug}>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className={`pad-paper pad-sheet-shadow group relative flex h-full flex-col p-5 pb-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none ${
                      FILED_TILTS[index % FILED_TILTS.length]
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-1.5 start-8 z-10 h-2 w-10 rotate-[-6deg] border-2 border-b-0 border-[#8A8FA8] shadow-[0_1px_0_rgba(0,0,0,0.25)]"
                    />
                    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-pad-red/50 pb-2 text-sm">
                      <span className="font-bold text-pad-red">{relatedPost.category}</span>
                      <time dateTime={relatedPost.date} className="font-pad-display text-lg leading-none text-pad-red">
                        {formatDate(relatedPost.date)}
                      </time>
                    </div>
                    <h3 className="mt-4 font-pad-display text-3xl font-bold leading-none text-pad-ink">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-base leading-snug text-pad-ink-soft">{relatedPost.excerpt}</p>
                    <span className="mt-auto flex items-center gap-2 pt-5 text-base font-bold text-pad-carbon">
                      {relatedPost.readTime}
                      <ArrowLeft
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="post-close-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <h2 id="post-close-heading" className="font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl">
              רוצים לדבר על הפרויקט שלכם?
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-pad-carbon-ink">
              נשמח לעזור לכם להפוך את הרעיונות שלכם למציאות
            </p>
          </div>
          <TearSlipLink href="/contact">צור קשר</TearSlipLink>
        </div>
      </section>
    </div>
  )
}
