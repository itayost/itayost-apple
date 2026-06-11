'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items?: FAQItem[]
}

// In-article FAQ accordion rendered from the post's `faq` frontmatter — the same
// source that drives the FAQPage JSON-LD, so the on-page Q&A and the structured
// data never drift. Renders nothing when no faq is provided.
export function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items || items.length === 0) return null

  return (
    <section className="my-12" id="faq">
      <h2 className="mb-6 text-2xl font-bold text-brand-navy sm:text-3xl">שאלות נפוצות</h2>
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-brand-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 p-5 text-right transition-colors hover:bg-brand-gray-50 sm:p-6"
                aria-expanded={isOpen}
              >
                <span className="text-base font-bold text-brand-navy sm:text-lg">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-brand-blue"
                  aria-hidden="true"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-brand-gray-100 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                      <p className="leading-relaxed text-brand-gray-700">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
