import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

// The page the Instagram and Facebook bios link to (client-hub's Social design, issue #173): one link
// ItayOst owns instead of a link-in-bio tool. Its URL carries the bio's tags, which MarketingBeacon
// counts and keeps for the contact form, so a Lead from here arrives with its Origin. Not for search.
export const metadata: Metadata = {
  title: 'ItayOst | קישורים',
  description: 'בניית אתרים ומערכות לעסקים קטנים: בדיקת אתר חינם, וואטסאפ, שירותים ועבודות.',
  robots: { index: false, follow: true },
}

const WHATSAPP_MESSAGE = 'היי, הגעתי מהאינסטגרם ואשמח לשמוע פרטים'
const AUDIT_MESSAGE = 'היי, אשמח לבדיקת אתר חינם'

const LINKS = [
  { href: '/services', label: 'מה אני בונה', note: 'אתרים, חנויות ומערכות לעסקים קטנים' },
  { href: '/portfolio', label: 'עבודות', note: 'אתרים שבניתי ללקוחות' },
  { href: '/blog', label: 'מהבלוג', note: 'מדריכים קצרים לבעלי עסקים' },
  { href: '/contact', label: 'טופס יצירת קשר', note: 'שם, טלפון ומה צריך' },
] as const

export default function LinksPage() {
  return (
    <div className="pad-world">
      <section aria-labelledby="links-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-xl px-5 pb-10 pt-28 sm:px-8">
          <h1 id="links-heading" className="font-pad-display text-[clamp(3rem,2rem+4vw,4.5rem)] font-bold leading-[0.9] [text-wrap:balance]">
            איתי אוסטרייך
            <span className="block text-pad-yellow">אתרים ומערכות לעסקים קטנים</span>
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-pad-carbon-ink">בודק לך את האתר בחינם, ואומר מה הייתי משנה קודם.</p>
          <a
            href={buildWhatsAppUrl(AUDIT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 bg-pad-yellow px-6 text-xl font-bold text-pad-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            בדיקת אתר חינם
          </a>
          <a
            href={buildWhatsAppUrl(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 bg-pad-whatsapp px-6 text-lg font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            לכתוב לי בוואטסאפ
          </a>
        </div>
      </section>
      <section aria-label="עוד קישורים" className="bg-pad-sheet">
        <ul className="mx-auto max-w-xl divide-y divide-pad-rule px-5 py-6 sm:px-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="group flex min-h-16 items-center justify-between gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pad-carbon">
                <span>
                  <span className="block text-xl font-bold text-pad-ink">{link.label}</span>
                  <span className="block text-base text-pad-ink-soft">{link.note}</span>
                </span>
                <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0 text-pad-carbon transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
