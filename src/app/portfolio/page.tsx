'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { portfolioItems } from '@/data/portfolio'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'

export default function PortfolioPage() {
  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.2}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              Explore our collection of innovative projects that showcase our expertise 
              in creating exceptional digital experiences.
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'AI/ML'].map((category) => (
              <motion.button
                key={category}
                className="px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-[#F5F5F7] text-[#424245] hover:bg-[#0071E3] hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {portfolioItems.map((item, index) => (
              <AppleParallax
                key={item.id}
                offset={30}
                speed={0.3}
                scale
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group cursor-pointer"
                >
                  {/* Project Image */}
                  <motion.div
                    className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center"
                      >
                        <span className="text-2xl">→</span>
                      </motion.div>
                    </motion.div>

                    {/* Featured Badge */}
                    {item.featured && (
                      <span className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur text-sm font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </motion.div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#86868B] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <div className="flex gap-2">
                        {item.technologies.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-[#F5F5F7] text-xs font-medium rounded-full text-[#424245]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#86868B] leading-relaxed">
                      {item.description}
                    </p>

                    <motion.button
                      className="inline-flex items-center gap-2 text-[#0071E3] font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      View Case Study
                      <span>→</span>
                    </motion.button>
                  </div>
                </motion.div>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-20 px-6">
        <div className="text-center">
          <motion.button
            className="px-10 py-4 bg-[#0071E3] text-white rounded-full font-medium hover:bg-[#0077ED] hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Projects
          </motion.button>
        </div>
      </section>
    </main>
  )
}
