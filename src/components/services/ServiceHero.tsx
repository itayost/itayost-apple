'use client'

import { motion } from 'framer-motion'
import { Service } from '@/data/services'
import { ServiceBreadcrumbs } from '@/components/common/Breadcrumbs'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-24 lg:pt-12 lg:pb-32">
      {/* Solid color background accent */}
      <div
        className={`absolute inset-0 bg-${service.color} opacity-5`}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <ServiceBreadcrumbs serviceName={service.name} />
        </motion.div>

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
            className="mb-4 text-4xl font-bold tracking-tight text-brand-gray-900 sm:text-5xl lg:text-6xl"
          >
            {service.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mb-6 text-xl font-bold text-${service.color} sm:text-2xl lg:text-3xl`}
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-lg leading-relaxed text-brand-gray-700 sm:text-xl"
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
              className={`btn btn-primary bg-${service.color}`}
            >
              {service.cta.primary}
            </a>
            <a
              href="#portfolio"
              className="btn btn-ghost"
            >
              {service.cta.secondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
