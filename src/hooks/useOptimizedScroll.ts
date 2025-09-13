'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Simplified scroll hook for better performance
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY
    
    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      setScrollDirection(direction)
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
    }
    
    ticking.current = false
  }, [])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollDirection)
      ticking.current = true
    }
  }, [updateScrollDirection])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { scrollDirection, scrollY }
}

// Debounced scroll hook for non-critical updates
export const useDebouncedScroll = (delay = 100) => {
  const [scrollY, setScrollY] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setScrollY(window.scrollY)
      }, delay)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return scrollY
}

// Intersection observer hook for reveal animations
export const useInView = (options = {}) => {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        
        if (inView && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, hasAnimated])

  return {
    ref,
    isInView,
    hasAnimated
  }
}

// Simplified parallax hook
export const useSimpleParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)
  const ticking = useRef(false)

  const updateParallax = useCallback(() => {
    if (!elementRef.current) return
    
    const rect = elementRef.current.getBoundingClientRect()
    const elementCenter = rect.top + rect.height / 2
    const windowCenter = window.innerHeight / 2
    const distance = elementCenter - windowCenter
    
    setOffset(distance * speed * 0.1)
    ticking.current = false
  }, [speed])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateParallax)
      ticking.current = true
    }
  }, [updateParallax])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { ref: elementRef, offset }
}

export default useScrollDirection
