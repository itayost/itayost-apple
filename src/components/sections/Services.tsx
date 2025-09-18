'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AppleReveal, AppleStaggerChildren, AppleStaggerItem, AppleParallax } from '@/components/ScrollAnimations/AppleAnimations'
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Globe, 
  Zap, 
  Shield,
  Sparkles,
  Layers,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Code2,
    title: 'פיתוח אתרים',
    description: 'אתרים מותאמים אישית עם הטכנולוגיות המתקדמות ביותר - Next.js, React ועוד.',
    features: ['ביצועים מהירים', 'SEO מתקדם', 'אבטחה מוגברת'],
    gradient: 'from-blue-500 to-cyan-500',
    href: '/services#web-development'
  },
  {
    icon: Smartphone,
    title: 'אפליקציות מובייל',
    description: 'אפליקציות נייטיב ו-Cross Platform עם חוויית משתמש מושלמת.',
    features: ['React Native', 'Flutter', 'עיצוב מותאם'],
    gradient: 'from-purple-500 to-pink-500',
    href: '/services#mobile-apps'
  },
  {
    icon: Palette,
    title: 'עיצוב UI/UX',
    description: 'עיצוב ממשקים מרהיבים עם דגש על חוויית משתמש אינטואיטיבית.',
    features: ['מחקר משתמשים', 'פרוטוטייפים', 'מערכות עיצוב'],
    gradient: 'from-orange-500 to-red-500',
    href: '/services#ui-ux'
  }
]

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <Link href={service.href}>
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Floating Icon Background */}
          <motion.div
            className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Icon */}
          <motion.div
            className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6 text-white shadow-lg`}
            whileHover={{ 
              rotate: [0, -10, 10, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <service.icon size={28} />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-xl sm:text-2xl font-bold text-apple-gray-900 mb-3">
            {service.title}
          </h3>
          
          <p className="text-sm sm:text-base text-apple-gray-600 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center text-sm text-apple-gray-500"
              >
                <Sparkles className="w-4 h-4 text-apple-blue mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>
          
          {/* CTA */}
          <motion.div
            className="inline-flex items-center text-apple-blue font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>למידע נוסף</span>
            <motion.svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, -5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

const FloatingElement = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-64 h-64 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(0,113,227,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-apple-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0} />
        <FloatingElement delay={5} />
        <FloatingElement delay={10} />
      </div>
      
      {/* Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"
        style={{ y: backgroundY }}
      />

      <div className="container relative z-10">
        <AppleStaggerChildren>
          {/* Section Header */}
          <AppleStaggerItem>
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-apple-blue/10 backdrop-blur-xl rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Layers className="w-4 h-4 text-apple-blue" />
                <span className="text-sm font-medium text-apple-blue">
                  השירותים שלנו
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6">
                פתרונות <span className="bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">מקצה לקצה</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-apple-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                מהרעיון ועד ההשקה - אני מספק את כל השירותים הדרושים להצלחה הדיגיטלית שלך
              </p>
            </div>
          </AppleStaggerItem>

          {/* Services Grid */}
          <AppleStaggerItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </AppleStaggerItem>

          {/* Additional Services */}
          <AppleStaggerItem>
            <div className="mt-12 sm:mt-16 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl mx-4 sm:mx-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-apple-gray-900 mb-6">
                    למה לבחור בנו?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Zap, text: 'ביצועים מהירים במיוחד' },
                      { icon: Shield, text: 'אבטחה ברמה הגבוהה ביותר' },
                      { icon: TrendingUp, text: 'תוצאות מדידות ומוכחות' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-apple-blue to-apple-purple rounded-xl flex items-center justify-center text-white">
                          <item.icon size={20} />
                        </div>
                        <p className="text-apple-gray-700 font-medium">
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <AppleParallax speed={0.3}>
                    <div className="relative">
                      {/* Stats Cards */}
                      <motion.div
                        className="bg-gradient-to-br from-apple-blue to-apple-blue-dark rounded-2xl p-6 text-white mb-4"
                        whileHover={{ scale: 1.05, rotate: -2 }}
                      >
                        <div className="text-4xl font-bold mb-2">98%</div>
                        <div className="text-white/80">שביעות רצון לקוחות</div>
                      </motion.div>
                      
                      <motion.div
                        className="bg-gradient-to-br from-apple-purple to-apple-pink rounded-2xl p-6 text-white"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                      >
                        <div className="text-4xl font-bold mb-2">2x</div>
                        <div className="text-white/80">שיפור במהירות הטעינה</div>
                      </motion.div>
                    </div>
                  </AppleParallax>
                </div>
              </div>
            </div>
          </AppleStaggerItem>

          {/* CTA */}
          <AppleStaggerItem>
            <div className="text-center mt-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-apple-blue to-apple-blue-dark rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  גלה את כל השירותים
                </Link>
              </motion.div>
            </div>
          </AppleStaggerItem>
        </AppleStaggerChildren>
      </div>
    </section>
  )
}
