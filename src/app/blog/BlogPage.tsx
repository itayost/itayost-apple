'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  Sparkles
} from 'lucide-react'
import { content } from '@/config/content'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

// Sample blog posts - replace with real data later
const blogPosts: any[] = [
  // Placeholder for future posts
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = Object.entries(content.blog.categories)

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
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
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              {content.blog.title}
              <span className="block mt-2 text-brand-blue">
                {content.blog.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto"
            >
              {content.blog.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-brand-gray-200">
        <div className="container mx-auto px-4">
          <div className="inline-flex flex-wrap gap-2 p-2 bg-brand-gray-100 rounded-full mx-auto justify-center">
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
      </section>

      {/* Blog Posts or Coming Soon */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          {blogPosts.length === 0 ? (
            // Coming Soon Message
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.div
                className="bg-white rounded-3xl p-12 shadow-lg"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <motion.div
                  className="w-24 h-24 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6"
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

                <h2 className="text-3xl font-bold text-brand-navy mb-4">
                  {content.blog.comingSoon.title}
                </h2>

                <p className="text-xl text-brand-gray-700 mb-8 leading-relaxed">
                  {content.blog.comingSoon.message}
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
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {content.blog.comingSoon.cta}
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: any, index: number) => (
                <motion.article
                  key={post.id}
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
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-brand-blue">
                      {/* Blog post image placeholder */}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-brand-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-brand-gray-700 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <motion.span
                        className="inline-flex items-center gap-1 text-brand-blue font-semibold"
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
      <section className="py-16 lg:py-24 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              רוצים תוכן בנושא מסוים?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
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
                className="inline-flex items-center gap-2 px-10 py-5 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
              >
                שלחו הצעה
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
