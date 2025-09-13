// src/components/sections/Contact.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'
import { AppleParallax } from '@/components/ScrollAnimations/AppleParallax'
import { content } from '@/config/content'
import { isMobile, isLowEndDevice, enableGPUAcceleration } from '@/utils/performance'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" })
  
  // Parallax scroll effects
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, isMobile() ? 30 : 50])

  useEffect(() => {
    setMounted(true)
    
    // Enable GPU acceleration
    if (containerRef.current) {
      enableGPUAcceleration(containerRef.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission with animation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitStatus('idle')
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!mounted) return null

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden" id="contact">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7]">
        {!isMobile() && (
          <>
            <AppleParallax offset={100} speed={0.3} className="absolute inset-0">
              <motion.div
                className="absolute top-20 right-20 w-[400px] h-[400px]"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle at 30% 50%, #0071E3 0%, transparent 60%)',
                  filter: 'blur(100px)',
                  opacity: 0.05,
                }}
              />
            </AppleParallax>
            
            <AppleParallax offset={80} speed={0.5} className="absolute inset-0">
              <motion.div
                className="absolute bottom-20 left-20 w-[500px] h-[500px]"
                animate={{
                  scale: [1, 0.95, 1],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle at 70% 70%, #BF5AF2 0%, transparent 60%)',
                  filter: 'blur(100px)',
                  opacity: 0.05,
                }}
              />
            </AppleParallax>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header with Animations */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{ y: parallaxY }}
        >
          <SmoothReveal direction="up">
            <div className="text-sm font-medium text-[#86868B] uppercase tracking-wider mb-3 md:mb-4">
              {content.contact.sectionLabel}
            </div>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.1}>
            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] mb-4 md:mb-6">
              <TextReveal>{content.contact.title}</TextReveal>{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal delay={0.2}>{content.contact.subtitle}</TextReveal>
              </span>
            </h2>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.2}>
            <p className="text-[#86868B] text-base md:text-lg max-w-2xl mx-auto">
              {content.contact.description}
            </p>
          </SmoothReveal>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form with Enhanced Animations */}
          <motion.div
            ref={formRef}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: isMobile() ? 0 : 50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.name.label}
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                    placeholder={content.contact.form.name.placeholder}
                    animate={{
                      scale: focusedField === 'name' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.email.label}
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                    placeholder={content.contact.form.email.placeholder}
                    animate={{
                      scale: focusedField === 'email' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.phone.label}
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                    placeholder={content.contact.form.phone.placeholder}
                    animate={{
                      scale: focusedField === 'phone' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.subject.label}
                  </label>
                  <motion.select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all cursor-pointer"
                    animate={{
                      scale: focusedField === 'subject' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">{content.contact.form.subject.placeholder}</option>
                    <option value="project">{content.contact.form.subject.options.newProject}</option>
                    <option value="consultation">{content.contact.form.subject.options.consultation}</option>
                    <option value="support">{content.contact.form.subject.options.support}</option>
                    <option value="other">{content.contact.form.subject.options.other}</option>
                  </motion.select>
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-[#424245] mb-2">
                  {content.contact.form.message.label}
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all resize-none"
                  placeholder={content.contact.form.message.placeholder}
                  animate={{
                    scale: focusedField === 'message' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Submit Button with Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {submitStatus === 'success' ? (
                  <motion.div
                    className="w-full py-4 rounded-full bg-green-500 text-white font-medium text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓ {content.contact.form.success}
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 md:py-4 rounded-full font-medium transition-all duration-300 touch-manipulation ${
                      isSubmitting
                        ? 'bg-[#C7C7CC] text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white hover:shadow-xl'
                    }`}
                    whileHover={!isSubmitting && !isMobile() ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.span
                          className="inline-block mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.span>
                        {content.contact.form.sending}
                      </span>
                    ) : (
                      content.contact.form.submit
                    )}
                  </motion.button>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information Cards - Mobile Optimized */}
          <motion.div
            className="space-y-4 md:space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: isMobile() ? 0 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Quick Contact Methods */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Email Card */}
              <AppleParallax offset={isMobile() ? 10 : 20} speed={0.3} disabled={isLowEndDevice()}>
                <motion.a
                  href={`mailto:${content.contact.details.email}`}
                  className="block bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8ED]"
                  whileHover={!isMobile() ? { scale: 1.02, y: -5 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3 md:mb-4">
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full flex items-center justify-center text-white text-lg md:text-xl"
                      animate={!isMobile() ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ✉
                    </motion.div>
                    <h3 className="mr-3 md:mr-4 text-base md:text-lg font-semibold text-[#1D1D1F]">
                      {content.contact.info.email}
                    </h3>
                  </div>
                  <p className="text-[#86868B] text-sm md:text-base break-all">
                    {content.contact.details.email}
                  </p>
                </motion.a>
              </AppleParallax>

              {/* Phone Card */}
              <AppleParallax offset={isMobile() ? 10 : 25} speed={0.4} disabled={isLowEndDevice()}>
                <motion.a
                  href={`tel:${content.contact.details.phone}`}
                  className="block bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8ED]"
                  whileHover={!isMobile() ? { scale: 1.02, y: -5 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3 md:mb-4">
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#30D158] to-[#5AC8FA] rounded-full flex items-center justify-center text-white text-lg md:text-xl"
                      animate={!isMobile() ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                      📱
                    </motion.div>
                    <h3 className="mr-3 md:mr-4 text-base md:text-lg font-semibold text-[#1D1D1F]">
                      {content.contact.info.phone}
                    </h3>
                  </div>
                  <p className="text-[#86868B] text-sm md:text-base" dir="ltr">
                    {content.contact.details.phone}
                  </p>
                </motion.a>
              </AppleParallax>
            </div>

            {/* Location Card */}
            <AppleParallax offset={isMobile() ? 10 : 30} speed={0.5} disabled={isLowEndDevice()}>
              <motion.div
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8ED]"
                whileHover={!isMobile() ? { scale: 1.02, y: -5 } : {}}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FF375F] to-[#FF9500] rounded-full flex items-center justify-center text-white text-lg md:text-xl"
                    animate={!isMobile() ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    📍
                  </motion.div>
                  <h3 className="mr-3 md:mr-4 text-base md:text-lg font-semibold text-[#1D1D1F]">
                    {content.contact.info.location}
                  </h3>
                </div>
                <p className="text-[#86868B] text-sm md:text-base">
                  {content.contact.details.address}
                </p>
              </motion.div>
            </AppleParallax>

            {/* Hours Card */}
            <AppleParallax offset={isMobile() ? 10 : 35} speed={0.6} disabled={isLowEndDevice()}>
              <motion.div
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8ED]"
                whileHover={!isMobile() ? { scale: 1.02, y: -5 } : {}}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#BF5AF2] to-[#FF375F] rounded-full flex items-center justify-center text-white text-lg md:text-xl"
                    animate={!isMobile() ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    🕐
                  </motion.div>
                  <h3 className="mr-3 md:mr-4 text-base md:text-lg font-semibold text-[#1D1D1F]">
                    {content.contact.info.hours}
                  </h3>
                </div>
                <p className="text-[#86868B] text-sm md:text-base whitespace-pre-line">
                  {content.contact.details.hours}
                </p>
              </motion.div>
            </AppleParallax>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-3 md:gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              {['LinkedIn', 'GitHub', 'WhatsApp'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all"
                  whileHover={!isMobile() ? { scale: 1.1, rotate: 360 } : {}}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  {social[0]}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section (Optional) */}
        <motion.div
          className="mt-12 md:mt-20 bg-gradient-to-br from-[#F5F5F7] to-[#E8E8ED] rounded-3xl p-1"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
            <motion.div
              className="text-6xl md:text-8xl mb-4 md:mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🗺️
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">מוזמנים לבקר</h3>
            <p className="text-[#86868B] text-sm md:text-base">
              נשמח לפגוש אתכם במשרדנו ברמת גן לפגישת ייעוץ ללא התחייבות
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}