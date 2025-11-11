'use client'

import { motion } from 'framer-motion'
import { Service } from '@/data/services'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-apple-gray-50 py-24 lg:py-32">
      {/* Gradient background accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
            className="mb-6 inline-block text-6xl lg:text-7xl"
          >
            {service.icon}
          </motion.div>

          {/* Service Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tight text-apple-gray-900 sm:text-5xl lg:text-6xl"
          >
            {service.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mb-6 text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} sm:text-2xl lg:text-3xl`}
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-lg leading-relaxed text-apple-gray-700 sm:text-xl"
          >
            {service.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r ${service.gradient} px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-lg`}
            >
              {service.cta.primary}
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border-2 border-apple-gray-300 bg-white px-8 py-4 text-base font-semibold text-apple-gray-900 transition-all hover:border-apple-gray-400 hover:bg-apple-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-lg"
            >
              {service.cta.secondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
