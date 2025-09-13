'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedReveal } from '@/components/ScrollAnimations/OptimizedAnimations'
import { usePerformance } from '@/contexts/PerformanceContext'
import { useMobileOptimizedInView } from '@/hooks/useMobileOptimized'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
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

// Optimized Contact Info Card
const ContactInfoCard = ({ info, index }: { info: typeof contactInfo[0], index: number }) => {
  const { isMobile, isTouchDevice } = usePerformance()
  const { ref, isInView } = useMobileOptimizedInView({ triggerOnce: true })

  return (
    <motion.a
      ref={ref as any}
      href={info.href}
      initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ 
        delay: isMobile ? index * 0.05 : index * 0.1,
        duration: isMobile ? 0.3 : 0.5
      }}
      whileHover={!isTouchDevice ? { scale: 1.02, x: 10 } : undefined}
      whileTap={{ scale: 0.98 }}
      className="block bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center text-white`}>
          <info.icon size={24} />
        </div>
        <div>
          <div className="text-sm text-gray-500">{info.title}</div>
          <div className="text-lg font-medium text-gray-900">{info.value}</div>
        </div>
      </div>
    </motion.a>
  )
}

// Optimized Form with reduced animations on mobile
const ContactForm = () => {
  const { isMobile, isTouchDevice } = usePerformance()
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

  // Input field wrapper with simplified animations
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    placeholder, 
    required = false,
    as = 'input'
  }: {
    label: string
    name: string
    type?: string
    placeholder?: string
    required?: boolean
    as?: 'input' | 'textarea' | 'select'
  }) => {
    const Component = as
    const inputProps = {
      name,
      value: formData[name as keyof FormData],
      onChange: handleChange,
      onFocus: () => !isMobile && setFocusedField(name),
      onBlur: () => setFocusedField(null),
      required,
      placeholder,
      className: `w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
        focusedField === name && !isMobile ? 'transform scale-[1.01]' : ''
      }`
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {as === 'textarea' ? (
          <textarea {...inputProps} rows={4} className={`${inputProps.className} resize-none`} />
        ) : as === 'select' ? (
          <select {...inputProps}>
            <option value="">בחר נושא</option>
            <option value="website">פיתוח אתר</option>
            <option value="app">פיתוח אפליקציה</option>
            <option value="design">עיצוב UI/UX</option>
            <option value="consulting">ייעוץ</option>
            <option value="other">אחר</option>
          </select>
        ) : (
          <input {...inputProps} type={type} />
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        שלח הודעה
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="שם מלא" name="name" placeholder="ישראל ישראלי" required />
        <InputField label="אימייל" name="email" type="email" placeholder="example@email.com" required />
        <InputField label="טלפון" name="phone" type="tel" placeholder="050-1234567" />
        <InputField label="נושא" name="subject" as="select" required />
        <InputField label="הודעה" name="message" as="textarea" placeholder="ספר לי על הפרויקט שלך..." required />
        
        {/* Submit Button with simplified animation */}
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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
        </button>
      </form>
    </div>
  )
}

export default function ContactOptimized() {
  const { isMobile } = usePerformance()

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <OptimizedReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                בואו נדבר
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              יש לך <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">פרויקט בראש?</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              אשמח לשמוע על הרעיון שלך ולהפוך אותו למציאות דיגיטלית מרשימה
            </p>
          </div>
        </OptimizedReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <OptimizedReveal delay={0.1}>
            <ContactForm />
          </OptimizedReveal>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <ContactInfoCard key={index} info={info} index={index} />
            ))}
            
            {/* Quick Actions - Simplified */}
            <OptimizedReveal delay={0.3}>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  דרכים נוספות ליצור קשר
                </h4>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/972544994417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </OptimizedReveal>
          </div>
        </div>
      </div>

      {/* Mobile-specific optimizations */}
      <style jsx>{`
        @media (max-width: 767px) {
          /* Reduce focus ring size on mobile */
          input:focus,
          textarea:focus,
          select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
          }
          
          /* Optimize tap targets */
          button,
          a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </section>
  )
}
