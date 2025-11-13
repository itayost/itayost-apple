'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-brand-navy">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            'w-full px-6 py-4 text-lg bg-brand-gray-50/50 rounded-2xl',
            'border-2 border-transparent focus:border-brand-blue',
            'focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/10',
            'transition-all duration-300',
            'placeholder:text-brand-gray-400',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'