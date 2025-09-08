'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { content } from '@/config/content'
import { socialLinks } from '@/config/socialLinks'

const footerLinks = {
  services: [
    { label: content.footer.links.services.websites, href: '/services#web' },
    { label: content.footer.links.services.ecommerce, href: '/services#ecommerce' },
    { label: content.footer.links.services.apps, href: '/services#apps' },
    { label: content.footer.links.services.crm, href: '/services#crm' },
    { label: content.footer.links.services.maintenance, href: '/services#maintenance' },
  ],
  quickLinks: [
    { label: content.footer.links.quickLinks.about, href: '/about' },
    { label: content.footer.links.quickLinks.portfolio, href: '/portfolio' },
    { label: content.footer.links.quickLinks.contact, href: '/contact' },
    { label: content.footer.links.quickLinks.privacy, href: '#' },
  ],
  social: [
    { label: 'LinkedIn', href: socialLinks.linkedin, icon: 'in' },
    { label: 'Instagram', href: socialLinks.instagram, icon: 'ig' },
    { label: 'Facebook', href: socialLinks.facebook, icon: 'fb' },
    { label: 'WhatsApp', href: socialLinks.whatsapp, icon: 'wa' },
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
              {content.footer.cta.title}{' '}
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
                {content.footer.cta.highlight}
              </span>
            </h2>
            <p className="text-[#86868B] text-lg mb-8 max-w-2xl mx-auto">
              {content.footer.cta.subtitle}
            </p>
            <motion.div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-3 bg-white text-[#1D1D1F] rounded-full font-medium hover:bg-[#F5F5F7] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.footer.cta.startProject}
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  className="px-8 py-3 bg-transparent text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.footer.cta.viewPortfolio}
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
                  {content.brand.name}
                </h3>
              </Link>
              <p className="text-[#86868B] mb-6 max-w-xs">
                {content.footer.tagline}
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
              <h4 className="font-medium mb-4">{content.footer.sections.services}</h4>
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

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4">{content.footer.sections.quickLinks}</h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link) => (
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

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4">{content.footer.sections.contact}</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li>
                  <a href={socialLinks.phone} className="hover:text-white transition-colors">
                    {content.contact.details.phone}
                  </a>
                </li>
                <li>
                  <a href={socialLinks.email} className="hover:text-white transition-colors">
                    {content.contact.details.email}
                  </a>
                </li>
                <li>{content.contact.details.address}</li>
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
              {content.footer.copyright.replace('{year}', currentYear.toString())}
            </p>
            <p className="text-[#86868B] text-sm">
              {content.footer.developer}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}