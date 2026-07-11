'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5, ease: bouncyEasing }}
      className="mb-10 space-y-3"
    >
      {pillars.map(pillar => (
        <Link
          key={pillar.href}
          href={pillar.href}
          className="group flex items-center gap-3 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 px-5 py-4 transition-colors hover:bg-brand-blue/10"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white">
            <BookOpen size={18} />
          </span>
          <span className="flex-1 text-brand-navy">
            <span className="block text-xs font-semibold text-brand-blue">
              המאמר הזה הוא חלק מהמדריך המלא
            </span>
            <span className="font-bold group-hover:text-brand-blue transition-colors">
              {pillar.title}
            </span>
          </span>
          <ArrowLeft size={18} className="flex-shrink-0 text-brand-blue transition-transform group-hover:-translate-x-1" />
        </Link>
      ))}
    </motion.div>
  )
}
