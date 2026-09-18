import type { Service, ServiceFAQ, ServiceFeature, ServiceProcess } from '@/data/services'
import { servicePage } from '@/config/servicePage'
import { PenTick } from '@/components/pad/PenTick'
import { PenCross } from '@/components/pad/PenCross'

interface SectionHeadingProps {
  id: string
  title: string
  subtitle: string
  tone?: 'ink' | 'red'
}

function SectionHeading({ id, title, subtitle, tone = 'ink' }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <h2
        id={id}
        className={`font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl ${tone === 'red' ? 'text-pad-red' : 'text-pad-ink'}`}
      >
        {title}
      </h2>
      <p className="mt-3 text-xl text-pad-ink-soft">{subtitle}</p>
    </div>
  )
}

/** The long description, set as a readable column on paper. */
export function ServiceWhy({ service }: { service: Service }) {
  return (
    <section aria-labelledby="service-why-heading" className="pad-paper">
      <div className="relative mx-auto max-w-3xl px-8 py-20 sm:px-12 lg:py-24">
        <span aria-hidden="true" className="absolute inset-y-0 start-3 w-px bg-pad-red/50 sm:start-5" />
        <h2 id="service-why-heading" className="font-pad-display text-4xl font-bold text-pad-red">
          {servicePage.descriptionTitle}
        </h2>
        <p className="mt-6 text-xl leading-[1.8] text-pad-ink">{service.longDescription}</p>
      </div>
    </section>
  )
}

/** What's included: every feature as a ticked order line. */
export function ServiceIncluded({ features }: { features: ServiceFeature[] }) {
  return (
    <section aria-labelledby="service-included-heading" className="border-t-2 border-pad-ink bg-pad-sheet">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading id="service-included-heading" {...servicePage.features} />
        <ul className="mt-12 grid border-t-[3px] border-double border-pad-red md:grid-cols-2 md:gap-x-12">
          {features.map((feature) => (
            <li key={feature.title} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-pad-rule py-6">
              <span aria-hidden="true" className="relative mt-1 h-7 w-7 border-2 border-pad-ink">
                <PenTick />
              </span>
              <div>
                <h3 className="font-pad-display text-3xl font-bold leading-none text-pad-ink">{feature.title}</h3>
                <p className="mt-2 text-lg leading-snug text-pad-ink-soft">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The process as a printed schedule on the yellow copy: step, what happens, duration in ballpoint. */
export function ServiceSchedule({ process, technologies }: { process: ServiceProcess[]; technologies?: string[] }) {
  return (
    <section aria-labelledby="service-process-heading" className="bg-pad-yellow">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading id="service-process-heading" {...servicePage.process} />
        <ol className="mt-12 border-t-[3px] border-double border-pad-red">
          {process.map((step) => (
            <li
              key={step.step}
              className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 border-b border-pad-red/40 py-6 md:grid-cols-[4rem_1fr] md:items-baseline md:gap-x-8"
            >
              <span aria-hidden="true" className="font-pad-display text-5xl font-bold leading-none text-pad-red">
                {step.step}
              </span>
              <div className="md:flex md:items-end md:gap-4">
                <div className="md:max-w-xl">
                  <h3 className="text-2xl font-bold leading-tight text-pad-ink">{step.title}</h3>
                  <p className="mt-1 text-lg text-pad-ink">{step.description}</p>
                </div>
                {step.duration && (
                  <>
                    {/* Dotted leader joins the step to its duration, as on a printed schedule */}
                    <span aria-hidden="true" className="mb-2 hidden min-w-8 flex-1 border-b-2 border-dotted border-pad-red/60 md:block" />
                    <p className="mt-2 font-pad-hand text-xl text-pad-ballpoint md:mt-0 md:flex-shrink-0 md:whitespace-nowrap">
                      <span className="sr-only">{servicePage.process.durationLabel}: </span>
                      {step.duration}
                    </p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>

        {technologies && technologies.length > 0 && (
          <div className="mt-14">
            <h3 className="font-pad-display text-3xl font-bold text-pad-ink">{servicePage.technologies.title}</h3>
            <p className="mt-1 text-lg text-pad-ink">{servicePage.technologies.subtitle}</p>
            <ul className="mt-5 flex flex-wrap gap-3" dir="ltr">
              {technologies.map((tech, index) => (
                <li
                  key={tech}
                  className={`border-2 border-pad-ink bg-pad-sheet px-3 py-1.5 text-base font-bold text-pad-ink ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

/** Questions as fine print that unfolds; the first stays open. */
export function ServiceFinePrint({ faq }: { faq: ServiceFAQ[] }) {
  return (
    <section aria-labelledby="service-faq-heading" className="pad-paper">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading id="service-faq-heading" {...servicePage.faq} />
        <div className="mt-10 border-t-2 border-pad-ink">
          {faq.map((item, index) => (
            <details key={item.question} open={index === 0} className="group border-b border-pad-rule">
              <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[1fr_1.75rem] items-center gap-x-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-xl font-bold leading-snug text-pad-ink">{item.question}</span>
                <PenCross />
              </summary>
              <p className="-mt-1 max-w-[62ch] pb-6 text-lg leading-relaxed text-pad-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
