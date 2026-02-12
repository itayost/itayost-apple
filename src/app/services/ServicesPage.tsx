'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  Smartphone,
  Palette,
  Zap,
  Settings,
  Shield,
  HeartHandshake,
  TrendingUp,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  BarChart3,
  ShoppingCart,
  Target,
  LucideIcon
} from 'lucide-react'
import Link from 'next/link'
import { getAllServicesSorted } from '@/data/services'
import { bouncyEasing } from '@/constants/animations'
import { getServiceColors } from '@/lib/colors'

// Icon mapping from lucideIcon string to actual component
const iconMap: Record<string, LucideIcon> = {
  'Code2': Code2,
  'Smartphone': Smartphone,
  'Zap': Zap,
  'BarChart3': BarChart3,
  'ShoppingCart': ShoppingCart,
  'Palette': Palette,
  'Target': Target,
}

const process = [
  {
    icon: HeartHandshake,
    title: 'פגישת היכרות',
    description: 'הבנת הצרכים והיעדים העסקיים',
    color: 'bg-red-500'
  },
  {
    icon: Settings,
    title: 'תכנון ועיצוב',
    description: 'יצירת פרוטוטייפ ועיצוב הממשק',
    color: 'bg-brand-blue'
  },
  {
    icon: Code2,
    title: 'פיתוח',
    description: 'כתיבת הקוד ובניית המוצר',
    color: 'bg-brand-orange'
  },
  {
    icon: Shield,
    title: 'בדיקות',
    description: 'בדיקות איכות ותיקון באגים',
    color: 'bg-brand-green'
  },
  {
    icon: Zap,
    title: 'השקה',
    description: 'העלאה לאוויר וליווי ראשוני',
    color: 'bg-yellow-400'
  },
  {
    icon: TrendingUp,
    title: 'תמיכה ושדרוג',
    description: 'תחזוקה שוטפת ושיפורים',
    color: 'bg-brand-navy'
  }
]

export default function ServicesPage() {
  const services = getAllServicesSorted()

  return (
    <main className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span className="text-base font-bold text-brand-blue">
                  השירותים שלנו
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              מערכות, אוטומציות
              <span className="block mt-2 text-brand-blue">
                ואתרים לעסקים
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700"
            >
              מהרעיון הראשוני ועד להשקה המוצלחת - אני מספק את כל השירותים הדרושים להצלחה הדיגיטלית שלך
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.lucideIcon] || Code2
              const serviceColors = getServiceColors(service.color)

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: bouncyEasing
                  }}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      className={`w-20 h-20 ${serviceColors.bg} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5, ease: bouncyEasing }
                      }}
                    >
                      <IconComponent size={36} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
                        {service.name}
                      </h3>
                      <p className="text-brand-gray-700 text-lg">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-brand-gray-700 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-bold text-brand-navy mb-4 text-lg">
                      מה כולל השירות:
                    </h4>
                    <ul className="space-y-3">
                      {service.features.slice(0, 6).map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + idx * 0.05,
                            duration: 0.5,
                            ease: bouncyEasing
                          }}
                          className="flex items-start gap-3 text-brand-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                          <span>{feature.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {service.technologies && service.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold text-brand-navy mb-4 text-lg">
                        טכנולוגיות:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-brand-gray-100 rounded-full text-sm font-medium text-brand-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-brand-gray-200">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      למידע נוסף
                    </Link>

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
                        href={`/contact?service=${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <span>קבל הצעה</span>
                        <ArrowLeft className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              תהליך העבודה שלנו
            </h2>
            <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto">
              תהליך מסודר ושקוף מתחילת הפרויקט ועד להשקה
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
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
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow text-center"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center text-white`}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6, ease: bouncyEasing }
                    }}
                  >
                    <step.icon size={36} />
                  </motion.div>
                  <div className="absolute -top-2 -start-2 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-brand-blue text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed">
              בואו נדבר על הפרויקט הבא שלכם ונראה איך אפשר להפוך את הרעיון למציאות
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  className="inline-flex items-center justify-center px-10 py-5 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  קבל הצעת מחיר
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
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-blue rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  צפה בעבודות שלנו
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
