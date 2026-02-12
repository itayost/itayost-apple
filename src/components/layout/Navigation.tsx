'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesData } from '@/data/services'
import { bouncyEasing } from '@/constants/animations'

const navItems = [
  { href: '/', label: 'בית' },
  { href: '/services', label: 'שירותים', hasDropdown: true },
  { href: '/blog', label: 'בלוג' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' }
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [navClass, setNavClass] = useState('nav-default')
  const pathname = usePathname()

  useEffect(() => {
    let scrollY = 0
    let ticking = false

    const updateNavbar = () => {
      scrollY = window.scrollY

      if (scrollY > 20) {
        setNavClass('nav-scrolled')
      } else {
        setNavClass('nav-default')
      }

      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar)
        ticking = true
      }
    }

    // Simple throttled scroll handler
    window.addEventListener('scroll', requestTick, { passive: true })

    return () => {
      window.removeEventListener('scroll', requestTick)
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      {/* Main Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 lg:h-20 z-50 transition-all duration-200 ${
          navClass === 'nav-scrolled'
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-brand-navy hover:text-brand-blue transition-colors"
            >
              <Image
                src="/logo.png"
                alt="לוגו ITAYOST"
                width={50}
                height={50}
                className="w-10 h-10 lg:w-12 lg:h-12"
                priority
              />
              <span>ITAYOST</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: bouncyEasing }}
                    >
                      <Link
                        href={item.href}
                        className={`text-base lg:text-lg font-medium transition-colors flex items-center gap-1 ${
                          pathname === item.href || pathname.startsWith('/services/')
                            ? 'text-brand-blue'
                            : 'text-brand-navy hover:text-brand-blue'
                        }`}
                      >
                        {item.label}
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: isServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: bouncyEasing }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </Link>
                    </motion.div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: bouncyEasing }}
                          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-gray-100">
                            <motion.div
                              whileHover={{ x: -3 }}
                              transition={{ duration: 0.2, ease: bouncyEasing }}
                            >
                              <Link
                                href="/services"
                                className="block text-base font-bold text-brand-navy hover:text-brand-blue transition-colors"
                              >
                                כל השירותים
                              </Link>
                            </motion.div>
                          </div>
                          {servicesData.map((service, index) => (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                                ease: bouncyEasing
                              }}
                            >
                              <Link
                                href={`/services/${service.slug}`}
                                className="block px-4 py-3 hover:bg-brand-blue/5 transition-colors rounded-2xl mx-2"
                              >
                                <motion.div
                                  className="flex items-start gap-3"
                                  whileHover={{ x: -3 }}
                                  transition={{ duration: 0.2, ease: bouncyEasing }}
                                >
                                  <span className="text-2xl flex-shrink-0">{service.icon}</span>
                                  <div>
                                    <div className="font-semibold text-gray-900 text-base">{service.name}</div>
                                    <div className="text-sm text-gray-600 line-clamp-1">{service.tagline}</div>
                                  </div>
                                </motion.div>
                              </Link>
                            </motion.div>
                          ))}

                          {/* Quick Quote CTA */}
                          <div className="px-4 py-3 mt-2 border-t border-gray-100">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.2, ease: bouncyEasing }}
                            >
                              <Link
                                href="/contact"
                                className="block w-full py-3 bg-brand-orange text-white text-center rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
                              >
                                קבלו הצעת מחיר מהירה
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={item.href}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: bouncyEasing }}
                  >
                    <Link
                      href={item.href}
                      className={`text-base lg:text-lg font-medium transition-colors ${
                        pathname === item.href
                          ? 'text-brand-blue'
                          : 'text-brand-navy hover:text-brand-blue'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              ))}

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
                  className="px-7 py-3 bg-brand-orange text-white rounded-full font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  התחל פרויקט
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="תפריט"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: bouncyEasing }}
            >
              <motion.span
                className="block w-6 h-0.5 bg-brand-navy"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 4 : 0
                }}
                transition={{ duration: 0.3, ease: bouncyEasing }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-brand-navy"
                animate={{
                  opacity: isMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-brand-navy"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -4 : 0
                }}
                transition={{ duration: 0.3, ease: bouncyEasing }}
              />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: bouncyEasing }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="לוגו ITAYOST"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="text-2xl font-bold text-brand-navy">
                    ITAYOST
                  </span>
                </div>
                <motion.button
                  onClick={toggleMenu}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="סגור תפריט"
                  whileHover={{
                    rotate: 90,
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: bouncyEasing }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: bouncyEasing
                      }}
                    >
                      {item.hasDropdown ? (
                        <div>
                          <motion.button
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium transition-colors ${
                              pathname.startsWith('/services')
                                ? 'bg-brand-blue text-white'
                                : 'hover:bg-brand-blue/5'
                            }`}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2, ease: bouncyEasing }}
                          >
                            <span>{item.label}</span>
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: bouncyEasing }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                          </motion.button>

                          {/* Mobile Services Submenu */}
                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: bouncyEasing }}
                                className="mt-2 mr-4 space-y-1 overflow-hidden"
                              >
                                <li>
                                  <Link
                                    href="/services"
                                    onClick={toggleMenu}
                                    className="block px-4 py-2 text-sm rounded-lg hover:bg-brand-blue/5 font-semibold transition-colors"
                                  >
                                    כל השירותים
                                  </Link>
                                </li>
                                {servicesData.map((service) => (
                                  <li key={service.id}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      onClick={toggleMenu}
                                      className={`block px-4 py-2 text-sm rounded-lg hover:bg-brand-blue/5 transition-colors ${
                                        pathname === `/services/${service.slug}` ? 'bg-brand-blue/5' : ''
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{service.icon}</span>
                                        <span>{service.name}</span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: bouncyEasing }}
                        >
                          <Link
                            href={item.href}
                            onClick={toggleMenu}
                            className={`block px-4 py-3 rounded-2xl font-medium transition-colors ${
                              pathname === item.href
                                ? 'bg-brand-blue text-white'
                                : 'hover:bg-brand-blue/5'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Menu Footer */}
              <motion.div
                className="pt-6 mt-6 border-t"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3, ease: bouncyEasing }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <Link
                    href="/contact"
                    onClick={toggleMenu}
                    className="block w-full py-4 bg-brand-orange text-white text-center rounded-2xl font-semibold text-lg shadow-lg"
                  >
                    התחל פרויקט
                  </Link>
                </motion.div>

                <div className="mt-6 space-y-2 text-base text-gray-700">
                  <motion.a
                    href="tel:0544994417"
                    className="block font-medium hover:text-brand-blue transition-colors"
                    whileHover={{ x: -3 }}
                    transition={{ duration: 0.2, ease: bouncyEasing }}
                  >
                    054-499-4417
                  </motion.a>
                  <motion.a
                    href="mailto:itayost1@gmail.com"
                    className="block font-medium hover:text-brand-blue transition-colors"
                    whileHover={{ x: -3 }}
                    transition={{ duration: 0.2, ease: bouncyEasing }}
                  >
                    itayost1@gmail.com
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
