'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { portfolioCategories, portfolioData } from '@/data/portfolio'
import { portfolioPage } from '@/config/portfolioPage'
import { trackCtaClick } from '@/lib/analytics'
import { ClientCopyCard } from '@/components/pad/ClientCopyCard'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

const { index: copy } = portfolioPage

/**
 * Leading copies span two columns so every row fills: on the 3-column grid
 * (3 - n % 3) % 3 copies go wide, alternating with single copies, on the 2-column grid the first copy
 * goes wide when the count is odd. No copy is ever left alone on a row.
 */
function wideCopyClass(position: number, count: number): string {
  if (count < 2) return ''
  const isWideOnSmall = count % 2 === 1 && position === 0
  // Each wide copy shares its row with one single copy, so wide copies sit at
  // every other position from the start: 0, 2, ...
  const wideOnLargeCount = (3 - (count % 3)) % 3
  const isWideOnLarge = position % 2 === 0 && position / 2 < wideOnLargeCount
  const classes: string[] = []
  if (isWideOnSmall) classes.push('sm:col-span-2')
  if (isWideOnLarge) classes.push('lg:col-span-2')
  else if (isWideOnSmall) classes.push('lg:col-span-1')
  return classes.join(' ')
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const gridRef = useRef<HTMLElement | null>(null)

  // Only show tabs for categories that actually have projects; "all" stays first.
  const availableCategories = useMemo(
    () => portfolioCategories.filter((c) => c.id === 'all' || portfolioData.some((p) => p.category === c.id)),
    [],
  )
  const countFor = (categoryId: string) =>
    categoryId === 'all' ? portfolioData.length : portfolioData.filter((p) => p.category === categoryId).length

  const filteredProjects =
    selectedCategory === 'all' ? portfolioData : portfolioData.filter((p) => p.category === selectedCategory)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // Bring the copies into view so a mobile visitor (tabs sticky, grid below the
    // fold) sees the result immediately; filtered results render without delay.
    requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gridRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  }

  return (
    <div className="pad-world">
      <section aria-labelledby="portfolio-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-20 lg:pt-36">
          <div className="lg:col-span-7">
          <h1
            id="portfolio-heading"
            className="font-pad-display text-[clamp(3.75rem,2rem+5.5vw,6.5rem)] font-bold leading-[0.88] [text-wrap:balance]"
          >
            {copy.title.map((line, lineIndex) => (
              <span key={line} className={`block ${lineIndex === 1 ? 'text-pad-yellow' : ''}`}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[48ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">{copy.subtitle}</p>
          </div>

          {/* The pad's own index sheet: how many copies are filed under each tab */}
          <div className="pad-paper pad-sheet-shadow relative px-6 pb-6 pt-5 text-pad-ink sm:px-8 lg:col-span-5 lg:rotate-[1.2deg]">
            <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60" />
            <p className="border-b-[3px] border-double border-pad-red pb-2 ps-4 font-pad-display text-3xl font-bold leading-none text-pad-ink">
              {copy.sheetTitle}
            </p>
            <dl className="ps-4">
              {availableCategories
                .filter((category) => category.id !== 'all')
                .map((category) => (
                  <div key={category.id} className="flex items-baseline justify-between gap-4 border-b border-pad-rule py-2.5">
                    <dt className="text-lg font-bold">{category.label}</dt>
                    <dd className="font-pad-hand text-xl text-pad-ballpoint">{countFor(category.id)}</dd>
                  </div>
                ))}
              <div className="flex items-baseline justify-between gap-4 py-2.5 ps-0">
                <dt className="text-lg font-bold text-pad-red">{copy.sheetTotalLabel}</dt>
                <dd className="font-pad-display text-3xl leading-none text-pad-red">{portfolioData.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Divider tabs, sticky under the site header */}
      <div className="sticky top-16 z-30 border-b-[3px] border-double border-pad-red bg-pad-sheet lg:top-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5 pt-3 sm:px-8">
          <div role="group" aria-label={copy.filterLabel} className="pad-scroll-x -mb-[3px] flex gap-1 overflow-x-auto">
            {availableCategories.map((category) => {
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex min-h-11 flex-shrink-0 items-center gap-2 border-2 border-b-0 px-4 pb-2 pt-2.5 text-base font-bold transition-colors ${
                    isActive
                      ? 'border-pad-red bg-pad-pink text-pad-ink'
                      : 'border-pad-ink/20 bg-pad-sheet text-pad-ink-soft hover:border-pad-ink/50 hover:text-pad-ink'
                  }`}
                >
                  {category.label}
                  <span className="font-pad-display text-lg leading-none text-pad-red">{countFor(category.id)}</span>
                </button>
              )
            })}
          </div>
          <p aria-live="polite" className="hidden flex-shrink-0 pb-2 font-pad-hand text-lg text-pad-ballpoint sm:block">
            {filteredProjects.length === 1 ? copy.countOne : copy.countMany(filteredProjects.length)}
          </p>
        </div>
      </div>

      <section ref={gridRef} aria-label={copy.filterLabel} className="scroll-mt-40 bg-pad-pink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-xl text-pad-ink">{copy.empty}</p>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="mt-6 min-h-11 border-2 border-pad-ink px-5 py-2 text-lg font-bold text-pad-ink transition-colors hover:bg-pad-ink hover:text-pad-pink"
              >
                {copy.showAll}
              </button>
            </div>
          ) : (
            // items-start: a copy is as tall as its content, never stretched to leave blank paper
            <ul className="grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, position) => (
                <li key={project.slug} className={wideCopyClass(position, filteredProjects.length)}>
                  <ClientCopyCard item={project} index={position} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="portfolio-close-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <div>
            <h2 id="portfolio-close-heading" className="font-pad-display text-6xl font-bold leading-[0.88] sm:text-7xl">
              {copy.closeTitle}
            </h2>
            <p className="mt-5 max-w-[44ch] text-xl leading-relaxed text-pad-carbon-ink">{copy.closeBody}</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <TearSlipLink href="/contact" onClick={() => trackCtaClick(copy.closeCta, 'portfolio', '/contact')}>
              {copy.closeCta}
            </TearSlipLink>
            <Link
              href="/services"
              onClick={() => trackCtaClick(copy.closeServices, 'portfolio', '/services')}
              className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] hover:text-pad-yellow"
            >
              {copy.closeServices}
              <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
