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
    icon: Clock,
    title: 'זמינות',
    value: 'א׳-ה׳ 9:00-18:00',
    href: '#',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    icon: MapPin,
    title: 'מיקום',
    value: 'רמת גן, ישראל',
    href: '#',
    gradient: 'from-orange-500 to-red-500'
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
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-apple-gray-50 to-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppleStaggerChildren>
          {/* Section Header */}
          <AppleStaggerItem>
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-apple-green/10 backdrop-blur-xl rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle className="w-4 h-4 text-apple-green" />
                <span className="text-sm font-medium text-apple-green">
                  בואו נדבר על העסק שלך
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-4 sm:mb-6">
                מוכנים <span className="bg-gradient-to-r from-apple-green to-apple-cyan bg-clip-text text-transparent">להפסיק לבזבז זמן?</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-apple-gray-600 max-w-3xl mx-auto">
                בואו נדבר 15 דקות ונראה איך אני יכול לעזור לכם.
                ללא עלות, ללא מחויבות - רק שיחה על האפשרויות.
              </p>
            </div>
          </AppleStaggerItem>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Contact Form */}
            <AppleStaggerItem>
              <motion.div
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-apple-gray-900 mb-4 sm:mb-6">
                  ספר לי איך אני יכול לעזור
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all text-base"
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all text-base"
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all text-base"
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
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all text-base"
                      animate={{
                        scale: focusedField === 'subject' ? 1.01 : 1
                      }}
                    >
                      <option value="">בחר נושא</option>
                      <option value="website">אתר שעובד 24/7</option>
                      <option value="crm">מערכת ניהול לקוחות</option>
                      <option value="automation">אוטומציה וחיסכון זמן</option>
                      <option value="consulting">ייעוץ דיגיטלי</option>
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
                      rows={5}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-apple-gray-300 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all resize-none text-base"
                      placeholder="מה העסק שלך? מה מעיק עליך? איפה אתה מבזבז זמן?"
                      animate={{
                        scale: focusedField === 'message' ? 1.01 : 1
                      }}
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white rounded-xl font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="lg:space-y-6">
                {/* Section Title - Mobile/Tablet only */}
                <div className="lg:hidden mb-6">
                  <h3 className="text-xl font-bold text-apple-gray-900 mb-2">פרטי התקשרות</h3>
                  <p className="text-sm text-apple-gray-600">אני זמין דרך המגוון הרחב של ערוצי התקשורת</p>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
                  {contactInfo.map((info, index) => (
                  <AppleReveal key={index} direction="right" delay={index * 0.1}>
                    <motion.a
                      href={info.href}
                      className="block bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                          <info.icon size={26} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-apple-gray-500 mb-0.5">{info.title}</div>
                          <div className="text-base font-semibold text-apple-gray-900 break-words">{info.value}</div>
                        </div>
                      </div>
                    </motion.a>
                  </AppleReveal>
                  ))}
                </div>

                {/* Quick Actions */}
                <AppleReveal direction="right" delay={0.4}>
                  <div className="bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 rounded-xl sm:rounded-2xl p-6 mt-4 lg:mt-6">
                    <h4 className="text-lg font-bold text-apple-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-apple-blue" />
                      לא אוהבים טפסים?
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="https://wa.me/972544994417"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-apple-gray-700 hover:text-apple-blue"
                      >
                        <MessageCircle size={18} />
                        <span className="font-medium">WhatsApp</span>
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
