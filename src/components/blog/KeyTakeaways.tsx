import { CheckCircle2 } from 'lucide-react'

interface KeyTakeawaysProps {
  items?: string[]
}

// Front-loaded answer-first summary ("TL;DR"). Rendered above the article body
// from the post's `tldr` frontmatter so LLMs can extract the key facts without
// parsing the whole post. Renders nothing when no tldr is provided.
export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null

  return (
    <aside className="my-8 rounded-2xl border-r-4 border-brand-blue bg-gradient-to-l from-brand-blue/5 to-brand-purple/5 p-6 sm:p-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-navy sm:text-xl">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" />
        השורה התחתונה
      </h2>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 leading-relaxed text-brand-gray-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
