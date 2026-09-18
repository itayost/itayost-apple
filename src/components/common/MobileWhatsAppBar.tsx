'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { trackWhatsAppClick, trackCtaClick, trackGenerateLead, trackContactClick, trackPhoneClick } from '@/lib/analytics'
import { buildWhatsAppUrl, PHONE_TEL_HREF } from '@/lib/whatsapp'

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

export function MobileWhatsAppBar() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname() ?? '/'

  // Build the wa.me URL up front so the click is a plain navigation, not JS `window.open`.
  // Native <a href="wa.me/..." target="_blank"> clicks are NOT blocked by iOS Safari's popup
  // blocker, unlike `window.open()` calls that happen after tracking side-effects.
  const whatsappHref = useMemo(() => {
    return buildWhatsAppUrl(getWhatsAppMessage(pathname))
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
    // Count the call tap as a real lead so mobile phone conversions are visible
    // in the funnel — previously only cta_click fired, leaving phone leads
    // invisible despite mobile driving most conversions (per the CRO report).
    trackCtaClick('phone_mobile_bar', 'mobile_cta', pathname)
    trackContactClick('phone', 'mobile_bar')
    trackGenerateLead('phone', pathname)
    trackPhoneClick(pathname, 'mobile_bar')
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
          <div
            className="pad-world pad-paper relative flex items-center gap-2 border-t-2 border-dashed border-pad-red/60 px-4 py-2.5 shadow-[0_-10px_24px_-14px_rgba(10,20,80,0.5)]"
          >
            {/* WhatsApp button: primary CTA (native anchor for reliable iOS behavior) */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex flex-1 items-center justify-center gap-2 bg-pad-whatsapp py-3.5 text-base font-bold text-white no-underline transition-colors active:bg-pad-whatsapp-deep"
              aria-label="שלחו הודעה בוואטסאפ"
            >
              <MessageCircle aria-hidden="true" size={22} />
              <span>שלחו הודעה בוואטסאפ</span>
            </a>

            {/* Call button: secondary CTA */}
            <a
              href={PHONE_TEL_HREF}
              onClick={handleCallClick}
              className="flex h-12 w-12 items-center justify-center bg-pad-carbon text-white no-underline transition-colors active:bg-pad-carbon-deep"
              aria-label="התקשרו אליי"
            >
              <Phone aria-hidden="true" size={22} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
