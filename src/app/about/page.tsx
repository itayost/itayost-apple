'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'

const timeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'Started as a passionate developer with a vision to create exceptional digital experiences.',
    milestone: true,
  },
  {
    year: '2021',
    title: 'First Major Projects',
    description: 'Delivered enterprise solutions for Fortune 500 companies, establishing our reputation for excellence.',
  },
  {
    year: '2022',
    title: 'Team Expansion',
    description: 'Grew from solo to a team of talented designers and developers passionate about innovation.',
    milestone: true,
  },
  {
    year: '2023',
    title: 'Award Recognition',
    description: 'Received multiple industry awards for outstanding web design and development work.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Expanded services internationally, working with clients across 20+ countries.',
    milestone: true,
  },
  {
    year: '2025',
    title: 'Innovation Focus',
    description: 'Leading the way in AI-powered solutions and next-generation web experiences.',
  },
]

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Cloud Architecture', level: 82 },
  { name: 'Mobile Development', level: 78 },
]

const values = [
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technology and creative solutions.',
  },
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Delivering exceptional quality in every project, every time.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Working closely with clients to bring their vision to life.',
  },
  {
    icon: '🚀',
    title: 'Growth',
    description: 'Continuously learning and evolving with the digital landscape.',
  },
]

export default function AboutPage() {
  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-32 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              <TextReveal>About</TextReveal>{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal delay={0.2}>ITAYOST</TextReveal>
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              We're a team of passionate developers and designers dedicated to creating 
              exceptional digital experiences that drive business growth and user engagement.
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <AppleParallax offset={50} speed={0.5}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl opacity-10 blur-3xl" />
              <div className="relative bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-12">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-[#86868B] leading-relaxed">
                    To empower businesses with innovative digital solutions that not only meet today's challenges 
                    but anticipate tomorrow's opportunities.
                  </p>
                </div>
              </div>
            </div>
          </AppleParallax>

          <div className="space-y-8">
            <SmoothReveal direction="left">
              <h2 className="text-4xl font-semibold mb-6">
                Building the Future,{' '}
                <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                  One Project at a Time
                </span>
              </h2>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.1}>
              <p className="text-[#86868B] leading-relaxed">
                Since our inception, we've been on a mission to transform how businesses 
                connect with their audiences in the digital space. We believe that great 
                design and powerful technology should work hand in hand.
              </p>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.2}>
              <p className="text-[#86868B] leading-relaxed">
                Our approach combines strategic thinking, creative design, and technical 
                excellence to deliver solutions that don't just look good – they perform 
                exceptionally and drive real results.
              </p>
            </SmoothReveal>

            <SmoothReveal direction="left" delay={0.3}>
              <div className="flex gap-12 pt-6">
                <div>
                  <h4 className="text-3xl font-bold text-[#0071E3]">50+</h4>
                  <p className="text-sm text-[#86868B]">Projects Completed</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#BF5AF2]">20+</h4>
                  <p className="text-sm text-[#86868B]">Happy Clients</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#FF375F]">5+</h4>
                  <p className="text-sm text-[#86868B]">Years Experience</p>
                </div>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 bg-[#FBFBFD]" ref={timelineRef}>
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-20">
            <h2 className="text-4xl font-semibold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              A timeline of growth, innovation, and success
            </p>
          </SmoothReveal>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#0071E3] to-[#BF5AF2]"
              initial={{ height: 0 }}
              animate={isTimelineInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Timeline Items */}
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`inline-block ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <motion.div
                      className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-3 ${
                        item.milestone 
                          ? 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white' 
                          : 'bg-white text-[#424245]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.year}
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="text-[#86868B]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#0071E3] rounded-full z-10"
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              Technologies and skills we excel at
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
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
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.1 + 0.3,
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

      {/* Values Section */}
      <section className="py-32 px-6 bg-[#FBFBFD]">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              The principles that guide everything we do
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AppleParallax
                key={value.title}
                offset={20 + (index * 10)}
                speed={0.3}
                scale
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ 
                      duration: 3, 
                      delay: index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1D1D1F]">
                    {value.title}
                  </h3>
                  <p className="text-[#86868B] text-sm">
                    {value.description}
                  </p>
                </motion.div>
              </AppleParallax>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothReveal direction="up">
            <h2 className="text-4xl font-semibold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Let's create something amazing for your business
            </p>
            <motion.button
              className="px-10 py-4 bg-white text-[#0071E3] rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}
