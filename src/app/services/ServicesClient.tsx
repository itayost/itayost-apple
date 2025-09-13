// src/app/services/ServicesClient.tsx
'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { content } from '@/config/content'
import Link from 'next/link'
import { isMobile, isTablet, isLowEndDevice, enableGPUAcceleration } from '@/utils/performance'

const servicesData = [
  {
    icon: '🌐',
    title: 'פיתוח אתרים',
    description: 'אתרי תדמית, דפי נחיתה ואתרי תוכן רספונסיביים ומהירים',
    gradient: 'from-blue-500 to-cyan-500',
    price: '₪5,000+',
    duration: '4-8 שבועות',
    features: ['עיצוב רספונסיבי', 'SEO מובנה', 'ביצועים מהירים', 'תמיכה מלאה'],
    popular: false,
  },
  {
    icon: '🛒',
    title: 'אתרי מסחר',
    description: 'חנויות אונליין מתקדמות עם מערכת ניהול פשוטה ונוחה',
    gradient: 'from-purple-500 to-pink-500',
    price: '₪8,000+',
    duration: '6-10 שבועות',
    features: ['סליקת כרטיסי אשראי', 'ניהול מלאי', 'דוחות מכירות', 'אבטחה מתקדמת'],
    popular: true,
  },
  {
    icon: '📱',
    title: 'אפליקציות',
    description: 'פיתוח אפליקציות מובייל ווב לכל מטרה עסקית',
    gradient: 'from-orange-500 to-red-500',
    price: '₪12,000+',
    duration: '8-12 שבועות',
    features: ['iOS & Android', 'חוויית משתמש', 'התראות Push', 'אינטגרציות'],
    popular: false,
  },
  {
    icon: '💼',
    title: 'מערכות CRM',
    description: 'מערכות ניהול לקוחות ולידים מותאמות לעסק שלך',
    gradient: 'from-green-500 to-teal-500',
    price: '₪10,000+',
    duration: '6-8 שבועות',
    features: ['ניהול לקוחות', 'מעקב לידים', 'אוטומציה', 'דוחות מפורטים'],
    popular: true,
  },
  {
    icon: '🎨',
    title: 'עיצוב UI/UX',
    description: 'עיצוב ממשקים יפים ונוחים לשימוש',
    gradient: 'from-indigo-500 to-blue-500',
    price: '₪3,000+',
    duration: '2-4 שבועות',
    features: ['מחקר משתמשים', 'עיצוב ממשק', 'פרוטוטייפים', 'מדריך עיצוב'],
    popular: false,
  },
  {
    icon: '🔧',
    title: 'תחזוקה ותמיכה',
    description: 'שירותי תחזוקה שוטפת ותמיכה טכנית מלאה',
    gradient: 'from-gray-600 to-gray-900',
    price: '₪500/חודש',
    duration: 'שירות מתמשך',
    features: ['עדכונים שוטפים', 'גיבויים', 'אבטחה', 'תמיכה 24/7'],
    popular: false,
  },
]

const processSteps = [
  {
    icon: '💡',
    title: 'ייעוץ ראשוני',
    description: 'פגישת היכרות להבנת הצרכים והיעדים העסקיים שלכם',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '✏️',
    title: 'תכנון ועיצוב',
    description: 'יצירת אפיון מפורט ועיצוב ראשוני לאישורכם',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🔨',
    title: 'פיתוח ובדיקות',
    description: 'בניית הפתרון עם עדכונים שוטפים ובדיקות איכות',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🚀',
    title: 'השקה ותמיכה',
    description: 'עלייה לאוויר, הדרכה ותמיכה טכנית מתמשכת',
    gradient: 'from-green-500 to-emerald-500',
  },
]

