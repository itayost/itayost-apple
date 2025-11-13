'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Instagram,
  Facebook,
  Heart,
  ArrowUp
} from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

const footerLinks = {
  services: {
    title: 'שירותים',
    links: [
      { label: 'פיתוח אתרים', href: '/services#web-development' },
      { label: 'אפליקציות מובייל', href: '/services#mobile-apps' },
      { label: 'עיצוב UI/UX', href: '/services#ui-ux' },
      { label: 'ייעוץ טכנולוגי', href: '/services#consulting' }
    ]
  },
  company: {
    title: 'החברה',
    links: [
      { label: 'אודות', href: '/about' },
      { label: 'תיק עבודות', href: '/portfolio' },
      { label: 'לקוחות', href: '/clients' },
      { label: 'צור קשר', href: '/contact' }
    ]
  },
  resources: {
    title: 'משאבים',
    links: [
      { label: 'בלוג', href: '/blog' },
      { label: 'מדריכים', href: '/guides' },
      { label: 'שאלות נפוצות', href: '/faq' },
      { label: 'תנאי שימוש', href: '/terms' }
    ]
  }
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub', color: 'hover:bg-brand-blue' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook', color: 'hover:bg-brand-blue' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram', color: 'hover:bg-brand-orange' }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="container relative z-10 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: bouncyEasing }}
                className="mb-6"
              >
                <Link href="/" className="inline-flex items-center gap-4">
                  <Image
                    src="/logo.png"
                    alt="לוגו ITAYOST"
                    width={80}
                    height={80}
                    className="w-16 h-16 lg:w-20 lg:h-20"
                  />
                  <div className="text-4xl lg:text-5xl font-bold text-white">
                    ITAYOST
                  </div>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 text-brand-gray-200 text-base lg:text-lg mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: bouncyEasing }}
              >
                <div className="w-10 h-10 bg-brand-green rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <span>ישראל</span>
              </motion.div>

              <p className="text-brand-gray-200 text-base lg:text-lg mb-8 max-w-sm leading-relaxed">
                מעצב ומפתח פתרונות דיגיטליים מתקדמים עם דגש על חדשנות, יצירתיות וחוויית משתמש מושלמת.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <motion.a
                  href="tel:0544994417"
                  className="flex items-center gap-3 text-brand-gray-200 hover:text-white transition-colors text-base lg:text-lg"
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <div className="w-10 h-10 bg-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <span>054-499-4417</span>
                </motion.a>

                <motion.a
                  href="mailto:itayost1@gmail.com"
                  className="flex items-center gap-3 text-brand-gray-200 hover:text-white transition-colors text-base lg:text-lg"
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <div className="w-10 h-10 bg-brand-orange rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <span>itayost1@gmail.com</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: bouncyEasing }}
            >
              <h3 className="font-semibold text-white mb-4 text-lg lg:text-xl">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <motion.div
                      whileHover={{ x: -3 }}
                      transition={{ duration: 0.2, ease: bouncyEasing }}
                    >
                      <Link
                        href={link.href}
                        className="text-brand-gray-200 hover:text-white transition-colors text-base lg:text-lg inline-block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: bouncyEasing }}
          className="border-t border-brand-gray-800 pt-12 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
                הישאר מעודכן
              </h3>
              <p className="text-brand-gray-200 text-base lg:text-lg">
                קבל עדכונים על פרויקטים חדשים וטיפים לפיתוח
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="כתובת אימייל"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 text-white placeholder:text-white/60 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
              />
              <motion.button
                type="submit"
                className="px-8 py-3 bg-brand-orange text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                הרשם
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: bouncyEasing }}
            className="text-brand-gray-200 flex items-center gap-2"
          >
            <span className="text-base lg:text-lg">© 2025 ITAYOST. כל הזכויות שמורות.</span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-red-500"
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: bouncyEasing }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ${social.color} transition-colors`}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.6 + index * 0.1,
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
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute bottom-8 end-8 w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: bouncyEasing }}
        whileHover={{
          y: -5,
          scale: 1.1,
          transition: { duration: 0.3, ease: bouncyEasing }
        }}
        whileTap={{
          scale: 0.9,
          transition: { duration: 0.2, ease: bouncyEasing }
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={22} />
      </motion.button>
    </footer>
  )
}
