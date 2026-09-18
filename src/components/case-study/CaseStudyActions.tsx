'use client'

import Link from 'next/link'
import { ArrowLeft, ExternalLink, MessageCircle, Send } from 'lucide-react'
import { portfolioPage } from '@/config/portfolioPage'
import { trackCtaClick, trackGenerateLead, trackOutboundClick, trackWhatsAppClick } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

const { caseStudy } = portfolioPage

/**
 * Hero action. With a live link: a tracked slip to the live site. Without one
 * (internal systems): a contact slip, so the slot is never empty dead space.
 */
export function CaseStudyHeroAction({ link, title }: { link: string | null; title: string }) {
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(link, title, 'portfolio_detail')}
        className="pad-perf-top pad-sheet-shadow group relative inline-flex min-h-[3.5rem] items-center gap-4 bg-pad-yellow py-4 pe-5 ps-6 text-pad-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:-rotate-1 motion-reduce:transition-none"
        style={{ ['--pad-perf-ground' as string]: '#2B3FD6' }}
      >
        <span className="text-lg font-bold sm:text-xl">{caseStudy.liveSite}</span>
        <ExternalLink aria-hidden="true" className="h-5 w-5" />
      </a>
    )
  }
  return <TearSlipLink href="/contact">{caseStudy.noLinkCta}</TearSlipLink>
}

/** The close: a slip with a WhatsApp line and the contact form, tracked as the portfolio detail CTA. */
export function CaseStudyClose({ title, slug }: { title: string; slug: string }) {
  const sourcePage = `/portfolio/${slug}`
  const whatsappLink = buildWhatsAppUrl(`היי, ראיתי את הפרויקט "${title}" בתיק העבודות ואשמח לשמוע על פרויקט דומה`)

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(sourcePage, 'portfolio_detail')
    trackGenerateLead('whatsapp', sourcePage)
    trackCtaClick('whatsapp_portfolio_cta', 'portfolio_detail', whatsappLink)
  }

  return (
    <section aria-labelledby="case-close-heading" className="bg-pad-carbon text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="case-close-heading" className="font-pad-display text-7xl font-bold leading-[0.85]">
            {caseStudy.closeTitle}
          </h2>
          <p className="mt-5 max-w-[36ch] text-xl leading-relaxed text-pad-carbon-ink">{caseStudy.closeBody}</p>
        </div>
        <div
          className="pad-paper pad-perf-top pad-sheet-shadow relative px-6 pb-7 pt-7 text-pad-ink sm:px-10 lg:col-span-7 lg:-rotate-1"
          style={{ ['--pad-perf-ground' as string]: '#2B3FD6' }}
        >
          <div className="flex flex-col gap-1 border-b-[3px] border-double border-pad-red pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <span className="font-pad-display text-3xl font-bold leading-none text-pad-red">{caseStudy.sheetTitle}</span>
            <span className="font-pad-display text-2xl leading-tight text-pad-red sm:text-end">{title}</span>
          </div>
          <ul className="mt-2">
            <li className="border-b border-pad-rule">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="group flex min-h-16 items-center gap-4 py-3"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-pad-carbon" />
                <span className="w-20 flex-shrink-0 text-base font-bold text-pad-red">{caseStudy.whatsappLabel}</span>
                <span className="text-lg font-bold underline decoration-pad-red/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-pad-red sm:text-xl">
                  {caseStudy.whatsappValue}
                </span>
              </a>
            </li>
            <li className="border-b border-pad-rule">
              <Link
                href="/contact"
                onClick={() => trackCtaClick('contact_portfolio_cta', 'portfolio_detail', '/contact')}
                className="group flex min-h-16 items-center gap-4 py-3"
              >
                <Send aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-pad-carbon" />
                <span className="w-20 flex-shrink-0 text-base font-bold text-pad-red">{caseStudy.contactLabel}</span>
                <span className="text-lg font-bold underline decoration-pad-red/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-pad-red sm:text-xl">
                  {caseStudy.contactValue}
                </span>
                <ArrowLeft
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
