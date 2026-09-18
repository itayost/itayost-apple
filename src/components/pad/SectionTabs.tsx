'use client'

import { useMemo } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

export interface SectionTab {
  id: string
  label: string
  count?: number
}

interface SectionTabsProps {
  tabs: SectionTab[]
  ariaLabel: string
  /** Extra classes on the sticky wrapper, e.g. to hide the bar on desktop. */
  className?: string
}

/**
 * Divider tabs that know which section you are reading. The active tab breaks
 * through the double red rule the way a pulled divider sits proud of the pad.
 * Falls back to plain anchors before hydration, so the jumps work without JS.
 */
export function SectionTabs({ tabs, ariaLabel, className = '' }: SectionTabsProps) {
  const ids = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const activeId = useActiveSection(ids)

  return (
    <nav
      aria-label={ariaLabel}
      className={`sticky top-16 z-30 border-b-[3px] border-double border-pad-red bg-pad-sheet lg:top-20 ${className}`}
    >
      <div className="mx-auto max-w-3xl px-5 pt-3 sm:px-8">
        <div className="pad-scroll-x -mb-[3px] flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`flex min-h-11 flex-shrink-0 items-center gap-2 border-2 border-b-0 px-4 pb-2 pt-2.5 text-base font-bold transition-colors ${
                  isActive
                    ? 'border-pad-red bg-pad-sheet text-pad-ink'
                    : 'border-pad-ink/20 bg-pad-sheet/60 text-pad-ink-soft hover:border-pad-ink/50 hover:text-pad-ink'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="font-pad-display text-lg leading-none text-pad-red">{tab.count}</span>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
