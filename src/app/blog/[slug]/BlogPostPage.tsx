'use client'

import { BlogPost } from '@/lib/blog'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import { BlogBreadcrumbs } from '@/components/common/Breadcrumbs'
import { ShareButtons, ShareButtonsMobile, SidebarCTA } from '@/components/blog'

const bouncyEasing = [0.34, 1.56, 0.64, 1]

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const postUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://www.itayost.com/blog/${post.slug}`

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24">
        {post.image ? (
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Title overlay on image */}
            <div className="absolute bottom-0 inset-x-0 p-6 lg:p-12">
              <div className="container mx-auto">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: bouncyEasing }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-4"
                >
                  <Tag size={14} />
                  {post.category}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: bouncyEasing }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl"
                >
                  {post.title}
                </motion.h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-brand-blue via-brand-purple to-brand-orange py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: bouncyEasing }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-6"
              >
                <Tag size={14} />
                {post.category}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: bouncyEasing }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-4xl"
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        )}
      </section>

      {/* Breadcrumbs & Meta */}
      <section className="border-b border-brand-gray-200 bg-brand-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <BlogBreadcrumbs postTitle={post.title} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm text-brand-gray-600"
            >
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-[1fr,280px] lg:gap-12 xl:gap-16">
            {/* Article Content */}
            <article className="max-w-none">
              {/* Description */}
              {post.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: bouncyEasing }}
                  className="mb-10 text-xl lg:text-2xl leading-relaxed text-brand-gray-700 font-medium"
                >
                  {post.description}
                </motion.p>
              )}

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-brand-navy
                  prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-brand-gray-200
                  prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-brand-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-brand-blue prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-brand-navy prose-strong:font-bold
                  prose-ul:my-6 prose-ul:mr-6
                  prose-ol:my-6 prose-ol:mr-6
                  prose-li:text-brand-gray-700 prose-li:mb-2 prose-li:marker:text-brand-blue
                  prose-code:text-brand-purple prose-code:bg-brand-purple/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-brand-navy prose-pre:text-brand-gray-100 prose-pre:rounded-2xl
                  prose-blockquote:border-r-4 prose-blockquote:border-brand-blue prose-blockquote:pr-6 prose-blockquote:italic prose-blockquote:bg-brand-blue/5 prose-blockquote:py-4 prose-blockquote:rounded-l-xl
                  prose-img:rounded-2xl prose-img:shadow-xl
                  prose-table:border-collapse prose-th:bg-brand-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-brand-gray-200
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: bouncyEasing }}
                  className="mt-12 pt-8 border-t border-brand-gray-200"
                >
                  <h3 className="text-sm font-semibold text-brand-gray-600 mb-4">תגיות</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-gray-100 px-4 py-2 text-sm font-medium text-brand-gray-700 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Mobile Share Buttons */}
              <div className="lg:hidden mt-8 pt-8 border-t border-brand-gray-200">
                <ShareButtonsMobile url={postUrl} title={post.title} />
              </div>
            </article>

            {/* Sticky Sidebar - Desktop Only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <ShareButtons url={postUrl} title={post.title} />
                <SidebarCTA />

                {/* Tags in sidebar */}
                {post.tags && post.tags.length > 0 && (
                  <div className="rounded-2xl bg-brand-gray-50 p-5">
                    <h3 className="text-sm font-semibold text-brand-gray-600 mb-3">תגיות</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-brand-gray-600 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-brand-gray-200 bg-section-light-blue py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: bouncyEasing }}
              className="mb-10 text-center text-2xl lg:text-3xl font-bold text-brand-navy"
            >
              מאמרים קשורים
            </motion.h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: bouncyEasing
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.25, ease: bouncyEasing }
                  }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    {/* Image or gradient */}
                    <div className="relative h-44 overflow-hidden">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-orange" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Category badge */}
                      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-brand-navy">
                        {relatedPost.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-bold text-brand-navy line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {relatedPost.title}
                      </h3>

                      <p className="mb-4 text-sm text-brand-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-brand-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(relatedPost.date).toLocaleDateString('he-IL')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {relatedPost.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-purple py-16 lg:py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: bouncyEasing }}
          >
            <h2 className="mb-4 text-2xl lg:text-4xl font-bold text-white">
              רוצים לדבר על הפרויקט שלכם?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
              נשמח לעזור לכם להפוך את הרעיונות שלכם למציאות
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: bouncyEasing }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand-blue shadow-xl hover:shadow-2xl transition-shadow"
              >
                צור קשר
                <ArrowLeft size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
