'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedReveal } from '@/components/ScrollAnimations/OptimizedAnimations'
import { usePerformance } from '@/contexts/PerformanceContext'
import { useMobileOptimizedInView, useMobileOptimizedCounter } from '@/hooks/useMobileOptimized'
import Link from 'next/link'
import { 
  ExternalLink, 
  Eye, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Globe,
  Smartphone,
  ShoppingBag,
  Briefcase
} from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: 'פלטפורמת E-Commerce',
    category: 'אתר מסחר',
    description: 'חנות אונליין מתקדמת עם מערכת ניהול מלאה',
    image: '/portfolio/ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    icon: ShoppingBag,
    gradient: 'from-blue-500 to-purple-500',
    stats: { views: '50K+', likes: '2.3K' },
    link: '/portfolio/ecommerce-platform'
  },
  {
    id: 2,
    title: 'אפליקציית פיננסים',
    category: 'אפליקציה',
    description: 'אפליקציה לניהול תקציב אישי עם ממשק אינטואיטיבי',
    image: '/portfolio/finance-app.jpg',
    tags: ['React Native', 'Firebase', 'Charts'],
    icon: Smartphone,
    gradient: 'from-green-500 to-teal-500',
    stats: { views: '35K+', likes: '1.8K' },
    link: '/portfolio/finance-app'
  },
  {
    id: 3,
    title: 'אתר תדמית לחברה',
    category: 'אתר תדמית',
    description: 'אתר תדמית מרשים עם אנימציות מתקדמות',
    image: '/portfolio/corporate.jpg',
    tags: ['Next.js', 'GSAP', 'Tailwind'],
    icon: Briefcase,
    gradient: 'from-orange-500 to-red-500',
    stats: { views: '28K+', likes: '1.5K' },
    link: '/portfolio/corporate-website'
  },
  {
    id: 4,
    title: 'פורטל חדשות',
    category: 'אתר תוכן',
    description: 'פורטל חדשות דינמי עם מערכת ניהול תוכן',
    image: '/portfolio/news-portal.jpg',
    tags: ['Next.js', 'CMS', 'MongoDB'],
    icon: Globe,
    gradient: 'from-purple-500 to-pink-500',
    stats: { views: '75K+', likes: '3.2K' },
    link: '/portfolio/news-portal'
  },
  {
    id: 5,
    title: 'אפליקציית כושר',
    category: 'אפליקציה',
    description: 'אפליקציה למעקב אימונים ותזונה',
    image: '/portfolio/fitness-app.jpg',
    tags: ['Flutter', 'Node.js', 'ML'],
    icon: Smartphone,
    gradient: 'from-pink-500 to-rose-500',
    stats: { views: '42K+', likes: '2.1K' },
    link: '/portfolio/fitness-app'
  }
]

const categories = [
  { name: 'הכל', value: 'all' },
  { name: 'אתרים', value: 'website' },
  { name: 'אפליקציות', value: 'app' },
  { name: 'עיצוב', value: 'design' }
]

const PortfolioCard = ({ item, index }: { item: typeof portfolioItems[0], index: number }) => {
  const { isMobile, isTouchDevice } = usePerformance()
  const [isHovered, setIsHovered] = useState(false)
  const { ref, isInView } = useMobileOptimizedInView({ triggerOnce: true })

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ 
        delay: isMobile ? index * 0.05 : index * 0.1,
        duration: isMobile ? 0.4 : 0.6
      }}
      whileHover={!isTouchDevice ? { y: -10 } : undefined}
      onHoverStart={() => !isTouchDevice && setIsHovered(true)}
      onHoverEnd={() => !isTouchDevice && setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[320px] lg:min-w-[400px]"
    >
      {/* Image Container */}
      <div className="relative h-64 lg:h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Simplified gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
        
        {/* Static Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <item.icon size={64} className="text-white/30" />
        </div>
        
        {/* Simplified Overlay on Hover - Desktop only */}
        {!isMobile && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6"
              >
                <div className="text-white">
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {item.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={16} />
                      {item.stats.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {item.category}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {item.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* CTA */}
        <Link href={item.link}>
          <div className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            <span>צפייה בפרויקט</span>
            <ExternalLink size={16} />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

// Optimized horizontal scroll for mobile
const MobileScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative">
      {/* Navigation Buttons - Touch-friendly size on mobile */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
          aria-label="Scroll left"
        >
          <ChevronRight size={20} />
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
          aria-label="Scroll right"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch' // iOS smooth scrolling
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Statistics with optimized counters
const Statistics = () => {
  const { ref, isInView } = useMobileOptimizedInView({ triggerOnce: true })
  const stats = [
    { value: 50, suffix: '+', label: 'פרויקטים הושלמו' },
    { value: 98, suffix: '%', label: 'לקוחות מרוצים' },
    { value: 2, suffix: 'M+', label: 'שורות קוד' },
    { value: 5, suffix: '★', label: 'דירוג ממוצע' }
  ]

  return (
    <div ref={ref as any} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const count = useMobileOptimizedCounter(stat.value, 2000, isInView)
        
        return (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {count}{stat.suffix}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {stat.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function PortfolioOptimized() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { isMobile } = usePerformance()

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <OptimizedReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                תיק העבודות
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              פרויקטים <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">מובילים</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              הצצה לפרויקטים האחרונים שלי - כל אחד מהם מספר סיפור של חדשנות וצמיחה
            </p>
          </div>
        </OptimizedReveal>

        {/* Category Filter - Simplified for mobile */}
        <OptimizedReveal delay={0.1}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="inline-flex gap-2 p-1 bg-gray-100 rounded-full">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 lg:px-6 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.value
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </OptimizedReveal>

        {/* Portfolio Carousel */}
        <OptimizedReveal delay={0.2}>
          <MobileScrollContainer>
            {portfolioItems.map((item, index) => (
              <div key={item.id} className="snap-center">
                <PortfolioCard item={item} index={index} />
              </div>
            ))}
          </MobileScrollContainer>
        </OptimizedReveal>

        {/* Statistics */}
        <Statistics />

        {/* CTA */}
        <OptimizedReveal delay={0.3}>
          <div className="text-center mt-16">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              צפייה בכל הפרויקטים
            </Link>
          </div>
        </OptimizedReveal>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
