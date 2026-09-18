'use client'

import { Mail, MessageCircle, Phone } from 'lucide-react'
import { home } from '@/config/home'
import { trackContactClick, trackGenerateLead, trackWhatsAppClick } from '@/lib/analytics'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'

const { contact } = home

interface DocumentContactProps {
  heading: string
  note: string
  whatsAppMessage: string
  source: string
}

/**
 * The end of a legal document: not another carbon band, but the form lines at
 * the foot of a printed form, filled in by hand.
 */
export function DocumentContact({ heading, note, whatsAppMessage, source }: DocumentContactProps) {
  const lines = [
    {
      key: 'whatsapp',
      icon: MessageCircle,
      label: contact.whatsappLabel,
      value: contact.whatsappValue,
      href: buildWhatsAppUrl(whatsAppMessage),
      external: true,
      ltr: false,
      onClick: () => {
        trackContactClick('whatsapp', source)
        trackWhatsAppClick(window.location.pathname, source)
        trackGenerateLead('whatsapp', window.location.pathname)
      },
    },
    {
      key: 'email',
      icon: Mail,
      label: contact.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
      ltr: true,
      onClick: () => trackContactClick('email', source),
    },
    {
      key: 'phone',
      icon: Phone,
      label: contact.phoneLabel,
      value: contact.phone,
      href: PHONE_TEL_HREF,
      external: false,
      ltr: true,
      onClick: () => trackContactClick('phone', source),
    },
  ]

  return (
    <section aria-labelledby="document-contact-heading" className="pad-paper border-t-2 border-pad-ink">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-16">
        <h2
          id="document-contact-heading"
          className="font-pad-display text-4xl font-bold leading-none text-pad-ink lg:text-5xl"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-[54ch] text-lg leading-relaxed text-pad-ink-soft">{note}</p>

        <dl className="mt-8 border-t-2 border-pad-ink">
          {lines.map((line) => (
            <div
              key={line.key}
              className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-pad-rule py-3"
            >
              <dt className="flex items-center gap-2 text-sm font-bold text-pad-red">
                <line.icon aria-hidden="true" size={14} />
                {line.label}
              </dt>
              <dd>
                <a
                  href={line.href}
                  onClick={line.onClick}
                  {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-11 items-center font-pad-hand text-2xl text-pad-ballpoint underline decoration-pad-ballpoint/30 decoration-2 underline-offset-[6px] hover:decoration-pad-ballpoint"
                  {...(line.ltr ? { dir: 'ltr' } : {})}
                >
                  {line.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
