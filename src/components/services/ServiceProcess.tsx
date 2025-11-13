'use client'

import { motion } from 'framer-motion'
import { ServiceProcess as ProcessStep } from '@/data/services'

interface ServiceProcessProps {
  process: ProcessStep[]
  color: string
  accentColor: string
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
}

export default function ServiceProcess({ process, color, accentColor }: ServiceProcessProps) {
  return (
    <section className="bg-brand-gray-50 py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-gray-900 sm:text-4xl lg:text-5xl">
            איך זה עובד?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-gray-700">
            תהליך עבודה שקוף וברור משלב לשלב
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line - RTL adjusted */}
            <div
              className="absolute right-8 top-0 h-full w-0.5 bg-brand-gray-200 sm:right-12"
              aria-hidden="true"
            />

            {/* Process steps */}
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div
                    className={`absolute right-0 flex h-16 w-16 items-center justify-center rounded-full bg-${color} text-2xl font-bold text-white shadow-lg sm:right-4`}
                  >
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div className="mr-24 rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:mr-28 sm:p-8">
                    <div className="flex flex-col gap-3">
                      {/* Title and duration */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-brand-gray-900 sm:text-2xl">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="shrink-0 rounded-full bg-brand-gray-100 px-3 py-1 text-sm font-medium text-brand-gray-700">
                            {step.duration}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="leading-relaxed text-brand-gray-700">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
