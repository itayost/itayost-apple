'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

export default function Contact() {
  return (
    <section className="py-20 lg:py-32 bg-brand-blue">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-base font-bold text-white">
                בואו נדבר
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              מוכנים להתחיל?
            </h2>

            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              ספרו לנו על הפרויקט שלכם ובואו נראה איך אנחנו יכולים לעזור
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: bouncyEasing }}
            className="mb-16"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-12 py-6 bg-brand-orange text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-shadow"
              >
                <span>שלחו לנו הודעה</span>
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: bouncyEasing }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Phone,
                title: 'טלפון',
                value: '054-499-4417',
                href: 'tel:0544994417',
                color: 'bg-brand-orange'
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                value: 'שלחו הודעה',
                href: 'https://wa.me/972544994417',
                color: 'bg-brand-green'
              },
              {
                icon: Mail,
                title: 'אימייל',
                value: 'itayost1@gmail.com',
                href: 'mailto:itayost1@gmail.com',
                color: 'bg-brand-navy'
              },
            ].map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                  ease: bouncyEasing
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow group flex flex-col items-center text-center"
              >
                <div className={`flex items-center justify-center w-16 h-16 ${method.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-brand-navy font-bold text-lg mb-2">
                  {method.title}
                </h3>
                <p className="text-brand-gray-700 font-medium text-base">
                  {method.value}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {/* Friendly Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: bouncyEasing }}
            className="mt-12"
          >
            <p className="text-white/80 text-lg">
              💡 בדרך כלל עונים תוך שעה בימי עסקים
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
