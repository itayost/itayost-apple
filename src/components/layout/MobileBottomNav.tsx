'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Briefcase,
  Wrench,
  User,
  MessageCircle,
  Code2,
  Menu
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
  icon: any // Using any for Lucide icons to avoid type conflicts
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'בית',
    href: '/',
    icon: Home,
  },
  {
    id: 'portfolio',
    label: 'עבודות',
    href: '/portfolio',
    icon: Briefcase,
  },
  {
    id: 'services',
    label: 'שירותים',
    href: '/services',
    icon: Wrench,
  },
  {
    id: 'about',
    label: 'אודות',
    href: '/about',
    icon: User,
  },
  {
    id: 'contact',
    label: 'צור קשר',
    href: '/contact',
    icon: MessageCircle,
    badge: 1, // For new messages indicator
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [selectedTab, setSelectedTab] = useState(pathname)

  // Hide/show on scroll for better UX
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      }
      // Hide when scrolling down (only after scrolling 50px)
      else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Haptic feedback for mobile devices (if supported)
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200/50"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex items-center justify-around h-16 px-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      triggerHaptic()
                      setSelectedTab(item.href)
                    }}
                    className="relative flex flex-col items-center justify-center flex-1 h-full group"
                  >
                    {/* Active indicator background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 mx-2"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      >
                        <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl" />
                      </motion.div>
                    )}

                    {/* Icon container */}
                    <div className="relative">
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                      >
                        <Icon
                          size={24}
                          className={`
                            transition-all duration-200
                            ${isActive
                              ? 'text-blue-600'
                              : 'text-gray-500 group-active:text-blue-600'
                            }
                          `}
                        />

                        {/* Badge indicator */}
                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.div>

                      {/* Label */}
                      <span
                        className={`
                          text-xs mt-1 block transition-all duration-200
                          ${isActive
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-500 group-active:text-blue-600'
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Quick Action Button - Floating */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => triggerHaptic()}
        className="fixed bottom-20 right-4 z-40 lg:hidden w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{
          marginBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <Code2 size={24} />
      </motion.button>

      {/* Swipe Indicator for First Time Users */}
      <AnimatePresence>
        {pathname === '/' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 lg:hidden"
          >
            <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap">
              החלק למעלה לעוד תוכן ↑
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}