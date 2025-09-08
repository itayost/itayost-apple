'use client'

import { motion } from 'framer-motion'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'
import Link from 'next/link'

export default function ServicesClient() {
  const services = content.services.items.map((item, index) => ({
    ...item,
    gradient: [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-teal-500',
      'from-indigo-500 to-blue-500',
      'from-gray-600 to-gray-900'
    ][index],
    price: ['₪5,000+', '₪3,000+', '₪2,000+', '₪8,000+', '₪4,000+', '₪6,000+'][index],
    duration: ['4-8 שבועות', '2-4 שבועות', '1-2 שבועות', '8-12 שבועות', '3-6 שבועות', '2-3 שבועות'][index]
  }))

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.services.title}
              </span>
              {' '}
              <span>{content.services.subtitle}</span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              פתרונות דיגיטליים מותאמים אישית שמניעים את העסק שלכם קדימה
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AppleParallax
                key={service.title}
                offset={30 + (index * 10)}
                speed={0.5 + (index * 0.1)}
              >
                <SmoothReveal direction="up" delay={index * 0.1}>
                  <motion.div
                    className="bg-white rounded-[24px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8E8ED] h-full"
                    whileHover={{ y: -10 }}
                  >
                    {/* Service Icon */}
                    <motion.div 
                      className="text-6xl mb-6"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Service Title */}
                    <h3 className="text-2xl font-semibold mb-4 text-[#1D1D1F]">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-[#86868B] mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#86868B]">מחיר משוער:</span>
                        <span className="text-lg font-semibold text-[#0071E3]">{service.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#86868B]">זמן ביצוע:</span>
                        <span className="text-sm font-medium text-[#424245]">{service.duration}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/contact">
                      <motion.button
                        className={`w-full py-3 rounded-full font-medium text-white bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        קבלו הצעת מחיר
                      </motion.button>
                    </Link>
                  </motion.div>
                </SmoothReveal>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              איך אנחנו{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                עובדים
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              תהליך העבודה שלנו - פשוט, יעיל ושקוף
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '💡', title: 'ייעוץ', desc: 'הבנת הצרכים והיעדים שלכם' },
              { icon: '✏️', title: 'תכנון', desc: 'עיצוב ואפיון הפתרון המושלם' },
              { icon: '🔨', title: 'פיתוח', desc: 'בנייה עם הטכנולוגיות המתקדמות' },
              { icon: '🚀', title: 'השקה', desc: 'עלייה לאוויר ותמיכה מלאה' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{index + 1}. {step.title}</h3>
                <p className="text-[#86868B] text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-4xl font-semibold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              בואו נבנה יחד את הפתרון הדיגיטלי המושלם לעסק שלכם
            </p>
            <Link href="/contact">
              <motion.button
                className="px-10 py-4 bg-white text-[#0071E3] rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                צרו קשר עכשיו
              </motion.button>
            </Link>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}