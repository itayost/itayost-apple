'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { AppleReveal, AppleTextReveal, AppleStaggerChildren, AppleStaggerItem } from '@/components/ScrollAnimations/AppleAnimations'
import { useMouseParallax } from '@/hooks/useAppleScrollEffects'
import Link from 'next/link'
import { ChevronDown, Sparkles, Code2, Palette, Zap } from 'lucide-react'

const GradientMesh = () => {
  const { ref, offset } = useMouseParallax(0.5)
  
  return (
    <div ref={ref as any} className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
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
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,55,95,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

const FloatingIcons = () => {
  const icons = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Palette, delay: 1, x: '80%', y: '30%' },
    { Icon: Sparkles, delay: 2, x: '20%', y: '70%' },
    { Icon: Zap, delay: 1.5, x: '70%', y: '60%' },
  ]

  return (
    <>
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 4,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 20,
              delay,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <Icon size={32} className="text-apple-blue" />
        </motion.div>
      ))}
    </>
  )
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(text.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      } else if (currentIndex === text.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (currentIndex === 0 && isDeleting) {
        setIsDeleting(false)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timer)
  }, [currentIndex, isDeleting, text])

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-apple-gray-50 to-white"
    >
      {/* Background Effects */}
      <GradientMesh />
      <FloatingIcons />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
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
                בניית חוויות דיגיטליות מרשימות
              </span>
            </motion.div>
          </AppleStaggerItem>

          {/* Main Headline */}
          <AppleStaggerItem>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
              <span className="block text-apple-gray-900">הפתרונות</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink bg-clip-text text-transparent">
                  הדיגיטליים
                </span>
              </span>
              <span className="block text-apple-gray-900 mt-2">
                <TypewriterText text="שלך מתחילים כאן" />
              </span>
            </h1>
          </AppleStaggerItem>

          {/* Subtitle */}
          <AppleStaggerItem>
            <p className="text-lg sm:text-xl md:text-2xl text-apple-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              מעצב ומפתח אתרים ואפליקציות ברמה הגבוהה ביותר.
              <br />
              טכנולוגיות מתקדמות, עיצוב מרהיב וחוויית משתמש מושלמת.
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
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-apple-blue to-apple-blue-dark rounded-full font-medium text-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">בואו נתחיל</span>
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
                  className="inline-flex items-center justify-center px-8 py-4 text-apple-blue bg-white/80 backdrop-blur-xl border border-apple-gray-200 rounded-full font-medium text-lg hover:bg-white transition-all duration-300"
                >
                  צפייה בעבודות
                </Link>
              </motion.div>
            </div>
          </AppleStaggerItem>

          {/* Stats */}
          <AppleStaggerItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
              {[
                { number: '50+', label: 'פרויקטים' },
                { number: '100%', label: 'שביעות רצון' },
                { number: '5★', label: 'דירוג ממוצע' },
                { number: '24/7', label: 'תמיכה' },
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
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
      </motion.div>
    </section>
  )
}
