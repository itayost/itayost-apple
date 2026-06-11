import { ExternalLink } from 'lucide-react'

interface Source {
  title: string
  url: string
}

interface SourcesListProps {
  items?: Source[]
}

// Renders the post's cited `sources` frontmatter as a references list. Cited
// sources are a strong AI-citability signal (LLMs pass the credibility on).
// Renders nothing when no sources are provided.
export function SourcesList({ items }: SourcesListProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="my-10 rounded-2xl bg-brand-gray-50 p-6 sm:p-8">
      <h2 className="mb-4 text-lg font-bold text-brand-navy sm:text-xl">מקורות ונתונים</h2>
      <ul className="space-y-3">
        {items.map((source, i) => (
          <li key={i}>
            <a
              href={source.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-start gap-2 font-medium text-brand-blue hover:underline"
            >
              <ExternalLink className="mt-1 h-4 w-4 shrink-0" />
              <span>{source.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
