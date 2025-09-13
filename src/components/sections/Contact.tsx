'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { content } from '@/config/content'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert(content.contact.form.success)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-32 px-6 bg-white" id="contact">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="text-sm font-medium text-[#86868B] uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {content.contact.sectionLabel}
          </motion.div>
          <motion.h2 
            className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.contact.title}{' '}
            <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              {content.contact.subtitle}
            </span>
          </motion.h2>
          <motion.p
            className="text-[#86868B] text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {content.contact.description}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                    placeholder={content.contact.form.name.placeholder}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-[#424245] mb-2">
                    {content.contact.form.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                    placeholder={content.contact.form.email.placeholder}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-[#424245] mb-2">
                  {content.contact.form.subject.label}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all"
                >
                  <option value="">{content.contact.form.subject.placeholder}</option>
                  <option value="project">{content.contact.form.subject.options.newProject}</option>
                  <option value="consultation">{content.contact.form.subject.options.consultation}</option>
                  <option value="support">{content.contact.form.subject.options.support}</option>
                  <option value="other">{content.contact.form.subject.options.other}</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-[#424245] mb-2">
                  {content.contact.form.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#C7C7CC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all resize-none"
                  placeholder={content.contact.form.message.placeholder}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-[#C7C7CC] text-white cursor-not-allowed'
                    : 'bg-[#0071E3] text-white hover:bg-[#0077ED] hover:shadow-xl'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {isSubmitting ? content.contact.form.sending : content.contact.form.submit}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <motion.div
              className="bg-[#F5F5F7] rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full flex items-center justify-center text-white text-xl">
                  ✉
                </div>
                <h3 className="mr-4 text-lg font-semibold text-[#1D1D1F]">{content.contact.info.email}</h3>
              </div>
              <p className="text-[#86868B]">{content.contact.details.email}</p>
            </motion.div>

            <motion.div
              className="bg-[#F5F5F7] rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#30D158] to-[#5AC8FA] rounded-full flex items-center justify-center text-white text-xl">
                  📱
                </div>
                <h3 className="mr-4 text-lg font-semibold text-[#1D1D1F]">{content.contact.info.phone}</h3>
              </div>
              <p className="text-[#86868B]">{content.contact.details.phone}</p>
            </motion.div>

            <motion.div
              className="bg-[#F5F5F7] rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF375F] to-[#FF9500] rounded-full flex items-center justify-center text-white text-xl">
                  📍
                </div>
                <h3 className="mr-4 text-lg font-semibold text-[#1D1D1F]">{content.contact.info.location}</h3>
              </div>
              <p className="text-[#86868B]">{content.contact.details.address}</p>
            </motion.div>

            <motion.div
              className="bg-[#F5F5F7] rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#BF5AF2] to-[#FF375F] rounded-full flex items-center justify-center text-white text-xl">
                  🕐
                </div>
                <h3 className="mr-4 text-lg font-semibold text-[#1D1D1F]">{content.contact.info.hours}</h3>
              </div>
              <p className="text-[#86868B]">{content.contact.details.hours}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}