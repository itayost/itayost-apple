'use client'

import { MessageCircle } from 'lucide-react'
import { faqPageCopy } from '@/config/faqPage'
import { trackGenerateLead, trackWhatsAppClick } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

/** The slip at the end of the fine print: ask the question that is not listed. */
export function FAQCta() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('/faq', 'faq')
    trackGenerateLead('whatsapp', '/faq')
  }

  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
      <a
        href={buildWhatsAppUrl(faqPageCopy.whatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="inline-flex min-h-14 items-center gap-2 bg-pad-whatsapp px-6 text-lg font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        {faqPageCopy.ctaWhatsApp}
      </a>
      <TearSlipLink href="/contact">{faqPageCopy.ctaContact}</TearSlipLink>
    </div>
  )
}
