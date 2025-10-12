'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  HelpCircle,
  ChevronDown,
  MessageCircle
} from 'lucide-react'
import { content } from '@/config/content'
import { seoConfig } from '@/config/seo'

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
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-apple-green/10 backdrop-blur-xl rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4 text-apple-green" />
              <span className="text-sm font-medium text-apple-green">
                {content.faq.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6"
            >
              {content.faq.title}
              <span className="block mt-2 bg-gradient-to-r from-apple-green to-apple-cyan bg-clip-text text-transparent">
                {content.faq.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-apple-gray-600 max-w-3xl mx-auto"
            >
              {content.faq.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-apple-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  setOpenIndex(null)
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-apple-green to-apple-cyan text-white shadow-lg'
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

      {/* FAQ Items */}
      <section className="py-16 lg:py-24 bg-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-apple-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-apple-gray-900 flex-1">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-apple-gray-600" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-apple-gray-600 leading-relaxed">
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
      <section className="py-16 lg:py-24 bg-gradient-to-r from-apple-green to-apple-cyan">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle size={64} className="text-white mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            לא מצאתם את התשובה?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            אנחנו כאן לעזור! צרו איתנו קשר ונענה על כל שאלה
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-apple-green rounded-full font-medium hover:shadow-xl transition-all"
            >
              צרו קשר
            </Link>
            <a
              href="https://wa.me/972544994417"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 rounded-full font-medium hover:bg-white/30 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
