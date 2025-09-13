'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useRevealAnimation } from '@/hooks/useAppleScrollEffects'

interface AppleRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export const AppleReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true
}: AppleRevealProps) => {
  const { ref, inView } = useRevealAnimation({ triggerOnce: once })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 60, x: 0 }
      case 'down': return { y: -60, x: 0 }
      case 'left': return { y: 0, x: 60 }
      case 'right': return { y: 0, x: -60 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        ...getInitialPosition()
      }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        x: 0
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Apple's custom easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleScaleRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export const AppleScaleReveal = ({
  children,
  delay = 0,
  className = ''
}: AppleScaleRevealProps) => {
  const { ref, inView } = useRevealAnimation()

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        scale: 0.9
      }}
      animate={inView ? {
        opacity: 1,
        scale: 1
      } : {}}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleStaggerChildrenProps {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export const AppleStaggerChildren = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = ''
}: AppleStaggerChildrenProps) => {
  const { ref, inView } = useRevealAnimation()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const AppleStaggerItem = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export const AppleParallax = ({
  children,
  speed = 0.5,
  className = ''
}: AppleParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const springConfig = { damping: 15, stiffness: 100 }
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]),
    springConfig
  )

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleTextRevealProps {
  text: string
  className?: string
  delay?: number
}

export const AppleTextReveal = ({
  text,
  className = '',
  delay = 0
}: AppleTextRevealProps) => {
  const { ref, inView } = useRevealAnimation()
  const words = text.split(' ')

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.05
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              rotateX: -90
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface AppleZoomParallaxProps {
  children: ReactNode
  className?: string
}

export const AppleZoomParallax = ({
  children,
  className = ''
}: AppleZoomParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleRotateRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const AppleRotateReveal = ({
  children,
  className = '',
  delay = 0
}: AppleRotateRevealProps) => {
  const { ref, inView } = useRevealAnimation()

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        rotateY: 45,
        scale: 0.9
      }}
      animate={inView ? {
        opacity: 1,
        rotateY: 0,
        scale: 1
      } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AppleMaskRevealProps {
  children: ReactNode
  className?: string
}

export const AppleMaskReveal = ({
  children,
  className = ''
}: AppleMaskRevealProps) => {
  const { ref, inView } = useRevealAnimation()

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.65, 0, 0.35, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default AppleReveal
