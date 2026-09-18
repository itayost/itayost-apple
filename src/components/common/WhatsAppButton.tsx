'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick, trackGenerateLead } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

// Page-specific WhatsApp messages for better lead context
const PAGE_MESSAGES: Record<string, string> = {
  '/': 'היי, הגעתי מהאתר שלך ואשמח לשמוע על השירותים',
  '/services': 'היי, ראיתי את השירותים שלך ומעוניין לשמוע עוד',
  '/services/crm-systems': 'היי, אני מעוניין במערכת CRM מותאמת אישית',
  '/services/automations': 'היי, אני מעוניין באוטומציות לעסק שלי',
  '/services/web-development': 'היי, אני מעוניין בפיתוח אתר',
  '/services/mobile-apps': 'היי, אני מעוניין בפיתוח אפליקציה',
  '/services/ecommerce': 'היי, אני מעוניין בהקמת חנות אונליין',
  '/services/ui-ux-design': 'היי, אני מעוניין בעיצוב UI/UX',
  '/services/landing-pages': 'היי, אני מעוניין בדף נחיתה',
  '/contact': 'היי, אשמח לתאם שיחה על פרויקט',
  '/about': 'היי, קראתי עליך ואשמח לשמוע עוד',
  '/portfolio': 'היי, ראיתי את תיק העבודות שלך ומעוניין בפרויקט דומה',
  '/faq': 'היי, יש לי שאלה שלא מצאתי תשובה אליה',
}

function getWhatsAppMessage(pathname: string): string {
  // Exact match first
  if (PAGE_MESSAGES[pathname]) return PAGE_MESSAGES[pathname]
  // Blog pages
  if (pathname.startsWith('/blog')) return 'היי, קראתי את המאמר שלך ורציתי לשאול...'
  // Service sub-pages fallback
  if (pathname.startsWith('/services')) return 'היי, ראיתי את השירותים שלך ומעוניין לשמוע עוד'
  // Default
  return 'היי, הגעתי מהאתר שלך ואשמח לשמוע על השירותים'
}

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleClick = () => {
    const pathname = window.location.pathname
    // Track WhatsApp button click + lead generation
    trackWhatsAppClick(pathname, 'fab')
    trackGenerateLead('whatsapp', pathname)

    const url = buildWhatsAppUrl(getWhatsAppMessage(pathname))
    window.open(url, '_blank')
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          className="group fixed start-6 z-50 hidden h-14 w-14 items-center justify-center border-2 border-pad-sheet bg-pad-whatsapp shadow-[0_10px_22px_-8px_rgba(10,20,80,0.55)] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:-rotate-3 hover:bg-pad-whatsapp-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pad-red motion-reduce:transition-none sm:flex"
          style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
          aria-label="צור קשר בוואטסאפ"
        >
          <MessageCircle aria-hidden="true" size={26} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
