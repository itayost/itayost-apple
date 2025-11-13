'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface LatestBlogPostsProps {
  posts: BlogPost[]
  title?: string
  description?: string
  showAll?: boolean
}

export default function LatestBlogPosts({
  posts,
  title = 'מהבלוג שלנו',
  description = 'מאמרים, טיפים ומדריכים בנושאי פיתוח אתרים',
  showAll = true
}: LatestBlogPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="bg-brand-gray-50 py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto max-w-2xl text-lg text-brand-gray-700">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
              }}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Color placeholder - replace with actual images when available */}
                <div className="relative h-48 bg-brand-blue">
                  <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-black/10"></div>
                </div>

                <div className="p-6">
                  {/* Category badge */}
                  <span className="mb-3 inline-block rounded-full bg-brand-gray-100 px-3 py-1 text-xs font-semibold text-brand-gray-700">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold text-brand-gray-900 transition-colors group-hover:text-brand-blue">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 line-clamp-3 text-brand-gray-600">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-brand-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('he-IL', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read more link */}
                  <div className="mt-4 flex items-center gap-2 font-medium text-brand-blue transition-all group-hover:gap-3">
                    <span>קרא עוד</span>
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View all blog link */}
        {showAll && posts.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="mt-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/blog"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <span>כל המאמרים</span>
                <ArrowLeft size={20} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
