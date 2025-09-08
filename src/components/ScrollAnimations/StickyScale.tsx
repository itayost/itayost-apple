'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface StickyScaleProps {
  children: ReactNode
  startScale?: number
  endScale?: number
  className?: string
}

export function StickyScale({
  children,
  startScale = 0.8,
  endScale = 1,
  className = '',
}: StickyScaleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [startScale, endScale, startScale]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
      }}
      className={`sticky top-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}
