'use client'

import { home } from '@/config/home'
import {
  trackContactClick,
  trackCtaClick,
  trackGenerateLead,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'
import { TearSlipLink } from './TearSlipLink'

const { contact, hero, person } = home
const SOURCE = 'contact_section'
const HOME_WHATSAPP_MESSAGE = 'היי, הגעתי מהאתר שלך ואשמח לשמוע על השירותים'
const SLIP_NUMBER = '0154'

type ContactMethod = 'phone' | 'whatsapp' | 'email'

interface FormLine {
  method: ContactMethod
  label: string
  value: string
  href: string
  external?: boolean
  ltr?: boolean
}

const FORM_LINES: FormLine[] = [
  { method: 'whatsapp', label: contact.whatsappLabel, value: contact.whatsappValue, href: buildWhatsAppUrl(HOME_WHATSAPP_MESSAGE), external: true },
  { method: 'phone', label: contact.phoneLabel, value: contact.phone, href: PHONE_TEL_HREF, ltr: true },
  { method: 'email', label: contact.emailLabel, value: contact.email, href: `mailto:${contact.email}`, ltr: true },
]

const trackLine = (method: ContactMethod) => {
  const page = window.location.pathname
  trackContactClick(method, SOURCE)
  if (method === 'whatsapp') {
    trackWhatsAppClick(page, SOURCE)
    trackGenerateLead('whatsapp', page)
  } else if (method === 'phone') {
    trackPhoneClick(page, SOURCE)
  }
}

/**
 * The close: one slip torn from the pad onto the carbon field. The contact
 * details are filled-in form lines and the slip is signed by the one who answers.
 */
export function PadContact() {
  return (
    <section aria-labelledby="contact-heading" className="bg-pad-carbon text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <h2 id="contact-heading" className="font-pad-display text-7xl font-bold leading-[0.85] [text-wrap:balance] sm:text-8xl">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">{contact.body}</p>
        </div>

        <div
          className="pad-paper pad-perf-top relative rotate-[-1deg] px-6 pb-8 pt-7 text-pad-ink pad-sheet-shadow sm:px-10 lg:col-span-7"
          style={{ ['--pad-perf-ground' as string]: '#2B3FD6' }}
        >
          <div className="flex items-end justify-between gap-4 border-b-[3px] border-double border-pad-red pb-2">
            <span className="font-pad-display text-3xl font-bold leading-none text-pad-red">{hero.formTitle}</span>
            <span className="font-pad-display text-2xl leading-none text-pad-red" dir="ltr">
              No. {SLIP_NUMBER}
            </span>
          </div>

          <dl className="mt-2">
            {FORM_LINES.map((line) => (
              <div key={line.method} className="grid grid-cols-1 items-baseline gap-1 border-b border-pad-rule py-4 sm:grid-cols-[6rem_1fr] sm:gap-4">
                <dt className="text-base font-bold text-pad-red">{line.label}:</dt>
                <dd>
                  <a
                    href={line.href}
                    {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => trackLine(line.method)}
                    dir={line.ltr ? 'ltr' : undefined}
                    className={`inline-flex min-h-11 items-center font-pad-hand text-lg text-pad-ballpoint min-[400px]:text-xl underline decoration-pad-ballpoint/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-pad-ballpoint sm:text-2xl ${
                      line.ltr ? 'whitespace-nowrap' : ''
                    }`}
                  >
                    {line.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <TearSlipLink
              href="/contact"
              stamp={hero.replyStamp}
              groundColor="#FBFBF8"
              onClick={() => trackCtaClick('שלחו לנו הודעה', SOURCE, '/contact')}
            >
              {contact.cta}
            </TearSlipLink>
            <div className="min-w-[10rem]">
              <p className="font-pad-hand text-3xl text-pad-ballpoint" style={{ transform: 'rotate(-3deg)' }}>
                {person.signature}
              </p>
              <p className="mt-1 border-t-2 border-pad-ink pt-1 text-sm font-bold">{person.signatureLabel}</p>
            </div>
          </div>

          <p className="mt-6 text-base text-pad-ink-soft">{contact.note}</p>
        </div>
      </div>
    </section>
  )
}
