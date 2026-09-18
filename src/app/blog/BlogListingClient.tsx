'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { content } from '@/config/content'
import { BlogPost } from '@/lib/blog'
import { blogCategories } from '@/lib/blog-constants'
import { IndexSheet } from '@/components/pad/IndexSheet'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

interface BlogListingClientProps {
  posts: BlogPost[]
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso))

/** The blog as the pad's own index of articles: divider tabs, then ruled entries. */
export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Use centralized blog categories from lib/blog.ts
  const countFor = (categoryId: string) =>
    categoryId === 'all' ? posts.length : posts.filter((post) => post.category === categoryId).length

  // The four fullest categories, for the hero's index sheet
  const topCategories = blogCategories
    .filter((category) => category.id !== 'all')
    .map((category) => ({ ...category, count: countFor(category.id) }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all' ? posts : posts.filter((post) => post.category === selectedCategory)

  return (
    <div className="pad-world">
      <section aria-labelledby="blog-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-16 lg:pt-36">
          <div className="lg:col-span-7">
            <h1
              id="blog-heading"
              className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
            >
              {content.blog.title}
              <span className="block text-pad-yellow">{content.blog.subtitle}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
              {content.blog.description}
            </p>
          </div>

          {/* The pad's index sheet: what is filed under the tabs */}
          <IndexSheet
            title="תוכן הבלוג"
            className="lg:col-span-5 lg:rotate-[1.2deg]"
            rows={topCategories.map((category) => ({
              key: category.id,
              label: category.label,
              value: countFor(category.id),
            }))}
            total={{ label: 'סה״כ מאמרים', value: posts.length }}
          />
        </div>
      </section>

      {/* Divider tabs, sticky under the site header */}
      <div className="sticky top-16 z-30 border-b-[3px] border-double border-pad-red bg-pad-sheet lg:top-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5 pt-3 sm:px-8">
          <div
            role="group"
            aria-label="סינון מאמרים לפי קטגוריה"
            className="pad-scroll-x -mb-[3px] flex gap-1 overflow-x-auto"
          >
            {blogCategories.map((category) => {
              const isActive = selectedCategory === category.id
              const count = countFor(category.id)
              if (count === 0 && category.id !== 'all') return null
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex min-h-11 flex-shrink-0 items-center gap-2 border-2 border-b-0 px-4 pb-2 pt-2.5 text-base font-bold transition-colors ${
                    isActive
                      ? 'border-pad-red bg-pad-sheet text-pad-ink'
                      : 'border-pad-ink/20 bg-pad-sheet/60 text-pad-ink-soft hover:border-pad-ink/50 hover:text-pad-ink'
                  }`}
                >
                  {category.label}
                  <span className="font-pad-display text-lg leading-none text-pad-red">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section aria-label={content.blog.sectionLabel} className="pad-paper">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <h2 className="font-pad-display text-4xl font-bold text-pad-ink">{content.blog.comingSoon.title}</h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-lg text-pad-ink-soft">{content.blog.comingSoon.message}</p>
              <div className="mt-8 flex justify-center">
                <TearSlipLink href="/contact" groundColor="#FBFBF8">
                  {content.blog.comingSoon.cta}
                </TearSlipLink>
              </div>
            </div>
          ) : (
            <ul className="border-t-2 border-pad-ink">
              {filteredPosts.map((post) => (
                <li key={post.slug} className="border-b border-pad-rule">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-6 transition-colors hover:bg-pad-yellow/25"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <time dateTime={post.date} className="text-sm font-bold text-pad-red">
                        {formatDate(post.date)}
                      </time>
                      <span className="border border-pad-red px-1.5 text-sm font-bold text-pad-red">
                        {post.category}
                      </span>
                      <span className="text-sm text-pad-ink-soft">{post.readTime}</span>
                    </div>
                    <h2 className="mt-2 font-pad-display text-3xl font-bold leading-none text-pad-ink sm:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-[70ch] text-lg leading-snug text-pad-ink-soft">{post.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-base font-bold text-pad-carbon">
                      {content.blog.readMore}
                      <ArrowLeft
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
