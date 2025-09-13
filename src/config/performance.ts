// Performance configuration for animations and effects
export const performanceConfig = {
  // Disable heavy animations on mobile
  mobileAnimations: {
    enabled: false,
    threshold: 768, // px
  },
  
  // Parallax settings
  parallax: {
    enabledOnMobile: false,
    reducedSpeed: 0.3, // Slower parallax on mobile
    disableThreshold: 768, // px
  },
  
  // Animation durations
  animations: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    verySlow: 1,
  },
  
  // Lazy loading settings
  lazyLoad: {
    rootMargin: '100px',
    threshold: 0.1,
  },
  
  // Reduced motion settings
  reducedMotion: {
    respectUserPreference: true,
    disableAllAnimations: false,
    keepEssentialTransitions: true,
  },
  
  // Blur and filter effects
  effects: {
    blurOnMobile: 'blur-xl', // Reduced from blur-3xl
    shadowOnMobile: 'shadow-lg', // Reduced from shadow-2xl
    disableGlassmorphismOnMobile: false,
  },
  
  // Optimization flags
  optimizations: {
    useGPUAcceleration: true,
    useWillChange: true,
    throttleScrollEvents: true,
    debounceResizeEvents: true,
  },
}

// Helper function to check if device is mobile
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < performanceConfig.mobileAnimations.threshold
}

// Helper function to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Helper function to get optimized animation duration
export const getAnimationDuration = (type: 'fast' | 'normal' | 'slow' | 'verySlow' = 'normal') => {
  if (prefersReducedMotion()) return 0.01
  if (isMobileDevice()) return performanceConfig.animations.fast
  return performanceConfig.animations[type]
}

// Helper function to determine if parallax should be enabled
export const shouldEnableParallax = () => {
  if (prefersReducedMotion()) return false
  if (isMobileDevice() && !performanceConfig.parallax.enabledOnMobile) return false
  return true
}
