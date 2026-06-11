'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, ArrowLeft, Sparkles } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'
import {
  trackWhatsAppClick,
  trackGenerateLead,
  trackCtaClick,
} from '@/lib/analytics'

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
  'פיתוח אפליקציות': {
    serviceId: 'mobile-apps',
    serviceName: 'פיתוח אפליקציות מובייל',
    ctaMessage: 'רוצים אפליקציה מקצועית ל-iOS ולאנדרואיד?',
  },
  'אפליקציות מובייל': {
    serviceId: 'mobile-apps',
    serviceName: 'פיתוח אפליקציות מובייל',
    ctaMessage: 'רוצים אפליקציה מקצועית ל-iOS ולאנדרואיד?',
  },
  'מערכות ניהול': {
    serviceId: 'crm-systems',
    serviceName: 'מערכות ניהול ו-CRM מותאמות אישית',
    ctaMessage: 'רוצים מערכת ניהול שמתאימה בדיוק לעסק שלכם?',
  },
  'המרות וחווית משתמש': {
    serviceId: 'ui-ux-design',
    serviceName: 'עיצוב חוויית משתמש שממירה',
    ctaMessage: 'רוצים חוויית משתמש שממירה יותר מבקרים ללקוחות?',
  },
  'ביצועים וטכנולוגיה': {
    serviceId: 'web-development',
    serviceName: 'אתרים מהירים ב-Next.js',
    ctaMessage: 'רוצים אתר מהיר שעובר את כל מבחני הביצועים?',
  },
  'דפי נחיתה': {
    serviceId: 'landing-pages',
    serviceName: 'בניית דפי נחיתה ממירים',
    ctaMessage: 'רוצים דף נחיתה שממיר יותר מבקרים ללקוחות?',
  },
}

const defaultService = {
  serviceId: 'web-development',
  serviceName: 'פתרונות דיגיטליים',
  ctaMessage: 'רוצים שנעזור לכם להצליח?',
}

interface InlineServiceCTAProps {
  category: string
  /**
   * 'full' (default) — the large end-of-article card.
   * 'compact' — a tighter version for mid-article placement that doesn't
   * interrupt the reading flow as much.
   */
  variant?: 'full' | 'compact'
}

export default function InlineServiceCTA({ category, variant = 'full' }: InlineServiceCTAProps) {
  const pathname = usePathname() ?? ''
  const service = categoryServiceMap[category] || defaultService
  const whatsappMessage = encodeURIComponent(`היי, קראתי את המאמר שלך בבלוג ומעוניין לשמוע עוד על ${service.serviceName}`)
  const whatsappLink = `https://wa.me/972544994417?text=${whatsappMessage}`
  const isCompact = variant === 'compact'

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(pathname, 'blog_cta')
    trackGenerateLead('whatsapp', pathname)
    trackCtaClick('whatsapp_blog_cta', 'blog_cta', pathname)
  }

  const handleContactClick = () => {
    trackCtaClick('contact_blog_cta', 'blog_cta', '/contact')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: bouncyEasing }}
      className={`${isCompact ? 'my-10' : 'my-12'} overflow-hidden rounded-3xl bg-gradient-to-bl from-brand-blue via-brand-purple to-brand-blue shadow-2xl`}
    >
      <div className={`relative ${isCompact ? 'px-6 py-7 sm:px-8 sm:py-8' : 'px-6 py-10 sm:px-10 sm:py-12'}`}>
        {/* Background decoration (full variant only) */}
        {!isCompact && (
          <>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />
          </>
        )}

        <div className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4, ease: bouncyEasing }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">אני יכול לעזור</span>
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: bouncyEasing }}
            className={`${isCompact ? 'text-xl sm:text-2xl mb-3' : 'text-2xl sm:text-3xl mb-4'} font-bold text-white`}
          >
            {service.ctaMessage}
          </motion.h3>

          {/* Description (full variant only) */}
          {!isCompact && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: bouncyEasing }}
              className="text-lg text-white/90 mb-8 max-w-xl"
            >
              אני מתמחה ב{service.serviceName} ואשמח לעזור לכם להפוך את הרעיונות שלכם למציאות.
              צרו קשר לייעוץ ראשוני בחינם.
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: isCompact ? 0.3 : 0.4, duration: 0.5, ease: bouncyEasing }}
            className="flex flex-wrap gap-4"
          >
            {/* WhatsApp Button */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
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
                onClick={handleContactClick}
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
