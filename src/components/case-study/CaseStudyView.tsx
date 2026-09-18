import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { portfolioData, type PortfolioItem } from '@/data/portfolio'
import { portfolioPage } from '@/config/portfolioPage'
import { PadBreadcrumbs } from '@/components/pad/PadBreadcrumbs'
import { PenTick } from '@/components/pad/PenTick'
import { ClientCopyCard } from '@/components/pad/ClientCopyCard'
import { sourceWidthFor } from '@/lib/portfolio-image'
import { CaseStudyClose, CaseStudyHeroAction } from './CaseStudyActions'

const { caseStudy } = portfolioPage
const MORE_COUNT = 3

/** Up to three other projects, same category first. */
function moreProjects(project: PortfolioItem): PortfolioItem[] {
  const others = portfolioData.filter((item) => item.slug !== project.slug)
  const sameCategory = others.filter((item) => item.category === project.category)
  const rest = others.filter((item) => item.category !== project.category)
  return [...sameCategory, ...rest].slice(0, MORE_COUNT)
}

/**
 * A case study as a short story on pad paper: carbon title strip, a stapled
 * screen plate crossing into the paper, a reading column with pinned margin
 * notes, more client copies, and a closing slip. No quotes, ratings or
 * performance numbers (PRODUCT.md).
 */
export function CaseStudyView({ project }: { project: PortfolioItem }) {
  const technologies = Array.from(new Set([...project.tags, ...project.technologies]))
  const facts = [
    { label: caseStudy.facts.client, value: project.client },
    { label: caseStudy.facts.year, value: project.year },
    { label: caseStudy.facts.duration, value: project.duration },
    { label: caseStudy.facts.category, value: caseStudy.categoryLabels[project.category] },
  ].filter((fact) => Boolean(fact.value))

  return (
    <div className="pad-world">
      {/* Title strip on carbon; its bottom padding leaves room for the plate to overlap */}
      <section aria-labelledby="case-heading" className="bg-pad-carbon pb-40 text-white sm:pb-52 lg:pb-64">
        <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 lg:pt-32">
          <PadBreadcrumbs
            homeLabel={caseStudy.breadcrumbHome}
            items={[{ label: caseStudy.breadcrumbPortfolio, href: '/portfolio' }, { label: project.title }]}
          />
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            <h1 id="case-heading" className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88]">
              {project.title}
            </h1>
            <span className="mt-3 rotate-[-4deg] border-2 border-pad-yellow px-2.5 pb-0.5 pt-1 font-pad-display text-2xl font-bold leading-none text-pad-yellow">
              {caseStudy.categoryLabels[project.category]}
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-pad-yellow">{project.subtitle}</p>
          <p className="mt-3 max-w-[56ch] text-lg leading-relaxed text-pad-carbon-ink">{project.description}</p>
          <div className="mt-8">
            <CaseStudyHeroAction link={project.link} title={project.title} />
          </div>
        </div>
      </section>

      {/* Stapled screen plate, crossing from carbon into paper */}
      {/* flow-root keeps the plate's negative margin from collapsing into this wrapper, so the plate overlaps the carbon */}
      <div className="pad-paper flow-root">
        <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-5 sm:-mt-44 sm:px-8 lg:-mt-56">
          {/* The plate never renders wider than the screenshot's native width: upscaling would blur the proof */}
          <figure
            className="pad-paper pad-sheet-shadow relative mx-auto p-3 sm:p-5 lg:-rotate-[0.6deg]"
            style={{ maxWidth: `${sourceWidthFor(project.slug) + 40}px` }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-2 start-12 z-10 h-2.5 w-14 rotate-[-6deg] border-2 border-b-0 border-[#8A8FA8]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 end-12 z-10 h-2.5 w-14 rotate-[5deg] border-2 border-b-0 border-[#8A8FA8]"
            />
            <Image
              src={project.imageSizes?.desktop || project.image}
              alt={`${project.title}: ${project.subtitle}`}
              width={1200}
              height={760}
              sizes={`(min-width: 1152px) ${sourceWidthFor(project.slug)}px, 94vw`}
              className="h-auto w-full border border-pad-ink/10"
              priority
            />
          </figure>
        </div>

        {/* Reading column with margin notes */}
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-x-16 lg:py-24">
          <article className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute -start-6 inset-y-0 hidden w-px bg-pad-red/50 lg:block" />
            <h2 className="font-pad-display text-5xl font-bold leading-none text-pad-ink">{caseStudy.aboutTitle}</h2>
            <p className="mt-6 max-w-[64ch] text-xl leading-[1.8] text-pad-ink">{project.longDescription}</p>

            {project.features.length > 0 && (
              <>
                <h2 className="mt-14 font-pad-display text-5xl font-bold leading-none text-pad-ink">
                  {caseStudy.featuresTitle}
                </h2>
                <ul className="mt-6 border-t-[3px] border-double border-pad-red">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 border-b border-pad-rule py-4">
                      <span aria-hidden="true" className="relative mt-1 h-6 w-6 flex-shrink-0 border-2 border-pad-ink">
                        <PenTick className="absolute -top-2 start-0 h-7 w-7" />
                      </span>
                      <span className="text-lg leading-snug text-pad-ink">{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          <aside aria-labelledby="case-facts-heading" className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <h2
              id="case-facts-heading"
              className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-3xl font-bold text-pad-red"
            >
              {caseStudy.factsTitle}
            </h2>
            <dl>
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-pad-rule py-3">
                  <dt className="text-base font-bold text-pad-red">{fact.label}</dt>
                  <dd className="text-lg font-semibold text-pad-ink">{fact.value}</dd>
                </div>
              ))}
              {technologies.length > 0 && (
                <div className="border-b border-pad-rule py-3">
                  <dt className="text-base font-bold text-pad-red">{caseStudy.facts.tech}</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="border border-pad-red px-2 py-0.5 text-sm font-bold text-pad-red">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </div>

      {/* More client copies */}
      <section aria-labelledby="case-more-heading" className="bg-pad-pink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 id="case-more-heading" className="font-pad-display text-5xl font-bold leading-none text-pad-ink sm:text-6xl">
              {caseStudy.moreTitle}
            </h2>
            <Link
              href="/portfolio"
              className="group inline-flex min-h-11 items-center gap-2 self-start text-lg font-bold text-pad-ink underline decoration-pad-red decoration-2 underline-offset-[6px] md:self-auto"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              {caseStudy.backToPortfolio}
            </Link>
          </div>
          <ul className="pad-scroll-x -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
            {moreProjects(project).map((item, index) => (
              <li key={item.slug} className="w-[82%] flex-shrink-0 snap-center sm:w-[60%] md:w-auto">
                <ClientCopyCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CaseStudyClose title={project.title} slug={project.slug} />
    </div>
  )
}
