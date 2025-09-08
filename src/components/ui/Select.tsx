'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[#1D1D1F]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={twMerge(
            'w-full px-4 py-3 bg-[#F5F5F7] rounded-xl',
            'border border-transparent focus:border-[#0071E3]',
            'focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20',
            'transition-all duration-200',
            'appearance-none cursor-pointer',
            'text-[#1D1D1F]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'