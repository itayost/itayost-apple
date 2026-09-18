'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPortfolioBySlug, type PortfolioItem } from '@/data/portfolio'
import { home } from '@/config/home'
import { trackCtaClick } from '@/lib/analytics'
import { ClientCopyCard } from './ClientCopyCard'

const { work } = home

// Grid placement: three systems lead as full copies, the rest are filed smaller.
const LAYOUT = [
  { span: 'lg:col-span-4', size: 'lead' },
  { span: 'lg:col-span-4', size: 'lead' },
  { span: 'lg:col-span-4', size: 'lead' },
  { span: 'lg:col-span-6', size: 'filed' },
  { span: 'lg:col-span-3', size: 'filed' },
  { span: 'lg:col-span-3', size: 'filed' },
] as const
const DEFAULT_LAYOUT = { span: 'lg:col-span-4', size: 'filed' } as const

/** Real client projects as filed copies from the pad, stapled, each with its copy number. */
export function ClientCopies() {
  const items = work.slugs
    .map((slug) => getPortfolioBySlug(slug))
    .filter((item): item is PortfolioItem => Boolean(item))

  return (
    <section aria-labelledby="work-heading" className="bg-pad-pink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 id="work-heading" className="font-pad-display text-6xl font-bold leading-[0.9] text-pad-ink sm:text-7xl">
              {work.title}
            </h2>
            <p className="mt-5 max-w-[50ch] text-xl leading-relaxed text-pad-ink">{work.intro}</p>
          </div>
          <Link
            href="/portfolio"
            onClick={() => trackCtaClick(work.allLabel, 'portfolio', '/portfolio')}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-lg font-bold text-pad-ink underline decoration-pad-red decoration-2 underline-offset-[6px] md:self-auto"
          >
            {work.allLabel}
            <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <ul className="pad-scroll-x -mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-4 md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:overflow-visible md:px-0 lg:grid-cols-12">
          {items.map((item, index) => {
            const layout = LAYOUT[index] ?? DEFAULT_LAYOUT
            const isLead = layout.size === 'lead'
            return (
              <li key={item.slug} className={`w-[82%] flex-shrink-0 snap-center sm:w-[60%] md:w-auto ${layout.span} ${isLead ? '' : 'lg:self-start'}`}>
                <ClientCopyCard
                  item={item}
                  index={index}
                  size={layout.size}
                  sizes={isLead ? '(min-width: 1024px) 400px, (min-width: 768px) 45vw, 80vw' : '(min-width: 1024px) 560px, (min-width: 768px) 45vw, 80vw'}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
