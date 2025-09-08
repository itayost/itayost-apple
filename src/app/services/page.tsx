'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'

const services = [
  {
    id: 1,
    icon: '💻',
    title: 'Web Development',
    subtitle: 'Modern websites that convert',
    description: 'We build blazing-fast, SEO-optimized websites using cutting-edge technologies like Next.js, React, and TypeScript.',
    features: [
      'Responsive Design',
      'SEO Optimization',
      'Performance First',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'CMS Integration'
    ],
    gradient: 'from-blue-500 to-cyan-500',
    price: 'From $5,000',
  },
  {
    id: 2,
    icon: '📱',
    title: 'Mobile Development',
    subtitle: 'Apps that users love',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    features: [
      'iOS Development',
      'Android Development',
      'React Native',
      'Flutter Apps',
      'App Store Optimization',
      'Push Notifications'
    ],
    gradient: 'from-purple-500 to-pink-500',
    price: 'From $10,000',
  },
  {
    id: 3,
    icon: '🎨',
    title: 'UI/UX Design',
    subtitle: 'Designs that delight',
    description: 'User-centered design approach that creates intuitive interfaces and memorable digital experiences.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Design Systems',
      'Usability Testing'
    ],
    gradient: 'from-orange-500 to-red-500',
    price: 'From $3,000',
  },
  {
    id: 4,
    icon: '⚡',
    title: 'API Development',
    subtitle: 'Powerful backends',
    description: 'Scalable and secure backend solutions that power modern applications with optimal performance.',
    features: [
      'RESTful APIs',
      'GraphQL',
      'Microservices',
      'Database Design',
      'Cloud Architecture',
      'Real-time Systems'
    ],
    gradient: 'from-green-500 to-teal-500',
    price: 'From $7,000',
  },
  {
    id: 5,
    icon: '🤖',
    title: 'AI Integration',
    subtitle: 'Smart solutions',
    description: 'Leverage the power of artificial intelligence to automate processes and enhance user experiences.',
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Chatbots',
      'Predictive Analytics',
      'AI Automation'
    ],
    gradient: 'from-indigo-500 to-purple-500',
    price: 'From $15,000',
  },
  {
    id: 6,
    icon: '🔧',
    title: 'Maintenance & Support',
    subtitle: 'Always here for you',
    description: 'Ongoing support and maintenance to keep your digital products running smoothly and securely.',
    features: [
      '24/7 Monitoring',
      'Security Updates',
      'Performance Optimization',
      'Bug Fixes',
      'Content Updates',
      'Technical Support'
    ],
    gradient: 'from-gray-600 to-gray-800',
    price: 'From $500/month',
  },
]

const process = [
  { step: 1, title: 'Discovery', description: 'Understanding your goals and requirements' },
  { step: 2, title: 'Planning', description: 'Creating a roadmap and technical architecture' },
  { step: 3, title: 'Design', description: 'Crafting beautiful and intuitive interfaces' },
  { step: 4, title: 'Development', description: 'Building with best practices and clean code' },
  { step: 5, title: 'Testing', description: 'Ensuring quality and performance' },
  { step: 6, title: 'Launch', description: 'Deploying and monitoring your solution' },
]

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-32 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7] relative overflow-hidden">
        {/* Animated Background */}
        <AppleParallax offset={100} speed={0.5} className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </AppleParallax>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal delay={0.2}>Services</TextReveal>
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.3}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs. 
              From concept to launch, we've got you covered.
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AppleParallax
                key={service.id}
                offset={20 + (index * 5)}
                speed={0.2}
                scale
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true }}
                  className="group h-full"
                >
                  <motion.div
                    className="bg-white border border-[#E8E8ED] rounded-3xl p-8 h-full hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    {/* Gradient Top Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />
                    
                    {/* Icon */}
                    <motion.div
                      className="text-5xl mb-6"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-2 text-[#1D1D1F]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#86868B] mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-[#424245] mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-[#86868B]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-[#0071E3]">✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-6 border-t border-[#E8E8ED]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#86868B]">Starting at</span>
                        <span className="text-xl font-semibold text-[#0071E3]">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Hover Gradient Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                    />
                  </motion.div>
                </motion.div>
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
              Our{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-[#86868B] text-lg">
              A proven approach to deliver exceptional results
            </p>
          </SmoothReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <SmoothReveal key={item.step} direction="up" delay={index * 0.1}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Connection Line */}
                  {index < process.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#0071E3] to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    />
                  )}

                  <div className="bg-white rounded-2xl p-6 text-center relative z-10">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#86868B]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] text-white relative overflow-hidden">
        <AppleParallax offset={50} speed={0.3} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10" />
        </AppleParallax>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SmoothReveal direction="up">
            <h2 className="text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Let's discuss your project and find the perfect solution for your needs
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-[#0071E3] rounded-full font-semibold hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get a Quote
                </motion.button>
              </Link>
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </SmoothReveal>
        </div>
      </section>
    </main>
  )
}
