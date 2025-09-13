'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMouseParallax } from '@/hooks/useAppleScrollEffects'
import Link from 'next/link'
import { ChevronDown, Sparkles, Code2, Palette, Zap } from 'lucide-react'

// Mobile detection
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Simplified gradient for mobile
const MobileGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-20 bg-gradient-to-br from-blue-400 to-purple-400 blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full opacity-20 bg-gradient-to-br from-purple-400 to-pink-400 blur-3xl" />
  </div>
)

// Desktop gradient with animations
const DesktopGradient = () => {
  const { ref, offset } = useMouseParallax(0.5)
  
  return (
    <div ref={ref as any} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: offset.x,
          y: offset.y
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(191,90,242,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: -offset.x,
          y: -offset.y
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

// Simple typewriter for mobile
const SimpleTypewriter = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <span className={`transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {text}
    </span>
  )
}

// Desktop typewriter with animation
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text])

  return (
    <span className="relative">
      {displayedText}
      <motion.span
        className="inline-block w-1 h-12 bg-apple-blue ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  )
}

export default function Hero() {
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
    
    const handleResize = () => {
      setIsMobileDevice(isMobile())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative min-h-[100vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-apple-gray-50 to-white">
      {/* Background Effects - Simplified for mobile */}
      {isMobileDevice ? <MobileGradient /> : <DesktopGradient />}
      
      {/* Floating Icons - Only on desktop */}
      {!isMobileDevice && (
        <div className="hidden lg:block">
          {[
            { Icon: Code2, x: '10%', y: '20%' },
            { Icon: Palette, x: '80%', y: '30%' },
            { Icon: Sparkles, x: '20%', y: '70%' },
            { Icon: Zap, x: '70%', y: '60%' },
          ].map(({ Icon, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute opacity-20"
              style={{ left: x, top: y }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                delay: index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon size={32} className="text-apple-blue" />
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Main Content */}
      <div className="container relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-apple-gray-200/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4 text-apple-blue" />
          <span className="text-sm font-medium text-apple-gray-700">
            בניית חוויות דיגיטליות מרשימות
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-apple-gray-900">הפתרונות</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink bg-clip-text text-transparent">
              הדיגיטליים
            </span>
          </span>
          <span className="block text-apple-gray-900 mt-2">
            {isMobileDevice ? (
              <SimpleTypewriter text="שלך מתחילים כאן" />
            ) : (
              <TypewriterText text="שלך מתחילים כאן" />
            )}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-apple-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          מעצב ומפתח אתרים ואפליקציות ברמה הגבוהה ביותר.
          <br />
          טכנולוגיות מתקדמות, עיצוב מרהיב וחוויית משתמש מושלמת.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-apple-blue to-apple-blue-dark rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            בואו נתחיל
          </Link>
          
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 text-apple-blue bg-white/80 backdrop-blur-xl border border-apple-gray-200 rounded-full font-medium text-lg hover:bg-white transition-colors"
          >
            צפייה בעבודות
          </Link>
        </motion.div>

        {/* Stats - Simplified animation for mobile */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            { number: '50+', label: 'פרויקטים' },
            { number: '100%', label: 'שביעות רצון' },
            { number: '5★', label: 'דירוג ממוצע' },
            { number: '24/7', label: 'תמיכה' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-apple-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator - Simple for mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={isMobileDevice ? {} : {
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-8 h-8 text-apple-gray-400" />
        </motion.div>
      </div>
    </section>
  )
}
