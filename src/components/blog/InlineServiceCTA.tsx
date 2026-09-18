'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { trackWhatsAppClick, trackGenerateLead, trackCtaClick } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { getServiceForCategory } from '@/config/categoryServices'

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
  const service = getServiceForCategory(category)
  const serviceHref = `/services/${service.serviceId}`
  const whatsappLink = buildWhatsAppUrl(`היי, קראתי את המאמר שלך בבלוג ומעוניין לשמוע עוד על ${service.serviceName}`)
  const isCompact = variant === 'compact'

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(pathname, 'blog_cta')
    trackGenerateLead('whatsapp', pathname)
    trackCtaClick('whatsapp_blog_cta', 'blog_cta', pathname)
  }

  const handleContactClick = () => {
    trackCtaClick('contact_blog_cta', 'blog_cta', '/contact')
  }

  const handleServiceClick = () => {
    trackCtaClick('service_blog_cta', 'blog_cta', serviceHref)
  }

  return (
    <aside
      className={`pad-paper pad-perf-top pad-sheet-shadow relative ${isCompact ? 'my-10' : 'my-12'} -rotate-[0.6deg] px-6 ${
        isCompact ? 'py-6' : 'py-8'
      } text-pad-ink sm:px-8`}
      style={{ ['--pad-perf-ground' as string]: '#FBFBF8' }}
    >
      <h3
        className={`font-pad-display font-bold leading-none text-pad-ink ${isCompact ? 'text-3xl' : 'text-4xl sm:text-5xl'}`}
      >
        {service.ctaMessage}
      </h3>
      {!isCompact && (
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pad-ink-soft">
          אני מתמחה ב{service.serviceName} ואשמח לעזור לכם להפוך את הרעיונות שלכם למציאות. צרו קשר לייעוץ ראשוני בחינם.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="inline-flex min-h-12 items-center gap-2 bg-pad-whatsapp px-5 text-base font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          וואטסאפ
        </a>
        <Link
          href="/contact"
          onClick={handleContactClick}
          className="inline-flex min-h-12 items-center gap-2 bg-pad-yellow px-5 text-base font-bold text-pad-ink transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          צור קשר
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </Link>
        <Link
          href={serviceHref}
          onClick={handleServiceClick}
          className="inline-flex min-h-11 items-center gap-1.5 text-base font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
        >
          {service.serviceName}
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
