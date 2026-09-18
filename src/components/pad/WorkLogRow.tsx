'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { trackPortfolioClick } from '@/lib/analytics'
import type { WorkLogEntry } from '@/config/clientsPage'

interface WorkLogRowProps {
  entry: WorkLogEntry
}

/** One delivered project as a ruled line in the pad's work log. */
export function WorkLogRow({ entry }: WorkLogRowProps) {
  return (
    <li className="border-b border-pad-rule">
      <Link
        href={`/portfolio/${entry.slug}`}
        onClick={() => trackPortfolioClick(entry.title, entry.category)}
        className="group grid gap-x-6 gap-y-2 py-5 transition-colors hover:bg-pad-yellow/25 md:grid-cols-12 md:items-baseline"
      >
        <h3 className="font-pad-display text-3xl font-bold leading-none text-pad-ink md:col-span-3 lg:text-4xl">
          {entry.client}
        </h3>
        <p className="text-lg leading-snug text-pad-ink-soft md:col-span-5">
          <span className="font-bold text-pad-ink">{entry.built}</span> — {entry.subtitle}
        </p>
        <span className="justify-self-start border border-pad-red px-1.5 text-sm font-bold text-pad-red md:col-span-2">
          {entry.field}
        </span>
        {/* The log records when: the year it was delivered and how long it ran */}
        <span className="flex items-baseline gap-2 font-pad-hand text-lg text-pad-ballpoint md:col-span-2 md:justify-end">
          {entry.duration}
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 self-center text-pad-carbon transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </Link>
    </li>
  )
}
