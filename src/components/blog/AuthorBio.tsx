'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Mail, Briefcase, ArrowLeft } from 'lucide-react'

interface AuthorBioProps {
  author?: string
}

const bouncyEasing = [0.34, 1.56, 0.64, 1]

export default function AuthorBio({ author = 'איתי אוסטרייך' }: AuthorBioProps) {
  const whatsappLink = 'https://wa.me/972544994417?text=' + encodeURIComponent('היי, קראתי את המאמר שלך ורציתי לשאול...')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: bouncyEasing }}
      className="my-12 rounded-3xl bg-gradient-to-bl from-brand-gray-50 to-white border border-brand-gray-200 overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: bouncyEasing }}
            className="flex-shrink-0"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-orange p-[3px]">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-br from-brand-blue to-brand-purple bg-clip-text text-transparent">
                  {author.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: bouncyEasing }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-1">
                {author}
              </h3>
              <p className="text-brand-blue font-semibold mb-4">
                Full-Stack Developer
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: bouncyEasing }}
              className="text-brand-gray-700 leading-relaxed mb-6"
            >
              מפתח Full-Stack עם ניסיון רב בבניית אתרים, אפליקציות ומערכות לעסקים.
              מתמחה ב-Next.js, React ו-TypeScript. עוזר לעסקים להצליח בעולם הדיגיטלי.
            </motion.p>

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: bouncyEasing }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                <MessageCircle className="w-4 h-4" />
                וואטסאפ
              </motion.a>

              <motion.a
                href="mailto:itayost1@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gray-100 text-brand-navy text-sm font-semibold hover:bg-brand-gray-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                אימייל
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gray-100 text-brand-navy text-sm font-semibold hover:bg-brand-gray-200 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  פרויקטים
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="px-6 sm:px-8 py-4 bg-gradient-to-l from-brand-blue/5 to-brand-purple/5 border-t border-brand-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-brand-gray-700 font-medium">
            יש לכם פרויקט בראש? בואו נדבר!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              צור קשר
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
