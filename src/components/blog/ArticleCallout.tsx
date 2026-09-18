import { AlertTriangle, Info, Lightbulb, Quote } from 'lucide-react'

type CalloutType = 'tip' | 'warning' | 'info' | 'quote'

interface ArticleCalloutProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
}

// Pad world: a callout is a note boxed off from the article in the pad's own
// ink, never a tinted card with a coloured side tab.
const calloutConfig = {
  tip: { icon: Lightbulb, title: 'טיפ מקצועי', labelClass: 'text-pad-red', boxClass: 'border-pad-ink bg-pad-yellow/40' },
  warning: { icon: AlertTriangle, title: 'שימו לב', labelClass: 'text-pad-red', boxClass: 'border-pad-red bg-pad-sheet' },
  info: { icon: Info, title: 'מידע חשוב', labelClass: 'text-pad-carbon', boxClass: 'border-pad-carbon bg-pad-sheet' },
  quote: { icon: Quote, title: '', labelClass: 'text-pad-ballpoint', boxClass: 'border-pad-ink/30 bg-transparent' },
} as const

export default function ArticleCallout({ type, title, children }: ArticleCalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon
  const displayTitle = title || config.title

  return (
    <aside className={`my-8 border-2 px-5 py-4 ${config.boxClass}`}>
      {displayTitle && (
        <p className={`flex items-center gap-2 font-pad-display text-2xl font-bold leading-none ${config.labelClass}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
          {displayTitle}
        </p>
      )}
      <div className={`${displayTitle ? 'mt-3' : ''} text-lg leading-relaxed text-pad-ink`}>{children}</div>
    </aside>
  )
}

/** The same note, inline and compact. */
export function ArticleCalloutCompact({ type, children }: Omit<ArticleCalloutProps, 'title'>) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-2 border px-3 py-1 text-sm font-bold ${config.boxClass}`}>
      <Icon aria-hidden="true" className={`h-4 w-4 ${config.labelClass}`} />
      <span className="text-pad-ink">{children}</span>
    </span>
  )
}
