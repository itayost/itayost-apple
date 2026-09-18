import Link from 'next/link'
import { ArrowLeft, ListOrdered, RefreshCw } from 'lucide-react'
import { content } from '@/config/content'
import { IndexSheet } from '@/components/pad/IndexSheet'

export interface GuideCard {
  slug: string
  title: string
  description: string
  readTime: string
  lastUpdated: string
  memberCount: number
  clusterLabel: string
}

interface GuidesPageProps {
  guides: GuideCard[]
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso))

/** The guides as filed dividers: each pillar is a tabbed section of the pad. */
export default function GuidesPage({ guides }: GuidesPageProps) {
  return (
    <div className="pad-world">
      <section aria-labelledby="guides-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-16 lg:pt-36">
          <div className="lg:col-span-7">
            <h1
              id="guides-heading"
              className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
            >
              {content.guides.title}
              <span className="block text-pad-yellow">{content.guides.subtitle}</span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
              {content.guides.description}
            </p>
          </div>

          {/* The pad's divider index: each guide and how many articles it gathers */}
          <IndexSheet
            title="המדריכים"
            className="lg:col-span-5 lg:rotate-[1.2deg]"
            rows={guides.map((guide) => ({
              key: guide.slug,
              label: guide.clusterLabel,
              value: `${guide.memberCount} מאמרים`,
            }))}
          />
        </div>
      </section>

      <section aria-label={content.guides.sectionLabel} className="pad-paper">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
          <ul className="border-t-2 border-pad-ink">
            {guides.map((guide) => (
              <li key={guide.slug} className="border-b border-pad-rule">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group block py-7 transition-colors hover:bg-pad-yellow/25"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="border border-pad-red px-1.5 text-sm font-bold text-pad-red">
                      {guide.clusterLabel}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-pad-ink-soft">
                      <ListOrdered aria-hidden="true" size={14} />
                      {guide.memberCount} מאמרים
                    </span>
                    <span className="text-sm text-pad-ink-soft">{guide.readTime}</span>
                    {guide.lastUpdated && (
                      <span className="flex items-center gap-1.5 text-sm text-pad-carbon">
                        <RefreshCw aria-hidden="true" size={14} />
                        עודכן: <time dateTime={guide.lastUpdated}>{formatDate(guide.lastUpdated)}</time>
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-pad-display text-4xl font-bold leading-none text-pad-ink sm:text-5xl">
                    {guide.title}
                  </h2>
                  <p className="mt-3 max-w-[70ch] text-lg leading-snug text-pad-ink-soft">{guide.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-pad-carbon">
                    קראו את המדריך
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
