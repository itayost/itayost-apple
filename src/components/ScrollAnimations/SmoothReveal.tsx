'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, Children } from 'react'

interface SmoothRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  cascade?: boolean
  className?: string
  once?: boolean
}

export function SmoothReveal({
  children,
  direction = 'up',
  delay = 0,
  cascade = false,
  className = '',
  once = true,
}: SmoothRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once,
    margin: "-100px",
  })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const initial = {
    opacity: 0,
    ...directions[direction],
    filter: 'blur(10px)',
  }

  const animate = isInView ? {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
  } : initial

  const transition = {
    duration: 0.8,
    delay,
    ease: [0.16, 1, 0.3, 1], // Apple's custom easing
  }

  if (cascade) {
    const childArray = Children.toArray(children)
    return (
      <div ref={ref} className={className}>
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            initial={initial}
            animate={animate}
            transition={{
              ...transition,
              delay: delay + (index * 0.1),
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
    >
      {children}
    </motion.div>
  )
}
