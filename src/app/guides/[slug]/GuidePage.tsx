import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, RefreshCw } from 'lucide-react'
import { Guide } from '@/lib/guides'
import { KeyTakeaways, FAQSection, SourcesList, AuthorBio } from '@/components/blog'
import { ClusterMemberList, type ClusterMember } from '@/components/guides/ClusterMemberList'
import { PadBreadcrumbs } from '@/components/pad/PadBreadcrumbs'
import { TearSlipLink } from '@/components/pad/TearSlipLink'
import { PROSE_CLASSES } from '@/lib/prose'
import { getClusterByPillarSlug } from '@/config/clusters'

interface GuidePageProps {
  guide: Guide
  members: ClusterMember[]
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso))

/** A pillar guide: the long read on the pad, with its cluster as the reading path. */
export default function GuidePage({ guide, members }: GuidePageProps) {
  const cluster = getClusterByPillarSlug(guide.slug)

  return (
    <div className="pad-world">
      <section aria-labelledby="guide-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-24 sm:px-8 lg:pb-16 lg:pt-32">
          <PadBreadcrumbs homeLabel="דף הבית" items={[{ label: 'מדריכים', href: '/guides' }, { label: guide.title }]} />
          <div className="mt-6 flex flex-wrap items-start gap-x-5 gap-y-3">
            <h1
              id="guide-heading"
              className="max-w-[22ch] font-pad-display text-[clamp(2.75rem,1.6rem+4vw,4.75rem)] font-bold leading-[0.92] [text-wrap:balance]"
            >
              {guide.title}
            </h1>
            <span className="mt-2 rotate-[-4deg] border-2 border-pad-yellow px-2.5 pb-0.5 pt-1 font-pad-display text-xl font-bold leading-none text-pad-yellow">
              מדריך מלא
            </span>
          </div>

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-pad-carbon-ink/30 pt-4 text-pad-carbon-ink">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">תאריך</dt>
              <Calendar aria-hidden="true" size={15} />
              <dd>
                <time dateTime={guide.date}>{formatDate(guide.date)}</time>
              </dd>
            </div>
            {guide.lastUpdated && guide.lastUpdated !== guide.date && (
              <div className="flex items-center gap-1.5 text-pad-yellow">
                <dt className="sr-only">עודכן</dt>
                <RefreshCw aria-hidden="true" size={15} />
                <dd>
                  עודכן: <time dateTime={guide.lastUpdated}>{formatDate(guide.lastUpdated)}</time>
                </dd>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">זמן קריאה</dt>
              <Clock aria-hidden="true" size={15} />
              <dd>{guide.readTime}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="pad-paper">
        <article className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          <span aria-hidden="true" className="absolute inset-y-0 start-0 hidden w-px bg-pad-red/50 lg:block" />
          {guide.description && (
            <p className="max-w-[60ch] border-b border-pad-rule pb-6 text-xl font-semibold leading-relaxed text-pad-ink sm:text-2xl">
              {guide.description}
            </p>
          )}

          <KeyTakeaways items={guide.tldr} />
          <ClusterMemberList members={members} />

          <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: guide.content }} />

          <FAQSection items={guide.faq} />
          <SourcesList items={guide.sources} />
          <AuthorBio />
        </article>
      </div>

      <section aria-labelledby="guide-close-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <h2 id="guide-close-heading" className="font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl">
              רוצים לדבר על הפרויקט שלכם?
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-pad-carbon-ink">
              שיחה קצרה בלי התחייבות, ותקבלו תשובה ישירה על עלות וזמנים
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <TearSlipLink href="/contact">צור קשר</TearSlipLink>
            {cluster && (
              <Link
                href={`/services/${cluster.serviceId}`}
                className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] hover:text-pad-yellow"
              >
                {cluster.serviceAnchor}
                <ArrowLeft aria-hidden="true" size={18} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
