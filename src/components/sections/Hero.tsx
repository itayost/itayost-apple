'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowLeft, Clock } from 'lucide-react'
import { content } from '@/config/content'
import { bouncyEasing } from '@/constants/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Simple floating shapes - Mailchimp style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue circle */}
        <motion.div
          className="absolute top-20 end-[10%] w-32 h-32 rounded-full bg-brand-blue/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Orange circle */}
        <motion.div
          className="absolute bottom-32 start-[15%] w-24 h-24 rounded-full bg-brand-orange/10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Navy blob */}
        <motion.div
          className="absolute top-1/3 start-[5%] w-16 h-16 bg-brand-navy/5"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 text-center px-4">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: bouncyEasing }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue rounded-full shadow-lg"
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-base font-bold text-white">
              מערכות, אוטומציות ואתרים
            </span>
          </motion.div>
        </motion.div>

        {/* Main Headline - No opacity animation to avoid LCP delay */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="block text-brand-navy">
            {content.hero.title.line1}
          </span>
          <span className="block text-brand-orange">
            {content.hero.title.line2}
          </span>
        </h1>

        {/* Subtitle - Benefit Focused - No opacity animation for LCP */}
        <p className="text-xl sm:text-2xl md:text-3xl text-brand-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
          {content.hero.subtitle}
          <br />
          <span className="text-brand-blue font-bold">אין יותר כאבי ראש טכנולוגיים</span>
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: bouncyEasing }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
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
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Clock className="w-5 h-5" />
              <span>{content.hero.cta.primary}</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>

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
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white border-3 border-brand-navy text-brand-navy rounded-full font-bold text-lg hover:bg-brand-navy hover:text-white transition-colors"
            >
              <span>{content.hero.cta.secondary}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
