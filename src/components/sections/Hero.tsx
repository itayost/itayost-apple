'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowLeft, Star, Zap, Heart, Rocket } from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Simple floating shapes - Mailchimp style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue circle */}
        <motion.div
          className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-brand-blue/10"
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
          className="absolute bottom-32 left-[15%] w-24 h-24 rounded-full bg-brand-orange/10"
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
          className="absolute top-1/3 left-[5%] w-16 h-16 bg-brand-navy/5"
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
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
              פיתוח אתרים ואפליקציות
            </span>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: bouncyEasing }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
        >
          <span className="block text-brand-navy">
            בואו נבנה משהו
          </span>
          <span className="block text-brand-orange mt-2">
            מדהים ביחד!
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: bouncyEasing }}
          className="text-xl sm:text-2xl md:text-3xl text-brand-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          אתרים מהירים, אפליקציות חכמות, ומערכות שפשוט עובדות.
          <br />
          <span className="text-brand-blue font-bold">אין יותר כאבי ראש טכנולוגיים</span>
        </motion.p>

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
              <span>בואו נדבר</span>
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
              <span>ראו את העבודות</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats - Playful cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: bouncyEasing }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Heart, number: '50+', label: 'לקוחות מרוצים', color: 'bg-red-500' },
            { icon: Rocket, number: '100+', label: 'פרויקטים', color: 'bg-brand-blue' },
            { icon: Star, number: '5', label: 'שנות ניסיון', color: 'bg-brand-orange' },
            { icon: Zap, number: '24/7', label: 'תמיכה', color: 'bg-brand-green' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.5,
                ease: bouncyEasing
              }}
              whileHover={{
                y: -8,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-2xl mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-brand-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-3 border-brand-gray-300 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-brand-gray-400 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
