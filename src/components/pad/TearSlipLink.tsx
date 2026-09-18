'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type SlipTone = 'yellow' | 'sheet'

interface SlipCommonProps {
  children: ReactNode
  stamp?: string
  tone?: SlipTone
  className?: string
  /** Colour behind the slip, used to punch the perforation holes. */
  groundColor?: string
  /** Replace the arrow with another icon (e.g. a loading spinner). */
  icon?: ReactNode
}

interface TearSlipLinkProps extends SlipCommonProps {
  href: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

type TearSlipButtonProps = SlipCommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

const TONE_CLASS: Record<SlipTone, string> = {
  yellow: 'bg-pad-yellow text-pad-ink',
  sheet: 'bg-pad-sheet text-pad-ink',
}

const SLIP_CLASS =
  'pad-perf-top pad-focus group relative inline-flex min-h-[3.5rem] items-center gap-4 ps-6 pe-5 py-4 no-underline pad-sheet-shadow transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:-rotate-1 motion-reduce:transition-none motion-reduce:hover:transform-none'

function SlipInner({ children, stamp, icon }: Pick<SlipCommonProps, 'children' | 'stamp' | 'icon'>) {
  return (
    <>
      <span className="text-lg font-bold leading-tight sm:whitespace-nowrap sm:text-xl">{children}</span>
      {icon ?? (
        <ArrowLeft
          aria-hidden="true"
          className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
        />
      )}
      {stamp && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-5 end-3 rotate-[-7deg] border-2 border-pad-red bg-pad-yellow px-2.5 pb-0.5 pt-1 font-pad-display text-2xl font-bold leading-none text-pad-red"
        >
          {stamp}
        </span>
      )}
      {/* Lifting corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 end-0 h-5 w-5 origin-bottom-left scale-0 bg-pad-ink/20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:polygon(0_0,100%_100%,0_100%)] group-hover:scale-100 motion-reduce:transition-none"
      />
    </>
  )
}

/**
 * The primary action as a tear-off slip: perforated along its top edge,
 * with a corner that lifts on hover the way a slip starts to come away
 * from the pad. Adapted from the 21st.dev coupon peel pattern.
 */
export function TearSlipLink({
  href,
  children,
  onClick,
  stamp,
  tone = 'yellow',
  className = '',
  groundColor = '#2B3FD6',
  icon,
}: TearSlipLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ ['--pad-perf-ground' as string]: groundColor }}
      className={`${SLIP_CLASS} ${TONE_CLASS[tone]} ${className}`}
    >
      <SlipInner stamp={stamp} icon={icon}>
        {children}
      </SlipInner>
    </Link>
  )
}

/** The same slip as a form button. */
export function TearSlipButton({
  children,
  stamp,
  tone = 'yellow',
  className = '',
  groundColor = '#FBFBF8',
  icon,
  type = 'button',
  ...buttonProps
}: TearSlipButtonProps) {
  return (
    <button
      type={type}
      style={{ ['--pad-perf-ground' as string]: groundColor }}
      className={`${SLIP_CLASS} disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:rotate-0 ${TONE_CLASS[tone]} ${className}`}
      {...buttonProps}
    >
      <SlipInner stamp={stamp} icon={icon}>
        {children}
      </SlipInner>
    </button>
  )
}
