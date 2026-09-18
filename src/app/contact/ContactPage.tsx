'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Loader2, Mail, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { submitHomepageContactForm, type HomepageContactForm } from '@/services/crm'
import {
  trackContactClick,
  trackFormStart,
  trackFormSubmit,
  trackGenerateLead,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'
import { contactPage } from '@/config/contactPage'
import { TearSlipButton } from '@/components/pad/TearSlipLink'

const { form, receipt, details, channels } = contactPage
const PAGE = '/contact'
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const SUCCESS_RESET_MS = 5000

interface FormData {
  name: string
  phone: string
}

type SubmitStatus = 'idle' | 'success' | 'error'
type ChannelKey = keyof typeof channels

const CHANNEL_LINKS: {
  key: ChannelKey
  href: string
  icon: LucideIcon
  external?: boolean
  ltr?: boolean
}[] = [
  {
    key: 'whatsapp',
    href: buildWhatsAppUrl(contactPage.whatsappMessage),
    icon: MessageCircle,
    external: true,
  },
  { key: 'phone', href: PHONE_TEL_HREF, icon: Phone, ltr: true },
  {
    key: 'email',
    href: `mailto:${channels.email.value}`,
    icon: Mail,
    ltr: true,
  },
]

const normalizePhone = (phone: string) => phone.replace(/[-\s()+]/g, '').replace(/^972/, '0')

function validate(data: FormData): Partial<FormData> {
  const errors: Partial<FormData> = {}
  if (!data.name.trim()) errors.name = form.errors.nameMissing
  if (!data.phone.trim()) {
    errors.phone = form.errors.phoneMissing
  } else if (!/^0\d{8,9}$/.test(normalizePhone(data.phone))) {
    errors.phone = form.errors.phoneInvalid
  }
  return errors
}

const trackChannel = (key: ChannelKey) => {
  trackContactClick(key, 'contact_section')
  if (key === 'whatsapp') {
    trackWhatsAppClick(PAGE, 'contact_card')
    trackGenerateLead('whatsapp', PAGE)
  } else if (key === 'phone') {
    trackPhoneClick(PAGE, 'contact_card')
  }
}

interface FieldProps {
  id: string
  name: keyof FormData
  label: string
  type: 'text' | 'tel'
  autoComplete: string
  placeholder: string
  value: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
}

/** A printed form line: red label, the value written in ballpoint on the rule. */
function FormLine({ id, name, label, type, autoComplete, placeholder, value, error, onChange, onFocus }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className="grid gap-0.5 border-b border-pad-rule pb-2 pt-3 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-4 sm:pb-3 sm:pt-5">
      <label htmlFor={id} className="text-base font-bold text-pad-red">
        {label} <span aria-hidden="true">*</span>
        <span className="sr-only">({form.required})</span>
      </label>
      <div>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          required
          autoComplete={autoComplete}
          dir={type === 'tel' ? 'ltr' : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          className={`w-full border-0 border-b-2 bg-transparent px-1 py-2 font-pad-hand text-2xl text-pad-ballpoint caret-pad-carbon placeholder:font-pad-body placeholder:text-lg placeholder:text-pad-ink-soft focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-pad-red ${
            type === 'tel' ? 'text-end' : ''
          } ${error ? 'border-pad-red' : 'border-transparent focus-visible:border-pad-carbon'}`}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1 flex items-center gap-1.5 text-sm font-bold text-pad-red">
            <AlertCircle aria-hidden="true" size={15} />
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

/** Shown after a successful send: the visitor's own carbon copy of the request. */
function CarbonReceipt({ data }: { data: FormData }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div
      role="status"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -16, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      style={{ ['--pad-perf-ground' as string]: '#FBFBF8' }}
      className="pad-perf-top relative mt-8 bg-pad-pink px-6 pb-6 pt-5 pad-sheet-shadow"
    >
      <div className="flex items-baseline justify-between border-b-2 border-dashed border-pad-carbon/40 pb-2">
        <span className="font-pad-display text-2xl font-bold pad-carbon-ink">{receipt.label}</span>
        <span className="font-pad-display text-xl pad-carbon-ink" dir="ltr">
          No. {contactPage.formNumber}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-[5rem_1fr] gap-y-2 pad-carbon-ink">
        <dt className="font-bold">{receipt.nameLabel}</dt>
        <dd className="font-pad-hand text-xl">{data.name}</dd>
        <dt className="font-bold">{receipt.phoneLabel}</dt>
        <dd className="font-pad-hand text-xl">
          <span dir="ltr">{data.phone}</span>
        </dd>
      </dl>
      <p className="mt-4 font-bold text-pad-ink">{receipt.message}</p>
      <span
        aria-hidden="true"
        className="absolute -top-4 end-5 rotate-[-7deg] border-2 border-pad-red bg-pad-pink px-3 pb-0.5 pt-1 font-pad-display text-3xl font-bold leading-none text-pad-red"
      >
        {receipt.stamp}
      </span>
    </motion.div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '' })
  const [sentData, setSentData] = useState<FormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const prefersReducedMotion = useReducedMotion()

  // form_start fires once per mount, on first focus of any field: the funnel
  // step that makes form abandonment measurable.
  const hasStartedForm = useRef(false)
  const handleFormStart = () => {
    if (hasStartedForm.current) return
    hasStartedForm.current = true
    trackFormStart('contact', PAGE)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      // noValidate drops the browser's announce-and-focus, so focus the first
      // invalid field; aria-invalid + aria-describedby announce its error.
      document.getElementById(validationErrors.name ? 'contact-name' : 'contact-phone')?.focus()
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    // Track the lead attempt after validation passes, before the API call.
    trackGenerateLead('form', 'contact_page')

    try {
      const contactForm: HomepageContactForm = {
        name: formData.name,
        phone: normalizePhone(formData.phone),
      }
      const result = await submitHomepageContactForm(contactForm)

      if (result.success) {
        trackFormSubmit('contact', true, PAGE)
        setSentData(formData)
        setSubmitStatus('success')
        setTimeout(() => {
          setFormData({ name: '', phone: '' })
          setSubmitStatus('idle')
        }, SUCCESS_RESET_MS)
      } else {
        trackFormSubmit('contact', false, PAGE)
        setSubmitStatus('error')
        setErrorMessage(result.error || form.errors.submitFailed)
      }
    } catch {
      trackFormSubmit('contact', false, PAGE)
      setSubmitStatus('error')
      setErrorMessage(form.errors.network)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    if (errors[name as keyof FormData]) setErrors((previous) => ({ ...previous, [name]: undefined }))
    if (errorMessage) setErrorMessage('')
  }

  return (
    <div className="pad-world">
      {/* The layout already renders <main>; the page is the carbon field and a paper strip below. */}
      <section aria-labelledby="contact-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 pt-24 sm:gap-10 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10 lg:pb-28 lg:pt-36">
          {/* Intro */}
          <div className="lg:col-span-6 lg:row-start-1">
            <h1
              id="contact-heading"
              className="font-pad-display text-[clamp(3.25rem,2rem+4.5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
            >
              {contactPage.title.map((line, index) => (
                <span key={line} className={`block ${index === 1 ? 'text-pad-yellow' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-white sm:mt-6 sm:text-xl">{contactPage.subtitle}</p>
          </div>

          {/* The form sheet */}
          <div className="lg:col-span-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="pad-paper relative px-6 pb-7 pt-5 text-pad-ink pad-sheet-shadow sm:px-10 sm:pb-8 sm:pt-6 lg:-rotate-1">
              {/* Red margin rule on the inline-start side, as on Hebrew pads */}
              <span aria-hidden="true" className="absolute inset-y-0 start-3 w-px bg-pad-red/60 sm:start-5" />
              <div className="flex items-end justify-between gap-4 border-b-[3px] border-double border-pad-red pb-2">
                <span className="font-pad-display text-3xl font-bold leading-none text-pad-red">{form.sheetTitle}</span>
                <span className="font-pad-display text-2xl leading-none text-pad-red" dir="ltr">
                  No. {contactPage.formNumber}
                </span>
              </div>
              <h2 className="mt-4 font-pad-display text-3xl font-bold leading-none text-pad-ink sm:mt-6 sm:text-5xl">
                {form.heading}
              </h2>

              {/* noValidate: validate() drives empty-field feedback so users get the
                  styled inline Hebrew errors (a real DOM change) instead of the
                  browser's required-bubble, which PostHog logged as dead clicks on
                  the send button. `required` stays for a11y semantics. */}
              <form onSubmit={handleSubmit} noValidate className="mt-2">
                <FormLine
                  id="contact-name"
                  name="name"
                  label={form.nameLabel}
                  type="text"
                  autoComplete="name"
                  placeholder={form.namePlaceholder}
                  value={formData.name}
                  error={errors.name}
                  onChange={handleChange}
                  onFocus={handleFormStart}
                />
                <FormLine
                  id="contact-phone"
                  name="phone"
                  label={form.phoneLabel}
                  type="tel"
                  autoComplete="tel"
                  placeholder={form.phonePlaceholder}
                  value={formData.phone}
                  error={errors.phone}
                  onChange={handleChange}
                  onFocus={handleFormStart}
                />

                {submitStatus !== 'success' && (
                  <div className="mt-8 sm:mt-10">
                    <TearSlipButton
                      type="submit"
                      stamp={contactPage.replyStamp}
                      disabled={isSubmitting}
                      className="w-full justify-between sm:w-auto"
                      icon={isSubmitting ? <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin motion-reduce:animate-none" /> : undefined}
                    >
                      {isSubmitting ? form.submitting : form.submit}
                    </TearSlipButton>
                  </div>
                )}

                <AnimatePresence>
                  {submitStatus === 'error' && errorMessage && (
                    <motion.p
                      role="alert"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-2 border-2 border-pad-red px-4 py-3 font-bold text-pad-red"
                    >
                      <AlertCircle aria-hidden="true" size={18} />
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              {submitStatus === 'success' && sentData && <CarbonReceipt data={sentData} />}
            </div>
          </div>

          {/* Direct channels */}
          <div className="lg:col-span-6 lg:row-start-2">
            <h2 className="font-pad-display text-3xl font-bold text-pad-carbon-ink">{contactPage.channelsTitle}</h2>
            <p className="mt-1 text-lg text-pad-carbon-ink">{contactPage.replyNote}</p>
            <ul className="mt-4 border-t border-pad-carbon-ink/30">
              {CHANNEL_LINKS.map(({ key, href, icon: Icon, external, ltr }) => (
                <li key={key} className="border-b border-pad-carbon-ink/30">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => trackChannel(key)}
                    className="group flex min-h-14 items-center gap-4 py-3 text-white"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-pad-yellow" />
                    <span className="w-20 flex-shrink-0 text-base font-bold text-pad-carbon-ink">
                      {channels[key].label}
                    </span>
                    <span
                      dir={ltr ? 'ltr' : undefined}
                      className="text-lg font-bold underline decoration-pad-yellow/40 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-pad-yellow sm:text-xl"
                    >
                      {channels[key].value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hours strip and FAQ on paper */}
      <section aria-labelledby="contact-hours-heading" className="pad-paper">
        <div className="border-b-[3px] border-double border-pad-red">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-baseline md:gap-12">
            <h2 id="contact-hours-heading" className="font-pad-display text-4xl font-bold leading-none text-pad-red">
              {details.hoursTitle}
            </h2>
            <dl className="grid gap-x-10 gap-y-2 sm:grid-cols-3">
              {details.hours.map((row) => (
                <div key={row.days} className="flex items-baseline justify-between gap-4 border-b border-pad-rule pb-2 sm:block sm:border-0 sm:pb-0">
                  <dt className="text-base text-pad-ink-soft">{row.days}</dt>
                  <dd className="text-xl font-bold tabular-nums text-pad-ink">
                    {/^\d/.test(row.time) ? <span dir="ltr">{row.time}</span> : row.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="font-pad-display text-5xl font-bold leading-none text-pad-ink">{contactPage.faqTitle}</h2>
          <dl className="mt-6 border-t-2 border-pad-ink">
            {contactPage.faq.map((item, index) => (
              <div key={item.q} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-pad-rule py-6">
                <span aria-hidden="true" className="font-pad-display text-4xl font-bold leading-none text-pad-red">
                  {index + 1}
                </span>
                <div>
                  <dt className="text-2xl font-bold leading-snug text-pad-ink">{item.q}</dt>
                  <dd className="mt-2 max-w-[60ch] text-lg leading-relaxed text-pad-ink-soft">{item.a}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
