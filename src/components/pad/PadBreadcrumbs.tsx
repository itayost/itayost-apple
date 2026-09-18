import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'

export interface PadCrumb {
  label: string
  href?: string
}

interface PadBreadcrumbsProps {
  items: PadCrumb[]
  homeLabel: string
  /** Carbon field (light text) or paper (ink text). */
  ground?: 'carbon' | 'paper'
}

/** Breadcrumbs for pad-world pages, set in the plain body voice. */
export function PadBreadcrumbs({ items, homeLabel, ground = 'carbon' }: PadBreadcrumbsProps) {
  const linkClass =
    ground === 'carbon'
      ? 'text-pad-carbon-ink hover:text-white decoration-pad-yellow'
      : 'text-pad-ink-soft hover:text-pad-ink decoration-pad-red'
  const currentClass = ground === 'carbon' ? 'text-white' : 'text-pad-ink'

  return (
    <nav aria-label="ניווט פירורי לחם" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" aria-label={homeLabel} className={`flex min-h-8 items-center transition-colors ${linkClass}`}>
            <Home aria-hidden="true" size={16} />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              <ChevronLeft aria-hidden="true" size={14} className="text-pad-carbon-ink/70" />
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={`font-bold ${currentClass}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`underline decoration-2 underline-offset-4 transition-colors ${linkClass}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
