'use client'

import { motion } from 'framer-motion'

interface ServiceTechnologiesProps {
  technologies: string[]
  color: string
  accentColor: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

export default function ServiceTechnologies({ technologies, color, accentColor }: ServiceTechnologiesProps) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-gray-900 sm:text-4xl">
              טכנולוגיות שאנחנו משתמשים בהן
            </h2>
            <p className="text-lg text-brand-gray-700">
              כלים ופלטפורמות מודרניות ומוכחות
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative overflow-hidden rounded-xl border-2 border-brand-gray-200 bg-white px-6 py-3 shadow-sm transition-all hover:shadow-md"
              >
                {/* Solid color background on hover */}
                <div
                  className={`absolute inset-0 bg-${color} opacity-0 transition-opacity group-hover:opacity-10`}
                  aria-hidden="true"
                />

                <span className="relative text-base font-semibold text-brand-gray-900 sm:text-lg">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
