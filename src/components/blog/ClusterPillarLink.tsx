import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'

export interface PillarRef {
  title: string
  href: string
}

interface ClusterPillarLinkProps {
  // A post can belong to more than one cluster, so this accepts an array.
  pillars?: PillarRef[]
}

// Member-to-pillar backlink: renders near the top of a blog post, pointing
// readers (and crawlers, via SSR HTML) to the cluster's comprehensive guide.
export function ClusterPillarLink({ pillars }: ClusterPillarLinkProps) {
  if (!pillars || pillars.length === 0) return null

  return (
    <nav aria-label="מדריך מקיף בנושא" className="mb-10 border-y-[3px] border-double border-pad-red">
      {pillars.map((pillar) => (
        <Link
          key={pillar.href}
          href={pillar.href}
          className="group flex min-h-16 items-center gap-4 border-b border-pad-rule py-3 last:border-b-0"
        >
          <BookOpen aria-hidden="true" size={20} className="flex-shrink-0 text-pad-red" />
          <span className="flex-1">
            <span className="block text-sm font-bold text-pad-red">המדריך המלא</span>
            <span className="block text-lg font-bold text-pad-ink underline decoration-pad-carbon/25 decoration-2 underline-offset-4 transition-colors group-hover:decoration-pad-carbon">
              {pillar.title}
            </span>
          </span>
          <ArrowLeft
            aria-hidden="true"
            size={18}
            className="flex-shrink-0 text-pad-carbon transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      ))}
    </nav>
  )
}
