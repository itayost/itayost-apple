'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AppleParallaxProps {
  children: ReactNode
  offset?: number
  speed?: number
  opacity?: boolean
  scale?: boolean
  className?: string
}

export function AppleParallax({
  children,
  offset = 50,
  speed = 0.5,
  opacity = false,
  scale = false,
  className = '',
}: AppleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Use spring for smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  
  // Parallax Y movement
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]),
    springConfig
  )

  // Optional opacity
  const opacityValue = useSpring(
    useTransform(
      scrollYProgress,
      opacity ? [0, 0.3, 0.7, 1] : [0, 1],
      opacity ? [0, 1, 1, 0] : [1, 1]
    ),
    springConfig
  )

  // Optional scale
  const scaleValue = useSpring(
    useTransform(
      scrollYProgress,
      scale ? [0, 0.5, 1] : [0, 1],
      scale ? [0.8, 1, 0.8] : [1, 1]
    ),
    springConfig
  )

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity: opacityValue,
        scale: scaleValue,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
