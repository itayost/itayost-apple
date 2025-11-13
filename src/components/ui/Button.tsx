'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'orange' | 'navy'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full'
  
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/50',
    orange: 'bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white shadow-lg shadow-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/50',
    navy: 'bg-brand-navy text-white hover:bg-brand-navy/90 shadow-md shadow-brand-navy/30 hover:shadow-lg hover:shadow-brand-navy/40',
    secondary: 'bg-white text-brand-navy border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5',
    ghost: 'bg-transparent text-brand-blue hover:bg-brand-blue/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg',
  }
  
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }
  
  const isDisabled = disabled || loading
  
  return (
    <motion.button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading && (
        <motion.span
          className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </motion.button>
  )
}