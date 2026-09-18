import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { content } from '@/config/content'
import { home } from '@/config/home'

const { person } = home
const steps = content.about.services.process

/** One person, not an agency: the pad signed by the one who does the work. */
export function PersonSheet() {
  return (
    <section aria-labelledby="person-heading" className="pad-paper">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-6">
          <h2 id="person-heading" className="font-pad-display text-7xl font-bold leading-[0.85] text-pad-carbon sm:text-8xl">
            {person.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-[52ch] text-xl leading-relaxed text-pad-ink">{person.body}</p>

          <div className="mt-12 max-w-md">
            <p className="font-pad-hand text-4xl text-pad-ballpoint sm:text-5xl" style={{ transform: 'rotate(-3deg)' }}>
              {person.signature}
            </p>
            <div className="mt-1 flex items-baseline justify-between border-t-2 border-pad-ink pt-2">
              <span className="text-sm font-bold text-pad-ink">{person.signatureLabel}</span>
              <span className="text-sm text-pad-ink-soft">{person.role}</span>
            </div>
            <Link
              href="/about"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
            >
              {person.aboutLabel}
              <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-4xl font-bold text-pad-red">
            {person.stepsTitle}
          </h3>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-pad-rule py-6">
                <span className="font-pad-display text-5xl font-bold leading-none pad-carbon-ink" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <p className="text-2xl font-bold leading-tight text-pad-ink">{step.title}</p>
                  <p className="mt-1 text-lg text-pad-ink-soft">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
