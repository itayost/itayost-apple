'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, ArrowLeft, Sparkles } from 'lucide-react'

// Category to service mapping
const categoryServiceMap: Record<string, { serviceId: string; serviceName: string; ctaMessage: string }> = {
  'פיתוח אתרים': {
    serviceId: 'web-development',
    serviceName: 'פיתוח אתרים',
    ctaMessage: 'רוצים אתר מקצועי שמביא תוצאות?',
  },
  'טכנולוגיה': {
    serviceId: 'web-development',
    serviceName: 'פתרונות טכנולוגיים',
    ctaMessage: 'צריכים פתרון טכנולוגי מותאם?',
  },
  'מדריכים': {
    serviceId: 'web-development',
    serviceName: 'שירותי פיתוח',
    ctaMessage: 'רוצים שניישם את זה עבורכם?',
  },
  'אבטחת אתרים': {
    serviceId: 'web-development',
    serviceName: 'אבטחת אתרים',
    ctaMessage: 'רוצים לוודא שהאתר שלכם מאובטח?',
  },
  'עיצוב אתרים': {
    serviceId: 'ui-ux-design',
    serviceName: 'עיצוב UI/UX',
    ctaMessage: 'רוצים עיצוב שמרשים ומוכר?',
  },
  'מסחר אלקטרוני': {
    serviceId: 'ecommerce',
    serviceName: 'חנויות אונליין',
    ctaMessage: 'רוצים חנות אונליין שמוכרת?',
  },
  'SEO ושיווק': {
    serviceId: 'web-development',
    serviceName: 'אתרים שמושכים לקוחות',
    ctaMessage: 'רוצים אתר שמביא לקוחות חדשים?',
  },
}

const defaultService = {
  serviceId: 'web-development',
  serviceName: 'פתרונות דיגיטליים',
  ctaMessage: 'רוצים שנעזור לכם להצליח?',
}

interface InlineServiceCTAProps {
  category: string
}

const bouncyEasing = [0.34, 1.56, 0.64, 1]

export default function InlineServiceCTA({ category }: InlineServiceCTAProps) {
  const service = categoryServiceMap[category] || defaultService
  const whatsappMessage = encodeURIComponent(`היי, קראתי את המאמר שלכם בבלוג ומעוניין לשמוע עוד על ${service.serviceName}`)
  const whatsappLink = `https://wa.me/972544994417?text=${whatsappMessage}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: bouncyEasing }}
      className="my-12 overflow-hidden rounded-3xl bg-gradient-to-bl from-brand-blue via-brand-purple to-brand-blue shadow-2xl"
    >
      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4, ease: bouncyEasing }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">אנחנו יכולים לעזור</span>
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: bouncyEasing }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            {service.ctaMessage}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: bouncyEasing }}
            className="text-lg text-white/90 mb-8 max-w-xl"
          >
            אנחנו מתמחים ב{service.serviceName} ונשמח לעזור לכם להפוך את הרעיונות שלכם למציאות.
            צרו קשר לייעוץ ראשוני בחינם.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: bouncyEasing }}
            className="flex flex-wrap gap-4"
          >
            {/* WhatsApp Button */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <MessageCircle className="w-5 h-5" />
              וואטסאפ
            </motion.a>

            {/* Contact Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-brand-blue font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                צור קשר
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
