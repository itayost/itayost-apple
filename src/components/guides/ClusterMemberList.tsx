'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ArrowLeft } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

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
export function ClusterMemberList({ members }: ClusterMemberListProps) {
  if (members.length === 0) return null

  return (
    <section aria-label="מסלול קריאה" className="my-12">
      <h2 className="mb-6 text-2xl font-bold text-brand-navy">
        מסלול הקריאה המלא
      </h2>
      <ol className="space-y-4">
        {members.map((member, index) => (
          <motion.li
            key={member.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: bouncyEasing }}
          >
            <Link
              href={`/blog/${member.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-brand-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 font-bold text-brand-blue">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                  {member.title}
                </span>
                <span className="mt-1 block text-sm text-brand-gray-600 line-clamp-2">
                  {member.description}
                </span>
                <span className="mt-2 flex items-center gap-1.5 text-xs text-brand-gray-500">
                  <Clock size={12} />
                  {member.readTime}
                </span>
              </span>
              <ArrowLeft size={18} className="mt-1 flex-shrink-0 text-brand-blue transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
