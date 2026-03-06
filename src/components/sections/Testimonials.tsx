'use client'

import { motion } from 'framer-motion'
import { Quote, Sparkles, Star } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { bouncyEasing } from '@/constants/animations'

const testimonials = portfolioData
  .filter(p => p.testimonial.text && p.results.length > 0)
  .slice(0, 4)
  .map(p => ({
    text: p.testimonial.text,
    author: p.testimonial.author,
    role: p.testimonial.role,
    project: p.title,
    highlight: p.results[0] ?? { label: '', value: '' },
  }))

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-section-light-blue">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green/10 rounded-full mb-6"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Sparkles className="w-5 h-5 text-brand-green" />
            <span className="text-base font-bold text-brand-green">
              מה הלקוחות אומרים
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-6">
            הלקוחות מדברים
          </h2>

          <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto">
            עסקים אמיתיים, תוצאות אמיתיות
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: bouncyEasing
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-brand-blue/20 mb-4" />

              {/* Testimonial Text */}
              <p className="text-lg text-brand-gray-700 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Result Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full mb-6">
                <Star className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green">
                  {testimonial.highlight.label}: {testimonial.highlight.value}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-brand-navy">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-brand-gray-700">
                    {testimonial.role} | {testimonial.project}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
