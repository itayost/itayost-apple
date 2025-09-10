// src/components/ScrollAnimations/AppleParallax.tsx
'use client'

import { useRef, ReactNode, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { isMobile, isLowEndDevice, getAnimationSettings, enableGPUAcceleration } from '@/utils/performance'

interface AppleParallaxProps {
  children: ReactNode
  offset?: number
  speed?: number
  className?: string
  opacity?: boolean
  scale?: boolean
  disabled?: boolean
}

export function AppleParallax({
  children,
  offset = 50,
  speed = 0.5,
  className = '',
  opacity = false,
  scale = false,
  disabled = false
}: AppleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Check device capabilities on mount
  useEffect(() => {
    const checkDevice = () => {
      const mobile = isMobile()
      const lowEnd = isLowEndDevice()
      setShouldAnimate(!mobile && !lowEnd && !disabled)
    }

    checkDevice()
    
    // Enable GPU acceleration for the element
    if (ref.current) {
      enableGPUAcceleration(ref.current)
    }

    // Re-check on resize
    const handleResize = () => checkDevice()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [disabled])

  // Mobile-optimized parallax values
  const mobileOffset = offset * 0.3 // Reduce parallax effect on mobile
  const actualOffset = shouldAnimate ? offset : mobileOffset
  const actualSpeed = shouldAnimate ? speed : speed * 0.5

  // Use spring physics for smoother animations
  const springConfig = {
    stiffness: shouldAnimate ? 100 : 200,
    damping: shouldAnimate ? 30 : 50,
    restDelta: 0.001
  }

  // Transform values with conditional rendering
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [actualOffset, -actualOffset * actualSpeed]),
    springConfig
  )

  const opacityValue = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    springConfig
  )

  const scaleValue = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
    springConfig
  )

  // Return static content for mobile/low-end devices if animations are disabled
  if (!shouldAnimate) {
    return (
      <div 
        ref={ref} 
        className={className}
        style={{
          transform: 'translateZ(0)',
          willChange: 'auto'
        }}
      >
        {children}
      </div>
    )
  }

  const motionStyle: any = {
    y,
    ...(opacity && { opacity: opacityValue }),
    ...(scale && { scale: scaleValue })
  }

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.div>
  )
}