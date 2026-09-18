'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, Mail, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { getPortfolioByIds } from '@/data/portfolio'
import { getRelatedServices, type Service } from '@/data/services'
import { servicePage } from '@/config/servicePage'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'
import {
  trackContactClick,
  trackCtaClick,
  trackGenerateLead,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics'
import { ClientCopyCard } from '@/components/pad/ClientCopyCard'

const { close, work, related } = servicePage

// Grid columns follow the number of copies so no card is left alone on a row.
const WORK_GRID: Record<number, string> = {
  1: 'md:max-w-md',
  2: 'lg:grid-cols-2 lg:max-w-4xl',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

/** Real client copies for this service. Renders nothing when the service has none. */
export function ServiceWork({ portfolioIds }: { portfolioIds: string[] }) {
  const items = getPortfolioByIds(portfolioIds)
  if (items.length === 0) return null

  return (
    <section id="portfolio" aria-labelledby="service-work-heading" className="scroll-mt-24 bg-pad-pink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 id="service-work-heading" className="font-pad-display text-5xl font-bold leading-[0.9] text-pad-ink sm:text-6xl">
              {work.title}
            </h2>
            <p className="mt-3 text-xl text-pad-ink">{work.subtitle}</p>
          </div>
          <Link
            href="/portfolio"
            onClick={() => trackCtaClick(work.allLabel, 'service_portfolio', '/portfolio')}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-lg font-bold text-pad-ink underline decoration-pad-red decoration-2 underline-offset-[6px] md:self-auto"
          >
            {work.allLabel}
            <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
        <ul className={`pad-scroll-x -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-4 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 ${WORK_GRID[Math.min(items.length, 4)] ?? ''}`}>
          {items.map((item, index) => (
            <li key={item.slug} className="w-[82%] flex-shrink-0 snap-center sm:w-[60%] md:w-auto">
              <ClientCopyCard item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Complementary services as printed order lines. */
export function ServiceRelated({ serviceId }: { serviceId: string }) {
  const services = getRelatedServices(serviceId)
  if (services.length === 0) return null

  return (
    <section aria-labelledby="service-related-heading" className="border-t-2 border-pad-ink bg-pad-sheet">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 id="service-related-heading" className="font-pad-display text-4xl font-bold text-pad-ink">
          {related.title}
        </h2>
        <p className="mt-2 text-lg text-pad-ink-soft">{related.subtitle}</p>
        <ul className="mt-8 grid border-t-[3px] border-double border-pad-red md:grid-cols-3 md:gap-x-8">
          {services.map((item) => (
            <li key={item.id} className="border-b border-pad-rule">
              <Link href={`/services/${item.slug}`} className="group block py-5 transition-colors hover:bg-pad-yellow/30">
                <span className="block font-pad-display text-3xl font-bold leading-none text-pad-ink">{item.name}</span>
                <span className="mt-2 line-clamp-2 block text-base text-pad-ink-soft">{item.tagline}</span>
                <span className="mt-3 inline-flex items-center gap-2 font-pad-hand text-lg text-pad-ballpoint">
                  {related.more}
                  <PenArrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** A ballpoint arrow pointing onward (leftward in RTL). */
function PenArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 20"
      className="h-5 w-11 transition-transform duration-300 group-hover:-translate-x-1.5 motion-reduce:transition-none"
      fill="none"
    >
      <path d="M41 10.5c-9.5-.8-24.6.4-36.5-.3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11.5 3.5C8.8 6 6.6 8 4 10.2c2.9 2 5.2 4 7.6 6.3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type CloseChannel = 'whatsapp' | 'phone' | 'email'

/** The close: a slip on carbon with the channels as filled form lines. Anchor target for the hero CTA. */
export function ServiceClose({ service }: { service: Service }) {
  const pathname = usePathname() ?? `/services/${service.slug}`

  const lines: { key: CloseChannel; label: string; value: string; href: string; icon: LucideIcon; ltr?: boolean }[] = [
    {
      key: 'whatsapp',
      label: close.whatsappLabel,
      value: close.whatsappValue,
      href: buildWhatsAppUrl(`היי, אני מעוניין לשמוע עוד על ${service.name}`),
      icon: MessageCircle,
    },
    { key: 'phone', label: close.phoneLabel, value: close.phoneValue, href: PHONE_TEL_HREF, icon: Phone, ltr: true },
    {
      key: 'email',
      label: close.emailLabel,
      value: close.emailValue,
      href: 'mailto:itay@itayost.com?subject=פנייה%20לגבי%20שירות',
      icon: Mail,
      ltr: true,
    },
  ]

  // WhatsApp here is a real lead action, so it fires the same events as every
  // other WhatsApp entry point: contact_click, whatsapp_click and generate_lead.
  const track = (key: CloseChannel) => {
    trackContactClick(key, 'service_cta')
    if (key === 'whatsapp') {
      trackWhatsAppClick(pathname, 'service_cta')
      trackGenerateLead('whatsapp', pathname)
    } else if (key === 'phone') {
      trackPhoneClick(pathname, 'service_cta')
    }
  }

  return (
    <section id="contact" aria-labelledby="service-close-heading" className="scroll-mt-24 bg-pad-carbon text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="service-close-heading" className="font-pad-display text-7xl font-bold leading-[0.85] sm:text-8xl">
            {close.title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-xl leading-relaxed text-pad-carbon-ink">{close.body}</p>
        </div>

        <div
          className="pad-paper pad-perf-top relative px-6 pb-8 pt-7 text-pad-ink pad-sheet-shadow sm:px-10 lg:col-span-7 lg:-rotate-1"
          style={{ ['--pad-perf-ground' as string]: '#2B3FD6' }}
        >
          <div className="flex flex-col gap-1 border-b-[3px] border-double border-pad-red pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <span className="font-pad-display text-3xl font-bold leading-none text-pad-red">{servicePage.sheetTitle}</span>
            <span className="font-pad-display text-2xl leading-tight text-pad-red sm:text-end">{service.name}</span>
          </div>
          <ul className="mt-2">
            {lines.map(({ key, label, value, href, icon: Icon, ltr }) => (
              <li key={key} className="border-b border-pad-rule">
                <a
                  href={href}
                  {...(key === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => track(key)}
                  className="group flex min-h-16 items-center gap-4 py-3"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-pad-carbon" />
                  <span className="w-20 flex-shrink-0 text-base font-bold text-pad-red">{label}</span>
                  <span
                    dir={ltr ? 'ltr' : undefined}
                    className="text-lg font-bold text-pad-ink underline decoration-pad-red/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-pad-red sm:text-xl"
                  >
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => trackCtaClick(close.formLink, 'service_cta', '/contact')}
            className="group mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
          >
            {close.formLink}
            <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
