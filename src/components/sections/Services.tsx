'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { content } from '@/config/content'

const services = content.services.items.map((item, index) => ({
  ...item,
  gradient: [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-indigo-500 to-blue-500',
    'from-gray-600 to-gray-900'
  ][index],
  iconBg: [
    'from-[#0071E3] to-[#5AC8FA]',
    'from-[#BF5AF2] to-[#FF375F]',
    'from-[#FF9500] to-[#FF375F]',
    'from-[#30D158] to-[#5AC8FA]',
    'from-[#5856D6] to-[#0071E3]',
    'from-[#424245] to-[#1D1D1F]'
  ][index]
}))

export function Services() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: isMobile ? "-50px" : "-100px" 
  })
  
  // Scroll-based animations
  const { scrollY } = useScroll()
  const sectionY = useTransform(scrollY, [0, 1000], [0, -50])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section 
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white relative overflow-hidden" 
      id="services"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0071E3 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10" 
        ref={containerRef}
        style={!isMobile ? { y: sectionY } : {}}
      >
        {/* Section Header with enhanced animations */}
        <SmoothReveal direction="up" className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div 
            className="text-xs sm:text-sm font-medium text-[#86868B] uppercase tracking-[0.2em] mb-3 sm:mb-4"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {content.services.sectionLabel}
          </motion.div>
          
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            <motion.span 
              className="inline-block bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {content.services.title}
            </motion.span>
            {' '}
            <motion.span 
              className="inline-block text-[#1D1D1F]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.services.subtitle}
            </motion.span>
          </h2>
        </SmoothReveal>

        {/* Services Grid with responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <AppleParallax
              key={service.title}
              offset={isMobile ? 0 : 30 + (index * 10)}
              speed={isMobile ? 0 : 0.5 + (index * 0.1)}
              scale={!isMobile}
              disabled={isMobile}
              className="h-full"
            >
              <SmoothReveal
                direction="up"
                delay={index * 0.1}
                className="h-full"
              >
                <motion.div
                  className="relative bg-[#F5F5F7] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 lg:p-10 h-full overflow-hidden group cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={!isMobile ? { 
                    y: -8,
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                  } : {}}
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  } : {}}
                  style={{
                    transform: 'translateZ(0)', // Force GPU acceleration
                    boxShadow: hoveredIndex === index 
                      ? '0 20px 40px rgba(0, 0, 0, 0.1)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {/* Top gradient bar with animation */}
                  <motion.div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={hoveredIndex === index ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                  
                  {/* Icon with gradient background */}
                  <motion.div 
                    className="relative mb-6"
                    whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg`}
                      animate={hoveredIndex === index ? {
                        rotate: [0, -5, 5, 0],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-2xl sm:text-3xl filter brightness-0 invert">
                        {service.icon}
                      </span>
                    </motion.div>
                    
                    {/* Floating badge for mobile */}
                    {isMobile && index === 0 && (
                      <motion.span
                        className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-[#FF375F] to-[#FF9500] text-white text-xs rounded-full font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        פופולרי
                      </motion.span>
                    )}
                  </motion.div>
                  
                  {/* Title with hover effect */}
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-[#1D1D1F] transition-all duration-300 ${
                    hoveredIndex === index 
                      ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent' 
                      : ''
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#86868B] leading-relaxed text-sm sm:text-base mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features list (optional enhancement) */}
                  <motion.div
                    className="space-y-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {['תכנון מותאם', 'עיצוב מודרני', 'תמיכה מלאה'].map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#86868B]"
                        initial={{ x: -20, opacity: 0 }}
                        animate={hoveredIndex === index ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-[#30D158]">✓</span>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Learn more link with arrow animation */}
                  <motion.div 
                    className={`mt-auto flex items-center gap-2 text-[#0071E3] font-medium transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <span>{content.services.learnMore}</span>
                    <motion.span
                      animate={hoveredIndex === index ? { x: [0, -5, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block"
                    >
                      ←
                    </motion.span>
                  </motion.div>

                  {/* Background gradient overlay on hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} pointer-events-none rounded-[20px] sm:rounded-[24px]`}
                    initial={{ opacity: 0 }}
                    animate={hoveredIndex === index ? { opacity: 0.03 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Corner decoration */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.gradient}`} />
                  </motion.div>
                </motion.div>
              </SmoothReveal>
            </AppleParallax>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-[#86868B] mb-6 text-sm sm:text-base">
            לא מצאתם את מה שחיפשתם? נשמח לשמוע על הפרויקט שלכם
          </p>
          <motion.button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white rounded-full font-medium hover:shadow-xl transition-all duration-300"
            whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            בואו נדבר על הפרויקט שלכם
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}