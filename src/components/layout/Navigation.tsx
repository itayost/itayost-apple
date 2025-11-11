'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { servicesData } from '@/data/services'

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
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
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
              className="text-2xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent"
            >
              ITAYOST
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
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                        pathname === item.href || pathname.startsWith('/services/')
                          ? 'text-[#0071E3]'
                          : 'text-gray-700 hover:text-[#0071E3]'
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Dropdown Menu */}
                    {isServicesOpen && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <Link
                            href="/services"
                            className="block text-sm font-bold text-gray-900 hover:text-[#0071E3]"
                          >
                            כל השירותים
                          </Link>
                        </div>
                        {servicesData.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">{service.icon}</span>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{service.name}</div>
                                <div className="text-xs text-gray-600 line-clamp-1">{service.tagline}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-[#0071E3]'
                        : 'text-gray-700 hover:text-[#0071E3]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}

              <Link
                href="/contact"
                className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium text-sm transition-colors"
              >
                התחל פרויקט
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="תפריט"
            >
              <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-900 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 lg:hidden transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              ITAYOST
            </span>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="סגור תפריט"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
                          pathname.startsWith('/services')
                            ? 'bg-[#0071E3] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Mobile Services Submenu */}
                      {isMobileServicesOpen && (
                        <ul className="mt-2 mr-4 space-y-1">
                          <li>
                            <Link
                              href="/services"
                              onClick={toggleMenu}
                              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 font-semibold"
                            >
                              כל השירותים
                            </Link>
                          </li>
                          {servicesData.map((service) => (
                            <li key={service.id}>
                              <Link
                                href={`/services/${service.slug}`}
                                onClick={toggleMenu}
                                className={`block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 ${
                                  pathname === `/services/${service.slug}` ? 'bg-gray-100' : ''
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{service.icon}</span>
                                  <span>{service.name}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-[#0071E3] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="pt-6 mt-6 border-t">
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="block w-full py-3 bg-[#0071E3] text-white text-center rounded-xl font-medium"
            >
              התחל פרויקט
            </Link>
            
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <a href="tel:0544994417" className="block">054-499-4417</a>
              <a href="mailto:itayost1@gmail.com" className="block">itayost1@gmail.com</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
