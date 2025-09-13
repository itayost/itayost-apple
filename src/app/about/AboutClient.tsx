// src/app/about/AboutClient.tsx
'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'
import Link from 'next/link'
import { isMobile, isTablet, isLowEndDevice, enableGPUAcceleration } from '@/utils/performance'

const timeline = [
  {
    year: '2020',
    title: 'ההתחלה',
    description: 'התחלתי כמפתח עצמאי עם חזון ליצור חוויות דיגיטליות יוצאות דופן לעסקים.',
    milestone: true,
    icon: '🚀',
  },
  {
    year: '2021',
    title: 'הפרויקטים הראשונים',
    description: 'פיתחתי אתרים ומערכות לעסקים מקומיים, ביססתי את המוניטין שלי למצוינות.',
    icon: '💼',
  },
  {
    year: '2022',
    title: 'התמחות בטכנולוגיות',
    description: 'העמקתי את הידע שלי ב-React, Next.js ופיתוח Full-Stack מתקדם.',
    milestone: true,
    icon: '🎯',
  },
  {
    year: '2023',
    title: 'פרויקטים מורכבים',
    description: 'עבדתי על מערכות CRM, אתרי מסחר ואפליקציות מותאמות אישית.',
    icon: '⚡',
  },
  {
    year: '2024',
    title: 'שירות מקצה לקצה',
    description: 'הרחבתי את השירותים לכלול עיצוב UI/UX, אסטרטגיה דיגיטלית ותחזוקה.',
    milestone: true,
    icon: '🌟',
  },
  {
    year: '2025',
    title: 'חדשנות ועתיד',
    description: 'מיקוד בפתרונות AI, אוטומציה וחוויות דיגיטליות מהדור הבא.',
    icon: '🔮',
  },
]

