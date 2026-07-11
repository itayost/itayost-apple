'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock, RefreshCw, ArrowLeft, Sparkles, ListOrdered } from 'lucide-react'
import { content } from '@/config/content'
import { bouncyEasing } from '@/constants/animations'

export interface GuideCard {
  slug: string
  title: string
  description: string
  readTime: string
  lastUpdated: string
  memberCount: number
  clusterLabel: string
}

interface GuidesPageProps {
  guides: GuideCard[]
}

export default function GuidesPage({ guides }: GuidesPageProps) {
  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full">
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span className="text-base font-bold text-brand-blue">
                  {content.guides.sectionLabel}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-6"
            >
              {content.guides.title}
              <span className="block mt-2 text-brand-blue">{content.guides.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-2xl mx-auto"
            >
              {content.guides.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="py-12 lg:py-16 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8">
            {guides.map((guide, index) => (
              <motion.article
                key={guide.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: bouncyEasing }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: bouncyEasing } }}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow"
              >
                <Link href={`/guides/${guide.slug}`} className="flex flex-col sm:flex-row">
                  <div className="flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-purple p-8 sm:w-44 flex-shrink-0">
                    <BookOpen className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1 p-6 lg:p-8">
                    <span className="mb-3 inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                      {guide.clusterLabel}
                    </span>
                    <h2 className="mb-3 text-xl lg:text-2xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {guide.title}
                    </h2>
                    <p className="mb-5 text-brand-gray-700 leading-relaxed line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-gray-500">
                      <span className="flex items-center gap-1.5">
                        <ListOrdered size={14} />
                        {guide.memberCount} מאמרי המשך
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {guide.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <RefreshCw size={14} />
                        עודכן: {new Date(guide.lastUpdated).toLocaleDateString('he-IL', { year: 'numeric', month: 'short' })}
                      </span>
                      <span className="mr-auto flex items-center gap-1 font-semibold text-brand-blue">
                        למדריך המלא
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: bouncyEasing }}
          >
            <h2 className="mb-4 text-2xl lg:text-3xl font-bold text-brand-navy">
              לא מצאתם תשובה לשאלה שלכם?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-brand-gray-700">
              שלחו לי את השאלה ואחזור אליכם עם תשובה ישירה, בלי התחייבות
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: bouncyEasing }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-4 font-semibold text-white shadow-xl hover:shadow-2xl transition-shadow"
              >
                דברו איתי
                <ArrowLeft size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
