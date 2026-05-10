'use client'

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CardCarouselProps {
  children: ReactNode
  className?: string
  prevLabel?: string
  nextLabel?: string
}

/**
 * Tailwind classes for each direct child of <CardCarousel>. Apply this
 * to the element whose width should snap (motion.div, Link, etc.).
 *
 * Widths give a peek of the next card at every breakpoint:
 *   - mobile: 1-up at 85%
 *   - md (>=768px): 2-up at 47%
 *   - lg (>=1024px): 3-up at 31%
 */
export const cardCarouselItemClass =
  'flex-shrink-0 basis-[85%] md:basis-[47%] lg:basis-[31%] snap-start'

/** 4-up density at lg+. Use when the original grid was 4-col. */
export const cardCarouselItemClass4Up =
  'flex-shrink-0 basis-[85%] md:basis-[47%] lg:basis-[23%] snap-start'

export function CardCarousel({
  children,
  className = '',
  prevLabel = 'הקודם',
  nextLabel = 'הבא',
}: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollability = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    // RTL browsers report negative scrollLeft when scrolled toward end; LTR positive.
    const scrolled = Math.abs(el.scrollLeft)
    const nextPrev = scrolled > 1
    const nextNext = max > 1 && scrolled < max - 1
    setCanScrollPrev((cur) => (cur === nextPrev ? cur : nextPrev))
    setCanScrollNext((cur) => (cur === nextNext ? cur : nextNext))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollability()
    el.addEventListener('scroll', updateScrollability, { passive: true })
    window.addEventListener('resize', updateScrollability)
    const ro = new ResizeObserver(updateScrollability)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollability)
      window.removeEventListener('resize', updateScrollability)
      ro.disconnect()
    }
  }, [updateScrollability])

  const scrollByCard = (dir: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const firstCard = el.firstElementChild as HTMLElement | null
    if (!firstCard) return
    const cardWidth = firstCard.getBoundingClientRect().width
    const gap =
      parseFloat(getComputedStyle(el).columnGap) ||
      parseFloat(getComputedStyle(el).gap) ||
      16
    const step = cardWidth + gap
    const isRtl = getComputedStyle(el).direction === 'rtl'
    const sign = (dir === 'next' ? 1 : -1) * (isRtl ? -1 : 1)
    el.scrollBy({ left: step * sign, behavior: 'smooth' })
  }

  return (
    <div className={`group relative ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0"
      >
        {children}
      </div>

      {/* Prev sits on the physical right in RTL (the "earlier" side). */}
      <ArrowButton
        side="right"
        disabled={!canScrollPrev}
        onClick={() => scrollByCard('prev')}
        label={prevLabel}
      />
      <ArrowButton
        side="left"
        disabled={!canScrollNext}
        onClick={() => scrollByCard('next')}
        label={nextLabel}
      />
    </div>
  )
}

function ArrowButton({
  side,
  disabled,
  onClick,
  label,
}: {
  side: 'left' | 'right'
  disabled: boolean
  onClick: () => void
  label: string
}) {
  const Icon = side === 'right' ? ChevronRight : ChevronLeft
  const position = side === 'right' ? 'right-2 lg:right-3' : 'left-2 lg:left-3'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${position} z-10 h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none hover:scale-105 hover:bg-white`}
    >
      <Icon className="h-5 w-5 text-brand-navy" aria-hidden="true" />
    </button>
  )
}
