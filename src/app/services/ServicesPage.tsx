import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllServicesSorted } from '@/data/services'
import { TearSlipLink } from '@/components/pad/TearSlipLink'
import { PenTick } from '@/components/pad/PenTick'

// The pad's own sequence of work, from the first call to the warranty. Copy is
// unchanged from the page this replaced.
const PROCESS = [
  { title: 'שיחה קצרה', description: 'שתפו אותי בצרכים שלכם ואשמח להתאים לכם פתרון' },
  { title: 'תוכנית ברורה', description: 'תדעו בדיוק מה נבנה, כמה זה עולה, ומתי זה מוכן' },
  { title: 'בנייה עם עדכונים', description: 'תראו התקדמות כל שבוע, בלי הפתעות' },
  { title: 'בדיקות', description: 'בדיקות על כל מכשיר ודפדפן לפני ההשקה' },
  { title: 'השקה', description: 'עולים לאוויר ביחד עם הדרכה מלאה' },
  { title: 'אחריות', description: '6 חודשי אחריות כלולים' },
]

/**
 * The services hub as the pad's order lines: every service is a numbered line
 * you can order, with what it includes printed underneath it.
 */
export default function ServicesPage() {
  const services = getAllServicesSorted()

  return (
    <div className="pad-world">
      <section aria-labelledby="services-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
          <h1
            id="services-heading"
            className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
          >
            מה אפשר
            <span className="block text-pad-yellow">להזמין</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
            שבעה סוגי עבודה, כל אחד עם עמוד משלו שמסביר בדיוק מה נכלל, איך זה עובד וכמה זמן זה לוקח.
          </p>
        </div>
      </section>

      {/* The order lines */}
      <section aria-label="השירותים" className="pad-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <ul className="border-t-2 border-pad-ink">
            {services.map((service, index) => (
              <li key={service.id} className="border-b border-pad-rule">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-x-8 gap-y-3 py-8 transition-colors hover:bg-pad-yellow/25 lg:grid-cols-12"
                >
                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className="font-pad-display text-2xl leading-none text-pad-red"
                        dir="ltr"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-pad-display text-4xl font-bold leading-none text-pad-ink sm:text-5xl">
                        {service.name}
                      </h2>
                    </div>
                    <p className="mt-3 text-lg leading-snug text-pad-ink-soft">{service.tagline}</p>
                  </div>

                  <ul className="lg:col-span-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature.title} className="flex items-baseline gap-3 py-1">
                        <PenTick className="h-4 w-4 flex-shrink-0 translate-y-0.5" />
                        <span className="text-base text-pad-ink">{feature.title}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="flex items-center gap-2 text-base font-bold text-pad-carbon lg:col-span-1 lg:justify-end">
                    לפרטים
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

      {/* The work order: how a project runs, start to warranty */}
      <section aria-labelledby="process-heading" className="bg-pad-pink">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2
            id="process-heading"
            className="font-pad-display text-5xl font-bold leading-none text-pad-ink sm:text-6xl"
          >
            איך זה עובד
          </h2>
          <ol className="mt-8 border-t-2 border-pad-ink">
            {PROCESS.map((step, index) => (
              <li
                key={step.title}
                className="grid items-baseline gap-x-6 gap-y-1 border-b border-pad-ink/20 py-5 md:grid-cols-12"
              >
                <span className="font-pad-display text-2xl leading-none text-pad-red md:col-span-1" dir="ltr">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-pad-display text-3xl font-bold leading-none text-pad-ink md:col-span-4">
                  {step.title}
                </h3>
                <p className="text-lg leading-snug text-pad-ink-soft md:col-span-7">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <h2 id="services-cta-heading" className="font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl">
              לא בטוחים מה מתאים לכם?
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-pad-carbon-ink">
              ספרו לי מה העסק צריך ואגיד לכם איזו עבודה פותרת את זה, גם אם זו לא העבודה הגדולה ביותר.
            </p>
          </div>
          <TearSlipLink href="/contact">צור קשר</TearSlipLink>
        </div>
      </section>
    </div>
  )
}
