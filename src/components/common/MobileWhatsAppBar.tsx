'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { trackWhatsAppClick, trackCtaClick, trackGenerateLead } from '@/lib/analytics'

const PAGE_MESSAGES: Record<string, string> = {
  '/': 'היי, הגעתי מהאתר שלך ואשמח לשמוע על השירותים',
  '/services': 'היי, ראיתי את השירותים שלך ומעוניין לשמוע עוד',
  '/portfolio': 'היי, ראיתי את תיק העבודות שלך ומעוניין בפרויקט דומה',
  '/contact': 'היי, אשמח לתאם שיחה על פרויקט',
  '/about': 'היי, קראתי עליך ואשמח לשמוע עוד',
}

function getWhatsAppMessage(pathname: string): string {
  if (PAGE_MESSAGES[pathname]) return PAGE_MESSAGES[pathname]
  if (pathname.startsWith('/blog')) return 'היי, קראתי את המאמר שלך ורציתי לשאול...'
  if (pathname.startsWith('/services')) return 'היי, ראיתי את השירותים שלך ומעוניין לשמוע עוד'
  return 'היי, הגעתי מהאתר שלך ואשמח לשמוע על השירותים'
}

const PHONE_NUMBER = '972544994417'

export function MobileWhatsAppBar() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname() ?? '/'

  // Build the wa.me URL up front so the click is a plain navigation, not JS `window.open`.
  // Native <a href="wa.me/..." target="_blank"> clicks are NOT blocked by iOS Safari's popup
  // blocker, unlike `window.open()` calls that happen after tracking side-effects.
  const whatsappHref = useMemo(() => {
    const message = getWhatsAppMessage(pathname)
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Show after scrolling past 40% of viewport height
      const shouldShow = scrollY > viewportHeight * 0.4

      // Hide when near the footer/contact section (last 20% of page)
      const nearBottom = scrollY + viewportHeight > docHeight - 300

      setIsVisible(shouldShow && !nearBottom)
    }

    // Delay initial check to not interfere with page load
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }, 1500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleWhatsAppClick = () => {
    // Fire tracking but do NOT block navigation. Using an <a href> means the browser
    // handles navigation natively on the user gesture, so this stays reliable on iOS.
    trackWhatsAppClick(pathname, 'mobile_bar')
    trackGenerateLead('whatsapp', pathname)
    trackCtaClick('whatsapp_mobile_bar', 'mobile_cta', pathname)
  }

  const handleCallClick = () => {
    trackCtaClick('phone_mobile_bar', 'mobile_cta', pathname)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 sm:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Subtle gradient backdrop - pointer-events-none so it never eats clicks */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white to-white/90 backdrop-blur-sm" />

          <div className="relative flex items-center gap-2 px-4 py-2">
            {/* WhatsApp button — primary CTA (native anchor for reliable iOS behavior) */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-2xl font-bold text-base shadow-lg transition-colors no-underline"
              aria-label="שלחו הודעה בוואטסאפ"
            >
              <MessageCircle size={22} fill="white" />
              <span>שלחו הודעה בוואטסאפ</span>
            </a>

            {/* Call button — secondary CTA */}
            <a
              href="tel:+972544994417"
              onClick={handleCallClick}
              className="flex items-center justify-center w-12 h-12 bg-brand-navy hover:bg-brand-navy/90 active:bg-brand-navy/80 text-white rounded-2xl shadow-lg transition-colors no-underline"
              aria-label="התקשרו אלינו"
            >
              <Phone size={22} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
