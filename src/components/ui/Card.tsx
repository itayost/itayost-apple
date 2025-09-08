'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: string
  glass?: boolean
}

export function Card({
  children,
  className,
  hover = false,
  gradient,
  glass = false,
  ...props
}: CardProps) {
  const baseStyles = 'relative overflow-hidden rounded-2xl'
  
  const glassStyles = glass
    ? 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl'
    : 'bg-white shadow-lg'
  
  return (
    <motion.div
      className={twMerge(
        baseStyles,
        glassStyles,
        hover && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      } : {}}
      {...props}
    >
      {gradient && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}