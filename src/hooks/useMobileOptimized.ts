'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePerformance } from '@/contexts/PerformanceContext'

// Throttle function for performance
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Optimized scroll hook with mobile detection
export const useMobileOptimizedScroll = () => {
  const { isMobile, isLowPerformance } = usePerformance()
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    
    // Only update if significant change (reduces repaints)
    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      setScrollY(currentScrollY)
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentScrollY
    }
    
    ticking.current = false
  }, [])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScroll)
      ticking.current = true
    }
  }, [updateScroll])

  useEffect(() => {
    // Use throttled scroll on mobile for better performance
    const scrollHandler = isMobile || isLowPerformance
      ? throttle(handleScroll, 100)
      : handleScroll

    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [handleScroll, isMobile, isLowPerformance])

  return {
    scrollY,
    scrollDirection,
    isScrolling: ticking.current
  }
}

// Lightweight intersection observer for reveal animations
interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useMobileOptimizedInView = (options: UseInViewOptions = {}) => {
  const { isMobile } = usePerformance()
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const {
    threshold = isMobile ? 0.05 : 0.1, // Lower threshold on mobile
    rootMargin = isMobile ? '50px' : '100px', // Smaller margin on mobile
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip if already animated and triggerOnce is true
    if (triggerOnce && hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        
        if (inView && !hasAnimated) {
          setHasAnimated(true)
          
          // Disconnect observer after animation on mobile for performance
          if (isMobile && triggerOnce) {
            observer.disconnect()
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, hasAnimated, triggerOnce, isMobile])

  return {
    ref,
    isInView: triggerOnce ? hasAnimated : isInView,
    hasAnimated
  }
}

// Simplified parallax for desktop only
export const useDesktopParallax = (speed = 0.5) => {
  const { isMobile, isLowPerformance } = usePerformance()
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Skip parallax on mobile and low-performance devices
    if (isMobile || isLowPerformance) {
      setOffset(0)
      return
    }

    const handleScroll = throttle(() => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const windowCenter = window.innerHeight / 2
      const distance = elementCenter - windowCenter
      
      // Use transform3d for GPU acceleration
      setOffset(distance * speed * 0.1)
    }, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, isMobile, isLowPerformance])

  return { ref: elementRef, offset }
}

// Disable hover effects on touch devices
export const useTouchOptimizedHover = () => {
  const { isTouchDevice } = usePerformance()
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || isTouchDevice) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice])

  return {
    ref,
    isHovered: isTouchDevice ? false : isHovered
  }
}

// Optimized counter animation
export const useMobileOptimizedCounter = (
  endValue: number,
  duration: number = 2000,
  startTrigger: boolean = false
) => {
  const { isMobile } = usePerformance()
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number>()

  useEffect(() => {
    if (!startTrigger) return

    // Instant count on mobile, animated on desktop
    if (isMobile) {
      setCount(endValue)
      return
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp
      }

      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * endValue)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      }
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [endValue, duration, startTrigger, isMobile])

  return count
}

export default useMobileOptimizedScroll
