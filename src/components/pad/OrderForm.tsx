'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllServicesSorted } from '@/data/services'
import { home } from '@/config/home'
import { trackCtaClick } from '@/lib/analytics'

const { services } = home
const SYSTEM_SLUGS = new Set(['crm-systems', 'automations'])

/** A ballpoint tick, drawn once per systems line. */
function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="absolute -top-2 start-0 h-9 w-9 text-pad-ballpoint" fill="none">
      <path d="M5 17c3 2 6 6 8 9 4-9 9-17 15-23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Services as a printed order form on the yellow copy. */
export function OrderForm() {
  const serviceList = getAllServicesSorted()

  return (
    <section aria-labelledby="services-heading" className="bg-pad-yellow">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="services-heading" className="font-pad-display text-6xl font-bold leading-[0.9] text-pad-ink sm:text-7xl">
              {services.title}
            </h2>
            <p className="mt-5 max-w-[36ch] text-xl leading-relaxed text-pad-ink">{services.intro}</p>
            <Link
              href="/services"
              onClick={() => trackCtaClick(services.allLabel, 'services', '/services')}
              className="group mt-8 inline-flex items-center gap-2 border-2 border-pad-ink px-5 py-3 text-lg font-bold text-pad-ink transition-colors hover:bg-pad-ink hover:text-pad-yellow"
            >
              {services.allLabel}
              <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <ol className="border-t-[3px] border-double border-pad-red lg:col-span-8">
            {serviceList.map((service) => (
              <li key={service.id} className="border-b border-pad-red/50">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-start gap-x-4 py-5 transition-colors hover:bg-pad-ink/[0.04] sm:py-6"
                >
                  <span aria-hidden="true" className="relative mt-1 block h-7 w-7 border-2 border-pad-ink">
                    {SYSTEM_SLUGS.has(service.slug) && <Tick />}
                  </span>
                  <span>
                    <span className="block font-pad-display text-3xl font-bold leading-none text-pad-ink sm:text-4xl">
                      {service.name}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-lg leading-snug text-pad-ink/80">{service.tagline}</span>
                  </span>
                  <ArrowLeft
                    aria-hidden="true"
                    className="mt-2 h-6 w-6 text-pad-ink transition-transform duration-300 group-hover:-translate-x-2"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
