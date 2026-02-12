'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft, Sparkles, Code, ShoppingBag, Palette, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

// Category-specific content
const categoryContent: Record<string, { icon: LucideIcon; title: string; description: string; cta: string }> = {
  'פיתוח אתרים': {
    icon: Code,
    title: 'רוצים אתר מקצועי?',
    description: 'נבנה לכם אתר מהיר, מאובטח ומותאם לנייד',
    cta: 'קבלו הצעת מחיר',
  },
  'טכנולוגיה': {
    icon: Code,
    title: 'צריכים פתרון טכני?',
    description: 'נעזור לכם לבחור ולמימש את הטכנולוגיה הנכונה',
    cta: 'בואו נדבר',
  },
  'מסחר אלקטרוני': {
    icon: ShoppingBag,
    title: 'רוצים חנות אונליין?',
    description: 'נבנה לכם חנות שמוכרת - עם כל האינטגרציות',
    cta: 'התחילו למכור',
  },
  'עיצוב אתרים': {
    icon: Palette,
    title: 'רוצים עיצוב מרהיב?',
    description: 'נעצב לכם ממשק שמשאיר רושם ומוכר',
    cta: 'ראו דוגמאות',
  },
  'אבטחת אתרים': {
    icon: Zap,
    title: 'מודאגים מאבטחה?',
    description: 'נדאג שהאתר שלכם יהיה מוגן ומאובטח',
    cta: 'בדקו את האתר',
  },
}

const defaultContent = {
  icon: Sparkles,
  title: 'צריכים עזרה?',
  description: 'רוצים לדעת איך ליישם את מה שקראתם? נשמח לעזור!',
  cta: 'דברו איתנו',
}

interface SidebarCTAProps {
  className?: string
  category?: string
}

export function SidebarCTA({ className = '', category }: SidebarCTAProps) {
  const content = category ? categoryContent[category] || defaultContent : defaultContent
  const Icon = content.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: bouncyEasing }}
      className={`rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-6 text-white overflow-hidden relative ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon size={22} />
          </div>
          <h3 className="font-bold text-lg">{content.title}</h3>
        </div>

        <p className="text-white/90 text-sm mb-5 leading-relaxed">
          {content.description}
        </p>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: bouncyEasing }}
        >
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-brand-blue rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
          >
            {content.cta}
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        {/* WhatsApp link */}
        <a
          href="https://wa.me/972544994417"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <MessageCircle size={16} />
          או שלחו וואטסאפ
        </a>
      </div>
    </motion.div>
  )
}
