'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookMarked,
  GraduationCap,
  Code2,
  ArrowLeft,
  Star
} from 'lucide-react'
import { content } from '@/config/content'

// Sample guides - replace with real data later
const guides: any[] = [
  // Placeholder for future guides
]

export default function GuidesPage() {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedTopic, setSelectedTopic] = useState('all')

  const levels = [
    { key: 'all', label: 'הכל' },
    ...Object.entries(content.guides.levels).map(([key, label]) => ({ key, label }))
  ]

  const topics = [
    { key: 'all', label: 'הכל' },
    ...Object.entries(content.guides.topics).map(([key, label]) => ({ key, label }))
  ]

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 backdrop-blur-xl rounded-full mb-6"
            >
              <BookMarked className="w-4 h-4 text-brand-purple" />
              <span className="text-sm font-medium text-brand-purple">
                {content.guides.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-900 mb-6"
            >
              {content.guides.title}
              <span className="block mt-2 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                {content.guides.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-gray-600 max-w-3xl mx-auto"
            >
              {content.guides.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-brand-gray-200">
        <div className="container mx-auto px-4">
          {/* Level Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-brand-gray-700 mb-3 text-center">
              רמת קושי
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {levels.map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedLevel(key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedLevel === key
                      ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg'
                      : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div>
            <h3 className="text-sm font-semibold text-brand-gray-700 mb-3 text-center">
              נושא
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {topics.map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedTopic(key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedTopic === key
                      ? 'bg-gradient-to-r from-brand-blue to-apple-cyan text-white shadow-lg'
                      : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides or Coming Soon */}
      <section className="py-16 lg:py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          {guides.length === 0 ? (
            // Coming Soon Message
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-12 shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-pink rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap size={48} className="text-white" />
                </div>

                <h2 className="text-3xl font-bold text-brand-gray-900 mb-4">
                  {content.guides.comingSoon.title}
                </h2>

                <p className="text-xl text-brand-gray-600 mb-8">
                  {content.guides.comingSoon.message}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-full font-medium hover:shadow-xl transition-all"
                >
                  {content.guides.comingSoon.cta}
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ) : (
            // Guides Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide: any, index: number) => (
                <motion.article
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href={`/guides/${guide.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-brand-purple to-brand-pink p-6 flex items-center justify-center">
                      <Code2 size={64} className="text-white" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-medium rounded-full">
                          {guide.level}
                        </span>
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-medium rounded-full">
                          {guide.topic}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-brand-gray-900 mb-2">
                        {guide.title}
                      </h3>

                      <p className="text-brand-gray-600 mb-4">
                        {guide.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-brand-purple font-medium hover:underline">
                          התחל ללמוד ←
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm font-medium text-brand-gray-700">
                            {guide.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-purple to-brand-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            צריכים עזרה בלימוד?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            אנחנו כאן לעזור! צרו קשר לייעוץ אישי והדרכה מותאמת
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-purple rounded-full font-medium hover:shadow-xl transition-all"
          >
            קבעו שיחת ייעוץ
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
