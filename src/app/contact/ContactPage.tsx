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
  AlertCircle
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}

const services = [
  'פיתוח אתר',
  'אפליקציית מובייל',
  'עיצוב UI/UX',
  'מסחר אלקטרוני',
  'ייעוץ טכנולוגי',
  'אחר'
]

const budgets = [
  'עד ₪5,000',
  '₪5,000 - ₪15,000',
  '₪15,000 - ₪30,000',
  '₪30,000 - ₪50,000',
  'מעל ₪50,000'
]

const timelines = [
  'דחוף (תוך שבוע)',
  'תוך חודש',
  '1-3 חודשים',
  '3-6 חודשים',
  'גמיש'
]

const contactMethods = [
  {
    icon: Phone,
    title: 'טלפון',
    value: '054-499-4417',
    href: 'tel:0544994417',
    description: 'ניתן להתקשר בימים א׳-ה׳',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Mail,
    title: 'אימייל',
    value: 'itayost1@gmail.com',
    href: 'mailto:itayost1@gmail.com',
    description: 'מענה תוך 24 שעות',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'שלח הודעה',
    href: 'https://wa.me/972544994417',
    description: 'מענה מהיר ונוח',
    color: 'from-green-500 to-teal-500'
  }
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name) newErrors.name = 'שם חובה'
    if (!formData.email) newErrors.email = 'אימייל חובה'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין'
    }
    if (!formData.service) newErrors.service = 'בחר שירות'
    if (!formData.message) newErrors.message = 'הודעה חובה'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
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
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: ''
        })
        setSubmitStatus('idle')
      }, 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                בואו נדבר
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              יש לך פרויקט?
              <span className="block mt-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                בואו נהפוך אותו למציאות
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              אני כאן כדי לעזור לך להגשים את החזון הדיגיטלי שלך.
              שלח הודעה ונתחיל!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                target={method.title === 'WhatsApp' ? '_blank' : undefined}
                rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{method.value}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    ספר לי על הפרויקט שלך
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          שם מלא *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                          placeholder="ישראל ישראלי"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          אימייל *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                          placeholder="example@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Phone & Company */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          טלפון
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="050-1234567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          שם החברה
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="החברה שלי בע״מ"
                        />
                      </div>
                    </div>
                    
                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        איזה שירות מעניין אותך? *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.service ? 'border-red-500' : 'border-gray-300'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                      >
                        <option value="">בחר שירות</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                      )}
                    </div>
                    
                    {/* Budget & Timeline */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          תקציב משוער
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                          <option value="">בחר תקציב</option>
                          {budgets.map(budget => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          לוח זמנים
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                          <option value="">בחר לוח זמנים</option>
                          {timelines.map(timeline => (
                            <option key={timeline} value={timeline}>{timeline}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        פרטים נוספים *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
                        placeholder="ספר לי על הפרויקט שלך, מה המטרות, מה האתגרים..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    </button>
                    
                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <p className="text-green-700 text-center">
                          תודה על הפנייה! אחזור אליך בהקדם האפשרי.
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="text-blue-600" size={20} />
                    מענה מהיר
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    אני משתדל לענות על כל פנייה תוך 24 שעות. במקרים דחופים, 
                    מוזמנים לפנות ב-WhatsApp או בטלפון.
                  </p>
                  <a
                    href="https://wa.me/972544994417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                  >
                    <MessageCircle size={18} />
                    שלח WhatsApp
                  </a>
                </motion.div>
                
                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="text-purple-600" size={20} />
                    שעות פעילות
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ראשון - חמישי</span>
                      <span className="font-medium">09:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">שישי</span>
                      <span className="font-medium">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">שבת</span>
                      <span className="font-medium">סגור</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">
                    עקבו אחריי
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map(social => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </motion.div>
                
                {/* Coffee Meeting */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6"
                >
                  <Coffee className="text-orange-600 mb-3" size={24} />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    נפגשים על קפה?
                  </h3>
                  <p className="text-gray-600 text-sm">
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              שאלות נפוצות
            </h2>
            
            <div className="space-y-4">
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
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
