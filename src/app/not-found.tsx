import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { content } from '@/config/content'
import { TearSlipLink } from '@/components/pad/TearSlipLink'

const ELSEWHERE = [
  { href: '/services', label: 'שירותים' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/blog', label: 'בלוג' },
  { href: '/contact', label: 'צור קשר' },
]

/** A page that is not in the pad: the form number comes back void. */
export default function NotFound() {
  return (
    <div className="pad-world">
      <section className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:pb-24 lg:pt-40">
          <div className="lg:col-span-7">
            <div className="relative inline-block">
              <p
                className="font-pad-display text-[clamp(6rem,4rem+10vw,12rem)] font-bold leading-[0.8] text-pad-yellow"
                dir="ltr"
              >
                404
              </p>
              {/* The form number came back void, so the number carries the stamp */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -end-8 whitespace-nowrap rotate-[-9deg] border-[3px] border-pad-yellow px-4 pb-1 pt-1.5 font-pad-display text-2xl font-bold leading-none text-pad-yellow sm:text-3xl"
              >
                בוטל
              </span>
            </div>
            <h1 className="mt-4 font-pad-display text-[clamp(2.75rem,1.6rem+4vw,4.5rem)] font-bold leading-[0.9] [text-wrap:balance]">
              {content.notFound.title}
            </h1>
            <p className="mt-5 max-w-[46ch] text-xl leading-relaxed text-pad-carbon-ink">{content.notFound.message}</p>
            <div className="mt-9">
              <TearSlipLink href="/">{content.notFound.button}</TearSlipLink>
            </div>
          </div>

          {/* The sheet that is still good: where to go instead */}
          <div className="pad-paper pad-sheet-shadow relative px-6 pb-6 pt-5 text-pad-ink sm:px-8 lg:col-span-5 lg:rotate-[1.4deg]">
            <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60" />
            <p className="border-b-[3px] border-double border-pad-red pb-2 ps-4 font-pad-display text-3xl font-bold leading-none text-pad-ink">
              נסו מכאן
            </p>
            <ul className="ps-4">
              {ELSEWHERE.map((item) => (
                <li key={item.href} className="border-b border-pad-rule last:border-b-0">
                  <Link
                    href={item.href}
                    className="group flex min-h-12 items-center justify-between gap-4 text-lg font-bold text-pad-ink transition-colors hover:text-pad-carbon"
                  >
                    {item.label}
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-4 w-4 text-pad-carbon transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
