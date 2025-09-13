'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { usePerformance } from '@/contexts/PerformanceContext'

interface OptimizedParallaxProps {
  children: ReactNode
  offset?: number
  speed?: number
  opacity?: boolean
  scale?: boolean
  className?: string
  disabled?: boolean
}

export function OptimizedParallax({
  children,
  offset = 50,
  speed = 0.5,
  opacity = false,
  scale = false,
  className = '',
  disabled = false,
}: OptimizedParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { isLowPerformance, isMobile } = usePerformance()
  
  // Disable parallax on mobile and low-performance devices
  const shouldDisable = disabled || isLowPerformance || isMobile
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Lighter spring config for mobile
  const springConfig = isMobile 
    ? { stiffness: 200, damping: 50, restDelta: 0.01 }
    : { stiffness: 100, damping: 30, restDelta: 0.001 }
  
  // Reduced parallax effect on mobile
  const mobileOffset = offset * 0.3
  const effectiveOffset = isMobile ? mobileOffset : offset
  
  // Parallax Y movement
  const y = shouldDisable 
    ? 0 
    : useSpring(
        useTransform(scrollYProgress, [0, 1], [effectiveOffset, -effectiveOffset * speed]),
        springConfig
      )

  // Optional opacity - disabled on mobile for performance
  const opacityValue = shouldDisable || isMobile
    ? 1
    : useSpring(
        useTransform(
          scrollYProgress,
          opacity ? [0, 0.3, 0.7, 1] : [0, 1],
          opacity ? [0, 1, 1, 0] : [1, 1]
        ),
        springConfig
      )

  // Optional scale - disabled on mobile for performance
  const scaleValue = shouldDisable || isMobile
    ? 1
    : useSpring(
        useTransform(
          scrollYProgress,
          scale ? [0, 0.5, 1] : [0, 1],
          scale ? [0.8, 1, 0.8] : [1, 1]
        ),
        springConfig
      )

  if (shouldDisable) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity: opacityValue,
        scale: scaleValue,
        willChange: isMobile ? 'auto' : 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface OptimizedRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  once?: boolean
  disabled?: boolean
}

export function OptimizedReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
  disabled = false,
}: OptimizedRevealProps) {
  const ref = useRef(null)
  const { isLowPerformance, isMobile } = usePerformance()
  
  const shouldDisable = disabled || isLowPerformance
  
  const isInView = useInView(ref, { 
    once,
    margin: isMobile ? "-50px" : "-100px",
  })

  // Reduced movement distances on mobile
  const mobileDistance = 20
  const desktopDistance = 40
  const distance = isMobile ? mobileDistance : desktopDistance

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  if (shouldDisable) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const initial = {
    opacity: 0,
    ...directions[direction],
    // Remove blur filter on mobile for performance
    filter: isMobile ? 'none' : 'blur(10px)',
  }

  const animate = isInView ? {
    opacity: 1,
    x: 0,
    y: 0,
    filter: isMobile ? 'none' : 'blur(0px)',
  } : initial

  const transition = {
    duration: isMobile ? 0.5 : 0.8,
    delay: isMobile ? delay * 0.5 : delay, // Reduce delays on mobile
    ease: [0.16, 1, 0.3, 1], // Apple's custom easing
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
      }}
    >
      {children}
    </motion.div>
  )
}

// Simplified stagger animation for mobile
interface OptimizedStaggerProps {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export function OptimizedStagger({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
}: OptimizedStaggerProps) {
  const { isMobile } = usePerformance()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: isMobile ? staggerDelay * 0.5 : staggerDelay,
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: isMobile ? 10 : 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}
