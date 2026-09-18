'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  Phone,
  Github,
  Instagram,
  Facebook,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { getServiceLinks } from '@/data/services'
import { trackContactClick, trackOutboundClick, trackGenerateLead, trackPhoneClick } from '@/lib/analytics'
import { PHONE_TEL_HREF } from '@/lib/whatsapp'

// Get service links from centralized data
const serviceLinks = getServiceLinks()

const footerLinks = {
  services: {
    title: 'שירותים',
    links: serviceLinks
  },
  company: {
    title: 'החברה',
    links: [
      { label: 'אודות', href: '/about' },
      { label: 'תיק עבודות', href: '/portfolio' },
      { label: 'לקוחות', href: '/clients' },
      { label: 'צור קשר', href: '/contact' }
    ]
  },
  resources: {
    title: 'משאבים',
    links: [
      { label: 'בלוג', href: '/blog' },
      { label: 'מדריכים', href: '/guides' },
      { label: 'שאלות נפוצות', href: '/faq' },
      { label: 'תנאי שימוש', href: '/terms' }
    ]
  }
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram' }
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('נא להזין כתובת אימייל')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('כתובת אימייל לא תקינה')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          phone: '',
          subject: 'newsletter',
          message: 'הרשמה לניוזלטר מהפוטר'
        })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        trackGenerateLead('newsletter', 'footer')
        // Reset after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch {
      setStatus('error')
      setErrorMessage('שגיאה בהרשמה. נסה שוב.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <footer className="pad-world relative bg-pad-ink text-pad-sheet">
      {/* The pad's back board: a carbon strip where the sheets were bound */}
      <div aria-hidden="true" className="h-3 bg-pad-carbon" />

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pt-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image src="/logo.png" alt="לוגו ITAYOST" width={80} height={80} className="h-14 w-14 lg:h-16 lg:w-16" />
              <span className="font-pad-display text-6xl font-bold leading-none text-white">ITAYOST</span>
            </Link>

            <p className="mt-6 max-w-sm text-lg leading-relaxed text-pad-board-text">
              עוזר לעסקים לנהל את העסק חכם יותר עם מערכות, אוטומציות ואתרים שחוסכים זמן ומביאים לקוחות.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={PHONE_TEL_HREF}
                className="group inline-flex min-h-11 items-center gap-3 self-start text-lg font-bold text-white"
                onClick={() => {
                  trackContactClick('phone', 'footer')
                  trackPhoneClick(window.location.pathname, 'footer')
                }}
              >
                <Phone aria-hidden="true" size={20} className="text-pad-yellow" />
                <span dir="ltr" className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-pad-yellow">054-499-4417</span>
              </a>
              <a
                href="mailto:itay@itayost.com"
                className="group inline-flex min-h-11 items-center gap-3 self-start text-lg font-bold text-white"
                onClick={() => trackContactClick('email', 'footer')}
              >
                <Mail aria-hidden="true" size={20} className="text-pad-yellow" />
                <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-pad-yellow">itay@itayost.com</span>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="lg:col-span-2">
              <h3 className="border-b border-pad-board-line pb-2 font-pad-display text-3xl font-bold text-pad-yellow">
                {section.title}
              </h3>
              <ul className="mt-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-2.5 text-base text-pad-board-text underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-pad-red lg:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter slip */}
        <div className="mt-16 grid items-center gap-8 border-t border-pad-board-line pt-12 lg:grid-cols-2">
          <div>
            <h3 className="font-pad-display text-4xl font-bold text-white">הישאר מעודכן</h3>
            <p className="mt-1 text-lg text-pad-board-text">קבל עדכונים על פרויקטים חדשים וטיפים לפיתוח</p>
          </div>

          {status === 'success' ? (
            <div role="status" className="flex items-center gap-3 text-pad-yellow">
              <CheckCircle aria-hidden="true" size={24} />
              <span className="text-lg font-bold">תודה! נרשמת בהצלחה לניוזלטר</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3" noValidate>
              <div className="flex flex-col gap-0 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">כתובת אימייל לניוזלטר</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="כתובת אימייל"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  disabled={status === 'loading'}
                  autoComplete="email"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className={`pad-paper flex-1 border-2 px-4 py-3 text-lg text-pad-ink caret-pad-carbon placeholder:text-pad-ink-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pad-yellow disabled:opacity-60 ${
                    status === 'error' ? 'border-pad-red' : 'border-transparent'
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 bg-pad-yellow px-7 py-3 text-lg font-bold text-pad-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 aria-hidden="true" size={18} className="animate-spin" />
                      <span>שולח...</span>
                    </>
                  ) : (
                    'קבלו טיפים חינם'
                  )}
                </button>
              </div>
              {status === 'error' && errorMessage && (
                <div id="newsletter-error" role="alert" className="flex items-center gap-2 text-base font-bold text-pad-board-alert">
                  <AlertCircle aria-hidden="true" size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-pad-board-line pt-8 md:flex-row md:items-center">
          <p className="text-base text-pad-board-text">© {new Date().getFullYear()} ITAYOST. כל הזכויות שמורות.</p>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center border border-pad-board-line text-pad-board-text transition-colors hover:border-pad-yellow hover:text-pad-yellow"
                aria-label={social.label}
                onClick={() => trackOutboundClick(social.href, social.label, 'footer')}
              >
                <social.icon aria-hidden="true" size={20} />
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              className="ms-3 flex h-11 w-11 items-center justify-center bg-pad-yellow text-pad-ink transition-colors hover:bg-white"
              aria-label="גלול למעלה"
            >
              <ArrowUp aria-hidden="true" size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
