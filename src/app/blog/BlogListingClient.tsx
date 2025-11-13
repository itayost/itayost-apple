'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowLeft, Sparkles } from 'lucide-react'
import { content } from '@/config/content'
import { BlogPost } from '@/lib/blog'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

interface BlogListingClientProps {
  posts: BlogPost[]
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = Object.entries(content.blog.categories)

  // Filter posts by category
  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter(post => post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span className="text-base font-bold text-brand-blue">
                  {content.blog.sectionLabel}
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="mb-6 text-4xl font-bold text-brand-navy md:text-5xl lg:text-7xl"
            >
              {content.blog.title}
              <span className="mt-2 block text-brand-blue">
                {content.blog.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="mx-auto max-w-3xl text-xl sm:text-2xl text-brand-gray-700"
            >
              {content.blog.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-brand-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Desktop: Centered tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex gap-2 p-2 bg-brand-gray-100 rounded-full">
              {categories.map(([key, label]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === key
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-navy'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile: Scrollable tabs */}
          <div
            className="sm:hidden overflow-x-auto -mx-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-2 p-2 bg-brand-gray-100 rounded-full mx-4" style={{ width: 'max-content' }}>
              {categories.map(([key, label]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === key
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-navy'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-section-light-blue py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            // No Posts Message
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mx-auto max-w-2xl text-center"
            >
              <motion.div
                className="rounded-3xl bg-white p-12 shadow-lg"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <motion.div
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-blue"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <BookOpen size={48} className="text-white" />
                </motion.div>

                <h2 className="mb-4 text-3xl font-bold text-brand-navy">
                  אין מאמרים בקטגוריה זו
                </h2>

                <p className="mb-8 text-xl text-brand-gray-700 leading-relaxed">
                  בחר קטגוריה אחרת או חזור לכל המאמרים
                </p>

                <motion.button
                  onClick={() => setSelectedCategory('all')}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-4 font-semibold text-white shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  כל המאמרים
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
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
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-brand-blue"></div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-sm text-brand-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString('he-IL')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-brand-navy line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mb-4 text-brand-gray-700 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <motion.span
                        className="inline-flex items-center gap-1 font-semibold text-brand-blue"
                        whileHover={{ x: -3 }}
                        transition={{ duration: 0.2, ease: bouncyEasing }}
                      >
                        {content.blog.readMore}
                        <ArrowLeft size={16} />
                      </motion.span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white lg:text-5xl">
              רוצים תוכן בנושא מסוים?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl sm:text-2xl text-white/90 leading-relaxed">
              ספרו לנו איזה נושאים מעניינים אתכם ונכין עבורכם תוכן איכותי
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
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-10 py-5 font-semibold text-white text-lg shadow-2xl hover:shadow-3xl transition-shadow"
              >
                שלחו הצעה
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
