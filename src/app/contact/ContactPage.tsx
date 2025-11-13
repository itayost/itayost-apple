'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
  Calendar,
  Zap,
  Coffee,
  Loader2,
  Instagram,
  Facebook,
  Github,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { submitHomepageContactForm, type HomepageContactForm } from '@/services/crm'
import { trackFormStart, trackFormSubmit, trackConversion } from '@/lib/analytics'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const subjects = [
  { value: 'website', label: 'אתר שעובד 24/7' },
  { value: 'crm', label: 'מערכת ניהול לקוחות' },
  { value: 'automation', label: 'אוטומציה וחיסכון זמן' },
  { value: 'consulting', label: 'ייעוץ דיגיטלי' },
  { value: 'other', label: 'אחר' }
]

const contactMethods = [
  {
    icon: Phone,
    title: 'טלפון',
    value: '054-499-4417',
    href: 'tel:0544994417',
    description: 'ניתן להתקשר בימים א׳-ה׳',
    color: 'bg-brand-blue'
  },
  {
    icon: Mail,
    title: 'אימייל',
    value: 'itayost1@gmail.com',
    href: 'mailto:itayost1@gmail.com',
    description: 'מענה תוך 24 שעות',
    color: 'bg-brand-orange'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'שלח הודעה',
    href: 'https://wa.me/972544994417',
    description: 'מענה מהיר ונוח',
    color: 'bg-brand-green'
  }
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub', color: 'hover:bg-brand-navy' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook', color: 'hover:bg-brand-blue' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram', color: 'hover:bg-brand-orange' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formStartTracked, setFormStartTracked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setErrors({})
    setErrorMessage('')

    try {
      // Convert FormData to HomepageContactForm format
      const contactForm: HomepageContactForm = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      }

      // Submit to CRM
      const result = await submitHomepageContactForm(contactForm)

      if (result.success) {
        setSubmitStatus('success')

        // Track successful form submission
        trackFormSubmit('contact_form', true)
        trackConversion('contact_form_submit', 1)

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
          setFormStartTracked(false)
        }, 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'שגיאה בשליחת הטופס')

        // Track failed submission
        trackFormSubmit('contact_form', false, result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('שגיאה בשליחת הטופס. אנא נסו שוב.')

      // Track error
      trackFormSubmit('contact_form', false, 'שגיאה בשליחת הטופס')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleFieldFocus = () => {
    // Track form start only once when user focuses on first field
    if (!formStartTracked) {
      trackFormStart('contact_form')
      setFormStartTracked(true)
    }
  }

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-green" />
                <span className="text-base font-bold text-brand-green">
                  בואו נדבר על העסק שלך
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              יש לך פרויקט בראש?
              <span className="block mt-2 text-brand-green">
                בואו נהפוך אותו למציאות
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-2xl mx-auto"
            >
              יש לך שאלה? רעיון? בעיה שצריך לפתור?
              אני כאן כדי לעזור.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-section-light-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: bouncyEasing
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
                target={method.title === 'WhatsApp' ? '_blank' : undefined}
                rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center text-white mb-4`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5, ease: bouncyEasing }
                    }}
                  >
                    <method.icon size={28} />
                  </motion.div>
                  <h3 className="font-bold text-xl text-brand-navy mb-2">{method.title}</h3>
                  <p className="text-brand-blue font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-brand-gray-700">{method.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: bouncyEasing }}
                  className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-8">
                    ספר לי איך אני יכול לעזור
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-base font-semibold text-brand-navy mb-2">
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleFieldFocus}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-lg"
                        placeholder="ישראל ישראלי"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-base font-semibold text-brand-navy mb-2">
                        אימייל
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-lg"
                        placeholder="example@email.com"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-base font-semibold text-brand-navy mb-2">
                        טלפון *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-lg"
                        placeholder="050-1234567"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-base font-semibold text-brand-navy mb-2">
                        נושא *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-lg"
                      >
                        <option value="">בחר נושא</option>
                        {subjects.map(subject => (
                          <option key={subject.value} value={subject.value}>{subject.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-base font-semibold text-brand-navy mb-2">
                        הודעה *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-brand-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-lg"
                        placeholder="מה העסק שלך? מה מעיק עליך? איפה אתה מבזבז זמן?"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="w-full px-8 py-5 bg-brand-orange text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!isSubmitting && submitStatus !== 'success' ? {
                        scale: 1.02,
                        transition: { duration: 0.3, ease: bouncyEasing }
                      } : {}}
                      whileTap={!isSubmitting && submitStatus !== 'success' ? {
                        scale: 0.98,
                        transition: { duration: 0.3, ease: bouncyEasing }
                      } : {}}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={20} />
                          שולח...
                        </span>
                      ) : submitStatus === 'success' ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle size={20} />
                          נשלח בהצלחה!
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send size={20} />
                          שלח הודעה
                        </span>
                      )}
                    </motion.button>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: bouncyEasing }}
                        className="p-5 bg-brand-green/10 border-2 border-brand-green/30 rounded-2xl"
                      >
                        <p className="text-brand-green text-center font-semibold">
                          תודה על הפנייה! אחזור אליך בהקדם האפשרי.
                        </p>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: bouncyEasing }}
                        className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl"
                      >
                        <p className="text-red-700 text-center flex items-center justify-center gap-2 font-semibold">
                          <AlertCircle size={18} />
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-brand-blue/10 rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2 text-lg">
                    <Zap className="text-brand-blue" size={22} />
                    מענה מהיר
                  </h3>
                  <p className="text-brand-gray-700 mb-4 leading-relaxed">
                    אני משתדל לענות על כל פנייה תוך 24 שעות. במקרים דחופים,
                    מוזמנים לפנות ב-WhatsApp או בטלפון.
                  </p>
                  <motion.a
                    href="https://wa.me/972544994417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-navy transition-colors"
                    whileHover={{ x: -3 }}
                    transition={{ duration: 0.2, ease: bouncyEasing }}
                  >
                    <MessageCircle size={18} />
                    שלח WhatsApp
                  </motion.a>
                </motion.div>

                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: bouncyEasing }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2 text-lg">
                    <Clock className="text-brand-orange" size={22} />
                    שעות פעילות
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-700">ראשון - חמישי</span>
                      <span className="font-bold text-brand-navy">09:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-700">שישי</span>
                      <span className="font-bold text-brand-navy">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gray-700">שבת</span>
                      <span className="font-bold text-brand-navy">סגור</span>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: bouncyEasing }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <h3 className="font-bold text-brand-navy mb-4 text-lg">
                    עקבו אחריי
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-brand-gray-100 rounded-2xl flex items-center justify-center ${social.color} transition-colors`}
                        aria-label={social.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          duration: 0.5,
                          ease: bouncyEasing
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.1,
                          transition: { duration: 0.3, ease: bouncyEasing }
                        }}
                        whileTap={{
                          scale: 0.9,
                          transition: { duration: 0.2, ease: bouncyEasing }
                        }}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Coffee Meeting */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: bouncyEasing }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-brand-orange/10 rounded-3xl p-6 shadow-lg"
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Coffee className="text-brand-orange mb-3" size={28} />
                  </motion.div>
                  <h3 className="font-bold text-brand-navy mb-2 text-lg">
                    נפגשים על קפה?
                  </h3>
                  <p className="text-brand-gray-700 leading-relaxed">
                    אני תמיד שמח לפגוש לקוחות פוטנציאליים פנים אל פנים.
                    ניתן לתאם פגישה באזור תל אביב.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="text-4xl sm:text-5xl font-bold text-brand-navy text-center mb-12"
            >
              שאלות נפוצות
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  q: 'כמה זמן לוקח לפתח אתר?',
                  a: 'זמן הפיתוח תלוי במורכבות הפרויקט. אתר תדמית פשוט: 2-4 שבועות, אתר מסחר אלקטרוני: 6-8 שבועות, מערכת מורכבת: 2-6 חודשים.'
                },
                {
                  q: 'האם אתה נותן אחריות על העבודה?',
                  a: 'כן, אני נותן 6 חודשי אחריות על כל פרויקט וכולל חודש תמיכה חינם. לאחר מכן ניתן לרכוש חבילות תמיכה חודשיות.'
                },
                {
                  q: 'האם אפשר לשלם בתשלומים?',
                  a: 'כן, ניתן לפרוס את התשלום עד 6 תשלומים ללא ריבית, או יותר בהתאם להסכם.'
                },
                {
                  q: 'איפה אתה נמצא?',
                  a: 'אני נמצא באזור תל אביב, אבל עובד עם לקוחות מכל הארץ. ניתן לקיים פגישות פיזיות או וירטואליות.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: bouncyEasing
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <h3 className="font-bold text-brand-navy mb-3 text-lg">{faq.q}</h3>
                  <p className="text-brand-gray-700 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
