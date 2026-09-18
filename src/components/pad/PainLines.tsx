import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { home } from '@/config/home'

const { pains } = home

/** The page becomes the sheet: pain in ballpoint, the fix in print. */
export function PainLines() {
  return (
    <section aria-labelledby="pains-heading" className="pad-paper relative overflow-hidden">
      <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60 sm:start-10" />
      <span aria-hidden="true" className="absolute inset-y-0 start-5 w-px bg-pad-red/40 sm:start-11" />

      <div className="mx-auto max-w-6xl px-8 py-24 sm:px-16 lg:py-32">
        <div className="max-w-2xl">
          <h2 id="pains-heading" className="font-pad-display text-6xl font-bold leading-[0.9] text-pad-ink sm:text-7xl">
            {pains.title}
          </h2>
          <p className="mt-5 max-w-[48ch] text-xl leading-relaxed text-pad-ink-soft">{pains.intro}</p>
        </div>

        <div className="mt-16 hidden grid-cols-12 gap-8 border-b-2 border-pad-ink pb-2 font-pad-display text-2xl text-pad-red md:grid">
          <span className="col-span-5">{pains.painColumn}</span>
          <span className="col-span-7">{pains.fixColumn}</span>
        </div>

        <ul className="mt-10 md:mt-0">
          {pains.lines.map((line) => (
            <li
              key={line.href + line.pain}
              className="grid gap-3 border-b border-pad-rule py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="font-pad-hand text-xl text-pad-ballpoint md:col-span-5 md:text-2xl">
                {line.pain}
              </p>
              <div className="flex flex-col gap-3 md:col-span-7 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <p className="text-xl font-semibold leading-snug text-pad-ink md:text-2xl">{line.fix}</p>
                <Link
                  href={line.href}
                  className="group inline-flex min-h-11 flex-shrink-0 items-center gap-2 text-base font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 transition-colors hover:decoration-pad-carbon"
                >
                  {line.linkLabel}
                  <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
