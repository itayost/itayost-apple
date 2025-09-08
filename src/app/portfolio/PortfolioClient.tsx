'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, categories } from '@/data/portfolio'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'
import Link from 'next/link'

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState('הכל')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const filteredItems = selectedCategory === 'הכל'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.portfolio.title}
              </span>
              {' '}
              <span>{content.portfolio.subtitle}</span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              גלו את הפרויקטים המרשימים שלנו ואיך הפכנו רעיונות למוצרים דיגיטליים מצליחים
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6 bg-white border-b border-[#E8E8ED]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white'
                      : 'bg-[#F5F5F7] text-[#424245] hover:bg-[#E8E8ED]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </SmoothReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredItems.map((item, index) => (
                <AppleParallax
                  key={item.id}
                  offset={30 + (index * 5)}
                  speed={0.3}
                >
                  <motion.div
                    className="group relative rounded-[24px] overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ y: -10 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* Gradient Background */}
                    <div className={`aspect-[4/5] bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                      {/* Animated overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Featured Badge */}
                      {item.featured && (
                        <motion.span
                          className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur text-sm font-medium rounded-full z-10"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {content.common.featured}
                        </motion.span>
                      )}

                      {/* Project Number */}
                      <motion.div
                        className="absolute bottom-6 left-6 text-6xl font-bold text-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>

                      {/* View Project Icon */}
                      <motion.div
                        className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: hoveredItem === item.id ? 1 : 0,
                          scale: hoveredItem === item.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          className="text-[#0071E3] text-xl"
                          animate={{ rotate: hoveredItem === item.id ? -45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ↖
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#86868B]">
                          {item.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-3 text-[#1D1D1F] group-hover:bg-gradient-to-r group-hover:from-[#0071E3] group-hover:to-[#BF5AF2] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-[#86868B] mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-[#F5F5F7] text-xs font-medium rounded-full text-[#424245]"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-[#F5F5F7] text-xs font-medium rounded-full text-[#424245]">
                            +{item.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AppleParallax>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              הפרויקטים שלנו{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                במספרים
              </span>
            </h2>
          </SmoothReveal>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'פרויקטים הושלמו' },
              { number: '95%', label: 'שביעות רצון לקוחות' },
              { number: '20+', label: 'פרסים וזכיות' },
              { number: '24/7', label: 'תמיכה זמינה' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-5xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h3>
                <p className="text-[#86868B]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-4xl font-semibold mb-6">
              יש לכם פרויקט בראש?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              בואו נהפוך את הרעיון שלכם למציאות דיגיטלית מרשימה
            </p>
            <Link href="/contact">
              <motion.button
                className="px-10 py-4 bg-white text-[#0071E3] rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                בואו נדבר
              </motion.button>
            </Link>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}