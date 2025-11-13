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
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full'

  const variants = {
    primary: 'bg-brand-orange text-white hover:shadow-[var(--shadow-orange)]',
    orange: 'bg-brand-orange text-white hover:shadow-[var(--shadow-orange)]',
    navy: 'bg-brand-navy text-white hover:shadow-[var(--shadow-navy)]',
    secondary: 'bg-brand-blue text-white hover:shadow-[var(--shadow-blue)]',
    ghost: 'bg-transparent text-brand-navy border-3 border-brand-navy hover:bg-brand-navy hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg',
  }

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-4 text-lg',
    lg: 'px-10 py-5 text-xl',
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