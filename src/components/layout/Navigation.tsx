'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronLeft } from 'lucide-react'
import { useAppleScrollEffects } from '@/hooks/useAppleScrollEffects'

const navItems = [
  { href: '/', label: 'בית' },
  { href: '/services', label: 'שירותים' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' }
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY, scrollDirection } = useAppleScrollEffects()

  useEffect(() => {
    setIsScrolled(scrollY > 20)
  }, [scrollY])

  useEffect(() => {
    // Close menu on route change
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-white/60 backdrop-blur-md'
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: scrollDirection === 'down' && scrollY > 100 ? -100 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ITAYOST
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-apple-blue'
                        : 'text-apple-gray-700 hover:text-apple-blue'
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-apple-blue"
                      layoutId="nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-apple-gray-300 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: pathname !== item.href ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="px-6 py-2 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  התחל פרויקט
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-apple-gray-900" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-apple-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    className="text-2xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent"
                  >
                    ITAYOST
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-apple-gray-100"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                {/* Menu Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          pathname === item.href
                            ? 'bg-apple-blue text-white'
                            : 'hover:bg-apple-gray-100'
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronLeft size={20} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-4 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white text-center rounded-xl font-medium shadow-lg"
                  >
                    התחל פרויקט
                  </Link>
                </motion.div>
                
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-8 border-t border-apple-gray-200"
                >
                  <div className="space-y-3 text-sm text-apple-gray-600">
                    <a href="tel:0544994417" className="block hover:text-apple-blue transition-colors">
                      054-499-4417
                    </a>
                    <a href="mailto:itayost1@gmail.com" className="block hover:text-apple-blue transition-colors">
                      itayost1@gmail.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
