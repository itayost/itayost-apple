'use client'

import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { trackWhatsAppClick, trackGenerateLead, trackCtaClick } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { getServiceForCategory } from '@/config/categoryServices'

// Category-specific content
const categoryContent: Record<string, { title: string; description: string; cta: string }> = {
  'פיתוח אתרים': {
    title: 'רוצים אתר מקצועי?',
    description: 'נבנה לכם אתר מהיר, מאובטח ומותאם לנייד',
    cta: 'קבלו הצעת מחיר',
  },
  'טכנולוגיה': {
    title: 'צריכים פתרון טכני?',
    description: 'נעזור לכם לבחור ולמימש את הטכנולוגיה הנכונה',
    cta: 'בואו נדבר',
  },
  'מסחר אלקטרוני': {
    title: 'רוצים חנות אונליין?',
    description: 'נבנה לכם חנות שמוכרת - עם כל האינטגרציות',
    cta: 'התחילו למכור',
  },
  'עיצוב אתרים': {
    title: 'רוצים עיצוב מרהיב?',
    description: 'נעצב לכם ממשק שמשאיר רושם ומוכר',
    cta: 'ראו דוגמאות',
  },
  'אבטחת אתרים': {
    title: 'מודאגים מאבטחה?',
    description: 'נדאג שהאתר שלכם יהיה מוגן ומאובטח',
    cta: 'בדקו את האתר',
  },
}

const defaultContent = {
  title: 'צריכים עזרה?',
  description: 'רוצים לדעת איך ליישם את מה שקראתם? נשמח לעזור!',
  cta: 'דברו איתי',
}

interface SidebarCTAProps {
  className?: string
  category?: string
}

/** The margin slip: pinned beside the article, in the pad's own paper. */
export function SidebarCTA({ className = '', category }: SidebarCTAProps) {
  const content = category ? categoryContent[category] || defaultContent : defaultContent
  const service = getServiceForCategory(category)
  const serviceHref = `/services/${service.serviceId}`

  return (
    <div
      className={`pad-paper pad-perf-top pad-sheet-shadow relative -rotate-1 px-5 pb-5 pt-5 text-pad-ink ${className}`}
      style={{ ['--pad-perf-ground' as string]: '#FBFBF8' }}
    >
      <h3 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-2xl font-bold leading-none text-pad-ink">
        {content.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-pad-ink-soft">{content.description}</p>

      <Link
        href="/contact"
        className="mt-4 flex min-h-12 w-full items-center justify-between gap-2 bg-pad-yellow px-4 text-base font-bold text-pad-ink transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        {content.cta}
        <ArrowLeft aria-hidden="true" size={16} />
      </Link>

      <a
        href={buildWhatsAppUrl('היי, קראתי את המאמר שלך ורציתי לשאול...')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWhatsAppClick(window.location.pathname, 'blog_sidebar')
          trackGenerateLead('whatsapp', window.location.pathname)
        }}
        className="mt-3 flex min-h-11 items-center gap-2 text-base font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
      >
        <MessageCircle aria-hidden="true" size={16} />
        או שלחו וואטסאפ
      </a>

      <Link
        href={serviceHref}
        onClick={() => trackCtaClick('service_blog_sidebar', 'blog_sidebar', serviceHref)}
        className="mt-3 flex min-h-11 items-center gap-1.5 border-t border-pad-rule pt-3 text-sm text-pad-ink-soft underline decoration-pad-ink/20 underline-offset-4 hover:text-pad-ink"
      >
        {service.serviceName}
        <ArrowLeft aria-hidden="true" size={14} />
      </Link>
    </div>
  )
}
