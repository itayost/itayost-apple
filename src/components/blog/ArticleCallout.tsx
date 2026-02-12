'use client'

import { motion } from 'framer-motion'
import { Lightbulb, AlertTriangle, Info, Quote } from 'lucide-react'
import { bouncyEasing } from '@/constants/animations'

type CalloutType = 'tip' | 'warning' | 'info' | 'quote'

interface ArticleCalloutProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    title: 'טיפ מקצועי',
    bgClass: 'bg-gradient-to-l from-brand-blue/5 to-brand-blue/10',
    borderClass: 'border-r-4 border-brand-blue',
    iconBgClass: 'bg-brand-blue/20',
    iconColorClass: 'text-brand-blue',
    titleColorClass: 'text-brand-blue',
  },
  warning: {
    icon: AlertTriangle,
    title: 'שימו לב',
    bgClass: 'bg-gradient-to-l from-brand-orange/5 to-brand-orange/10',
    borderClass: 'border-r-4 border-brand-orange',
    iconBgClass: 'bg-brand-orange/20',
    iconColorClass: 'text-brand-orange',
    titleColorClass: 'text-brand-orange',
  },
  info: {
    icon: Info,
    title: 'מידע חשוב',
    bgClass: 'bg-gradient-to-l from-brand-purple/5 to-brand-purple/10',
    borderClass: 'border-r-4 border-brand-purple',
    iconBgClass: 'bg-brand-purple/20',
    iconColorClass: 'text-brand-purple',
    titleColorClass: 'text-brand-purple',
  },
  quote: {
    icon: Quote,
    title: '',
    bgClass: 'bg-gradient-to-l from-brand-gray-100 to-brand-gray-50',
    borderClass: 'border-r-4 border-brand-navy',
    iconBgClass: 'bg-brand-navy/10',
    iconColorClass: 'text-brand-navy',
    titleColorClass: 'text-brand-navy',
  },
}

export default function ArticleCallout({ type, title, children }: ArticleCalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon
  const displayTitle = title || config.title

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: bouncyEasing }}
      className={`
        my-8 rounded-2xl p-6
        ${config.bgClass}
        ${config.borderClass}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 p-2.5 rounded-xl ${config.iconBgClass}`}>
          <Icon className={`w-5 h-5 ${config.iconColorClass}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <h4 className={`text-lg font-bold mb-2 ${config.titleColorClass}`}>
              {displayTitle}
            </h4>
          )}
          <div className="text-brand-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Alternative compact version for inline use
export function ArticleCalloutCompact({ type, children }: Omit<ArticleCalloutProps, 'title'>) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        ${config.bgClass}
      `}
    >
      <Icon className={`w-4 h-4 ${config.iconColorClass}`} />
      <span className="text-brand-gray-700">{children}</span>
    </div>
  )
}
