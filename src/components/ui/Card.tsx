'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  gradient?: boolean
}

export function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  gradient = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        'relative rounded-2xl p-8 transition-all duration-300',
        glass
          ? 'bg-white/70 backdrop-blur-xl border border-white/20'
          : 'bg-white border border-gray-200',
        hover && 'hover:shadow-xl cursor-pointer',
        gradient && 'overflow-hidden',
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
