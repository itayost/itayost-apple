'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  
  // Enhanced parallax transforms with mobile optimization
  const heroY = useTransform(scrollY, [0, 500], isMobile ? [0, 50] : [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], isMobile ? [1, 0.95] : [1, 0.85])
  const meshY = useTransform(scrollY, [0, 500], isMobile ? [0, -25] : [0, -100])
  const contentY = useTransform(scrollY, [0, 300], isMobile ? [0, -30] : [0, -60])

  useEffect(() => {
    setMounted(true)
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Preload animations
    if (heroRef.current) {
      heroRef.current.style.willChange = 'transform, opacity'
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      if (heroRef.current) {
        heroRef.current.style.willChange = 'auto'
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden touch-pan-y"
    >
      {/* Enhanced gradient mesh background with performance optimization */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: meshY }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]" />
        
        {/* Animated mesh blobs - reduced on mobile for performance */}
        {!isMobile && (
          <>
            <AppleParallax offset={100} speed={0.3} className="absolute inset-0">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[10%] left-[10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] opacity-10"
                style={{
                  background: 'radial-gradient(circle at 20% 50%, #E1BEF9 0%, transparent 50%)',
                  filter: 'blur(100px)',
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
              />
            </AppleParallax>
            
            <AppleParallax offset={80} speed={0.5} className="absolute inset-0">
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                  scale: [1, 0.95, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[10%] right-[10%] w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] opacity-10"
                style={{
                  background: 'radial-gradient(circle at 80% 80%, #64B5F6 0%, transparent 50%)',
                  filter: 'blur(100px)',
                  transform: 'translateZ(0)',
                }}
              />
            </AppleParallax>
          </>
        )}
        
        {/* Simplified mobile gradient */}
        {isMobile && (
          <div className="absolute inset-0">
            <div 
              className="absolute top-0 left-0 w-full h-1/2 opacity-10"
              style={{
                background: 'radial-gradient(circle at 50% 0%, #E1BEF9 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <div 
              className="absolute bottom-0 right-0 w-full h-1/2 opacity-10"
              style={{
                background: 'radial-gradient(circle at 50% 100%, #64B5F6 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Hero Content with enhanced animations */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 max-w-[900px] mx-auto w-full"
        style={{ y: contentY }}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Main Title with staggered reveal */}
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            <SmoothReveal direction="up" cascade>
              <motion.span 
                className="block"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {content.hero.title.line1}
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {content.hero.title.line2}
              </motion.span>
              <motion.span 
                className="block"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {content.hero.title.line3}
              </motion.span>
            </SmoothReveal>
          </h1>

          {/* Subtitle with fade in */}
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-[#86868B] leading-[1.6] sm:leading-[1.8] max-w-[600px] mx-auto px-4 sm:px-0">
              {content.hero.subtitle}
            </p>
          </SmoothReveal>

          {/* CTA Buttons with hover effects */}
          <SmoothReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-4 sm:px-0">
              <Link href="#contact">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-4 bg-[#0071E3] text-white rounded-full font-medium text-base hover:bg-[#0077ED] transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                  whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {content.hero.cta.primary}
                </motion.button>
              </Link>
              
              <Link href="#portfolio">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#0071E3] rounded-full font-medium text-base border border-[#C7C7CC] hover:bg-[#F5F5F7] hover:border-[#0071E3] transition-all duration-300 shadow-md hover:shadow-lg touch-manipulation"
                  whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {content.hero.cta.secondary}
                </motion.button>
              </Link>
            </div>
          </SmoothReveal>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Mouse outline */}
            <div className="w-6 h-10 border-2 border-[#C7C7CC] rounded-full flex justify-center">
              {/* Scroll wheel dot */}
              <motion.div
                animate={{ 
                  y: [2, 12, 2], 
                  opacity: [1, 0.3, 1] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 h-1 bg-[#86868B] rounded-full mt-2"
              />
            </div>
            
            {/* Scroll text - hidden on mobile */}
            {!isMobile && (
              <motion.p
                className="text-xs text-[#86868B] mt-2 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                גללו למטה
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements for desktop */}
      {!isMobile && (
        <>
          {/* Floating icons with parallax */}
          <AppleParallax offset={40} speed={0.6} className="absolute top-[20%] left-[5%] hidden lg:block">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-4xl opacity-20"
            >
              💻
            </motion.div>
          </AppleParallax>
          
          <AppleParallax offset={60} speed={0.4} className="absolute top-[60%] right-[5%] hidden lg:block">
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -10, 10, 0] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1 
              }}
              className="text-4xl opacity-20"
            >
              🚀
            </motion.div>
          </AppleParallax>
          
          <AppleParallax offset={50} speed={0.5} className="absolute bottom-[30%] left-[8%] hidden lg:block">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2 
              }}
              className="text-3xl opacity-20"
            >
              ✨
            </motion.div>
          </AppleParallax>
        </>
      )}
    </motion.section>
  )
}