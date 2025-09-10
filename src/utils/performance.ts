// src/utils/performance.ts
'use client'

/**
 * Performance utilities for mobile optimization
 * Provides device detection, performance monitoring, and animation control
 */

// Device detection utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export const isTablet = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

export const isDesktop = () => {
  if (typeof window === 'undefined') return true
  return window.innerWidth > 1024
}

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Performance detection
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true
  }
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true
  }
  
  // Check device memory (if available)
  if ('deviceMemory' in navigator && (navigator as any).deviceMemory <= 4) {
    return true
  }
  
  // Check connection speed
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
      return true
    }
  }
  
  return false
}

// Animation settings based on device capabilities
export const getAnimationSettings = () => {
  const mobile = isMobile()
  const lowEnd = isLowEndDevice()
  
  if (lowEnd || mobile) {
    return {
      duration: 0.3,
      stagger: 0.05,
      blur: false,
      parallax: false,
      scale: false,
      complexity: 'simple'
    }
  }
  
  if (isTablet()) {
    return {
      duration: 0.5,
      stagger: 0.08,
      blur: true,
      parallax: true,
      scale: true,
      complexity: 'medium'
    }
  }
  
  return {
    duration: 0.8,
    stagger: 0.1,
    blur: true,
    parallax: true,
    scale: true,
    complexity: 'full'
  }
}

// Debounce utility for scroll and resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for high-frequency events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// RAF throttle for smooth animations
export const rafThrottle = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null
  
  return (...args: Parameters<T>) => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => func(...args))
  }
}

// Lazy load images with intersection observer
export const lazyLoadImage = (
  element: HTMLImageElement,
  src: string,
  placeholder?: string
) => {
  if (placeholder) {
    element.src = placeholder
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.src = src
          element.classList.add('loaded')
          observer.unobserve(element)
        }
      })
    },
    {
      rootMargin: '50px',
      threshold: 0.01
    }
  )
  
  observer.observe(element)
  
  return () => observer.unobserve(element)
}

// Prefetch critical resources
export const prefetchResources = (urls: string[]) => {
  if (typeof window === 'undefined') return
  
  urls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// Enable GPU acceleration for element
export const enableGPUAcceleration = (element: HTMLElement) => {
  element.style.transform = 'translateZ(0)'
  element.style.willChange = 'transform'
  element.style.backfaceVisibility = 'hidden'
  element.style.perspective = '1000px'
}

// Disable animations for low-end devices
export const conditionalAnimation = (
  animationConfig: any,
  fallbackConfig: any = {}
) => {
  return isLowEndDevice() ? fallbackConfig : animationConfig
}

// Performance monitor hook
export const usePerformanceMonitor = () => {
  if (typeof window === 'undefined') return null
  
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime)
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.startTime)
      }
    })
  })
  
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
  } catch (e) {
    // Browser doesn't support these metrics
  }
  
  return observer
}

// Virtual scroll for large lists
export class VirtualScroll {
  private container: HTMLElement
  private items: any[]
  private itemHeight: number
  private visibleItems: number
  private scrollTop: number = 0
  private startIndex: number = 0
  private endIndex: number = 0
  
  constructor(
    container: HTMLElement,
    items: any[],
    itemHeight: number,
    visibleItems: number
  ) {
    this.container = container
    this.items = items
    this.itemHeight = itemHeight
    this.visibleItems = visibleItems
    this.endIndex = Math.min(visibleItems, items.length)
    
    this.bindEvents()
  }
  
  private bindEvents() {
    this.container.addEventListener('scroll', rafThrottle(() => {
      this.handleScroll()
    }))
  }
  
  private handleScroll() {
    this.scrollTop = this.container.scrollTop
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight)
    this.endIndex = Math.min(
      this.startIndex + this.visibleItems + 1,
      this.items.length
    )
    
    this.render()
  }
  
  private render() {
    // Implement virtual rendering logic
    const visibleItems = this.items.slice(this.startIndex, this.endIndex)
    // Update DOM with visible items
  }
  
  public getVisibleItems() {
    return this.items.slice(this.startIndex, this.endIndex)
  }
  
  public destroy() {
    // Cleanup
  }
}

// Batch DOM updates
export const batchDOMUpdates = (updates: (() => void)[]) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// Memory cleanup utility
export const cleanupMemory = () => {
  if (typeof window === 'undefined') return
  
  // Clear image cache for offscreen images
  const images = document.querySelectorAll('img')
  images.forEach((img) => {
    const rect = img.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      img.src = img.dataset.placeholder || ''
    }
  })
}

export default {
  isMobile,
  isTablet,
  isDesktop,
  isTouchDevice,
  isLowEndDevice,
  getAnimationSettings,
  debounce,
  throttle,
  rafThrottle,
  lazyLoadImage,
  prefetchResources,
  enableGPUAcceleration,
  conditionalAnimation,
  usePerformanceMonitor,
  VirtualScroll,
  batchDOMUpdates,
  cleanupMemory
}