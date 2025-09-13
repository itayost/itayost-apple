// Performance configuration settings
export const performanceConfig = {
  // Animation settings
  animations: {
    // Disable heavy animations on mobile
    enableParallax: {
      mobile: false,
      tablet: true,
      desktop: true
    },
    enableBlurEffects: {
      mobile: false,
      tablet: true,
      desktop: true
    },
    enableComplexGradients: {
      mobile: false,
      tablet: true,
      desktop: true
    },
    enableMouseParallax: {
      mobile: false,
      tablet: false,
      desktop: true
    },
    // Reduce animation durations on mobile
    durations: {
      mobile: {
        fast: 200,
        normal: 300,
        slow: 500
      },
      desktop: {
        fast: 300,
        normal: 600,
        slow: 800
      }
    },
    // Reduce stagger delays on mobile
    staggerDelays: {
      mobile: 50,
      desktop: 100
    }
  },

  // Scroll settings
  scroll: {
    // Throttle scroll events more aggressively on mobile
    throttleDelay: {
      mobile: 100,
      desktop: 16 // ~60fps
    },
    // Larger scroll threshold on mobile to reduce updates
    updateThreshold: {
      mobile: 10,
      desktop: 5
    }
  },

  // Intersection Observer settings
  intersectionObserver: {
    // Lower thresholds on mobile for earlier triggering
    threshold: {
      mobile: 0.05,
      desktop: 0.15
    },
    // Smaller root margins on mobile
    rootMargin: {
      mobile: '50px',
      desktop: '100px'
    }
  },

  // Image optimization
  images: {
    // Use lower quality images on mobile
    quality: {
      mobile: 75,
      desktop: 90
    },
    // Lazy load images earlier on mobile
    lazyLoadOffset: {
      mobile: '100px',
      desktop: '200px'
    },
    // Use WebP format when supported
    formats: ['webp', 'avif', 'jpeg']
  },

  // Bundle optimization
  bundleOptimization: {
    // Chunk sizes
    maxChunkSize: {
      mobile: 50000, // 50KB
      desktop: 100000 // 100KB
    },
    // Preload critical resources
    preloadCritical: true,
    // Enable code splitting
    codeSplitting: true
  },

  // Device detection thresholds
  deviceBreakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  },

  // GPU tier detection
  gpuTiers: {
    low: ['Intel HD', 'Intel UHD', 'Mali-T', 'Mali-G4', 'Adreno 3', 'Adreno 4'],
    medium: ['Mali-G5', 'Mali-G6', 'Mali-G7', 'Adreno 5', 'Adreno 6', 'Apple A7', 'Apple A8', 'Apple A9', 'Apple A10', 'Apple A11', 'Apple A12'],
    high: ['NVIDIA', 'AMD', 'Apple M1', 'Apple M2', 'Apple A13', 'Apple A14', 'Apple A15', 'Apple A16', 'Apple A17']
  }
}

// Helper function to get device-specific config
export const getDeviceConfig = (isMobile: boolean, isTablet: boolean = false) => {
  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

// Helper function to check if animation should be enabled
export const shouldEnableAnimation = (
  animationType: keyof typeof performanceConfig.animations,
  deviceType: 'mobile' | 'tablet' | 'desktop'
): boolean => {
  const animationConfig = performanceConfig.animations[animationType as keyof typeof performanceConfig.animations]
  if (typeof animationConfig === 'object' && 'mobile' in animationConfig) {
    return animationConfig[deviceType]
  }
  return true
}

// Helper function to get animation duration
export const getAnimationDuration = (
  speed: 'fast' | 'normal' | 'slow',
  isMobile: boolean
): number => {
  return isMobile 
    ? performanceConfig.animations.durations.mobile[speed]
    : performanceConfig.animations.durations.desktop[speed]
}

export default performanceConfig
