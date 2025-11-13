'use client'

import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
  background?: 'white' | 'gray' | 'blue' | 'orange' | 'navy'
  pattern?: boolean
}

export function Section({
  children,
  className = '',
  id,
  fullHeight = false,
  background = 'white',
  pattern = false,
}: SectionProps) {
  const backgroundColors = {
    white: 'bg-white',
    gray: 'bg-brand-gray-50',
    blue: 'bg-brand-blue/5',
    orange: 'bg-brand-orange/5',
    navy: 'bg-brand-navy/5',
  }

  return (
    <section
      id={id}
      className={cn(
        'relative',
        fullHeight ? 'min-h-screen' : 'py-20 lg:py-32',
        backgroundColors[background],
        className
      )}
    >
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
