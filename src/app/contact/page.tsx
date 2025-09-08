'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SmoothReveal } from '@/components/ScrollAnimations/SmoothReveal'
import { TextReveal } from '@/components/ScrollAnimations/TextReveal'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Thank you! We\'ll be in touch soon.')
    setFormData({ name: '', email: '', company: '', budget: '', timeline: '', message: '' })
  }

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity, but most websites take 4-8 weeks from concept to launch.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer maintenance packages to keep your site secure, updated, and performing optimally.'
    },
    {
      question: 'Can you work with our existing brand?',
      answer: 'Absolutely! We can seamlessly integrate with your existing brand guidelines and visual identity.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We specialize in modern frameworks like React, Next.js, and Node.js, choosing the best tech for each project.'
    },
  ]

  return (
    <main className="overflow-hidden bg-white pt-20">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-6 py-24 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F5F5F7] relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#FF375F] to-[#FF9500] rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SmoothReveal direction="up">
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Let's{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                <TextReveal delay={0.2}>Connect</TextReveal>
              </span>
            </h1>
          </SmoothReveal>
          
          <SmoothReveal direction="up" delay={0.2}>
            <p className="text-xl text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              Ready to bring your vision to life? Let's discuss your project and explore 
              how we can help you achieve your goals.
            </p>
          </SmoothReveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <SmoothReveal direction="up">
              <h2 className="text-3xl font-semibold mb-8">
                Tell us about your{' '}
                <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                  project
                </span>
              </h2>
            </SmoothReveal>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <SmoothReveal direction="up" delay={0.1}>
                  <div>
                    <label className="block text-sm font-medium text-[#424245] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </SmoothReveal>

                <SmoothReveal direction="up" delay={0.2}>
                  <div>
                    <label className="block text-sm font-medium text-[#424245] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </SmoothReveal>
              </div>

              {/* Company */}
              <SmoothReveal direction="up" delay={0.3}>
                <div>
                  <label className="block text-sm font-medium text-[#424245] mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                    placeholder="Your Company Name"
                  />
                </div>
              </SmoothReveal>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <SmoothReveal direction="up" delay={0.4}>
                  <div>
                    <label className="block text-sm font-medium text-[#424245] mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                    >
                      <option value="">Select budget</option>
                      <option value="<10k">Less than $10,000</option>
                      <option value="10-25k">$10,000 - $25,000</option>
                      <option value="25-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </SmoothReveal>

                <SmoothReveal direction="up" delay={0.5}>
                  <div>
                    <label className="block text-sm font-medium text-[#424245] mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                    </select>
                  </div>
                </SmoothReveal>
              </div>

              {/* Message */}
              <SmoothReveal direction="up" delay={0.6}>
                <div>
                  <label className="block text-sm font-medium text-[#424245] mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-[#F5F5F7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition-all resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>
              </SmoothReveal>

              {/* Submit Button */}
              <SmoothReveal direction="up" delay={0.7}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-full font-medium text-lg transition-all ${
                    isSubmitting
                      ? 'bg-[#C7C7CC] text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white hover:shadow-xl'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </SmoothReveal>
            </form>
          </div>

          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Contact */}
            <SmoothReveal direction="left" delay={0.2}>
              <div className="bg-gradient-to-br from-[#0071E3] to-[#BF5AF2] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <a href="mailto:hello@itayost.com" className="block group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <span className="text-xl">✉️</span>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Email</p>
                        <p className="font-medium group-hover:underline">hello@itayost.com</p>
                      </div>
                    </div>
                  </a>

                  <a href="tel:+972544994417" className="block group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Phone</p>
                        <p className="font-medium group-hover:underline">+972 54-499-4417</p>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Location</p>
                      <p className="font-medium">Tel Aviv, Israel</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm opacity-80 mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xs font-medium">{social[0]}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </SmoothReveal>

            {/* Office Hours */}
            <SmoothReveal direction="left" delay={0.3}>
              <div className="bg-[#F5F5F7] rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-[#1D1D1F]">Office Hours</h3>
                <div className="space-y-2 text-[#86868B]">
                  <div className="flex justify-between">
                    <span>Sunday - Thursday</span>
                    <span className="font-medium text-[#424245]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday</span>
                    <span className="font-medium text-[#424245]">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-[#424245]">Closed</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#86868B]">
                  Response time: Within 24 hours
                </p>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[#FBFBFD]">
        <div className="max-w-4xl mx-auto">
          <SmoothReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </SmoothReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <SmoothReveal key={index} direction="up" delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-2 text-[#1D1D1F]">
                    {faq.question}
                  </h3>
                  <p className="text-[#86868B]">
                    {faq.answer}
                  </p>
                </motion.div>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
