'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft
} from 'lucide-react'
import { content } from '@/config/content'

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
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-apple-blue/10 backdrop-blur-xl rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-apple-blue" />
              <span className="text-sm font-medium text-apple-blue">
                {content.blog.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6"
            >
              {content.blog.title}
              <span className="block mt-2 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                {content.blog.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-apple-gray-600 max-w-3xl mx-auto"
            >
              {content.blog.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-apple-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(([key, label]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-apple-blue to-apple-purple text-white shadow-lg'
                    : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts or Coming Soon */}
      <section className="py-16 lg:py-24 bg-apple-gray-50">
        <div className="container mx-auto px-4">
          {blogPosts.length === 0 ? (
            // Coming Soon Message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-12 shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-apple-blue to-apple-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={48} className="text-white" />
                </div>

                <h2 className="text-3xl font-bold text-apple-gray-900 mb-4">
                  {content.blog.comingSoon.title}
                </h2>

                <p className="text-xl text-apple-gray-600 mb-8">
                  {content.blog.comingSoon.message}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-apple-blue to-apple-purple text-white rounded-full font-medium hover:shadow-xl transition-all"
                >
                  {content.blog.comingSoon.cta}
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: any, index: number) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-apple-blue to-apple-purple">
                      {/* Blog post image placeholder */}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-apple-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-apple-gray-900 mb-2">
                        {post.title}
                      </h3>

                      <p className="text-apple-gray-600 mb-4">
                        {post.excerpt}
                      </p>

                      <span className="text-apple-blue font-medium hover:underline">
                        {content.blog.readMore} ←
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-apple-blue to-apple-purple">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            רוצים תוכן בנושא מסוים?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            ספרו לנו איזה נושאים מעניינים אתכם ונכין עבורכם תוכן איכותי
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-apple-blue rounded-full font-medium hover:shadow-xl transition-all"
          >
            שלחו הצעה
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
