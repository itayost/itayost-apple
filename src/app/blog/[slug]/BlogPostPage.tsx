'use client'

import { BlogPost } from '@/lib/blog'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react'

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
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-brand-gray-600 hover:text-brand-blue">
              בית
            </Link>
            <span className="text-brand-gray-400">→</span>
            <Link href="/blog" className="text-brand-gray-600 hover:text-brand-blue">
              בלוג
            </Link>
            <span className="text-brand-gray-400">→</span>
            <span className="text-brand-gray-900 font-medium">{post.title}</span>
          </nav>
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
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple px-4 py-2 text-sm font-semibold text-white">
                <Tag size={16} />
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight text-brand-gray-900 sm:text-5xl lg:text-6xl"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex flex-wrap items-center gap-6 text-brand-gray-600"
            >
              <span className="flex items-center gap-2">
                <User size={18} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(post.date).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {post.readTime}
              </span>
            </motion.div>

            {/* Description */}
            {post.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12 text-xl leading-relaxed text-brand-gray-700"
              >
                {post.description}
              </motion.p>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-brand-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-brand-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-brand-gray-900 prose-strong:font-bold
                prose-ul:my-6 prose-ul:mr-6
                prose-ol:my-6 prose-ol:mr-6
                prose-li:text-brand-gray-700 prose-li:mb-2
                prose-code:text-brand-purple prose-code:bg-brand-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-brand-gray-900 prose-pre:text-brand-gray-100
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
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap gap-2"
              >
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-gray-100 px-4 py-2 text-sm text-brand-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-brand-gray-200 bg-brand-gray-50 py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-brand-gray-900">
                מאמרים קשורים
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="overflow-hidden rounded-2xl border border-brand-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="relative h-40 bg-gradient-to-br from-brand-blue to-brand-purple"></div>

                      <div className="p-6">
                        <span className="mb-3 inline-block rounded-full bg-brand-gray-100 px-3 py-1 text-xs font-semibold text-brand-gray-700">
                          {relatedPost.category}
                        </span>

                        <h3 className="mb-2 text-xl font-bold text-brand-gray-900 line-clamp-2">
                          {relatedPost.title}
                        </h3>

                        <p className="mb-4 text-brand-gray-600 line-clamp-2">
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
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple py-16 text-center lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
            רוצים לדבר על הפרויקט שלכם?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            בואו נדבר על איך אנחנו יכולים לעזור לכם להצליח
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-brand-blue transition-all hover:shadow-xl"
          >
            צור קשר
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
