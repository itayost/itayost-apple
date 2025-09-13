'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

// Detect if device is mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || 'ontouchstart' in window
}

// Custom hook for Apple-style scroll effects with mobile optimization
export const useAppleScrollEffects = (threshold = 0.1) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()
  const mobile = isMobile()

  const handleScroll = useCallback(() => {
    // Skip complex calculations on mobile
    if (mobile) {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
      return
    }

    const currentScrollY = window.scrollY
    
    // Update scroll position
    setScrollY(currentScrollY)
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down')
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up')
    }
    
    lastScrollY.current = currentScrollY
    
    // Set scrolling state
    setIsScrolling(true)
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }
    
    // Set new timeout to detect scroll end
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }, [mobile])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [handleScroll])

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    scrollProgress: scrollY / (document.documentElement.scrollHeight - window.innerHeight)
  }
}

// Hook for parallax effects - disabled on mobile
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)
  const mobile = isMobile()

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (mobile) return

    const handleScroll = () => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset based on element position
      const scrollPercentage = (windowHeight - elementTop) / (windowHeight + elementHeight)
      const parallaxOffset = scrollPercentage * speed * 100
      
      setOffset(parallaxOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, mobile])

  return { ref: elementRef, offset: mobile ? 0 : offset }
}

// Hook for reveal animations with mobile optimization
interface RevealAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useRevealAnimation = (options: RevealAnimationOptions = {}) => {
  const mobile = isMobile()
  // Adjust threshold for mobile
  const { 
    threshold = mobile ? 0.05 : 0.15, 
    rootMargin = mobile ? '50px' : '0px', 
    triggerOnce = true 
  } = options
  
  const [ref, inView, entry] = useInView({
    threshold,
    rootMargin,
    triggerOnce
  })

  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return {
    ref,
    inView: triggerOnce ? hasAnimated : inView,
    entry
  }
}

// Hook for sticky elements with progress - simplified for mobile
export const useStickyProgress = () => {
  const [progress, setProgress] = useState(0)
  const elementRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const mobile = isMobile()

  useEffect(() => {
    // Simplified calculation for mobile
    if (mobile) return

    const handleScroll = () => {
      if (!elementRef.current || !containerRef.current) return
      
      const container = containerRef.current
      const element = elementRef.current
      
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const elementHeight = elementRect.height
      
      // Calculate progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, 
        -containerTop / (containerHeight - elementHeight - window.innerHeight)
      ))
      
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobile])

  return {
    elementRef,
    containerRef,
    progress: mobile ? 0 : progress
  }
}

// Hook for smooth counter animations - simplified for mobile
export const useCountAnimation = (
  endValue: number,
  duration: number = 2000,
  startTrigger: boolean = false
) => {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number>()
  const mobile = isMobile()

  useEffect(() => {
    if (!startTrigger) return

    // Instant count on mobile
    if (mobile) {
      setCount(endValue)
      return
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp
      }

      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      
      // Easing function for smooth animation
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
  }, [endValue, duration, startTrigger, mobile])

  return count
}

// Hook for horizontal scroll
export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    const currentScroll = scrollRef.current.scrollLeft
    
    scrollRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    element.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()

    return () => element.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollTo
  }
}

// Hook for mouse parallax - disabled on mobile
export const useMouseParallax = (intensity = 1) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLElement>(null)
  const mobile = isMobile()

  useEffect(() => {
    // Disable on mobile
    if (mobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      
      setOffset({
        x: deltaX * intensity * 20,
        y: deltaY * intensity * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity, mobile])

  return { ref: elementRef, offset: mobile ? { x: 0, y: 0 } : offset }
}

// Hook for text splitting animation - simplified for mobile
export const useTextSplitAnimation = (text: string, delay: number = 50) => {
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const mobile = isMobile()

  useEffect(() => {
    const words = text.split(' ')
    
    // Show all text immediately on mobile
    if (mobile) {
      setDisplayedText(words)
      setIsComplete(true)
      return
    }

    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => [...prev, words[currentIndex]])
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, mobile])

  return { displayedText, isComplete }
}

export default useAppleScrollEffects
