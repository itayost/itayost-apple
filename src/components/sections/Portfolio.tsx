'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioItems } from '@/data/portfolio'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    // Only run on client side and when elements are in view
    if (!isInView || typeof window === 'undefined') return

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      if (galleryRef.current) {
        const gallery = galleryRef.current
        const galleryWidth = gallery.scrollWidth
        const windowWidth = window.innerWidth

        // Horizontal scroll animation
        gsap.to(gallery, {
          x: () => -(galleryWidth - windowWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${galleryWidth - windowWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Cleanup on unmount
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
      }
    }

    loadGSAP()
  }, [isInView])

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
            Our Work
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </SmoothReveal>
      </div>

      {/* Horizontal Gallery Container */}
      <div className="flex items-center min-h-screen">
        <motion.div
          ref={galleryRef}
          className="flex gap-8 px-8"
          style={{ paddingTop: '200px' }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[400px] h-[500px] relative rounded-[24px] overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Featured Badge */}
              {item.featured && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur text-sm font-medium rounded-full z-10">
                  Featured
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
                      className="px-3 py-1 bg-white/20 backdrop-blur text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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

          {/* View All Card */}
          <motion.div
            className="flex-shrink-0 w-[400px] h-[500px] relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] flex items-center justify-center cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.6, 
              delay: portfolioItems.length * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center text-white p-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-4"
              >
                →
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">View All Projects</h3>
              <p className="opacity-90">Explore our complete portfolio</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
        <span>Scroll to explore</span>
        <motion.span
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>
    </section>
  )
}
