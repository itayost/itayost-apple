'use client'

import { useMemo } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

export interface MarginIndexItem {
  id: string
  title: string
}

interface MarginIndexProps {
  title: string
  items: MarginIndexItem[]
}

/**
 * The document's clauses listed in the margin, with the clause you are reading
 * marked by the pen: a ballpoint rule down its inline-start edge and the number
 * in red. On a long document this is the only thing that says where you are.
 */
export function MarginIndex({ title, items }: MarginIndexProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const activeId = useActiveSection(ids)

  return (
    <div className="sticky top-28">
      <p className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-2xl font-bold leading-none text-pad-ink">
        {title}
      </p>
      <ol>
        {items.map((item, index) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="border-b border-pad-rule">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`flex min-h-11 items-baseline gap-3 border-s-2 py-2 ps-3 text-base transition-colors ${
                  isActive
                    ? 'border-pad-ballpoint font-bold text-pad-ink'
                    : 'border-transparent font-bold text-pad-ink-soft hover:text-pad-carbon'
                }`}
              >
                <span
                  aria-hidden="true"
                  dir="ltr"
                  className={`font-pad-display text-lg leading-none ${isActive ? 'text-pad-red' : 'text-pad-red/50'}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.title}
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
