import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { clientsPageCopy, workLogByYear, workLogSummary } from '@/config/clientsPage'
import { WorkLogRow } from '@/components/pad/WorkLogRow'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

/**
 * The clients page as the pad's work log: the projects actually delivered,
 * newest year first. Everything printed here is read from the portfolio data,
 * so the page cannot claim a client, a field or a year that has no project
 * behind it.
 */
export default function ClientsPage() {
  const log = workLogByYear()
  const summary = workLogSummary()

  return (
    <div className="pad-world">
      <section aria-labelledby="clients-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-16 lg:pt-36">
          <div className="lg:col-span-7">
            <h1
              id="clients-heading"
              className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
            >
              {clientsPageCopy.title}
              <span className="block text-pad-yellow">{clientsPageCopy.subtitle}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
              {clientsPageCopy.description}
            </p>
          </div>

          {/* The carbon impression of the log: the tally pressed through onto
              the field itself, not another paper sheet. */}
          <div className="lg:col-span-5">
            <p className="border-b border-pad-carbon-ink/40 pb-2 font-pad-display text-2xl font-bold leading-none text-pad-yellow">
              {clientsPageCopy.indexTitle}
            </p>
            <dl className="mt-1">
              {summary.counts.map((row) => (
                <div key={row.field} className="flex items-baseline gap-3 py-1.5">
                  <dt className="text-lg text-pad-carbon-ink">{row.field}</dt>
                  <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.35rem] bg-pad-carbon-ink/25" />
                  <dd className="font-pad-display text-2xl leading-none text-white">{row.count}</dd>
                </div>
              ))}
              <div className="mt-3 flex items-baseline gap-3 border-t border-pad-carbon-ink/40 pt-3">
                <dt className="text-lg font-bold text-white">{clientsPageCopy.projectsLabel}</dt>
                <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.35rem] bg-pad-carbon-ink/25" />
                <dd className="font-pad-display text-4xl leading-none text-pad-yellow">{summary.projects}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-label={clientsPageCopy.logLabel} className="pad-paper">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
          {log.map((group) => (
            <div key={group.year} className="mb-12 last:mb-0">
              <div className="flex items-baseline gap-4 border-b-[3px] border-double border-pad-red pb-2">
                <h2 className="font-pad-display text-5xl font-bold leading-none text-pad-ink" dir="ltr">
                  {group.year}
                </h2>
                <span className="font-pad-hand text-lg text-pad-ballpoint">
                  {group.entries.length} {clientsPageCopy.projectsLabel}
                </span>
              </div>
              <ul>
                {group.entries.map((entry) => (
                  <WorkLogRow key={entry.slug} entry={entry} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="clients-cta-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <h2 id="clients-cta-heading" className="font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl">
              {clientsPageCopy.ctaTitle}
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-pad-carbon-ink">{clientsPageCopy.ctaText}</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <TearSlipLink href="/contact">{clientsPageCopy.ctaButton}</TearSlipLink>
            <Link
              href="/portfolio"
              className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] hover:text-pad-yellow"
            >
              {clientsPageCopy.portfolioLink}
              <ArrowLeft aria-hidden="true" size={18} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
