import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'

export interface ClusterMember {
  slug: string
  title: string
  description: string
  readTime: string
}

interface ClusterMemberListProps {
  members: ClusterMember[]
}

// Ordered reading path of a pillar guide's cluster posts. The numbering is
// deliberate: it mirrors the ItemList JSON-LD and signals topical hierarchy.
// Pad world: the path is printed as numbered order lines, not cards.
export function ClusterMemberList({ members }: ClusterMemberListProps) {
  if (members.length === 0) return null

  return (
    <section aria-label="מסלול קריאה" className="my-12">
      <h2 className="font-pad-display text-4xl font-bold leading-none text-pad-ink">מסלול הקריאה המלא</h2>
      <ol className="mt-5 border-t-[3px] border-double border-pad-red">
        {members.map((member, index) => (
          <li key={member.slug} className="border-b border-pad-rule">
            <Link
              href={`/blog/${member.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-4 transition-colors hover:bg-pad-yellow/25"
            >
              <span aria-hidden="true" className="font-pad-display text-3xl font-bold leading-none text-pad-red">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold leading-snug text-pad-ink">{member.title}</span>
                <span className="mt-1 line-clamp-2 block text-base text-pad-ink-soft">{member.description}</span>
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap text-sm text-pad-ink-soft">
                <Clock aria-hidden="true" size={14} />
                {member.readTime}
                <ArrowLeft
                  aria-hidden="true"
                  size={16}
                  className="text-pad-carbon transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
