'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
  services: [
    { label: 'Web Development', href: '#' },
    { label: 'Mobile Apps', href: '#' },
    { label: 'UI/UX Design', href: '#' },
    { label: 'Consulting', href: '#' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com', icon: 'gh' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'tw' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'ig' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1D1D1F] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold mb-6">
              Ready to start your{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                next project?
              </span>
            </h2>
            <p className="text-[#86868B] text-lg mb-8 max-w-2xl mx-auto">
              Let's work together to create something amazing. Get in touch today.
            </p>
            <motion.div className="flex gap-4 justify-center flex-wrap">
              <Link href="#contact">
                <motion.button
                  className="px-8 py-3 bg-white text-[#1D1D1F] rounded-full font-medium hover:bg-[#F5F5F7] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  className="px-8 py-3 bg-transparent text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent mb-4">
                  ITAYOST
                </h3>
              </Link>
              <p className="text-[#86868B] mb-6 max-w-xs">
                Building exceptional digital experiences with cutting-edge technology and beautiful design.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {footerLinks.social.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <span className="text-sm font-medium">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-[#86868B] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-[#86868B] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-[#86868B] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#86868B] text-sm">
              © {currentYear} ITAYOST. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-[#86868B] hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-[#86868B] hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-[#86868B] hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