export default function ServicesClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  
  // Parallax scroll effects
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, isMobile() ? 50 : 100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7])

  useEffect(() => {
    setMounted(true)
    
    // Enable GPU acceleration
    if (heroRef.current) {
      enableGPUAcceleration(heroRef.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 md:px-6 py-20 md:py-24 relative"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
          {!isMobile() && (
            <>
              <AppleParallax offset={100} speed={0.3} className="absolute inset-0">
                <motion.div
                  className="absolute top-20 left-20 w-[400px] h-[400px]"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, #0071E3 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    opacity: 0.1,
                  }}
                />
              </AppleParallax>
              
              <AppleParallax offset={80} speed={0.5} className="absolute inset-0">
                <motion.div
                  className="absolute bottom-20 right-20 w-[500px] h-[500px]"
                  animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle at 70% 70%, #BF5AF2 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    opacity: 0.1,
                  }}
                />
              </AppleParallax>
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal>{content.services.title}</TextReveal>
              </span>
              {' '}
              <TextReveal delay={0.2}>{content.services.subtitle}</TextReveal>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto px-4">
              פתרונות דיגיטליים מותאמים אישית שמניעים את העסק שלכם קדימה
            </p>
          </SmoothReveal>

          {/* Quick Stats */}
          <SmoothReveal direction="up" delay={0.5}>
            <div className="flex justify-center gap-4 md:gap-8 mt-8 md:mt-12">
              {[
                { number: '50+', label: 'פרויקטים' },
                { number: '95%', label: 'שביעות רצון' },
                { number: '24/7', label: 'תמיכה' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                    {stat.number}
                  </h3>
                  <p className="text-xs md:text-sm text-[#86868B]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </SmoothReveal>
        </div>

        {/* Scroll Indicator */}
        {!isMobile() && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[#C7C7CC] rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-[#86868B] rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* Services Grid - Mobile Optimized */}
      <section className="py-16 md:py-32 px-4 md:px-6" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              השירותים{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                שלנו
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              בחרו את הפתרון המושלם לעסק שלכם
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {servicesData.map((service, index) => (
              <AppleParallax
                key={service.title}
                offset={isMobile() ? 10 : 30 + (index * 10)}
                speed={0.5 + (index * 0.1)}
                disabled={isLowEndDevice()}
              >
                <motion.div
                  className="relative bg-white rounded-[20px] md:rounded-[24px] p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E8E8ED] h-full cursor-pointer"
                  whileHover={!isMobile() ? { y: -10, scale: 1.02 } : {}}
                  onClick={() => setSelectedService(selectedService === index ? null : index)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: isMobile() ? index * 0.05 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <motion.div
                      className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-[#FF375F] to-[#FF9500] text-white text-xs font-medium rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      פופולרי
                    </motion.div>
                  )}

                  {/* Service Icon with Animation */}
                  <motion.div 
                    className="text-5xl md:text-6xl mb-4 md:mb-6"
                    animate={!isMobile() ? { 
                      rotate: selectedService === index ? [0, -10, 10, 0] : 0 
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#1D1D1F]">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[#86868B] mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-[#86868B]">מחיר משוער:</span>
                      <span className="text-base md:text-lg font-semibold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-[#86868B]">זמן ביצוע:</span>
                      <span className="text-xs md:text-sm font-medium text-[#424245]">{service.duration}</span>
                    </div>
                  </div>

                  {/* Features (Show on click/hover) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: selectedService === index ? 'auto' : 0,
                      opacity: selectedService === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-[#E8E8ED]">
                      <p className="text-xs font-medium text-[#86868B] mb-2">כולל:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, fIndex) => (
                          <motion.li
                            key={fIndex}
                            className="flex items-center text-xs md:text-sm text-[#424245]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: fIndex * 0.05 }}
                          >
                            <span className="text-green-500 ml-2">✓</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <Link href="/contact">
                    <motion.button
                      className={`w-full py-2.5 md:py-3 rounded-full font-medium text-white bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all mt-4`}
                      whileHover={!isMobile() ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      קבלו הצעת מחיר
                    </motion.button>
                  </Link>
                </motion.div>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Mobile Optimized */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              איך אנחנו{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                עובדים
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              תהליך העבודה שלנו - פשוט, יעיל ושקוף
            </p>
          </SmoothReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isMobile() ? index * 0.05 : index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center"
              >
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-white shadow-lg`}
                  whileHover={!isMobile() ? { scale: 1.1, rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-[#1D1D1F]">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-[#86868B] text-xs md:text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Timeline Connection Line - Desktop Only */}
          {!isMobile() && (
            <motion.div
              className="hidden md:block relative -mt-[60px] mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-amber-500 via-blue-500 to-green-500" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              מה הלקוחות{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                אומרים
              </span>
            </h2>
          </SmoothReveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'דני כהן', company: 'מסעדת השף', text: 'שירות מעולה, אתר מהיר ויפה. ממליץ בחום!' },
              { name: 'שרה לוי', company: 'חנות האופנה', text: 'הפרויקט בוצע בזמן ובמקצועיות רבה.' },
              { name: 'יוסי ישראלי', company: 'סטארטאפ טכנולוגי', text: 'פתרון מושלם שהעלה לנו את המכירות ב-40%.' },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-[#F5F5F7] rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isMobile() ? index * 0.05 : index * 0.1,
                  duration: 0.5
                }}
                viewport={{ once: true }}
                whileHover={!isMobile() ? { scale: 1.02 } : {}}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-500 text-lg md:text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
                <p className="text-[#424245] mb-4 text-sm md:text-base italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-[#1D1D1F] text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-[#86868B]">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8">
              בואו נבנה יחד את הפתרון הדיגיטלי המושלם לעסק שלכם
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#0071E3] rounded-full font-semibold text-base md:text-lg hover:shadow-2xl transition-all touch-manipulation"
                whileHover={!isMobile() ? { scale: 1.05 } : {}}
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