'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

const steps = [
  {
    number: '01',
    title: 'נכיר',
    description: 'שיחה ראשונית חינמית של 30 דקות. נבין את העסק שלכם, האתגרים והיעדים. ללא התחייבות.',
    color: 'bg-brand-blue',
  },
  {
    number: '02',
    title: 'נתכנן',
    description: 'נבנה יחד תכנית שיווק מותאמת לעסק שלכם עם יעדים מדידים ותקציב ריאלי.',
    color: 'bg-brand-orange',
  },
  {
    number: '03',
    title: 'נצמח',
    description: 'מיישמים, מודדים ומשפרים כל הזמן. אתם רואים תוצאות בדו"ח שבועי שקוף.',
    color: 'bg-brand-green',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-section-cream">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-6">
            איך זה עובד?
          </h2>
          <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-2xl mx-auto">
            תהליך פשוט, שקוף ומוכוון תוצאות
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: bouncyEasing
              }}
              className="relative"
            >
              {/* Connector line between steps (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 start-full w-8 h-0.5 bg-brand-gray-200 z-10" />
              )}

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                {/* Step number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-2xl mb-6`}>
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-brand-navy mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-brand-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: bouncyEasing }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <span>קבל ייעוץ חינם</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
