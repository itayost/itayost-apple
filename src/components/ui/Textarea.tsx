'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-apple-gray-900">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={twMerge(
            'w-full px-4 py-3 bg-apple-gray-50 rounded-xl',
            'border border-transparent focus:border-apple-blue',
            'focus:bg-white focus:outline-none focus:ring-2 focus:ring-apple-blue/20',
            'transition-all duration-200',
            'placeholder:text-apple-gray-400',
            'resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          rows={5}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'