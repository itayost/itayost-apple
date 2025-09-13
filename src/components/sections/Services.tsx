'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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
  ][index]
}))

export function Services() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-32 px-6 bg-white" id="services">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Section Header with SmoothReveal */}
        <SmoothReveal direction="up" className="text-center mb-20">
          <div className="text-sm font-medium text-[#86868B] uppercase tracking-wider mb-4">
            {content.services.sectionLabel}
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              {content.services.title}
            </span>
            {' '}
            <span className="text-[#1D1D1F]">{content.services.subtitle}</span>
          </h2>
        </SmoothReveal>

        {/* Services Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AppleParallax
              key={service.title}
              offset={30 + (index * 10)}
              speed={0.5 + (index * 0.1)}
              scale
              className="h-full"
            >
              <SmoothReveal
                direction="up"
                delay={index * 0.1}
                className="h-full"
              >
                <motion.div
                  className="relative bg-[#F5F5F7] rounded-[20px] p-10 h-full overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top gradient bar */}
                  <motion.div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="text-5xl mb-6 inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-[#1D1D1F] group-hover:bg-gradient-to-r group-hover:from-[#0071E3] group-hover:to-[#BF5AF2] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#86868B] leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Learn more link (appears on hover) */}
                  <motion.div 
                    className="mt-6 text-[#0071E3] font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span>{content.services.learnMore}</span>
                    <motion.span
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ←
                    </motion.span>
                  </motion.div>

                  {/* Background gradient on hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  />
                </motion.div>
              </SmoothReveal>
            </AppleParallax>
          ))}
        </div>
      </div>
    </section>
  )
}
