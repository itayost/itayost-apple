'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Star,
  TrendingUp,
  Award,
  Quote,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'
import { content } from '@/config/content'

// Client testimonials - Replace with real data
const testimonials = [
  {
    id: 1,
    name: 'דוד כהן',
    role: 'בעלים',
    company: 'מסעדת עמוס',
    industry: 'restaurants',
    image: '', // Add real image path
    rating: 5,
    text: 'איתי בנה לנו אתר מדהים שהגדיל את ההזמנות שלנו ב-40%. שירות מקצועי, מהיר ותמיכה מעולה. ממליץ בחום!',
    results: '+40% הזמנות אונליין'
  },
  {
    id: 2,
    name: 'שרה לוי',
    role: 'מנכ"לית',
    company: 'טל נדל"ן',
    industry: 'realEstate',
    image: '',
    rating: 5,
    text: 'המערכת שאיתי פיתח לנו חסכה לנו שעות עבודה כל יום. הכל אוטומטי, פשוט ועובד מצוין. השקעה שמשתלמת!',
    results: '15 שעות נחסכות בשבוע'
  },
  {
    id: 3,
    name: 'יוסי אברהם',
    role: 'מייסד',
    company: 'The Fader',
    industry: 'technology',
    image: '',
    rating: 5,
    text: 'עבדנו עם כמה מפתחים לפני איתי. ההבדל? איתי באמת מבין עסקים. לא רק קוד - פתרונות שעובדים.',
    results: '₪50,000 חיסכון שנתי'
  },
  {
    id: 4,
    name: 'מיכל ברק',
    role: 'מנהלת שיווק',
    company: 'לולה מרטין',
    industry: 'ecommerce',
    image: '',
    rating: 5,
    text: 'האתר שאיתי בנה לנו הפך את העסק. עיצוב מהמם, מהיר וממיר. המכירות עלו ב-60% מאז ההשקה!',
    results: '+60% מכירות'
  },
  {
    id: 5,
    name: 'רן גולן',
    role: 'בעלים',
    company: 'מרכז רפואי',
    industry: 'healthcare',
    image: '',
    rating: 5,
    text: 'מערכת ניהול התורים שאיתי פיתח שינתה לנו את החיים. הכל ממוחשב, מסודר ומקצועי. לקוחות מרוצים ואנחנו חוסכים זמן.',
    results: '90% פחות טלפונים'
  },
  {
    id: 6,
    name: 'נעמה שפירא',
    role: 'מנהלת',
    company: 'סטודיו לעיצוב',
    industry: 'services',
    image: '',
    rating: 5,
    text: 'איתי לא רק פיתח לנו אתר - הוא עזר לנו לבנות את הנוכחות הדיגיטלית שלנו. תמיד זמין, תמיד עוזר. ממש שותף!',
    results: 'פי 3 יותר לידים'
  }
]

// Stats data
const stats = [
  { number: '50+', label: content.clients.stats.clients },
  { number: '100+', label: content.clients.stats.projects },
  { number: '100%', label: content.clients.stats.satisfaction },
  { number: '5+', label: content.clients.stats.years }
]

// Industry icons mapping
const industryIcons: Record<string, string> = {
  restaurants: '🍽️',
  realEstate: '🏢',
  ecommerce: '🛒',
  healthcare: '⚕️',
  education: '📚',
  technology: '💻',
  services: '🔧',
  other: '✨'
}

export default function ClientsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  const industries = [
    { key: 'all', label: content.clients.industries.all },
    ...Object.entries(content.clients.industries)
      .filter(([key]) => !['title', 'subtitle', 'all'].includes(key))
      .map(([key, label]) => ({ key, label: label as string }))
  ]

  const filteredTestimonials = selectedIndustry === 'all'
    ? testimonials
    : testimonials.filter(t => t.industry === selectedIndustry)

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 backdrop-blur-xl rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-medium text-brand-orange">
                {content.clients.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gray-900 mb-6"
            >
              {content.clients.title}
              <span className="block mt-2 bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
                {content.clients.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-gray-600 max-w-3xl mx-auto"
            >
              {content.clients.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-brand-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Filter */}
      <section className="py-8 bg-white border-y border-brand-gray-200">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-sm font-semibold text-brand-gray-700 mb-4">
            {content.clients.industries.title}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() => setSelectedIndustry(key)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedIndustry === key
                    ? 'bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-lg'
                    : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {key !== 'all' && industryIcons[key]} {label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-4">
              {content.clients.testimonials.title}
            </h2>
            <p className="text-xl text-brand-gray-600">
              {content.clients.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-brand-orange/20 mb-4" />

                {/* Testimonial Text */}
                <p className="text-brand-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Results Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-green/10 to-apple-cyan/10 rounded-full">
                    <TrendingUp size={16} className="text-brand-green" />
                    <span className="text-sm font-medium text-brand-green">
                      {testimonial.results}
                    </span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-brand-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-pink rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-brand-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Highlights */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-4">
              למה לקוחות בוחרים בנו?
            </h2>
            <p className="text-xl text-brand-gray-600">
              הסיבות שגורמות ללקוחות לחזור אלינו שוב ושוב
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Award,
                title: 'איכות ללא פשרות',
                description: 'כל פרויקט מקבל את מלוא תשומת הלב והמקצועיות'
              },
              {
                icon: CheckCircle2,
                title: 'תוצאות מדידות',
                description: 'לא רק קוד יפה - תוצאות עסקיות אמיתיות'
              },
              {
                icon: Users,
                title: 'שירות אישי',
                description: 'תקשורת ישירה, זמינות מלאה ותמיכה מתמשכת'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-orange to-brand-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {content.clients.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {content.clients.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-orange rounded-full font-medium hover:shadow-xl transition-all"
            >
              {content.clients.cta.button}
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 rounded-full font-medium hover:bg-white/30 transition-all"
            >
              צפו בעבודות
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
