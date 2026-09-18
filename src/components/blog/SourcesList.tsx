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
// Pad world: the references are the page's fine print.
export function SourcesList({ items }: SourcesListProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="my-10">
      <h2 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-2xl font-bold leading-none text-pad-red">
        מקורות ונתונים
      </h2>
      <ol className="mt-1">
        {items.map((source, index) => (
          <li key={source.url} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-pad-rule py-3">
            <span aria-hidden="true" className="font-pad-display text-xl leading-tight text-pad-red">
              {index + 1}
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="group inline-flex items-start gap-2 text-base font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
            >
              <span>{source.title}</span>
              <ExternalLink aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
