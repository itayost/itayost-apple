'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'blue' | 'orange' | 'navy' | 'green'
}

export function Card({
  children,
  className,
  hover = false,
  variant = 'default',
  ...props
}: CardProps) {
  const baseStyles = 'relative overflow-hidden rounded-2xl p-6'

  const variantStyles = {
    default: 'bg-white',
    blue: 'bg-brand-blue text-white',
    orange: 'bg-brand-orange text-white',
    navy: 'bg-brand-navy text-white',
    green: 'bg-brand-green text-white',
  }

  return (
    <motion.div
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        hover && 'cursor-pointer',
        className
      )}
      whileHover={hover ? {
        scale: 1.02,
        y: -5,
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
        }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}