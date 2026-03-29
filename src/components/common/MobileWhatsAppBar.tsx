'use client'

import { useState, useEffect } from 'react'
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

export function MobileWhatsAppBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isContactSection, setIsContactSection] = useState(false)

  const phoneNumber = '972544994417'

  useEffect(() => {
    let lastScrollY = 0

    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Show after scrolling past 40% of viewport height
      const shouldShow = scrollY > viewportHeight * 0.4

      // Hide when near the footer/contact section (last 20% of page)
      const nearBottom = scrollY + viewportHeight > docHeight - 300
      setIsContactSection(nearBottom)

      setIsVisible(shouldShow && !nearBottom)
      lastScrollY = scrollY
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
    const pathname = window.location.pathname
    trackWhatsAppClick(pathname, 'mobile_bar')
    trackGenerateLead('whatsapp', pathname)
    trackCtaClick('whatsapp_mobile_bar', 'mobile_cta', pathname)

    const message = getWhatsAppMessage(pathname)
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleCallClick = () => {
    const pathname = window.location.pathname
    trackCtaClick('phone_mobile_bar', 'mobile_cta', pathname)
    window.location.href = `tel:0544994417`
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
          {/* Subtle gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-white/90 backdrop-blur-sm" />

          <div className="relative flex items-center gap-2 px-4 py-3">
            {/* WhatsApp button — primary CTA */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-2xl font-bold text-base shadow-lg transition-colors"
              aria-label="שלחו הודעה בוואטסאפ"
            >
              <MessageCircle size={22} fill="white" />
              <span>שלחו הודעה בוואטסאפ</span>
            </button>

            {/* Call button — secondary CTA */}
            <button
              type="button"
              onClick={handleCallClick}
              className="flex items-center justify-center w-14 h-14 bg-brand-navy hover:bg-brand-navy/90 active:bg-brand-navy/80 text-white rounded-2xl shadow-lg transition-colors"
              aria-label="התקשרו אלינו"
            >
              <Phone size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
