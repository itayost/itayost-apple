'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  const phoneNumber = '972544994417'
  const message = 'שלום! אשמח לקבל מידע נוסף על השירותים שלך'

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
    // Track WhatsApp button click
    trackWhatsAppClick(window.location.pathname, 'fab')

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          onClick={handleClick}
          className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-colors transition-shadow group"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
            bottom: 'calc(1.5rem + env(safe-area-inset-bottom))'
          }}
          aria-label="צור קשר בוואטסאפ"
        >
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
          {/* Icon */}
          <MessageCircle
            size={28}
            className="text-white relative z-10 group-hover:scale-110 transition-transform"
            fill="white"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
