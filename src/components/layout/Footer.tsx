'use client'

import Link from 'next/link'
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
  { icon: Github, href: 'https://github.com/itayost', label: 'GitHub' },
  { icon: Facebook, href: 'https://www.facebook.com/itayost', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/itayost', label: 'Instagram' }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-apple-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      
      <div className="container relative z-10 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                  ITAYOST
                </div>
              </Link>
              
              <p className="text-apple-gray-400 mb-6 max-w-sm leading-relaxed">
                מעצב ומפתח פתרונות דיגיטליים מתקדמים עם דגש על חדשנות, יצירתיות וחוויית משתמש מושלמת.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="tel:0544994417"
                  className="flex items-center gap-3 text-apple-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  <span>054-499-4417</span>
                </a>
                
                <a
                  href="mailto:itayost1@gmail.com"
                  className="flex items-center gap-3 text-apple-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={18} />
                  <span>itayost1@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-apple-gray-400">
                  <MapPin size={18} />
                  <span>ישראל</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">
                {section.title}
              </h3>
              
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-apple-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-apple-gray-800 pt-12 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                הישאר מעודכן
              </h3>
              <p className="text-apple-gray-400">
                קבל עדכונים על פרויקטים חדשים וטיפים לפיתוח
              </p>
            </div>
            
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="כתובת אימייל"
                className="flex-1 px-4 py-3 bg-apple-gray-800 rounded-xl border border-apple-gray-700 focus:border-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-apple-blue to-apple-blue-dark rounded-xl font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                הרשם
              </motion.button>
            </form>
          </div>
        </motion.div>
        
        {/* Bottom Bar */}
        <div className="border-t border-apple-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-apple-gray-400 text-sm flex items-center gap-1"
          >
            <span>© 2025 ITAYOST. כל הזכויות שמורות.</span>
            <span className="text-red-500">
              <Heart size={14} className="inline" />
            </span>
          </motion.div>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-apple-gray-800 rounded-full flex items-center justify-center hover:bg-apple-gray-700 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute bottom-8 left-8 w-12 h-12 bg-apple-blue rounded-full flex items-center justify-center shadow-lg hover:bg-apple-blue-dark transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
