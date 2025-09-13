'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { OptimizedReveal, OptimizedStagger } from '@/components/ScrollAnimations/OptimizedAnimations'
import { usePerformance } from '@/contexts/PerformanceContext'
import Link from 'next/link'
import { ChevronDown, Sparkles, Code2, Palette, Zap } from 'lucide-react'

// Mobile-optimized gradient (static)
const MobileGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />
  </div>
)

// Desktop animated gradient (with CSS animations for better performance)
const DesktopGradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="gradient-mesh-container">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>
    </div>
  )
}

// Desktop-only floating icons
const FloatingIcons = () => {
  const { isMobile } = usePerformance()
  
  if (isMobile) return null
  
  const icons = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Palette, delay: 1, x: '80%', y: '30%' },
    { Icon: Sparkles, delay: 2, x: '20%', y: '70%' },
    { Icon: Zap, delay: 1.5, x: '70%', y: '60%' },
  ]

  return (
    <>
      {icons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute opacity-20 animate-float"
          style={{ 
            left: x, 
            top: y,
            animationDelay: `${delay}s`
          }}
        >
          <Icon size={32} className="text-blue-600" />
        </div>
      ))}
    </>
  )
}

// Simple typewriter without heavy animations for mobile
const SimpleTypewriter = ({ text, enabled = true }: { text: string; enabled?: boolean }) => {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : text)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      return
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, enabled])

  return (
    <span className="relative">
      {displayedText}
      {enabled && currentIndex < text.length && (
        <span className="inline-block w-1 h-12 bg-blue-600 ml-1 animate-blink" />
      )}
    </span>
  )
}

export default function OptimizedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLowPerformance, isTouchDevice } = usePerformance()
  
  // Only use scroll transforms on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Disable parallax on mobile
  const opacity = !isMobile ? useTransform(scrollYProgress, [0, 0.5], [1, 0]) : undefined
  const scale = !isMobile && !isLowPerformance ? useTransform(scrollYProgress, [0, 0.5], [1, 1.05]) : undefined
  const y = !isMobile ? useTransform(scrollYProgress, [0, 0.5], [0, 50]) : undefined

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Conditional background based on performance */}
      {isLowPerformance || isMobile ? <MobileGradient /> : <DesktopGradientMesh />}
      
      {/* Desktop-only floating icons */}
      <FloatingIcons />
      
      {/* Grid Pattern - lighter on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      )}
      
      {/* Main Content */}
      <motion.div 
        className="container relative z-10 text-center px-4 sm:px-6 lg:px-8"
        style={!isMobile ? { opacity, scale, y } : undefined}
        initial={isMobile ? { opacity: 0, y: 20 } : undefined}
        animate={isMobile ? { opacity: 1, y: 0 } : undefined}
        transition={isMobile ? { duration: 0.6, ease: "easeOut" } : undefined}
      >
        {/* Badge */}
        <OptimizedReveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              בניית חוויות דיגיטליות מרשימות
            </span>
          </div>
        </OptimizedReveal>

        {/* Main Headline */}
        <OptimizedReveal delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
            <span className="block text-gray-900">הפתרונות</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                הדיגיטליים
              </span>
            </span>
            <span className="block text-gray-900 mt-2">
              <SimpleTypewriter text="שלך מתחילים כאן" enabled={!isMobile} />
            </span>
          </h1>
        </OptimizedReveal>

        {/* Subtitle */}
        <OptimizedReveal delay={0.3}>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            מעצב ומפתח אתרים ואפליקציות ברמה הגבוהה ביותר.
            <br />
            טכנולוגיות מתקדמות, עיצוב מרהיב וחוויית משתמש מושלמת.
          </p>
        </OptimizedReveal>

        {/* CTA Buttons */}
        <OptimizedReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full font-medium text-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">בואו נתחיל</span>
            </Link>
            
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-blue-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full font-medium text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              צפייה בעבודות
            </Link>
          </div>
        </OptimizedReveal>

        {/* Stats - Simplified animation on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { number: '50+', label: 'פרויקטים' },
            { number: '100%', label: 'שביעות רצון' },
            { number: '5★', label: 'דירוג ממוצע' },
            { number: '24/7', label: 'תמיכה' },
          ].map((stat, index) => (
            <OptimizedReveal key={index} delay={0.5 + index * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {stat.label}
                </div>
              </div>
            </OptimizedReveal>
          ))}
        </div>

        {/* Scroll Indicator - Simple animation on mobile */}
        {!isTouchDevice && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </motion.div>
    </section>
  )
}
