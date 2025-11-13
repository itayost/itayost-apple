'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  
  const phoneNumber = '972544994417'
  const message = 'שלום! אשמח לקבל מידע נוסף על השירותים שלך'
  
  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    
    // Show tooltip after button appears
    const tooltipTimer = setTimeout(() => {
      setIsTooltipVisible(true)
    }, 5000)
    
    // Hide tooltip after some time
    const hideTooltipTimer = setTimeout(() => {
      setIsTooltipVisible(false)
    }, 10000)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTooltipTimer)
    }
  }, [])
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Tooltip */}
          <AnimatePresence>
            {isTooltipVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="fixed bottom-20 start-4 z-40 bg-white rounded-2xl shadow-2xl p-4 max-w-xs"
              >
                <button
                  onClick={() => setIsTooltipVisible(false)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-brand-gray-100 transition-colors"
                  aria-label="Close tooltip"
                >
                  <X size={14} />
                </button>
                
                <p className="text-sm text-brand-gray-700 pl-6">
                  💬 יש לך שאלה? דבר איתי ב-WhatsApp!
                </p>
                
                {/* Arrow pointing to button */}
                <div className="absolute -bottom-2 start-8 w-4 h-4 bg-white transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* WhatsApp Button */}
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
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all group"
            aria-label="Contact on WhatsApp"
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
        </>
      )}
    </AnimatePresence>
  )
}
