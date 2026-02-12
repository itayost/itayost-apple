'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioData, portfolioCategories } from '@/data/portfolio'
import { ExternalLink, Sparkles, ArrowLeft } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

const PortfolioCard = ({ item, index }: { item: typeof portfolioData[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: bouncyEasing
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3, ease: bouncyEasing }
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Image Container */}
      <div className="relative h-64 bg-brand-gray-100 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            width={757}
            height={519}
            className="w-full h-full object-cover"
            priority={index < 2}
            loading={index < 2 ? undefined : 'lazy'}
          />
        ) : (
          <div className={`w-full h-full bg-${item.color}/10 flex items-center justify-center`}>
            <div className="text-brand-gray-400 text-6xl font-bold">
              {item.title.slice(0, 2)}
            </div>
          </div>
        )}

        {/* Live Badge */}
        {item.link && (
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-brand-green text-white rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Client */}
        <div className="mb-3">
          <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold">
            {item.client}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-brand-gray-700 mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-brand-gray-100 rounded-full text-sm font-medium text-brand-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <motion.div
              className="inline-flex items-center gap-2 text-brand-blue font-bold"
              whileHover={{
                x: -5,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <span>צפייה באתר</span>
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </a>
        ) : (
          <motion.div
            className="inline-flex items-center gap-2 text-brand-gray-600 font-bold"
            whileHover={{
              x: -5,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <span>פרטים נוספים</span>
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredItems = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange/10 rounded-full mb-6"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Sparkles className="w-5 h-5 text-brand-orange" />
            <span className="text-base font-bold text-brand-orange">
              סיפורי הצלחה
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy mb-4 sm:mb-6">
            סיפורי הצלחה <span className="text-brand-orange">מהשטח</span>
          </h2>

          <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto">
            עסקים אמיתיים שחסכו זמן, הגדילו הכנסות ושיפרו את החיים שלהם
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: bouncyEasing }}
          className="mb-16"
        >
          {/* Desktop: Centered tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex gap-3 p-2 bg-brand-gray-100 rounded-full">
              {portfolioCategories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    selectedCategory === category.value
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-navy'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile: Scrollable tabs */}
          <div
            className="sm:hidden overflow-x-auto -mx-4 scrollbar-hide flex justify-center"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-3 p-2 bg-brand-gray-100 rounded-full mx-4" style={{ width: 'max-content' }}>
              {portfolioCategories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    selectedCategory === category.value
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-navy'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: '500+', label: 'שעות נחסכו לעסקים', color: 'bg-brand-blue' },
            { value: '100%', label: 'לקוחות מרוצים', color: 'bg-brand-orange' },
            { value: '30%', label: 'גידול ממוצע בהכנסות', color: 'bg-brand-green' },
            { value: '24/7', label: 'זמינות ותמיכה', color: 'bg-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: bouncyEasing
              }}
              whileHover={{
                y: -8,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              className={`${stat.color} rounded-3xl p-6 text-center text-white shadow-lg hover:shadow-2xl transition-shadow`}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: bouncyEasing }}
          className="text-center"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-10 py-5 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>צפייה בכל הפרויקטים</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
