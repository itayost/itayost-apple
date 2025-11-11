'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowLeft } from 'lucide-react'
import { content } from '@/config/content'
import { BlogPost } from '@/lib/blog'

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
      <section className="bg-gradient-to-b from-white to-apple-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-apple-blue/10 px-4 py-2 backdrop-blur-xl"
            >
              <BookOpen className="h-4 w-4 text-apple-blue" />
              <span className="text-sm font-medium text-apple-blue">
                {content.blog.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-bold text-apple-gray-900 md:text-5xl lg:text-6xl"
            >
              {content.blog.title}
              <span className="mt-2 block bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                {content.blog.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-3xl text-xl text-apple-gray-600"
            >
              {content.blog.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-apple-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(([key, label]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
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

      {/* Blog Posts */}
      <section className="bg-apple-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            // No Posts Message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="rounded-3xl bg-white p-12 shadow-lg">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-apple-blue to-apple-purple">
                  <BookOpen size={48} className="text-white" />
                </div>

                <h2 className="mb-4 text-3xl font-bold text-apple-gray-900">
                  אין מאמרים בקטגוריה זו
                </h2>

                <p className="mb-8 text-xl text-apple-gray-600">
                  בחר קטגוריה אחרת או חזור לכל המאמרים
                </p>

                <button
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-apple-blue to-apple-purple px-8 py-4 font-medium text-white transition-all hover:shadow-xl"
                >
                  כל המאמרים
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-apple-blue to-apple-purple"></div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-sm text-apple-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString('he-IL')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-apple-gray-900 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mb-4 text-apple-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <span className="font-medium text-apple-blue hover:underline">
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
      <section className="bg-gradient-to-r from-apple-blue to-apple-purple py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
            רוצים תוכן בנושא מסוים?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            ספרו לנו איזה נושאים מעניינים אתכם ונכין עבורכם תוכן איכותי
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-apple-blue transition-all hover:shadow-xl"
          >
            שלחו הצעה
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
