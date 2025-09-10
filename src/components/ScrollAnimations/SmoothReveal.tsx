// src/components/ScrollAnimations/SmoothReveal.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, Children, useEffect, useState } from 'react'
import { getAnimationSettings, isMobile, enableGPUAcceleration } from '@/utils/performance'

interface SmoothRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  cascade?: boolean
  className?: string
  once?: boolean
  disabled?: boolean
}

export function SmoothReveal({
  children,
  direction = 'up',
  delay = 0,
  cascade = false,
  className = '',
  once = true,
  disabled = false
}: SmoothRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [animationSettings, setAnimationSettings] = useState(getAnimationSettings())
  
  const isInView = useInView(ref, { 
    once,
    margin: isMobile() ? "-50px" : "-100px", // Smaller margin on mobile
    amount: isMobile() ? 0.1 : 0.3 // Less strict visibility requirement on mobile
  })

  useEffect(() => {
    // Update animation settings on mount and resize
    const updateSettings = () => {
      setAnimationSettings(getAnimationSettings())
    }

    updateSettings()

    // Enable GPU acceleration
    if (ref.current) {
      enableGPUAcceleration(ref.current)
    }

    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  // Direction offsets - reduced for mobile
  const directions = {
    up: { y: isMobile() ? 20 : 40, x: 0 },
    down: { y: isMobile() ? -20 : -40, x: 0 },
    left: { x: isMobile() ? 20 : 40, y: 0 },
    right: { x: isMobile() ? -20 : -40, y: 0 },
  }

  // Mobile-optimized initial state
  const initial = {
    opacity: 0,
    ...directions[direction],
    ...(animationSettings.blur && { filter: 'blur(10px)' })
  }

  // Animated state
  const animate = isInView ? {
    opacity: 1,
    x: 0,
    y: 0,
    ...(animationSettings.blur && { filter: 'blur(0px)' })
  } : initial

  // Mobile-optimized transition
  const transition = {
    duration: animationSettings.duration,
    delay: isMobile() ? delay * 0.5 : delay, // Reduce delays on mobile
    ease: isMobile() 
      ? [0.25, 0.1, 0.25, 1] // Faster easing for mobile
      : [0.16, 1, 0.3, 1] // Apple's custom easing for desktop
  }

  // Skip animation entirely if disabled
  if (disabled || (isMobile() && animationSettings.complexity === 'simple')) {
    return <div ref={ref} className={className}>{children}</div>
  }

  // Cascade animation with mobile optimizations
  if (cascade) {
    const childArray = Children.toArray(children)
    const staggerDelay = animationSettings.stagger
    
    return (
      <div ref={ref} className={className}>
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            initial={initial}
            animate={animate}
            transition={{
              ...transition,
              delay: delay + (index * staggerDelay),
            }}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={{
        willChange: isInView ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  )
}