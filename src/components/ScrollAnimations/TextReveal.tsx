'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface TextRevealProps {
  children: string | string[]
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once,
    margin: "-20%",
  })

  // Convert children to array of words
  const text = Array.isArray(children) ? children.join(' ') : children
  const words = text.split(' ')

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration,
              delay: delay + (wordIndex * stagger),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.div>
  )
}

// Character-by-character reveal variant
export function CharReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.05,
  once = true,
}: {
  children: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once,
    margin: "-20%",
  })

  const chars = children.split('')

  return (
    <motion.div ref={ref} className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            delay: delay + (index * duration),
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
