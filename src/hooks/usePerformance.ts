import { useEffect, useState } from 'react'

/**
 * Hook to detect device performance capabilities and network speed
 * Returns a performance level: 'low', 'medium', or 'high'
 */
export const usePerformanceMode = () => {
  const [performanceMode, setPerformanceMode] = useState<'low' | 'medium' | 'high'>('high')

  useEffect(() => {
    const checkPerformance = () => {
      // Check device capabilities
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as any).deviceMemory
      const connection = (navigator as any).connection
      
      // Check connection speed
      if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g' || connection?.saveData) {
        setPerformanceMode('low')
        return
      }
      
      // Check device memory (in GB)
      if (memory && memory < 4) {
        setPerformanceMode('medium')
        return
      }
      
      // Check CPU cores
      if (cores <= 2) {
        setPerformanceMode('low')
      } else if (cores <= 4) {
        setPerformanceMode('medium')
      }
      
      // Check if mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && performanceMode === 'high') {
        setPerformanceMode('medium')
      }
    }

    checkPerformance()
    
    // Listen for connection changes
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', checkPerformance)
      return () => connection.removeEventListener('change', checkPerformance)
    }
  }, [])

  return performanceMode
}

/**
 * Hook to throttle scroll events for better performance
 */
export const useThrottledScroll = (callback: () => void, delay = 16) => {
  useEffect(() => {
    let lastRun = 0
    let timeoutId: NodeJS.Timeout

    const throttledCallback = () => {
      const now = Date.now()
      
      if (now - lastRun >= delay) {
        callback()
        lastRun = now
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          callback()
          lastRun = Date.now()
        }, delay - (now - lastRun))
      }
    }

    window.addEventListener('scroll', throttledCallback, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledCallback)
      clearTimeout(timeoutId)
    }
  }, [callback, delay])
}

/**
 * Hook to use Intersection Observer for lazy loading
 */
export const useIntersectionObserver = (
  threshold = 0.1,
  rootMargin = '50px'
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin])

  return { ref: setRef, isIntersecting }
}

/**
 * Hook to measure and report performance metrics
 */
export const usePerformanceMetrics = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime)
          // You can send this to analytics here
        }
      }
    })
    
    try {
      observer.observe({ entryTypes: ['paint'] })
    } catch (e) {
      // Browser doesn't support this observer
    }

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
      // Send to analytics
    })

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      // Browser doesn't support this observer
    }

    // Measure Time to Interactive
    if ('PerformanceLongTaskTiming' in window) {
      const ttiObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Long Task:', entry)
        }
      })
      
      try {
        ttiObserver.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        // Browser doesn't support this observer
      }
    }

    return () => {
      observer.disconnect()
      lcpObserver.disconnect()
    }
  }, [])
}

export default usePerformanceMode
