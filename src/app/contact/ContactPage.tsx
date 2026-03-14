'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
  Zap,
  Coffee,
  Loader2,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { submitHomepageContactForm, type HomepageContactForm } from '@/services/crm'
import { trackGenerateLead, trackContactClick } from '@/lib/analytics'
import { socialLinks, contactMethods } from '@/config/socialLinks'
import { bouncyEasing } from '@/constants/animations'

interface FormData {
  name: string
  phone: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם מלא'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'נא להזין מספר טלפון'
    } else {
      const cleanPhone = formData.phone.replace(/[-\s()+]/g, '')
      const normalizedPhone = cleanPhone.replace(/^972/, '0')
      if (!/^0\d{8,9}$/.test(normalizedPhone)) {
        newErrors.phone = 'מספר טלפון לא תקין'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setErrorMessage('')

    // Track lead attempt after validation passes (before API call)
    trackGenerateLead('form', 'contact_page')

    try {
      // Normalize phone: strip formatting, convert +972/972 to 0-prefix
      const normalizedPhone = formData.phone.replace(/[-\s()+]/g, '').replace(/^972/, '0')

      // Convert FormData to HomepageContactForm format
      const contactForm: HomepageContactForm = {
        name: formData.name,
        phone: normalizedPhone,
      }

      // Submit to CRM
      const result = await submitHomepageContactForm(contactForm)

      if (result.success) {
        setSubmitStatus('success')

        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            phone: ''
          })
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'שגיאה בשליחת הטופס')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('שגיאה בשליחת הטופס. אנא נסו שוב.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    if (errorMessage) {
      setErrorMessage('')
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
                  בואו נדבר
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              בואו נדבר
              <span className="block mt-2 text-brand-green">
                על העסק שלכם
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-2xl mx-auto"
            >
              ספרו לי על העסק ומה הייתם רוצים לשפר, ואני אחזור אליכם תוך שעה עם רעיונות.
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
                onClick={() => trackContactClick(
                  method.title === 'WhatsApp' ? 'whatsapp' : method.title === 'טלפון' ? 'phone' : 'email',
                  'contact_section'
                )}
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
                    ספרו לי איך אני יכול לעזור
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="contact-name" className="block text-base font-semibold text-brand-navy mb-2">
                        שם מלא *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.name ? 'border-red-400' : 'border-brand-gray-200'} focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/20 transition-all text-lg`}
                        placeholder="ישראל ישראלי"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-base font-semibold text-brand-navy mb-2">
                        טלפון *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.phone ? 'border-red-400' : 'border-brand-gray-200'} focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/20 transition-all text-lg`}
                        placeholder="050-1234567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </p>
                      )}
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
                        role="alert"
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
                        role="alert"
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
                    חוזר אליכם תוך שעה בימי עבודה. הזמינות הקרובה לפרויקטים: אפריל 2026.
                  </p>
                  <motion.a
                    href={`https://wa.me/972544994417?text=${encodeURIComponent('היי, אשמח לתאם שיחה על פרויקט')}`}
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
