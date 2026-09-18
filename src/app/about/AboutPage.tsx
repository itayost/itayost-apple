'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { aboutPage } from '@/config/aboutPage'
import { getFeaturedPortfolio } from '@/data/portfolio'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { trackCtaClick, trackGenerateLead, trackWhatsAppClick } from '@/lib/analytics'
import { ClientCopyCard } from '@/components/pad/ClientCopyCard'
import { PenTick } from '@/components/pad/PenTick'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

const PAGE = '/about'
const whatsappHref = buildWhatsAppUrl(aboutPage.whatsappMessage)

const trackWhatsApp = () => {
  trackWhatsAppClick(PAGE, 'about')
  trackGenerateLead('whatsapp', PAGE)
}

export default function AboutPage() {
  const work = getFeaturedPortfolio().slice(0, 3)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pad-world">
      {/* Who is behind the pad */}
      <section aria-labelledby="about-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-24 lg:pt-36">
          <div className="lg:col-span-7">
            <h1
              id="about-heading"
              className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
            >
              {aboutPage.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-pad-yellow sm:text-3xl">{aboutPage.role}</p>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-pad-carbon-ink sm:text-xl">{aboutPage.intro}</p>
            <div className="mt-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsApp}
                className="pad-perf-top pad-sheet-shadow group relative inline-flex min-h-[3.5rem] items-center gap-4 bg-pad-yellow py-4 pe-5 ps-6 text-pad-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:-rotate-1 motion-reduce:transition-none"
                style={{ ['--pad-perf-ground' as string]: '#2B3FD6' }}
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                <span className="text-lg font-bold sm:text-xl">{aboutPage.whatsappCta}</span>
              </a>
            </div>
          </div>

          {/* The card sheet: the facts, in the margin */}
          <div className="pad-paper pad-sheet-shadow relative px-6 pb-6 pt-5 text-pad-ink sm:px-8 lg:col-span-5 lg:rotate-[1.2deg]">
            <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60" />
            <p className="border-b-[3px] border-double border-pad-red pb-2 ps-4 font-pad-display text-3xl font-bold leading-none text-pad-ink">
              {aboutPage.card.title}
            </p>
            <dl className="ps-4">
              {aboutPage.card.facts.map((fact) => (
                <div key={fact.label} className="border-b border-pad-rule py-3">
                  <dt className="text-sm font-bold text-pad-red">{fact.label}</dt>
                  <dd className="mt-0.5 text-lg leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The story, with the vision as a margin note */}
      <section aria-labelledby="about-story-heading" className="pad-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-x-16 lg:py-24">
          <article className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute inset-y-0 -start-6 hidden w-px bg-pad-red/50 lg:block" />
            <h2 id="about-story-heading" className="font-pad-display text-6xl font-bold leading-none text-pad-ink">
              {aboutPage.story.title}
            </h2>
            {/* The story sits on the pad's printed rules: the line box is one --pad-line
                tall and the rules are lifted to the text baseline (half a line minus the
                font's descent), so the text rests on them instead of being struck through. */}
            <div
              className="pad-ruled mt-6 [--pad-line:2.5rem]"
              style={{ backgroundPositionY: 'calc(0.3em - 1.25rem)', fontSize: '1.25rem' }}
            >
              {aboutPage.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[62ch] leading-[2.5rem] text-pad-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <aside className="lg:col-span-4">
            <h2 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-3xl font-bold text-pad-red">
              {aboutPage.story.missionTitle}
            </h2>
            <p className="mt-4 font-pad-hand text-2xl leading-relaxed text-pad-ballpoint">{aboutPage.story.mission}</p>
          </aside>
        </div>
      </section>

      {/* How the work runs */}
      <section aria-labelledby="about-process-heading" className="bg-pad-yellow">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <h2 id="about-process-heading" className="font-pad-display text-6xl font-bold leading-none text-pad-ink">
            {aboutPage.process.title}
          </h2>
          <ol className="mt-10 border-t-[3px] border-double border-pad-red">
            {aboutPage.process.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-pad-red/40 py-6 md:items-baseline md:gap-x-8"
              >
                <span aria-hidden="true" className="font-pad-display text-5xl font-bold leading-none text-pad-red">
                  {index + 1}
                </span>
                <p className="flex flex-col gap-1 text-lg leading-snug text-pad-ink md:flex-row md:items-baseline md:gap-4">
                  <span className="text-2xl font-bold md:flex-shrink-0">{step.title}</span>
                  {/* Dotted leader carries the rule from the step to its description */}
                  <span aria-hidden="true" className="hidden min-w-8 flex-1 border-b-2 border-dotted border-pad-red/60 md:block" />
                  <span className="md:flex-shrink-0 md:text-end">{step.description}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What I promise, and what I build with */}
      <section aria-labelledby="about-values-heading" className="pad-paper">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-x-16 lg:py-24">
          <div>
            <h2 id="about-values-heading" className="font-pad-display text-5xl font-bold leading-none text-pad-ink">
              {aboutPage.values.title}
            </h2>
            <p className="mt-3 text-xl text-pad-ink-soft">{aboutPage.values.subtitle}</p>
            <ul className="mt-8 border-t-[3px] border-double border-pad-red">
              {aboutPage.values.items.map((value) => (
                <li key={value.title} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-pad-rule py-5">
                  <span aria-hidden="true" className="relative mt-1 h-7 w-7 border-2 border-pad-ink">
                    <PenTick />
                  </span>
                  <div>
                    <h3 className="font-pad-display text-3xl font-bold leading-none text-pad-ink">{value.title}</h3>
                    <p className="mt-2 text-lg leading-snug text-pad-ink-soft">{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-pad-display text-5xl font-bold leading-none text-pad-ink">{aboutPage.tools.title}</h2>
            <p className="mt-3 text-xl text-pad-ink-soft">{aboutPage.tools.subtitle}</p>
            {/* Printed on the pad's own rules, two tools to a line, not a pill wrap */}
            <dl className="mt-8 border-t-[3px] border-double border-pad-red">
              {aboutPage.tools.groups.map((group) => (
                <div key={group.label} className="border-b border-pad-rule py-5">
                  <dt className="font-pad-display text-2xl leading-none text-pad-red">{group.label}</dt>
                  <dd className="mt-3">
                    <ul className="grid gap-x-8 sm:grid-cols-2" dir="ltr">
                      {group.items.map((tool) => (
                        <li
                          key={tool}
                          className="flex items-baseline gap-3 border-b border-pad-rule/70 py-2 text-lg font-bold text-pad-ink last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
                        >
                          <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 bg-pad-red" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The proof: real client copies */}
      {work.length > 0 && (
        <section aria-labelledby="about-work-heading" className="bg-pad-pink">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 id="about-work-heading" className="font-pad-display text-5xl font-bold leading-none text-pad-ink sm:text-6xl">
                  {aboutPage.work.title}
                </h2>
                <p className="mt-3 text-xl text-pad-ink">{aboutPage.work.subtitle}</p>
              </div>
              <Link
                href="/portfolio"
                onClick={() => trackCtaClick(aboutPage.work.allLabel, 'about', '/portfolio')}
                className="group inline-flex min-h-11 items-center gap-2 self-start text-lg font-bold text-pad-ink underline decoration-pad-red decoration-2 underline-offset-[6px] md:self-auto"
              >
                {aboutPage.work.allLabel}
                <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
            <ul className="pad-scroll-x -mx-5 mt-12 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-5 pb-6 pt-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
              {work.map((item, index) => (
                <li key={item.slug} className="w-[82%] flex-shrink-0 snap-center sm:w-[60%] md:w-auto">
                  <ClientCopyCard item={item} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Signed close */}
      <section aria-labelledby="about-close-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h2 id="about-close-heading" className="font-pad-display text-6xl font-bold leading-[0.88] [text-wrap:balance] sm:text-7xl">
              {aboutPage.close.title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-xl leading-relaxed text-pad-carbon-ink">{aboutPage.close.subtitle}</p>
            <div className="mt-10">
              <TearSlipLink href="/contact" onClick={() => trackCtaClick(aboutPage.close.button, 'about', '/contact')}>
                {aboutPage.close.button}
              </TearSlipLink>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            {/* The signature always renders; the one authored moment is the pen
                underline stroking in beneath it, so a reveal that never fires
                can never erase the mark. */}
            <p className="relative inline-block font-pad-hand text-4xl text-pad-yellow" style={{ transform: 'rotate(-3deg)' }}>
              {aboutPage.name}
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 220 14"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-2 h-3 w-full text-pad-yellow"
                fill="none"
              >
                <motion.path
                  d="M4 9c38 3 78 1 116-1 30-2 60-3 96 1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
            </p>
            <p className="mt-1 border-t-2 border-pad-carbon-ink pt-2 text-sm font-bold text-pad-carbon-ink">
              {aboutPage.close.signatureLabel}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
