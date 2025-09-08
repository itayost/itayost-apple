'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9])
  const meshY = useTransform(scrollY, [0, 500], [0, -50])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.section 
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: meshY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]" />
        
        {/* Animated mesh blobs with parallax */}
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
            className="absolute top-20 left-20 w-[600px] h-[600px] opacity-10"
            style={{
              background: 'radial-gradient(circle at 20% 50%, #E1BEF9 0%, transparent 50%)',
              filter: 'blur(100px)',
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
            className="absolute bottom-20 right-20 w-[700px] h-[700px] opacity-10"
            style={{
              background: 'radial-gradient(circle at 80% 80%, #64B5F6 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
        </AppleParallax>
      </motion.div>

      {/* Hero Content with SmoothReveal */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <div className="space-y-6">
          {/* Main Title with SmoothReveal */}
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            <SmoothReveal direction="up" cascade>
              <span className="block">{content.hero.title.line1}</span>
              <span className="block bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.hero.title.line2}
              </span>
              <span className="block">{content.hero.title.line3}</span>
            </SmoothReveal>
          </h1>

          {/* Subtitle */}
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-[#86868B] leading-[1.8] max-w-[600px] mx-auto">
              {content.hero.subtitle}
            </p>
          </SmoothReveal>

          {/* CTA Buttons */}
          <SmoothReveal direction="up" delay={0.5}>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/services">
                <motion.button 
                  className="px-8 py-[14px] bg-[#0071E3] text-white rounded-full font-medium text-base hover:bg-[#0077ED] hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.hero.cta.primary}
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button 
                  className="px-8 py-[14px] bg-white text-[#0071E3] rounded-full font-medium text-base border border-[#C7C7CC] hover:bg-[#F5F5F7] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.hero.cta.secondary}
                </motion.button>
              </Link>
            </div>
          </SmoothReveal>
        </div>

        {/* Scroll Indicator - Fixed position and smaller size */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-[#C7C7CC] rounded-full flex justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-0.5 bg-[#86868B] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
