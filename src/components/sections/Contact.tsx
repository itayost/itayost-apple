'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppleStaggerChildren, AppleStaggerItem, AppleReveal } from '@/components/ScrollAnimations/AppleAnimations'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: Phone,
    title: 'טלפון',
    value: '054-499-4417',
    href: 'tel:0544994417',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Mail,
    title: 'אימייל',
    value: 'itayost1@gmail.com',
    href: 'mailto:itayost1@gmail.com',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: MapPin,
    title: 'מיקום',
    value: 'ישראל',
    href: '#',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Clock,
    title: 'זמינות',
    value: 'א׳-ה׳ 9:00-18:00',
    href: '#',
    gradient: 'from-green-500 to-teal-500'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setSubmitStatus('idle')
      }, 3000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-apple-gray-50 to-white overflow-hidden">
      <div className="container">
        <AppleStaggerChildren>
          {/* Section Header */}
          <AppleStaggerItem>
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-apple-green/10 backdrop-blur-xl rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle className="w-4 h-4 text-apple-green" />
                <span className="text-sm font-medium text-apple-green">
                  בואו נדבר
                </span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6">
                יש לך <span className="bg-gradient-to-r from-apple-green to-apple-cyan bg-clip-text text-transparent">פרויקט בראש?</span>
              </h2>
              
              <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
                אשמח לשמוע על הרעיון שלך ולהפוך אותו למציאות דיגיטלית מרשימה
              </p>
            </div>
          </AppleStaggerItem>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AppleStaggerItem>
              <motion.div
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-6">
                  שלח הודעה
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      שם מלא
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
                      placeholder="ישראל ישראלי"
                      animate={{
                        scale: focusedField === 'name' ? 1.01 : 1
                      }}
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      אימייל
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
                      placeholder="example@email.com"
                      animate={{
                        scale: focusedField === 'email' ? 1.01 : 1
                      }}
                    />
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      טלפון
                    </label>
                    <motion.input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
                      placeholder="050-1234567"
                      animate={{
                        scale: focusedField === 'phone' ? 1.01 : 1
                      }}
                    />
                  </div>
                  
                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      נושא
                    </label>
                    <motion.select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
                      animate={{
                        scale: focusedField === 'subject' ? 1.01 : 1
                      }}
                    >
                      <option value="">בחר נושא</option>
                      <option value="website">פיתוח אתר</option>
                      <option value="app">פיתוח אפליקציה</option>
                      <option value="design">עיצוב UI/UX</option>
                      <option value="consulting">ייעוץ</option>
                      <option value="other">אחר</option>
                    </motion.select>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      הודעה
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all resize-none"
                      placeholder="ספר לי על הפרויקט שלך..."
                      animate={{
                        scale: focusedField === 'message' ? 1.01 : 1
                      }}
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full py-4 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>שולח...</span>
                        </motion.div>
                      ) : submitStatus === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={20} />
                          <span>נשלח בהצלחה!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Send size={20} />
                          <span>שלח הודעה</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </motion.div>
            </AppleStaggerItem>

            {/* Contact Information */}
            <AppleStaggerItem>
              <div className="space-y-6">
                {/* Info Cards */}
                {contactInfo.map((info, index) => (
                  <AppleReveal key={index} direction="right" delay={index * 0.1}>
                    <motion.a
                      href={info.href}
                      className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center text-white`}>
                          <info.icon size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-apple-gray-500">{info.title}</div>
                          <div className="text-lg font-medium text-apple-gray-900">{info.value}</div>
                        </div>
                      </div>
                    </motion.a>
                  </AppleReveal>
                ))}
                
                {/* Quick Actions */}
                <AppleReveal direction="right" delay={0.4}>
                  <div className="bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-apple-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-apple-blue" />
                      דרכים נוספות ליצור קשר
                    </h4>
                    <div className="space-y-3">
                      <a
                        href="https://wa.me/972544994417"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-apple-gray-700 hover:text-apple-blue transition-colors"
                      >
                        <MessageCircle size={20} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </AppleReveal>
              </div>
            </AppleStaggerItem>
          </div>
        </AppleStaggerChildren>
      </div>
    </section>
  )
}
