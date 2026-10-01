'use client'

import { useId, useState, type ReactNode } from 'react'
import { PenCross } from '@/components/pad/PenCross'
import { servicePage } from '@/config/servicePage'

interface MoreLinesProps {
  count: number
  children: ReactNode
}

/**
 * The rest of a long note, folded away on phones only. The lines stay in the
 * HTML at every width; from `sm` they are always shown and the fold disappears.
 */
export function MoreLines({ count, children }: MoreLinesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const regionId = useId()

  return (
    <>
      <div id={regionId} className={isOpen ? undefined : 'max-sm:hidden'}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={regionId}
        onClick={() => setIsOpen((open) => !open)}
        className="grid min-h-14 w-full grid-cols-[1fr_1.75rem] items-center gap-x-4 border-b border-pad-rule py-3 text-start sm:hidden"
      >
        <span className="text-lg font-bold text-pad-carbon">
          {isOpen ? servicePage.readLess : servicePage.readMore}
          {!isOpen && (
            <span className="ms-2 font-normal text-pad-ink-soft">
              ({count} {servicePage.readMoreUnit})
            </span>
          )}
        </span>
        <span aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}>
          <PenCross />
        </span>
      </button>
    </>
  )
}
