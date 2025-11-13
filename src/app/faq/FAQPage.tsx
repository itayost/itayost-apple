'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Sparkles
} from 'lucide-react'
import { content } from '@/config/content'
import { seoConfig } from '@/config/seo'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

// Extract FAQ items from SEO config
const faqItems = seoConfig.structuredData.faqPage.mainEntity.map((item: any) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
  category: 'general'
}))

// Additional FAQ items
const additionalFAQs = [
  {
    question: 'איזה טכנולוגיות אתם משתמשים?',
    answer: 'אנחנו עובדים עם הטכנולוגיות המתקדמות ביותר: React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL ועוד. בוחרים את הטכנולוגיה המתאימה ביותר לכל פרויקט.',
    category: 'technical'
  },
  {
    question: 'האם אתם עושים גם עיצוב?',
    answer: 'כן! אנחנו מציעים שירותי עיצוב UI/UX מלאים, כולל עיצוב ממשק משתמש, חווית משתמש, ברנדינג וזהות ויזואלית.',
    category: 'general'
  },
  {
    question: 'מה קורה אם אני רוצה לשנות משהו באמצע?',
    answer: 'אין בעיה! אנחנו עובדים באופן אג\'יילי עם עדכונים שוטפים. שינויים קטנים זה חלק מהתהליך. לשינויים גדולים נתאם ציפיות ולוחות זמנים מחדש.',
    category: 'process'
  },
  {
    question: 'האם אני יכול לנהל את האתר בעצמי?',
    answer: 'בהחלט! אנחנו בונים מערכות ניהול פשוטות ונוחות לשימוש. בנוסף, אנחנו מספקים הדרכה מלאה ותיעוד ברור.',
    category: 'support'
  },
  {
    question: 'מה כלול במחיר?',
    answer: 'המחיר כולל: תכנון ועיצוב, פיתוח מלא, התקנה והעלאה לשרת, הדרכה, 6 חודשי אחריות וחודש תמיכה חינם. אחסון ודומיין נפרדים.',
    category: 'pricing'
  },
  {
    question: 'האם אתם עובדים עם לקוחות מחוץ לישראל?',
    answer: 'כן, אנחנו עובדים עם לקוחות מכל העולם. רוב התקשורת דרך וידאו קונפרנס, ומערכות שיתוף פעולה מקוונות.',
    category: 'general'
  }
]

const allFAQs = [...faqItems, ...additionalFAQs]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const categories = [
    { key: 'all', label: 'הכל' },
    ...Object.entries(content.faq.categories).map(([key, label]) => ({ key, label }))
  ]

  const filteredFAQs = selectedCategory === 'all'
    ? allFAQs
    : allFAQs.filter(faq => faq.category === selectedCategory)

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
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-green" />
                <span className="text-base font-bold text-brand-green">
                  {content.faq.sectionLabel}
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              {content.faq.title}
              <span className="block mt-2 text-brand-green">
                {content.faq.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto"
            >
              {content.faq.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-brand-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Centered tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex gap-2 p-2 bg-brand-gray-100 rounded-full">
              {categories.map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key)
                    setOpenIndex(null)
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === key
                      ? 'bg-brand-green text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-green'
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
          <div className="sm:hidden overflow-x-auto -mx-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 p-2 bg-brand-gray-100 rounded-full mx-4" style={{ width: 'max-content' }}>
              {categories.map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key)
                    setOpenIndex(null)
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === key
                      ? 'bg-brand-green text-white shadow-lg'
                      : 'text-brand-gray-700'
                  }`}
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

      {/* FAQ Items */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.6,
                    ease: bouncyEasing
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 lg:px-8 py-5 lg:py-6 flex items-center justify-between text-right hover:bg-brand-gray-50 transition-colors"
                  >
                    <span className="text-lg lg:text-xl font-bold text-brand-navy flex-1 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: bouncyEasing }}
                      className="flex-shrink-0"
                    >
                      <div className="w-10 h-10 bg-brand-green rounded-2xl flex items-center justify-center">
                        <ChevronDown className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: bouncyEasing }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-5 lg:pb-6 text-brand-gray-700 text-lg leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <motion.div
              className="mb-6"
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageCircle size={64} className="text-white mx-auto" />
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              לא מצאתם את התשובה?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              אנחנו כאן לעזור! צרו איתנו קשר ונענה על כל שאלה
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-brand-green rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  צרו קשר
                </Link>
              </motion.div>
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
                <a
                  href="https://wa.me/972544994417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/20 backdrop-blur text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/30 transition-all"
                >
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
