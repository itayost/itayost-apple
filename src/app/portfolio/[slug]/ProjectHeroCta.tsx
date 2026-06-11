'use client'

import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { trackOutboundClick } from '@/lib/analytics'

interface ProjectHeroCtaProps {
  link: string | null
  title: string
}

// Renders the hero CTA on a portfolio detail page.
// - With a live link: a tracked "view live site" button.
// - Without one (e.g. internal systems): a contact CTA so the slot is never
//   empty. Previously the whole block was hidden for null-link projects, which
//   left users clicking dead space (the /portfolio/kitchen-optimizer dead clicks
//   flagged in the weekly CRO report).
export function ProjectHeroCta({ link, title }: ProjectHeroCtaProps) {
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(link, title, 'portfolio_detail')}
        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-navy/90 transition-colors"
      >
        <ExternalLink className="w-5 h-5" />
        <span>צפה באתר החי</span>
      </a>
    )
  }

  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-navy/90 transition-colors"
    >
      <ArrowRight className="w-5 h-5" />
      <span>מעוניינים בפרויקט דומה? דברו איתי</span>
    </Link>
  )
}
