'use client'

import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
  gradient?: boolean
  pattern?: boolean
}

export function Section({
  children,
  className = '',
  id,
  fullHeight = false,
  gradient = false,
  pattern = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        fullHeight ? 'min-h-screen' : 'py-20 lg:py-32',
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
      )}
      {pattern && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
