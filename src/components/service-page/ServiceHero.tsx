'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import type { Service } from '@/data/services'
import { servicePage } from '@/config/servicePage'
import { trackCtaClick, trackServiceView } from '@/lib/analytics'
import { PadBreadcrumbs } from '@/components/pad/PadBreadcrumbs'
import { TearSlipLink } from '@/components/pad/TearSlipLink'
import { PenTick } from '@/components/pad/PenTick'

const NAV_OFFSET = 96 // fixed nav height plus breathing room
const SHEET_ITEMS = 4

interface ServiceHeroProps {
  service: Service
  hasWork: boolean
}

// Smooth-scroll to an in-page section so every click produces a visible change
// (a far-away hash jump can read as a dead click), and keep the hash in sync.
function scrollToSection(targetId: string, label: string, event: React.MouseEvent<HTMLAnchorElement>) {
  trackCtaClick(label, 'service_hero', `#${targetId}`)
  const target = document.getElementById(targetId)
  if (!target) return
  event.preventDefault()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
    behavior: reducedMotion ? 'auto' : 'smooth',
  })
  window.history.replaceState(null, '', `#${targetId}`)
}

/** Carbon hero: the service promise and action, with a tilted order sheet of what is included. */
export function ServiceHero({ service, hasWork }: ServiceHeroProps) {
  useEffect(() => {
    trackServiceView(service.name, service.slug)
  }, [service.name, service.slug])

  const updated = service.lastUpdated
    ? new Date(service.lastUpdated).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
    : null
  const sheetItems = service.features.slice(0, SHEET_ITEMS)
  const remaining = service.features.length - sheetItems.length

  return (
    <section aria-labelledby="service-heading" className="bg-pad-carbon text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-24 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-28 lg:pt-32">
        <div className="lg:col-span-7">
          <PadBreadcrumbs
            homeLabel={servicePage.breadcrumbHome}
            items={[{ label: servicePage.breadcrumbServices, href: '/services' }, { label: service.name }]}
          />
          <h1
            id="service-heading"
            className="mt-6 font-pad-display text-[clamp(3.25rem,2rem+4vw,5.5rem)] font-bold leading-[0.9] [text-wrap:balance]"
          >
            {service.name}
          </h1>
          <p className="mt-5 max-w-[36ch] text-2xl font-semibold leading-snug text-pad-yellow">{service.tagline}</p>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-pad-carbon-ink">{service.description}</p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <TearSlipLink
              href="#contact"
              stamp={servicePage.replyStamp}
              onClick={(event) => scrollToSection('contact', service.cta.primary, event)}
            >
              {service.cta.primary}
            </TearSlipLink>
            {hasWork ? (
              <a
                href="#portfolio"
                onClick={(event) => scrollToSection('portfolio', service.cta.secondary, event)}
                className="inline-flex min-h-11 items-center whitespace-nowrap text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] transition-colors hover:text-pad-yellow"
              >
                {service.cta.secondary}
              </a>
            ) : (
              <Link
                href="/portfolio"
                onClick={() => trackCtaClick(service.cta.secondary, 'service_hero', '/portfolio')}
                className="inline-flex min-h-11 items-center whitespace-nowrap text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] transition-colors hover:text-pad-yellow"
              >
                {service.cta.secondary}
              </Link>
            )}
          </div>
          {updated && (
            <p className="mt-8 text-sm text-pad-carbon-ink">
              {servicePage.updatedLabel}: {updated}
            </p>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="pad-paper relative px-6 pb-7 pt-5 text-pad-ink pad-sheet-shadow sm:px-8 lg:rotate-[1.5deg]">
            <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60" />
            <div className="flex items-end justify-between gap-4 border-b-[3px] border-double border-pad-red pb-2 ps-4">
              <p className="font-pad-display text-3xl font-bold leading-none text-pad-ink">{service.name}</p>
              <p className="flex-shrink-0 font-pad-display text-xl leading-none text-pad-red">
                {servicePage.sheetTitle}
              </p>
            </div>
            <div className="pad-ruled [--pad-line:3.5rem]">
              <ul className="ps-4">
                {sheetItems.map((feature) => (
                  <li key={feature.title} className="flex h-14 items-center gap-3">
                    <span aria-hidden="true" className="relative h-6 w-6 flex-shrink-0 border-2 border-pad-ink">
                      <PenTick />
                    </span>
                    <span className="truncate text-lg font-bold">{feature.title}</span>
                  </li>
                ))}
              </ul>
              {remaining > 0 && (
                <p className="flex h-14 items-center ps-4 font-pad-hand text-xl text-pad-ballpoint">
                  {servicePage.sheetMore} {remaining}...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
