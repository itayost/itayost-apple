'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Home } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      {/* Home Link */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, ease: bouncyEasing }}
      >
        <Link
          href="/"
          className="text-brand-gray-500 hover:text-brand-blue transition-colors"
          aria-label="דף הבית"
        >
          <Home size={16} />
        </Link>
      </motion.div>

      {/* Separator */}
      <ChevronLeft size={14} className="text-brand-gray-400" />

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.label} className="flex items-center gap-2">
            {isLast || !item.href ? (
              <span
                className="text-brand-navy font-medium truncate max-w-[200px]"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2, ease: bouncyEasing }}
              >
                <Link
                  href={item.href}
                  className="text-brand-gray-500 hover:text-brand-blue transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            )}

            {!isLast && (
              <ChevronLeft size={14} className="text-brand-gray-400" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

// Pre-configured breadcrumbs for common pages
export function ServiceBreadcrumbs({ serviceName }: { serviceName: string }) {
  return (
    <Breadcrumbs
      items={[
        { label: 'שירותים', href: '/services' },
        { label: serviceName }
      ]}
    />
  )
}

export function BlogBreadcrumbs({ postTitle }: { postTitle: string }) {
  return (
    <Breadcrumbs
      items={[
        { label: 'בלוג', href: '/blog' },
        { label: postTitle }
      ]}
    />
  )
}

export function PortfolioBreadcrumbs({ projectTitle }: { projectTitle: string }) {
  return (
    <Breadcrumbs
      items={[
        { label: 'תיק עבודות', href: '/portfolio' },
        { label: projectTitle }
      ]}
    />
  )
}
