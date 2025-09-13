'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { OptimizedReveal, OptimizedStagger } from '@/components/ScrollAnimations/OptimizedAnimations'
import { usePerformance } from '@/contexts/PerformanceContext'
import { useMobileOptimizedInView } from '@/hooks/useMobileOptimized'
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
  const { isMobile, isLowPerformance } = usePerformance()
  const { ref, isInView } = useMobileOptimizedInView({ triggerOnce: true })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ 
        delay: isMobile ? index * 0.05 : index * 0.1, 
        duration: isMobile ? 0.4 : 0.6 
      }}
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      className="relative group"
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      <Link href={service.href}>
        <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
          {/* Simplified gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          {/* Static gradient orb on desktop, hidden on mobile */}
          {!isMobile && (
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-10`}
              style={{ filter: isLowPerformance ? 'none' : 'blur(40px)' }}
            />
          )}
          
          {/* Icon */}
          <div
            className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6 text-white shadow-lg`}
          >
            <service.icon size={28} />
          </div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {service.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm text-gray-500"
              >
                <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          
          {/* CTA */}
          <div className="inline-flex items-center text-blue-600 font-medium group">
            <span>למידע נוסף</span>
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Mobile-optimized background
const MobileBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 opacity-50" />
  </div>
)

// Desktop animated background
const DesktopBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="floating-element floating-element-1" />
    <div className="floating-element floating-element-2" />
    <div className="floating-element floating-element-3" />
  </div>
)

export default function ServicesOptimized() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isLowPerformance } = usePerformance()
  
  // Only use parallax on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = !isMobile ? useTransform(scrollYProgress, [0, 1], ['0%', '50%']) : '0%'

  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Conditional background */}
      {isLowPerformance || isMobile ? <MobileBackground /> : <DesktopBackground />}
      
      {/* Grid Pattern - Desktop only */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"
          style={{ y: backgroundY }}
        />
      )}

      <div className="container relative z-10">
        {/* Section Header */}
        <OptimizedReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Layers className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                השירותים שלנו
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              פתרונות <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">מקצה לקצה</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              מהרעיון ועד ההשקה - אני מספק את כל השירותים הדרושים להצלחה הדיגיטלית שלך
            </p>
          </div>
        </OptimizedReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Additional Services Section - Simplified for mobile */}
        <OptimizedReveal delay={0.3}>
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  למה לבחור בנו?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Zap, text: 'ביצועים מהירים במיוחד' },
                    { icon: Shield, text: 'אבטחה ברמה הגבוהה ביותר' },
                    { icon: TrendingUp, text: 'תוצאות מדידות ומוכחות' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        <item.icon size={20} />
                      </div>
                      <p className="text-gray-700 font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats Cards - Static on mobile */}
              <div className="relative">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-white/80">שביעות רצון לקוחות</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                    <div className="text-4xl font-bold mb-2">2x</div>
                    <div className="text-white/80">שיפור במהירות הטעינה</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OptimizedReveal>

        {/* CTA */}
        <OptimizedReveal delay={0.4}>
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              גלה את כל השירותים
            </Link>
          </div>
        </OptimizedReveal>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .floating-element {
            position: absolute;
            width: 256px;
            height: 256px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
            filter: blur(40px);
            animation: float-gentle 20s ease-in-out infinite;
          }
          
          .floating-element-1 {
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }
          
          .floating-element-2 {
            bottom: 10%;
            right: 10%;
            animation-delay: 5s;
          }
          
          .floating-element-3 {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: 10s;
          }
          
          @keyframes float-gentle {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
        }
      `}</style>
    </section>
  )
}
