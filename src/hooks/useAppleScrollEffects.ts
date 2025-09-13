'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

// Custom hook for Apple-style scroll effects
export const useAppleScrollEffects = (threshold = 0.1) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const handleScroll = useCallback(() => {
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
  }, [])

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

// Hook for parallax effects
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
  }, [speed])

  return { ref: elementRef, offset }
}

// Hook for reveal animations
export const useRevealAnimation = (options = {}) => {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options
  
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

// Hook for sticky elements with progress
export const useStickyProgress = () => {
  const [progress, setProgress] = useState(0)
  const elementRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
  }, [])

  return {
    elementRef,
    containerRef,
    progress
  }
}

// Hook for smooth counter animations
export const useCountAnimation = (
  endValue: number,
  duration: number = 2000,
  startTrigger: boolean = false
) => {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number>()

  useEffect(() => {
    if (!startTrigger) return

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
  }, [endValue, duration, startTrigger])

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

// Hook for mouse parallax
export const useMouseParallax = (intensity = 1) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
  }, [intensity])

  return { ref: elementRef, offset }
}

// Hook for text splitting animation
export const useTextSplitAnimation = (text: string, delay: number = 50) => {
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const words = text.split(' ')
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
  }, [text, delay])

  return { displayedText, isComplete }
}

export default useAppleScrollEffects
