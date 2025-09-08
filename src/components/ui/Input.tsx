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
          <label className="block text-sm font-medium text-[#1D1D1F]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            'w-full px-4 py-3 bg-[#F5F5F7] rounded-xl',
            'border border-transparent focus:border-[#0071E3]',
            'focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20',
            'transition-all duration-200',
            'placeholder:text-[#86868B]',
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