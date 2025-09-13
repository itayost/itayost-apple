// src/components/sections/Portfolio.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioItems } from '@/data/portfolio'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { content } from '@/config/content'
import { isMobile, isTablet, isLowEndDevice, rafThrottle, enableGPUAcceleration } from '@/utils/performance'
import Link from 'next/link'

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [shouldUseHorizontalScroll, setShouldUseHorizontalScroll] = useState(false)
  const [visibleItems, setVisibleItems] = useState(portfolioItems)
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: isMobile() ? "-50px" : "-100px" 
  })

  useEffect(() => {
    // Determine if we should use horizontal scroll
    const mobile = isMobile()
    const tablet = isTablet()
    const lowEnd = isLowEndDevice()
    
    // Only use horizontal scroll on desktop with good performance
    setShouldUseHorizontalScroll(!mobile && !tablet && !lowEnd)
    
    // Limit items on mobile for performance
    if (mobile) {
      setVisibleItems(portfolioItems.slice(0, 6))
    } else if (tablet) {
      setVisibleItems(portfolioItems.slice(0, 8))
    } else {
      setVisibleItems(portfolioItems)
    }

    // Enable GPU acceleration for gallery
    if (galleryRef.current) {
      enableGPUAcceleration(galleryRef.current)
    }
  }, [])

  useEffect(() => {
    // Only setup GSAP for desktop horizontal scroll
    if (!isInView || !shouldUseHorizontalScroll || typeof window === 'undefined') return

    let ScrollTrigger: any = null
    let gsapInstance: any = null

    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
        
        gsapInstance = gsap
        ScrollTrigger = ST
        gsap.registerPlugin(ScrollTrigger)

        if (galleryRef.current && containerRef.current) {
          const gallery = galleryRef.current
          const galleryWidth = gallery.scrollWidth
          const windowWidth = window.innerWidth

          // RTL Fix: Start from right side and scroll to left
          // Set initial position to show items from the right
          gsap.set(gallery, {
            x: 0 // Start at normal position for RTL
          })

          // Create horizontal scroll animation - scrolling right to left for RTL
          const tl = gsap.to(gallery, {
            x: () => (galleryWidth - windowWidth), // Positive value for RTL
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${galleryWidth - windowWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Optimize for mobile
              fastScrollEnd: true,
              preventOverlaps: true,
            },
          })

          return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
          }
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error)
      }
    }

    const cleanup = loadGSAP()
    
    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn())
    }
  }, [isInView, shouldUseHorizontalScroll])

  // Mobile grid layout
  if (isMobile() || isTablet()) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white" id="portfolio">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <div className="text-sm font-medium text-[#86868B] uppercase tracking-wider mb-3">
              {content.portfolio.sectionLabel}
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.portfolio.title}
              </span>
              {' '}
              {content.portfolio.subtitle}
            </h2>
          </SmoothReveal>

          {/* Mobile/Tablet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative rounded-[20px] overflow-hidden group cursor-pointer aspect-[4/5] md:aspect-[3/4]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur text-xs font-medium rounded-full z-10">
                    {content.common.featured}
                  </span>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
                  <div className="mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 bg-white/20 backdrop-blur text-xs font-medium rounded-full ltr"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  {item.link && (
                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        className="mt-3 inline-flex items-center gap-1 text-white/90 hover:text-white text-sm"
                        whileHover={{ x: -5 }}
                      >
                        <span>צפייה בפרויקט</span>
                        <span>←</span>
                      </motion.div>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button for Mobile */}
          {visibleItems.length < portfolioItems.length && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setVisibleItems(portfolioItems)}
                className="px-6 py-3 bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white rounded-full font-medium"
              >
                {content.portfolio.viewAll}
              </button>
            </motion.div>
          )}
        </div>
      </section>
    )
  }

  // Desktop horizontal scroll layout - RTL optimized
  return (
    <section 
      ref={containerRef}
      className="relative bg-white overflow-hidden"
      id="portfolio"
      style={{ minHeight: '100vh' }}
    >
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-32 pb-16 px-6 pointer-events-none">
        <SmoothReveal direction="up" className="text-center">
          <div className="text-sm font-medium text-[#86868B] uppercase tracking-wider mb-4">
            {content.portfolio.sectionLabel}
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              {content.portfolio.title}
            </span>
            {' '}
            {content.portfolio.subtitle}
          </h2>
        </SmoothReveal>
      </div>

      {/* Horizontal Gallery Container - RTL optimized */}
      <div className="flex items-center min-h-screen" dir="ltr"> {/* LTR wrapper for proper scroll */}
        <motion.div
          ref={galleryRef}
          className="flex gap-8 px-8"
          style={{ 
            paddingTop: '200px',
            willChange: 'transform',
            transform: 'translateZ(0)',
            flexDirection: 'row-reverse' // Reverse order for RTL
          }}
        >
          {/* View All Card - Now appears first (on the right) */}
          <motion.div
            className="flex-shrink-0 w-[400px] h-[500px] relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] flex items-center justify-center cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.05 }}
            dir="rtl"
          >
            <Link href="/portfolio" className="flex items-center justify-center w-full h-full">
              <div className="text-center text-white p-8">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl mb-4"
                >
                  ←
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">{content.portfolio.viewAll}</h3>
                <p className="opacity-90">{content.portfolio.explore}</p>
              </div>
            </Link>
          </motion.div>

          {/* Portfolio Items - Reversed order for RTL */}
          {[...visibleItems].reverse().map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[400px] h-[500px] relative rounded-[24px] overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: (index + 1) * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.02 }}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              dir="rtl"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '100%' }}
                whileHover={{ x: '-100%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Featured Badge */}
              {item.featured && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur text-sm font-medium rounded-full z-10">
                  {content.common.featured}
                </span>
              )}

              {/* Content Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {item.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/20 backdrop-blur text-xs font-medium rounded-full ltr"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {item.link && (
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    <motion.div 
                      className="mt-4 inline-flex items-center gap-2 text-white/90 hover:text-white"
                      whileHover={{ x: -5 }}
                    >
                      <span>צפייה בפרויקט</span>
                      <span>←</span>
                    </motion.div>
                  </Link>
                )}
              </motion.div>

              {/* View Project Indicator */}
              <motion.div
                className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#0071E3] text-lg">↗</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - Desktop only */}
      {!isMobile() && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#86868B] text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.span>
          <span>גללו לצפייה בעבודות</span>
          <motion.span
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      )}
    </section>
  )
}