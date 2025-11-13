'use client'

import { motion } from 'framer-motion'
import { Service } from '@/data/services'

interface ServiceCTAProps {
  service: Service
}

export default function ServiceCTA({ service }: ServiceCTAProps) {
  return (
    <section className="relative overflow-hidden bg-brand-gray-900 py-20 lg:py-24" id="contact">
      {/* Gradient background accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}
        aria-hidden="true"
      />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className={`absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl`}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block text-5xl"
          >
            {service.icon}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            מוכן להתחיל?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg leading-relaxed text-brand-gray-300 sm:text-xl"
          >
            בוא נדבר על הפרויקט שלך. פגישת ייעוץ ראשונה חינם וללא התחייבות.
            תקבל הצעת מחיר מפורטת תוך 24 שעות.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/972544994417?text=היי,%20אני%20מעוניין%20לשמוע%20עוד%20על%20"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${service.gradient} px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-gray-900 sm:text-lg`}
            >
              <span>שלח הודעת WhatsApp</span>
              <span className="text-xl">💬</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:itayost1@gmail.com?subject=פנייה%20לגבי%20שירות"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white hover:text-brand-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-gray-900 sm:text-lg"
            >
              <span>שלח מייל</span>
              <span className="text-xl">✉️</span>
            </a>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-brand-gray-400"
          >
            <p className="text-sm">או התקשר: 054-499-4417</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
