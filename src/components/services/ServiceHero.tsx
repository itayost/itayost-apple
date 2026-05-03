'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Service } from '@/data/services'
import { ServiceBreadcrumbs } from '@/components/common/Breadcrumbs'
import { getServiceColors } from '@/lib/colors'
import { trackServiceView, trackCtaClick } from '@/lib/analytics'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const colors = getServiceColors(service.color)

  useEffect(() => {
    trackServiceView(service.name, service.slug)
  }, [service.name, service.slug])

  // Smooth-scroll handler that guarantees a visible page change on every click.
  // This avoids relying solely on the native hash jump (which can feel like a
  // "dead click" if the target is far below the viewport and no motion is
  // perceived during the jump).
  const handleAnchorClick = (
    targetId: string,
    label: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    trackCtaClick(label, 'service_hero', `#${targetId}`)
    const el = typeof document !== 'undefined' ? document.getElementById(targetId) : null
    if (el) {
      event.preventDefault()
      const navOffset = 96 // ≈ fixed nav height incl. some breathing room
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
      // Keep the URL hash in sync so back-button / reload works as expected.
      if (typeof window.history?.replaceState === 'function') {
        window.history.replaceState(null, '', `#${targetId}`)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-24 lg:pt-12 lg:pb-32">
      {/* Solid color background accent */}
      <div
        className={`absolute inset-0 ${colors.bgLight}`}
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
            className={`mb-6 text-xl font-bold ${colors.text} sm:text-2xl lg:text-3xl`}
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4 text-lg leading-relaxed text-brand-gray-700 sm:text-xl"
          >
            {service.description}
          </motion.p>

          {/* Last Updated */}
          {service.lastUpdated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mb-8 text-sm text-brand-gray-500 flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              <span>
                {`עודכן לאחרונה: ${new Date(service.lastUpdated).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}`}
              </span>
            </motion.p>
          )}

          {/* CTA Buttons - keep them static so they're always clickable,
              even during hydration or if Framer Motion is slow to mount. */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className={`btn btn-primary ${colors.bg}`}
              onClick={(e) => handleAnchorClick('contact', service.cta.primary, e)}
            >
              {service.cta.primary}
            </a>
            <a
              href="#portfolio"
              className="btn btn-ghost"
              onClick={(e) => handleAnchorClick('portfolio', service.cta.secondary, e)}
            >
              {service.cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
