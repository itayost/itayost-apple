import { PenCross } from '@/components/pad/PenCross'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items?: FAQItem[]
}

// In-article FAQ rendered from the post's `faq` frontmatter — the same source
// that drives the FAQPage JSON-LD, so the on-page Q&A and the structured data
// never drift. Renders nothing when no faq is provided.
// Pad world: fine print that unfolds; native <details> so it works without JS
// and the answers stay in the HTML for crawlers.
export function FAQSection({ items }: FAQSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="my-12" id="faq">
      <h2 className="font-pad-display text-4xl font-bold leading-none text-pad-ink">שאלות נפוצות</h2>
      <div className="mt-5 border-t-2 border-pad-ink">
        {items.map((item, index) => (
          <details key={item.question} open={index === 0} className="group border-b border-pad-rule">
            <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[1fr_1.75rem] items-center gap-x-4 py-4 [&::-webkit-details-marker]:hidden">
              <span className="text-lg font-bold leading-snug text-pad-ink">{item.question}</span>
              <PenCross />
            </summary>
            <p className="-mt-1 max-w-[62ch] pb-5 text-base leading-relaxed text-pad-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
