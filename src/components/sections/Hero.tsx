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
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 via-brand-blue/10 to-brand-orange/10" />
    )
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Use CSS animations for better performance - Responsive sizing */}
      <div
        className="absolute top-0 start-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full opacity-30 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
          contain: 'layout style paint'
        }}
      />

      <div
        className="absolute bottom-0 end-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full opacity-30 animate-float-medium"
        style={{
          background: 'radial-gradient(circle, rgba(191,90,242,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'layout style paint'
        }}
      />

      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] rounded-full opacity-20 animate-float-slower"
        style={{
          background: 'radial-gradient(circle, rgba(255,55,95,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
          <Icon size={32} className="text-brand-blue" />
        </div>
      ))}
    </>
  )
})
FloatingIcons.displayName = 'FloatingIcons'

// Simplified typewriter without complex state management
const TypewriterText = memo(({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState(text) // Show text immediately for better LCP
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    // Animate after LCP is captured
    let currentIndex = 0
    const timer = setTimeout(() => {
      setDisplayedText('') // Reset after showing
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }, 500) // Delay animation to not impact LCP

    return () => clearInterval(timer)
  }, [text, shouldReduceMotion])

  return (
    <span className="relative">
      {displayedText}
      {!shouldReduceMotion && (
        <span className="inline-block w-1 h-12 bg-brand-blue ml-1 animate-blink" />
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-gray-50 to-white pt-20 pb-16 md:pt-24 md:pb-20"
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
        <AppleStaggerChildren delay={0}>
          {/* Badge */}
          <AppleStaggerItem>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-brand-gray-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-gray-700">
                בואו נדבר על העסק שלך
              </span>
            </motion.div>
          </AppleStaggerItem>

          {/* Main Headline */}
          <AppleStaggerItem>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
              <span className="block text-brand-navy">הופכים טכנולוגיה</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-brand-blue via-brand-orange to-brand-green bg-clip-text text-transparent">
                  מסובכת
                </span>
              </span>
              <span className="block text-brand-navy mt-2">
                <TypewriterText text="לפתרונות פשוטים" />
              </span>
            </h1>
          </AppleStaggerItem>

          {/* Subtitle */}
          <AppleStaggerItem>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-brand-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 sm:px-0">
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
                  className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-white bg-gradient-to-r from-brand-orange to-brand-orange/90 rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 shadow-xl shadow-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/50"
                >
                  <span className="relative z-10">בואו נדבר על העסק שלך</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-orange/80"
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
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-brand-navy bg-white/80 backdrop-blur-xl border-2 border-brand-blue/30 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:border-brand-blue transition-all duration-300"
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
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-brand-gray-500 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AppleStaggerItem>
        </AppleStaggerChildren>

        {/* Scroll Indicator - CSS animation instead of JS - RTL aware */}
        <div className="absolute bottom-8 start-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-brand-gray-400" />
        </div>
      </motion.div>
    </section>
  )
}
