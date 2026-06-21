'use client'

import Link from 'next/link'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import {
  trackWhatsAppClick,
  trackGenerateLead,
  trackCtaClick,
} from '@/lib/analytics'

interface ProjectContactCtaProps {
  title: string
  slug: string
}

// Sidebar CTA on a portfolio detail page. Mobile drives most conversions but
// barely any WhatsApp clicks, and these detail pages engage at ~0% bounce once
// reached — so the highest-intent mobile visitors land here with no direct
// WhatsApp path. This adds a tracked, context-aware WhatsApp CTA inline in the
// page body (per the weekly CRO report), alongside the existing contact link.
export function ProjectContactCta({ title, slug }: ProjectContactCtaProps) {
  const sourcePage = `/portfolio/${slug}`
  const whatsappMessage = encodeURIComponent(
    `היי, ראיתי את הפרויקט "${title}" בתיק העבודות ואשמח לשמוע על פרויקט דומה`
  )
  const whatsappLink = `https://wa.me/972544994417?text=${whatsappMessage}`

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(sourcePage, 'portfolio_detail')
    trackGenerateLead('whatsapp', sourcePage)
    trackCtaClick('whatsapp_portfolio_cta', 'portfolio_detail', whatsappLink)
  }

  return (
    <div className="bg-section-light-blue rounded-3xl p-6 text-center">
      <h3 className="text-xl font-bold text-brand-navy mb-3">
        רוצים פרויקט דומה?
      </h3>
      <p className="text-brand-gray-600 mb-5">
        בואו נדבר על הפרויקט שלכם. מענה תוך שעה.
      </p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 mb-3 bg-[#25D366] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="w-5 h-5" />
        <span>דברו איתי בוואטסאפ</span>
      </a>

      <Link
        href="/contact"
        onClick={() => trackCtaClick('contact_portfolio_cta', 'portfolio_detail', '/contact')}
        className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-navy/90 transition-colors"
      >
        <span>צור קשר</span>
        <ArrowLeft className="w-5 h-5" />
      </Link>
    </div>
  )
}
