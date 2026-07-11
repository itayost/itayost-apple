'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, RefreshCw, ArrowLeft, BookOpen } from 'lucide-react'
import { Guide } from '@/lib/guides'
import { KeyTakeaways, FAQSection, SourcesList, AuthorBio } from '@/components/blog'
import { ClusterMemberList, type ClusterMember } from '@/components/guides/ClusterMemberList'
import { PROSE_CLASSES } from '@/lib/prose'
import { bouncyEasing } from '@/constants/animations'

interface GuidePageProps {
  guide: Guide
  members: ClusterMember[]
}

export default function GuidePage({ guide, members }: GuidePageProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-blue to-brand-purple pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: bouncyEasing }}
            className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-6"
          >
            <BookOpen size={14} />
            מדריך מלא
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: bouncyEasing }}
            className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
          >
            {guide.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/85"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(guide.date).toLocaleDateString('he-IL', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            {guide.lastUpdated && guide.lastUpdated !== guide.date && (
              <span className="flex items-center gap-1.5 font-medium">
                <RefreshCw size={14} />
                עודכן: {new Date(guide.lastUpdated).toLocaleDateString('he-IL', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {guide.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <article className="mx-auto max-w-3xl">
            {guide.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: bouncyEasing }}
                className="mb-10 text-xl lg:text-2xl leading-relaxed text-brand-gray-700 font-medium"
              >
                {guide.description}
              </motion.p>
            )}

            <KeyTakeaways items={guide.tldr} />

            <ClusterMemberList members={members} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div
                className={PROSE_CLASSES}
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            </motion.div>

            <FAQSection items={guide.faq} />
            <SourcesList items={guide.sources} />

            <AuthorBio />
          </article>
        </div>
      </section>

      {/* CTA */}
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
              שיחה קצרה בלי התחייבות, ותקבלו תשובה ישירה על עלות וזמנים
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
