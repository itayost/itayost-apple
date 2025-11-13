'use client'

import { motion } from 'framer-motion'
import { ServiceFeature } from '@/data/services'

interface ServiceFeaturesProps {
  features: ServiceFeature[]
  gradient: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ServiceFeatures({ features, gradient }: ServiceFeaturesProps) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-gray-900 sm:text-4xl lg:text-5xl">
            מה כלול בשירות?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-gray-700">
            כל מה שצריך כדי להצליח
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-brand-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Gradient accent on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                aria-hidden="true"
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-gray-50 text-3xl transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-brand-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-brand-gray-700">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
