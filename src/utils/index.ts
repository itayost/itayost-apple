// Utility functions
export { cn } from './cn'
export { formatDate } from './formatDate'
export { formatPhone } from './formatPhone'
export { validateEmail } from './validateEmail'
export { validatePhone } from './validatePhone'
export { generatePageMetadata } from './seo'

// Performance utilities
export {
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
} from './performance'