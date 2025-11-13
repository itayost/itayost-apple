'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppleStaggerChildren, AppleStaggerItem } from '@/components/ScrollAnimations/AppleAnimations'
import { useHorizontalScroll } from '@/hooks/useAppleScrollEffects'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioData } from '@/data/portfolio'
import {
  ExternalLink,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Code2,
  TrendingUp,
  Clock
} from 'lucide-react'

const categories = [
  { name: 'הכל', value: 'all' },
  { name: 'אתרים', value: 'web' },
  { name: 'אפליקציות', value: 'mobile' },
  { name: 'מערכות', value: 'system' }
]

const PortfolioCard = ({ item, index }: { item: typeof portfolioData[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 min-w-[260px] sm:min-w-[300px] lg:min-w-[360px] xl:min-w-[400px]"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-gradient-to-br from-brand-gray-100 to-brand-gray-200">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />

        {/* Image or Icon */}
        {item.image ? (
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={item.imageSizes?.mobile || item.image}
            />
            <source
              media="(max-width: 1024px)"
              srcSet={item.imageSizes?.display || item.image}
            />
            <Image
              src={item.imageSizes?.desktop || item.image}
              alt={`${item.title} - ${item.description} | פרויקט עבור ${item.client}`}
              title={`${item.title} - ${item.client}`}
              width={757}
              height={519}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 391px, 757px"
              quality={85}
            />
          </picture>
        ) : (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 10 : 0
            }}
          >
            <Globe size={64} className="text-white/30" />
          </motion.div>
        )}
        
        {/* Overlay on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6"
            >
              <div className="text-white">
                <div className="flex gap-4 text-base lg:text-lg font-semibold">
                  {item.stats && Object.entries(item.stats).slice(0, 2).map(([key, value]) => (
                    <span key={key} className="flex items-center gap-1">
                      {key === 'efficiency' || key === 'conversion' || key === 'reservations' ? <TrendingUp size={16} /> :
                       key === 'students' || key === 'users' || key === 'leads' ? <Users size={16} /> :
                       key === 'time' || key === 'loadTime' ? <Clock size={16} /> :
                       <Eye size={16} />}
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Client Badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            className="px-3 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-sm font-semibold text-brand-navy"
            whileHover={{ scale: 1.05 }}
          >
            {item.client}
          </motion.div>
        </div>

        {/* Live Badge */}
        {item.link && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-green-500/90 backdrop-blur-xl text-white rounded-full text-sm font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy mb-3">
          {item.title}
        </h3>

        <p className="text-brand-gray-700 mb-4 text-base lg:text-lg leading-relaxed">
          {item.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-brand-gray-100 rounded-md text-sm font-medium text-brand-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* CTA */}
        {item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <motion.div
              className="inline-flex items-center gap-2 text-brand-blue font-semibold text-base lg:text-lg"
              whileHover={{ x: -5 }}
            >
              <span>צפייה באתר</span>
              <ExternalLink size={20} />
            </motion.div>
          </a>
        ) : (
          <motion.div
            className="inline-flex items-center gap-2 text-brand-gray-700 font-semibold text-base lg:text-lg"
          >
            <span>פרטים נוספים</span>
            <Code2 size={20} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { scrollRef, canScrollLeft, canScrollRight, scrollTo } = useHorizontalScroll()

  const filteredItems = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory)

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container overflow-hidden">
        <AppleStaggerChildren>
          {/* Section Header */}
          <AppleStaggerItem>
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 backdrop-blur-xl rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 text-brand-purple" />
                <span className="text-base font-medium text-brand-purple">
                  סיפורי הצלחה
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy mb-4 sm:mb-6">
                סיפורי הצלחה <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">מהשטח</span>
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-brand-gray-700 max-w-3xl mx-auto px-4 sm:px-0">
                עסקים אמיתיים שחסכו זמן, הגדילו הכנסות ושיפרו את החיים שלהם
              </p>
            </div>
          </AppleStaggerItem>

          {/* Category Filter */}
          <AppleStaggerItem>
            <div className="flex justify-center mb-12">
              <div className="inline-flex gap-2 p-1 bg-brand-gray-100 rounded-full">
                {categories.map((category) => (
                  <motion.button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-6 py-2.5 rounded-full font-semibold text-base lg:text-lg transition-all ${
                      selectedCategory === category.value
                        ? 'bg-white text-brand-blue shadow-lg'
                        : 'text-brand-gray-700 hover:text-brand-navy'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </AppleStaggerItem>

          {/* Portfolio Carousel */}
          <AppleStaggerItem>
            <div className="relative">
              {/* Navigation Buttons */}
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollTo('left')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {canScrollRight && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollTo('right')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
              
              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4 px-4 sm:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredItems.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </AppleStaggerItem>

          {/* Statistics */}
          <AppleStaggerItem>
            <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
              {[
                { value: '500+', label: 'שעות נחסכו לעסקים' },
                { value: '100%', label: 'לקוחות מרוצים' },
                { value: '30%', label: 'גידול ממוצע בהכנסות' },
                { value: '24/7', label: 'זמינות ותמיכה' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-gray-500 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AppleStaggerItem>

          {/* CTA */}
          <AppleStaggerItem>
            <div className="text-center mt-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-brand-purple to-brand-pink rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  צפייה בכל הפרויקטים
                </Link>
              </motion.div>
            </div>
          </AppleStaggerItem>
        </AppleStaggerChildren>
      </div>
    </section>
  )
}
