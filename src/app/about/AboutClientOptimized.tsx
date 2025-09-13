'use client'

import { motion, useInView, MotionProps } from 'framer-motion'
import { useRef } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const timeline = [
  {
    year: '2020',
    title: 'ההתחלה',
    description: 'התחלנו כמפתח נלהב עם חזון ליצור חוויות דיגיטליות יוצאות דופן.',
    milestone: true,
  },
  {
    year: '2021',
    title: 'הפרויקטים הראשונים',
    description: 'סיפקנו פתרונות ארגוניים לחברות Fortune 500, ביססנו את המוניטין שלנו למצוינות.',
  },
  {
    year: '2022',
    title: 'הרחבת הצוות',
    description: 'גדלנו מיחיד לצוות של מעצבים ומפתחים מוכשרים עם תשוקה לחדשנות.',
    milestone: true,
  },
  {
    year: '2023',
    title: 'הכרה ופרסים',
    description: 'קיבלנו מספר פרסים בתעשייה על עיצוב ופיתוח אתרים יוצאי דופן.',
  },
  {
    year: '2024',
    title: 'הרחבה גלובלית',
    description: 'הרחבנו את השירותים שלנו בינלאומית, עובדים עם לקוחות ביותר מ-20 מדינות.',
    milestone: true,
  },
  {
    year: '2025',
    title: 'מיקוד בחדשנות',
    description: 'מובילים את הדרך בפתרונות מבוססי AI וחוויות אינטרנט מהדור הבא.',
  },
]

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'עיצוב UI/UX', level: 88 },
  { name: 'ארכיטקטורת ענן', level: 82 },
  { name: 'פיתוח מובייל', level: 78 },
]

// Optimized motion wrapper that respects reduced motion
function OptimizedMotion({ children, ...props }: { children: React.ReactNode } & MotionProps) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return <div>{children}</div>
  }
  
  return <motion.div {...props}>{children}</motion.div>
}

export default function AboutClientOptimized() {
  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-32 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              <TextReveal>{content.about.title.split(' ')[0]}</TextReveal>{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal delay={0.2}>{content.brand.name}</TextReveal>
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              {content.about.subtitle}
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Story Section - Optimized for mobile */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Conditional parallax - disabled on mobile */}
          {!isMobile ? (
            <AppleParallax offset={50} speed={0.5}>
              <div className="relative">
                {/* Reduced blur intensity on mobile */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl opacity-10 ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
                <div className="relative bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl p-1">
                  <div className="bg-white rounded-3xl p-12">
                    <OptimizedMotion
                      className="text-8xl mb-6"
                      initial={{ rotate: 0 }}
                      whileHover={!prefersReducedMotion ? { rotate: 10 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      🚀
                    </OptimizedMotion>
                    <h3 className="text-3xl font-semibold mb-4">{content.about.mission.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">
                      {content.about.mission.description}
                    </p>
                  </div>
                </div>
              </div>
            </AppleParallax>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl opacity-10 blur-xl" />
              <div className="relative bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-12">
                  <div className="text-8xl mb-6">🚀</div>
                  <h3 className="text-3xl font-semibold mb-4">{content.about.mission.title}</h3>
                  <p className="text-[#86868B] leading-relaxed">
                    {content.about.mission.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            <SmoothReveal direction="left">
              <h2 className="text-4xl font-semibold mb-6">
                {content.about.story.title.split(',')[0]},{' '}
                <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                  {content.about.story.title.split(',')[1]}
                </span>
              </h2>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.1}>
              <p className="text-[#86868B] leading-relaxed">
                {content.about.story.paragraph1}
              </p>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.2}>
              <p className="text-[#86868B] leading-relaxed">
                {content.about.story.paragraph2}
              </p>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section - Simplified animation on mobile */}
      <section className="py-32 px-6 bg-[#FBFBFD]" ref={timelineRef}>
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-20">
            <h2 className="text-4xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.timeline.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              {content.about.timeline.subtitle}
            </p>
          </SmoothReveal>

          <div className="relative">
            {/* Timeline Line - Static on mobile */}
            {!isMobile && !prefersReducedMotion ? (
              <motion.div
                className="absolute right-1/2 transform translate-x-1/2 w-1 bg-gradient-to-b from-[#0071E3] to-[#BF5AF2]"
                initial={{ height: 0 }}
                animate={isTimelineInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0071E3] to-[#BF5AF2]" />
            )}

            {/* Timeline Items - Simplified animations */}
            {timeline.map((item, index) => (
              <OptimizedMotion
                key={item.year}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
                initial={!isMobile ? { opacity: 0, x: index % 2 === 0 ? 50 : -50 } : { opacity: 1, x: 0 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: isMobile ? 0 : index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                  <div className={`inline-block ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-3 ${
                        item.milestone 
                          ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white' 
                          : 'bg-white text-[#424245]'
                      }`}
                    >
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="text-[#86868B]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot - No animation on mobile */}
                <div
                  className="absolute right-1/2 transform translate-x-1/2 w-4 h-4 bg-white border-4 border-[#0071E3] rounded-full z-10"
                />
              </OptimizedMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Optimized animations */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.expertise.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              {content.about.expertise.subtitle}
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <OptimizedMotion
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: isMobile ? 0 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true }}
                className="bg-[#F5F5F7] rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[#1D1D1F]">{skill.name}</h3>
                  <span className="text-sm font-medium text-[#86868B]">{skill.level}%</span>
                </div>
                <div className="relative h-3 bg-white rounded-full overflow-hidden">
                  <OptimizedMotion
                    className="absolute inset-y-0 right-0 bg-gradient-to-l from-[#0071E3] to-[#BF5AF2] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: isMobile ? 0.5 : 1, 
                      delay: isMobile ? 0 : index * 0.1 + 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </OptimizedMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - No parallax on mobile */}
      <section className="py-32 px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.about.values.title}
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              {content.about.values.subtitle}
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.values.items.map((value, index) => (
              <div key={value.title}>
                {!isMobile ? (
                  <AppleParallax
                    offset={20}
                    speed={0.3}
                    scale={false}
                  >
                    <OptimizedMotion
                      className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                      whileHover={!prefersReducedMotion ? { y: -10 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-5xl mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-[#1D1D1F]">
                        {value.title}
                      </h3>
                      <p className="text-[#86868B] text-sm">
                        {value.description}
                      </p>
                    </OptimizedMotion>
                  </AppleParallax>
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="text-5xl mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#1D1D1F]">
                      {value.title}
                    </h3>
                    <p className="text-[#86868B] text-sm">
                      {value.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-4xl font-semibold mb-6">
              {content.about.cta.title}
            </h2>
            <p className="text-xl opacity-90 mb-8">
              {content.about.cta.subtitle}
            </p>
            <Link href="/contact">
              <OptimizedMotion
                className="inline-block px-10 py-4 bg-white text-[#0071E3] rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
              >
                {content.about.cta.button}
              </OptimizedMotion>
            </Link>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}
