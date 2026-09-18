'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { servicesData } from '@/data/services'
import { trackCtaClick, trackContactClick, trackPhoneClick } from '@/lib/analytics'
import { PHONE_TEL_HREF } from '@/lib/whatsapp'

const navItems = [
  { href: '/', label: 'בית' },
  { href: '/services', label: 'שירותים', hasDropdown: true },
  { href: '/blog', label: 'בלוג' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' }
]

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const CTA_LABEL = 'התחל פרויקט'

/** A ballpoint loop drawn around the current page, like circling an item on the pad. */
function PenCircle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 44"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] text-pad-red"
      fill="none"
    >
      <path
        d="M8 26C9 10 44 4 72 5c28 1 44 9 42 20-2 12-38 16-64 15C24 39 5 33 9 20c2-6 10-10 20-12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const isActive = (pathname: string, href: string) =>
  href === '/services' ? pathname === href || pathname.startsWith('/services/') : pathname === href

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const servicesToggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const update = () => {
      setIsScrolled(window.scrollY > 20)
      ticking = false
    }
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    window.addEventListener('scroll', requestTick, { passive: true })
    return () => window.removeEventListener('scroll', requestTick)
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

  // Close menu on Escape key
  useEffect(() => {
    if (!isMenuOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      <header
        className={`pad-world fixed inset-x-0 top-0 z-50 h-16 bg-pad-sheet transition-shadow duration-300 lg:h-20 ${
          isScrolled ? 'shadow-[0_10px_24px_-14px_rgba(10,20,80,0.45)]' : ''
        }`}
      >
        {/* Printed double rule along the bottom of the form header */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[5px] border-y border-pad-red" />

        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex min-h-11 items-center gap-3 text-pad-ink">
            <Image src="/logo.png" alt="לוגו ITAYOST" width={50} height={50} className="h-9 w-9 lg:h-11 lg:w-11" priority />
            <span className="font-pad-display text-3xl font-bold leading-none lg:text-4xl">ITAYOST</span>
          </Link>

          <nav aria-label="ניווט ראשי" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative flex items-center gap-1"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsServicesOpen(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape' && isServicesOpen) {
                      setIsServicesOpen(false)
                      servicesToggleRef.current?.focus()
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className="relative text-lg font-semibold text-pad-ink transition-colors hover:text-pad-carbon"
                  >
                    {isActive(pathname, item.href) && <PenCircle />}
                    {item.label}
                  </Link>
                  <button
                    ref={servicesToggleRef}
                    type="button"
                    aria-expanded={isServicesOpen}
                    aria-controls="services-menu"
                    aria-label="פתיחת רשימת השירותים"
                    onClick={() => setIsServicesOpen((open) => !open)}
                    className="flex h-8 w-8 items-center justify-center text-pad-ink transition-colors hover:text-pad-carbon"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        id="services-menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                        className="absolute end-0 top-full w-80 pt-4"
                      >
                        <div className="pad-paper pad-sheet-shadow border-t-4 border-pad-carbon">
                          <Link
                            href="/services"
                            className="block border-b-2 border-pad-ink px-5 py-3 font-pad-display text-2xl font-bold text-pad-ink hover:text-pad-carbon"
                          >
                            כל השירותים
                          </Link>
                          <ul>
                            {servicesData.map((service) => (
                              <li key={service.id}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="block border-b border-pad-rule px-5 py-3 transition-colors hover:bg-pad-yellow/40"
                                >
                                  <span className="block text-base font-bold text-pad-ink">{service.name}</span>
                                  <span className="line-clamp-1 block text-sm text-pad-ink-soft">{service.tagline}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="p-4">
                            <Link
                              href="/contact"
                              className="block bg-pad-yellow px-4 py-3 text-center font-bold text-pad-ink transition-colors hover:bg-pad-ink hover:text-pad-yellow"
                              onClick={() => trackCtaClick('קבלו הצעת מחיר מהירה', 'nav_dropdown', '/contact')}
                            >
                              קבלו הצעת מחיר מהירה
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="relative text-lg font-semibold text-pad-ink transition-colors hover:text-pad-carbon"
                >
                  {isActive(pathname, item.href) && <PenCircle />}
                  {item.label}
                </Link>
              )
            )}

            <Link
              href="/contact"
              className="bg-pad-carbon px-6 py-2.5 text-lg font-bold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:-rotate-1 hover:bg-pad-carbon-deep motion-reduce:transition-none"
              onClick={() => trackCtaClick(CTA_LABEL, 'nav', '/contact')}
            >
              {CTA_LABEL}
            </Link>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="flex h-12 w-12 items-center justify-center text-pad-ink lg:hidden"
            aria-label="תפריט"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-pad-carbon/60 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="pad-world pad-paper fixed inset-x-0 top-0 z-50 max-h-[100svh] overflow-y-auto border-b-4 border-pad-carbon lg:hidden"
            aria-label="תפריט נייד"
          >
            <div className="flex flex-col px-5 pb-8 pt-3">
              <div className="flex items-center justify-between border-b-[3px] border-double border-pad-red pb-3">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="לוגו ITAYOST" width={40} height={40} className="h-9 w-9" />
                  <span className="font-pad-display text-3xl font-bold text-pad-ink">ITAYOST</span>
                </div>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="flex h-12 w-12 items-center justify-center text-pad-ink"
                  aria-label="סגור תפריט"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              <nav aria-label="ניווט ראשי נייד">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.href} className="border-b border-pad-rule">
                      {item.hasDropdown ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                            aria-expanded={isMobileServicesOpen}
                            className="flex w-full items-center justify-between py-4 font-pad-display text-4xl font-bold text-pad-ink"
                          >
                            <span className={isActive(pathname, item.href) ? 'text-pad-carbon' : ''}>{item.label}</span>
                            <ChevronDown
                              aria-hidden="true"
                              className={`h-6 w-6 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                                className="overflow-hidden pb-3 ps-4"
                              >
                                <li>
                                  <Link href="/services" onClick={toggleMenu} className="block py-2 text-lg font-bold text-pad-ink">
                                    כל השירותים
                                  </Link>
                                </li>
                                {servicesData.map((service) => (
                                  <li key={service.id}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      onClick={toggleMenu}
                                      className={`block py-2 text-lg ${
                                        pathname === `/services/${service.slug}` ? 'font-bold text-pad-carbon' : 'text-pad-ink'
                                      }`}
                                    >
                                      {service.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={toggleMenu}
                          aria-current={pathname === item.href ? 'page' : undefined}
                          className={`block py-4 font-pad-display text-4xl font-bold ${
                            pathname === item.href ? 'text-pad-carbon' : 'text-pad-ink'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <Link
                href="/contact"
                onClick={() => {
                  trackCtaClick(CTA_LABEL, 'mobile_nav', '/contact')
                  toggleMenu()
                }}
                className="mt-8 block bg-pad-carbon py-4 text-center text-xl font-bold text-white"
              >
                {CTA_LABEL}
              </Link>

              <div className="mt-6 flex flex-col gap-2 text-lg text-pad-ink">
                <a
                  href={PHONE_TEL_HREF}
                  dir="ltr"
                  className="self-start font-bold"
                  onClick={() => {
                    trackContactClick('phone', 'nav')
                    trackPhoneClick(window.location.pathname, 'nav')
                  }}
                >
                  054-499-4417
                </a>
                <a
                  href="mailto:itay@itayost.com"
                  className="self-start font-bold"
                  onClick={() => trackContactClick('email', 'nav')}
                >
                  itay@itayost.com
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
