import { PenTick } from '@/components/pad/PenTick'

interface KeyTakeawaysProps {
  items?: string[]
}

// Front-loaded answer-first summary ("TL;DR"). Rendered above the article body
// from the post's `tldr` frontmatter so LLMs can extract the key facts without
// parsing the whole post. Renders nothing when no tldr is provided.
// Pad world: a note boxed off from the article, each line pen-ticked.
export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null

  return (
    <aside className="my-8 border-2 border-pad-ink bg-pad-yellow/40 px-5 py-5 sm:px-7">
      <h2 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-3xl font-bold leading-none text-pad-ink">
        השורה התחתונה
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
            <span aria-hidden="true" className="relative mt-0.5 h-5 w-5 border-2 border-pad-ink">
              <PenTick className="absolute -top-1.5 start-0 h-6 w-6" />
            </span>
            <span className="text-lg leading-relaxed text-pad-ink">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
