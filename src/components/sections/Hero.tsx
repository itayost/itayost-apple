'use client'

import { useEffect, useState, useRef, memo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { AppleStaggerChildren, AppleStaggerItem } from '@/components/ScrollAnimations/AppleAnimations'
import Link from 'next/link'
import { ChevronDown, Sparkles, Code2, Palette, Zap } from 'lucide-react'

// Optimized gradient with CSS animations instead of JS
const GradientMesh = memo(() => {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/10 via-apple-purple/10 to-apple-pink/10" />
    )
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Use CSS animations for better performance */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
          contain: 'layout style paint'
        }}
      />
      
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 animate-float-medium"
        style={{
          background: 'radial-gradient(circle, rgba(191,90,242,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'layout style paint'
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 animate-float-slower"
        style={{
          background: 'radial-gradient(circle, rgba(255,55,95,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'layout style paint'
        }}
      />
    </div>
  )
})
GradientMesh.displayName = 'GradientMesh'

// Remove floating icons or simplify them
const FloatingIcons = memo(() => {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) return null
  
  const icons = [
    { Icon: Code2, x: '10%', y: '20%' },
    { Icon: Palette, x: '80%', y: '30%' },
    { Icon: Sparkles, x: '20%', y: '70%' },
    { Icon: Zap, x: '70%', y: '60%' },
  ]

  return (
    <>
      {icons.map(({ Icon, x, y }, index) => (
        <div
          key={index}
          className="absolute opacity-10 animate-float-icon"
          style={{ left: x, top: y }}
        >
          <Icon size={32} className="text-apple-blue" />
        </div>
      ))}
    </>
  )
})
FloatingIcons.displayName = 'FloatingIcons'

// Simplified typewriter without complex state management
const TypewriterText = memo(({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(text)
      return
    }

    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [text, shouldReduceMotion])

  return (
    <span className="relative">
      {displayedText}
      {!shouldReduceMotion && (
        <span className="inline-block w-1 h-12 bg-apple-blue ml-1 animate-blink" />
      )}
    </span>
  )
})
TypewriterText.displayName = 'TypewriterText'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  // Only use scroll effects on desktop and when motion is not reduced
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = shouldReduceMotion ? 1 : useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const y = shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 0.5], [0, 50])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-[100vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-apple-gray-50 to-white pt-20 pb-20 md:pt-0 md:pb-0"
    >
      {/* Background Effects - Only render after mount */}
      {mounted && !shouldReduceMotion && <GradientMesh />}
      {mounted && !shouldReduceMotion && <FloatingIcons />}
      
      {/* Grid Pattern - No animation for better performance */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
      
      {/* Main Content */}
      <motion.div 
        className="container relative z-10 text-center px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale, y }}
      >
        <AppleStaggerChildren delay={0.2}>
          {/* Badge */}
          <AppleStaggerItem>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-apple-gray-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 text-apple-blue" />
              <span className="text-sm font-medium text-apple-gray-700">
                בואו נדבר על העסק שלך
              </span>
            </motion.div>
          </AppleStaggerItem>

          {/* Main Headline */}
          <AppleStaggerItem>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight mb-6">
              <span className="block text-apple-gray-900">הופכים טכנולוגיה</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink bg-clip-text text-transparent">
                  מסובכת
                </span>
              </span>
              <span className="block text-apple-gray-900 mt-2">
                <TypewriterText text="לפתרונות פשוטים" />
              </span>
            </h1>
          </AppleStaggerItem>

          {/* Subtitle */}
          <AppleStaggerItem>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-apple-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 sm:px-0">
              אני איתי, ואני עוזר לעסקים קטנים לחסוך זמן ולהרוויח יותר
              <br />
              עם פתרונות דיגיטליים שפשוט עובדים.
            </p>
          </AppleStaggerItem>

          {/* CTA Buttons */}
          <AppleStaggerItem>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-apple-blue to-apple-blue-dark rounded-full font-medium text-base sm:text-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">בואו נדבר על העסק שלך</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-apple-purple to-apple-pink"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-apple-blue bg-white/80 backdrop-blur-xl border border-apple-gray-200 rounded-full font-medium text-base sm:text-lg hover:bg-white transition-all duration-300"
                >
                  ראו איך עזרתי לאחרים
                </Link>
              </motion.div>
            </div>
          </AppleStaggerItem>

          {/* Stats */}
          <AppleStaggerItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto px-4 sm:px-0">
              {[
                { number: '15', label: 'שעות שבועיות נחסכות' },
                { number: '30%', label: 'עלייה בהכנסות' },
                { number: '100%', label: 'לקוחות מרוצים' },
                { number: '24/7', label: 'זמינות' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-apple-gray-500 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AppleStaggerItem>
        </AppleStaggerChildren>

        {/* Scroll Indicator - CSS animation instead of JS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-apple-gray-400" />
        </div>
      </motion.div>
    </section>
  )
}
