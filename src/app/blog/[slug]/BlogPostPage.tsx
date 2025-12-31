'use client'

import { BlogPost } from '@/lib/blog'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import { BlogBreadcrumbs } from '@/components/common/Breadcrumbs'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  return (
    <main className="min-h-screen bg-white pt-20 lg:pt-24">
      {/* Breadcrumbs */}
      <section className="border-b border-brand-gray-200 bg-brand-gray-50 py-4">
        <div className="container mx-auto px-4">
          <BlogBreadcrumbs postTitle={post.title} />
        </div>
      </section>

      {/* Article Header */}
      <article className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.span
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5, ease: bouncyEasing }
                  }}
                >
                  <Tag size={16} />
                </motion.div>
                {post.category}
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="mb-6 text-4xl font-bold leading-tight text-brand-navy sm:text-5xl lg:text-6xl"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="mb-8 flex flex-wrap items-center gap-6 text-brand-gray-600"
            >
              <motion.span
                className="flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <User size={18} />
                {post.author}
              </motion.span>
              <motion.span
                className="flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Calendar size={18} />
                {new Date(post.date).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </motion.span>
              <motion.span
                className="flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Clock size={18} />
                {post.readTime}
              </motion.span>
            </motion.div>

            {/* Description */}
            {post.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: bouncyEasing }}
                className="mb-12 text-xl leading-relaxed text-brand-gray-700"
              >
                {post.description}
              </motion.p>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: bouncyEasing }}
              className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-brand-navy
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-brand-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-brand-navy prose-strong:font-bold
                prose-ul:my-6 prose-ul:mr-6
                prose-ol:my-6 prose-ol:mr-6
                prose-li:text-brand-gray-700 prose-li:mb-2
                prose-code:text-brand-purple prose-code:bg-brand-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-brand-navy prose-pre:text-brand-gray-100
                prose-blockquote:border-r-4 prose-blockquote:border-brand-blue prose-blockquote:pr-4 prose-blockquote:italic
                prose-img:rounded-xl prose-img:shadow-lg
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: bouncyEasing }}
                className="mt-12 flex flex-wrap gap-2"
              >
                {post.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.4,
                      ease: bouncyEasing
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2, ease: bouncyEasing }
                    }}
                    className="rounded-full bg-brand-gray-100 px-4 py-2 text-sm text-brand-gray-700 cursor-default"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-brand-gray-200 bg-section-light-blue py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: bouncyEasing }}
                className="mb-12 text-center text-3xl font-bold text-brand-navy"
              >
                מאמרים קשורים
              </motion.h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: bouncyEasing
                    }}
                    whileHover={{
                      y: -12,
                      transition: { duration: 0.3, ease: bouncyEasing }
                    }}
                    className="overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="relative h-40 bg-brand-blue"></div>

                      <div className="p-6">
                        <span className="mb-3 inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                          {relatedPost.category}
                        </span>

                        <h3 className="mb-2 text-xl font-bold text-brand-navy line-clamp-2">
                          {relatedPost.title}
                        </h3>

                        <p className="mb-4 text-brand-gray-700 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-brand-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(relatedPost.date).toLocaleDateString('he-IL')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {relatedPost.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-brand-blue py-16 text-center lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
              רוצים לדבר על הפרויקט שלכם?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              בואו נדבר על איך אנחנו יכולים לעזור לכם להצליח
            </p>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-semibold text-white shadow-2xl hover:shadow-3xl transition-shadow"
              >
                צור קשר
                <ArrowLeft size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