const skills = [
  { name: 'React/Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
  { name: 'TypeScript', level: 90, color: 'from-blue-600 to-indigo-600' },
  { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
  { name: 'עיצוב UI/UX', level: 88, color: 'from-purple-500 to-pink-500' },
  { name: 'MongoDB/SQL', level: 82, color: 'from-emerald-500 to-green-500' },
  { name: 'פיתוח מובייל', level: 78, color: 'from-orange-500 to-red-500' },
]

const workProcess = [
  {
    icon: '☕',
    title: 'פגישת היכרות',
    description: 'נכיר, נבין את הצרכים ונגדיר יעדים ברורים לפרויקט',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '📋',
    title: 'תכנון ועיצוב',
    description: 'נבנה תוכנית עבודה מפורטת ועיצוב ראשוני לאישור',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '💻',
    title: 'פיתוח ובדיקות',
    description: 'בניית הפתרון עם עדכונים שוטפים ובדיקות איכות',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🚀',
    title: 'השקה ותמיכה',
    description: 'עלייה לאוויר, הדרכה ותמיכה טכנית מלאה',
    gradient: 'from-green-500 to-emerald-500',
  },
]

export default function AboutClient() {
  const [mounted, setMounted] = useState(false)
  const [shouldAnimateTimeline, setShouldAnimateTimeline] = useState(true)
  const timelineRef = useRef(null)
  const heroRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })
  
  // Parallax scroll effects
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, isMobile() ? 50 : 100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5])

  useEffect(() => {
    setMounted(true)
    
    // Check device capabilities
    const mobile = isMobile()
    const lowEnd = isLowEndDevice()
    setShouldAnimateTimeline(!mobile || !lowEnd)
    
    // Enable GPU acceleration for hero
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
        className="min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-4 md:px-6 py-20 md:py-32 relative"
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
          {!isMobile() && (
            <>
              <AppleParallax offset={80} speed={0.3} className="absolute inset-0">
                <motion.div
                  className="absolute top-10 md:top-20 right-10 md:right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px]"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, #0071E3 0%, transparent 60%)',
                    filter: 'blur(80px)',
                    opacity: 0.1,
                  }}
                />
              </AppleParallax>
              
              <AppleParallax offset={60} speed={0.5} className="absolute inset-0">
                <motion.div
                  className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-[350px] md:w-[600px] h-[350px] md:h-[600px]"
                  animate={{
                    scale: [1, 0.95, 1],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle at 70% 70%, #BF5AF2 0%, transparent 60%)',
                    filter: 'blur(80px)',
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
              <TextReveal>{content.about.title.split(' ')[0]}</TextReveal>{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent inline-block">
                <TextReveal delay={0.2}>{content.brand.name}</TextReveal>
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto px-4">
              {content.about.subtitle}
            </p>
          </SmoothReveal>

          {/* Animated scroll indicator */}
          {!isMobile() && (
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
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
        </div>
      </motion.section>

      {/* Story Section with Mobile Optimization */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <AppleParallax offset={isMobile() ? 20 : 50} speed={0.5} disabled={isMobile()}>
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl opacity-10 blur-3xl" />
              <div className="relative bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8 md:p-12">
                  <motion.div
                    className="text-6xl md:text-8xl mb-4 md:mb-6"
                    animate={!isMobile() ? { rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    💡
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
                    {content.about.mission.title}
                  </h3>
                  <p className="text-[#86868B] leading-relaxed text-sm md:text-base">
                    {content.about.mission.description}
                  </p>
                </div>
              </div>
            </div>
          </AppleParallax>

          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <SmoothReveal direction="left">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
                {content.about.story.title}
              </h2>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.1}>
              <p className="text-[#86868B] leading-relaxed text-sm md:text-base">
                {content.about.story.paragraph1}
              </p>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.2}>
              <p className="text-[#86868B] leading-relaxed text-sm md:text-base">
                {content.about.story.paragraph2}
              </p>
            </SmoothReveal>

            {/* Mini stats for mobile */}
            <SmoothReveal direction="left" delay={0.3}>
              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4 md:pt-6">
                <motion.div 
                  whileHover={!isMobile() ? { scale: 1.05 } : {}}
                  className="text-center md:text-right"
                >
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0071E3] to-[#64B5F6] bg-clip-text text-transparent">
                    50+
                  </h4>
                  <p className="text-xs md:text-sm text-[#86868B] mt-1">פרויקטים</p>
                </motion.div>
                <motion.div 
                  whileHover={!isMobile() ? { scale: 1.05 } : {}}
                  className="text-center md:text-right"
                >
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#BF5AF2] to-[#FF375F] bg-clip-text text-transparent">
                    95%
                  </h4>
                  <p className="text-xs md:text-sm text-[#86868B] mt-1">שביעות רצון</p>
                </motion.div>
                <motion.div 
                  whileHover={!isMobile() ? { scale: 1.05 } : {}}
                  className="text-center md:text-right"
                >
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF375F] to-[#FF9500] bg-clip-text text-transparent">
                    24/7
                  </h4>
                  <p className="text-xs md:text-sm text-[#86868B] mt-1">תמיכה</p>
                </motion.div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                איך אני עובד
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              תהליך עבודה מסודר ושקוף מתחילה ועד סוף
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {workProcess.map((step, index) => (
              <AppleParallax
                key={step.title}
                offset={isMobile() ? 10 : 20 + (index * 10)}
                speed={0.3}
                scale={!isMobile()}
                disabled={isLowEndDevice()}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={!isMobile() ? { y: -10 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isMobile() ? index * 0.05 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-3xl md:text-4xl`}
                    whileHover={!isMobile() ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#1D1D1F]">
                    {step.title}
                  </h3>
                  <p className="text-[#86868B] text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Mobile Optimized */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white" ref={timelineRef}>
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.timeline.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              {content.about.timeline.subtitle}
            </p>
          </SmoothReveal>

          {/* Mobile Timeline */}
          {isMobile() || isTablet() ? (
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative pr-8 border-r-2 border-[#E8E8ED]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute -right-2 top-2 w-4 h-4 rounded-full ${
                      item.milestone 
                        ? 'bg-gradient-to-br from-[#0071E3] to-[#BF5AF2]' 
                        : 'bg-[#C7C7CC]'
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  />
                  
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.milestone 
                          ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white' 
                          : 'bg-[#F5F5F7] text-[#424245]'
                      }`}>
                        {item.year}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="text-[#86868B] text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Desktop Timeline */
            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                className="absolute right-1/2 transform translate-x-1/2 w-1 bg-gradient-to-b from-[#0071E3] to-[#BF5AF2]"
                initial={{ height: 0 }}
                animate={isTimelineInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Timeline Items */}
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                    <motion.div
                      className={`inline-block ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <motion.span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                            item.milestone 
                              ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white' 
                              : 'bg-white text-[#424245]'
                          }`}
                        >
                          {item.year}
                        </motion.span>
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2 text-[#1D1D1F]">
                        {item.title}
                      </h3>
                      <p className="text-[#86868B]">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <motion.div
                    className={`absolute right-1/2 transform translate-x-1/2 w-6 h-6 rounded-full z-10 ${
                      item.milestone 
                        ? 'bg-gradient-to-br from-[#0071E3] to-[#BF5AF2]' 
                        : 'bg-white border-4 border-[#0071E3]'
                    }`}
                    initial={{ scale: 0 }}
                    animate={isTimelineInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.2 + 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section - Mobile Optimized */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.expertise.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              {content.about.expertise.subtitle}
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: isMobile() ? index * 0.05 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base md:text-lg font-semibold text-[#1D1D1F] ltr">
                    {skill.name}
                  </h3>
                  <motion.span 
                    className="text-sm font-medium text-[#86868B]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="relative h-2 md:h-3 bg-[#F5F5F7] rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 right-0 bg-gradient-to-l ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: isMobile() ? index * 0.05 + 0.3 : index * 0.1 + 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Mobile Optimized */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.values.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-base md:text-lg">
              {content.about.values.subtitle}
            </p>
          </SmoothReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {content.about.values.items.map((value, index) => (
              <AppleParallax
                key={value.title}
                offset={isMobile() ? 10 : 20 + (index * 10)}
                speed={0.3}
                scale={!isMobile()}
                disabled={isLowEndDevice()}
              >
                <motion.div
                  className="bg-[#F5F5F7] rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={!isMobile() ? { y: -10, scale: 1.02 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-3xl md:text-5xl mb-3 md:mb-4"
                    animate={!isMobile() ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ 
                      duration: 3, 
                      delay: index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-[#1D1D1F]">
                    {value.title}
                  </h3>
                  <p className="text-[#86868B] text-xs md:text-sm">
                    {value.description}
                  </p>
                </motion.div>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
              {content.about.cta.title}
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8">
              {content.about.cta.subtitle}
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#0071E3] rounded-full font-semibold text-base md:text-lg hover:shadow-2xl transition-all touch-manipulation"
                whileHover={!isMobile() ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {content.about.cta.button}
              </motion.button>
            </Link>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}