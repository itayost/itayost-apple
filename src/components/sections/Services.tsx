'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code2, Smartphone, Zap, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

const services = [
  {
    icon: Code2,
    title: 'אתרים ונוכחות דיגיטלית',
    description: 'אתר שעובד בשבילך 24/7 - מרשים, מהיר וממיר',
    features: [
      'עיצוב מותאם למותג שלך',
      'אתר מהיר וידידותי למובייל',
      'אופטימיזציה למנועי חיפוש',
      'אינטגרציה עם כלי שיווק'
    ],
    color: 'bg-brand-blue',
    iconColor: 'text-brand-blue',
    href: '/services/web-development'
  },
  {
    icon: Smartphone,
    title: 'מערכות ניהול חכמות',
    description: 'תפסיקו לנהל ידנית, תתחילו לנהל חכם',
    features: [
      'CRM וניהול לקוחות',
      'מערכת תורים אוטומטית',
      'ניהול מלאי ומוצרים',
      'דוחות וסטטיסטיקות'
    ],
    color: 'bg-brand-orange',
    iconColor: 'text-brand-orange',
    href: '/services/crm-systems'
  },
  {
    icon: Zap,
    title: 'אוטומציה ואינטגרציות',
    description: 'חברו את כל המערכות - חסכו זמן ומאמץ',
    features: [
      'חיבור בין מערכות קיימות',
      'אוטומציה של תהליכים',
      'התראות וטריגרים חכמים',
      'סנכרון נתונים אוטומטי'
    ],
    color: 'bg-brand-green',
    iconColor: 'text-brand-green',
    href: '/services/landing-pages'
  }
]

export default function Services() {
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full mb-6"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: bouncyEasing }
            }}
          >
            <Sparkles className="w-5 h-5 text-brand-blue" />
            <span className="text-base font-bold text-brand-blue">
              איך אנחנו עוזרים
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-navy mb-6">
            מה אנחנו עושים?
          </h2>

          <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto">
            פתרונות דיגיטליים שמתאימים בדיוק לעסק שלכם
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
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
                y: -12,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Link href={service.href}>
                <div className="bg-white rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-shadow">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-2xl mb-6`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5, ease: bouncyEasing }
                    }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-brand-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + idx * 0.1,
                          duration: 0.5,
                          ease: bouncyEasing
                        }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className={`w-5 h-5 ${service.iconColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-brand-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.div
                    className={`inline-flex items-center gap-2 font-bold ${service.iconColor}`}
                    whileHover={{
                      x: -5,
                      transition: { duration: 0.3, ease: bouncyEasing }
                    }}
                  >
                    <span>למידע נוסף</span>
                    <ArrowLeft className="w-5 h-5" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: bouncyEasing }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                למה לבחור בנו?
              </h3>

              <div className="space-y-6">
                {[
                  {
                    title: 'שירות אישי',
                    description: 'לא חברה ענקית - אתם מדברים ישירות איתי'
                  },
                  {
                    title: 'פתרונות מותאמים',
                    description: 'לא מוצר מדף - בונים בדיוק מה שאתם צריכים'
                  },
                  {
                    title: 'תמיכה מתמשכת',
                    description: 'גם אחרי ההשקה - אנחנו כאן בשבילכם'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: bouncyEasing
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-navy mb-1">
                        {item.title}
                      </h4>
                      <p className="text-brand-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '50+', label: 'לקוחות מרוצים', color: 'bg-brand-blue' },
                { number: '100+', label: 'פרויקטים', color: 'bg-brand-orange' },
                { number: '15', label: 'שעות נחסכות בשבוע', color: 'bg-brand-green' },
                { number: '30%', label: 'הגדלת הכנסות', color: 'bg-yellow-400' },
              ].map((stat, index) => (
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
                    rotate: index % 2 === 0 ? 2 : -2,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className={`${stat.color} rounded-3xl p-6 text-white shadow-lg hover:shadow-2xl transition-shadow`}
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: bouncyEasing }}
          className="text-center mt-16"
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
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-5 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>ראו את כל השירותים</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
