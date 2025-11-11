'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ServiceFAQ as FAQItem } from '@/data/services'

interface ServiceFAQProps {
  faq: FAQItem[]
  gradient: string
}

export default function ServiceFAQ({ faq, gradient }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white py-20 lg:py-24" id="faq">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-apple-gray-900 sm:text-4xl lg:text-5xl">
            שאלות נפוצות
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-apple-gray-700">
            תשובות לשאלות שאתה כנראה שואל את עצמך
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-apple-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Question button */}
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-right transition-colors hover:bg-apple-gray-50 sm:p-8"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-bold text-apple-gray-900 sm:text-xl">
                    {item.question}
                  </span>

                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 text-2xl text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                  >
                    ▼
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-apple-gray-100 px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
                        <p className="leading-relaxed text-apple-gray-700">
                          {item.answer}
                        </p>
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
  )
}
