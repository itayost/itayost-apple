// src/components/layout/Navigation.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  User, 
  Phone,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';

// Mobile-first navigation configuration
const navigationItems = [
  { 
    href: '/', 
    label: 'בית', 
    icon: Home,
    mobileOnly: false 
  },
  { 
    href: '/services', 
    label: 'שירותים', 
    icon: Briefcase,
    mobileOnly: false 
  },
  { 
    href: '/portfolio', 
    label: 'תיק עבודות', 
    icon: FolderOpen,
    mobileOnly: false 
  },
  { 
    href: '/about', 
    label: 'אודות', 
    icon: User,
    mobileOnly: false 
  },
  { 
    href: '/contact', 
    label: 'צור קשר', 
    icon: Phone,
    mobileOnly: false 
  },
];

// Mobile bottom navigation items (most important actions)
const bottomNavItems = navigationItems.slice(0, 4);

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navHidden, setNavHidden] = useState(false);

  // Handle scroll behavior for mobile
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show/hide based on scroll direction (mobile)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
    
    // Add background on scroll
    setIsScrolled(currentScrollY > 10);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <nav 
        className={`
          lg:hidden fixed top-0 left-0 right-0 z-[1000]
          transition-transform duration-300 ease-in-out
          ${navHidden ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div 
          className={`
            h-[60px] px-4 flex items-center justify-between
            transition-all duration-300
            ${isScrolled 
              ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
              : 'bg-transparent'
            }
          `}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent">
              ITAYOST
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="relative w-12 h-12 flex items-center justify-center -mr-3 touch-manipulation"
            aria-label="תפריט"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span 
                className={`
                  block h-0.5 w-full bg-gray-700 rounded-full
                  transition-all duration-300 ease-out origin-right
                  ${isMobileMenuOpen ? 'rotate-[-45deg] translate-x-[1px] translate-y-[2px]' : ''}
                `}
              />
              <span 
                className={`
                  block h-0.5 w-full bg-gray-700 rounded-full
                  transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}
                `}
              />
              <span 
                className={`
                  block h-0.5 w-full bg-gray-700 rounded-full
                  transition-all duration-300 ease-out origin-right
                  ${isMobileMenuOpen ? 'rotate-[45deg] translate-x-[1px] translate-y-[-2px]' : ''}
                `}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-[1100]"
              onClick={toggleMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[1200] shadow-2xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-lg font-semibold">תפריט</span>
                <button
                  onClick={toggleMobileMenu}
                  className="w-12 h-12 flex items-center justify-center -mr-3"
                  aria-label="סגור תפריט"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="py-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-4 px-6 py-4
                        transition-colors duration-200
                        ${isActive 
                          ? 'bg-blue-50 text-[#0071E3] border-r-4 border-[#0071E3]' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-base font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Menu Footer with CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 safe-bottom">
                <Link
                  href="/contact"
                  className="
                    block w-full py-3 px-6 
                    bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] 
                    text-white text-center font-medium 
                    rounded-full shadow-lg
                    active:scale-95 transition-transform
                  "
                >
                  בואו נתחיל
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav 
        className={`
          lg:hidden fixed bottom-0 left-0 right-0 z-[900]
          bg-white border-t border-gray-100
          transition-transform duration-300 ease-in-out
          ${navHidden ? 'translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="flex items-center justify-around h-[60px] safe-bottom">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center
                  w-full h-full gap-1
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-[#0071E3]' 
                    : 'text-gray-500 active:text-gray-700'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation (Progressive Enhancement) */}
      <nav 
        className={`
          hidden lg:flex fixed top-0 left-0 right-0 z-[1000]
          h-[72px] px-8
          transition-all duration-300
          ${isScrolled 
            ? 'bg-white/72 backdrop-blur-xl shadow-sm' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              ITAYOST
            </span>
          </Link>

          {/* Desktop Menu Items */}
          <div className="flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative py-2 text-sm font-medium
                    transition-colors duration-200
                    ${isActive 
                      ? 'text-[#0071E3]' 
                      : 'text-gray-700 hover:text-[#0071E3]'
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#0071E3]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Desktop CTA Button */}
            <Link
              href="/contact"
              className="
                px-6 py-2.5 
                bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] 
                text-white text-sm font-medium 
                rounded-full shadow-lg
                hover:shadow-xl hover:scale-105 
                transition-all duration-300
              "
            >
              צור קשר
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-[60px] lg:h-[72px]" />
    </>
  );
}