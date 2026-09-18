'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import Link from 'next/link'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { home } from '@/config/home'
import { trackCtaClick } from '@/lib/analytics'
import { TearSlipLink } from './TearSlipLink'
import { ChaosSheet } from './OrderSheets'
import { ManagerApp } from './ManagerApp'

const { hero } = home
const DESKTOP_QUERY = '(min-width: 1024px)'

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return isDesktop
}

interface PadProps {
  sectionRef: RefObject<HTMLElement>
  isDesktop: boolean
}

/**
 * The pad. One scroll-linked timeline lifts the scrawled top sheet around its
 * binding to reveal the carbon copy underneath. Desktop pins the hero while the
 * sheet lifts; mobile lifts as the pad passes through the viewport.
 * Scroll-stack mechanics adapted from the 21st.dev animated cards stack.
 */
function Pad({ sectionRef, isDesktop }: PadProps) {
  const padRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const { scrollYProgress: padProgress } = useScroll({
    target: padRef,
    offset: ['start 0.95', 'start 0.05'],
  })
  // The source is fixed for the life of this mount; PadHero remounts the pad
  // (keyed on the layout) when the viewport crosses the desktop breakpoint.
  const progress = isDesktop ? sectionProgress : padProgress

  // Desktop pins the hero, so the lift can start immediately. A phone has the
  // pad partly below the fold at rest, so the lift starts later: the sheet is
  // still flat when it first comes into view, and it peels while the pad sits
  // in the middle of the screen rather than at the bottom edge.
  // On a phone the pad is already a third of the way through this range when
  // the page loads, so the lift starts well past that: the sheet is flat while
  // it comes into view and peels once the pad fills the screen.
  const LIFT = isDesktop ? [0.08, 0.62] : [0.45, 0.95]
  const EDGE_ON = isDesktop ? [0.5, 0.56] : [0.86, 0.92]
  const COPY_LIFT = isDesktop ? [0.3, 0.75] : [0.72, 1]
  const REVEAL_AT = isDesktop ? 0.38 : 0.8

  // Rows of the CRM play in once the sheet is mostly up; they stay in afterwards.
  const [isRevealed, setIsRevealed] = useState(false)
  useMotionValueEvent(progress, 'change', (value) => {
    if (value > REVEAL_AT) setIsRevealed(true)
  })

  const rotateX = useTransform(progress, LIFT, [0, 104])
  // Fade out as the sheet passes edge-on so its mirrored back never shows through.
  const sheetOpacity = useTransform(progress, EDGE_ON, [1, 0])
  const copyLift = useTransform(progress, COPY_LIFT, [10, 0])
  const shadowFilter = useTransform(
    progress,
    (value) => `drop-shadow(0 18px 22px rgba(8,14,70,${Math.max(0, 0.55 - Math.max(0, value - 0.08) * 1.5)}))`,
  )

  if (prefersReducedMotion) {
    return (
      <div ref={padRef} className="relative mx-auto grid w-full max-w-xl gap-6">
        <div className="h-[20rem] -rotate-1 pad-sheet-shadow">
          <ChaosSheet />
        </div>
        <ManagerApp isRevealed />
      </div>
    )
  }

  return (
    <div ref={padRef} className="relative mx-auto w-full max-w-xl [perspective:1400px] lg:max-w-2xl">
      {/* The pad's binding leaves with its sheet, so the software screen stands on its own. */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: sheetOpacity }}
        className="relative z-30 mx-auto h-5 w-full bg-pad-carbon-deep shadow-[0_4px_8px_rgba(0,0,0,0.35)] lg:w-[103%] lg:-translate-x-[1.5%]"
      >
        {/* Staples through the binding */}
        <span className="absolute start-[22%] top-1.5 h-1.5 w-8 bg-[#B8BDD8] shadow-[0_1px_0_rgba(0,0,0,0.4)]" />
        <span className="absolute end-[22%] top-1.5 h-1.5 w-8 bg-[#B8BDD8] shadow-[0_1px_0_rgba(0,0,0,0.4)]" />
      </motion.div>
      <div className="relative">
        {/* The chaos sheet needs its full height on phones, where the scaled app is shorter than the sheet. */}
        <motion.div style={{ y: copyLift }} className="relative z-0 grid min-h-[24rem] items-center sm:min-h-0">
          <ManagerApp isRevealed={isRevealed} />
        </motion.div>
        <motion.div
          style={{ rotate: -1.5, rotateX, opacity: sheetOpacity, filter: shadowFilter, transformOrigin: 'top center' }}
          className="absolute inset-0 z-20 will-change-transform [backface-visibility:hidden]"
        >
          <ChaosSheet />
        </motion.div>
      </div>
    </div>
  )
}

export function PadHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="relative bg-pad-carbon text-white lg:h-[185vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-20 sm:gap-14 sm:px-8 sm:pb-20 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-10 lg:pt-24">
          <div className="lg:col-span-6 xl:col-span-5 xl:pe-2">
            <div className="mb-6 flex items-end justify-between gap-4 border-y-[3px] border-double border-pad-carbon-ink/60 py-2 text-pad-carbon-ink">
              <span className="font-pad-display text-2xl leading-none sm:text-3xl">{hero.formTitle}</span>
              <span className="font-pad-display text-2xl leading-none text-pad-yellow sm:text-3xl" dir="ltr">
                No. {hero.formNumber}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] text-white [text-wrap:balance]"
            >
              {hero.title.map((line, index) => (
                <span key={line} className={`block ${index === 1 ? 'text-pad-yellow' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-[34ch] text-xl font-semibold text-white sm:mt-6 sm:text-2xl">{hero.subtitle}</p>
            <p className="mt-3 max-w-[46ch] text-lg leading-relaxed text-pad-carbon-ink">{hero.lead}</p>

            <div className="mt-7 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
              <TearSlipLink
                href="/contact"
                stamp={hero.replyStamp}
                onClick={() => trackCtaClick(hero.ctaPrimary, 'hero', '/contact')}
              >
                {hero.ctaPrimary}
              </TearSlipLink>
              <Link
                href="/portfolio"
                onClick={() => trackCtaClick(hero.ctaSecondary, 'hero', '/portfolio')}
                className="inline-flex min-h-11 items-center whitespace-nowrap text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] transition-colors hover:text-pad-yellow"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7 xl:ps-4">
            <Pad key={isDesktop ? 'desktop' : 'mobile'} sectionRef={sectionRef} isDesktop={isDesktop} />
          </div>
        </div>
      </div>
    </section>
  )
}
