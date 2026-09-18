import { faqPageCopy, faqSections } from '@/config/faqPage'
import { PenCross } from '@/components/pad/PenCross'
import { SectionTabs } from '@/components/pad/SectionTabs'
import { FAQCta } from './FAQCta'

/**
 * The FAQ as the pad's fine print: numbered clauses filed under printed
 * headings, each one unfolding in place. Native <details> so the answers are
 * in the HTML for crawlers and the page works without JavaScript.
 */
export default function FAQPage() {
  const sections = faqSections()
  const clauseCount = sections.reduce((total, section) => total + section.clauses.length, 0)
  // Clause numbers run once through the whole document, so no two rows on the
  // page carry the same number.
  const clausesBefore = (sectionIndex: number) =>
    sections.slice(0, sectionIndex).reduce((total, section) => total + section.clauses.length, 0)

  return (
    <div className="pad-world">
      <section aria-labelledby="faq-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-36">
          <h1
            id="faq-heading"
            className="font-pad-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-[0.88] [text-wrap:balance]"
          >
            {faqPageCopy.title}
            <span className="block text-pad-yellow">{faqPageCopy.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-pad-carbon-ink sm:text-2xl">
            {faqPageCopy.description}
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-pad-carbon-ink/30 pt-4 text-pad-carbon-ink">
            <span>
              <span className="font-pad-display text-2xl leading-none text-pad-yellow">{clauseCount}</span>{' '}
              {faqPageCopy.clausesLabel}
            </span>
            <span>
              <span className="font-pad-display text-2xl leading-none text-pad-yellow">{sections.length}</span>{' '}
              {faqPageCopy.sectionsLabel}
            </span>
          </p>
        </div>
      </section>

      <SectionTabs
        ariaLabel={faqPageCopy.sectionsLabel}
        tabs={sections.map((section) => ({ id: section.id, label: section.label, count: section.clauses.length }))}
      />

      <section aria-label={faqPageCopy.listLabel} className="pad-paper">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          {sections.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="mb-14 scroll-mt-32 last:mb-0">
              <h2 className="border-b-[3px] border-double border-pad-red pb-2 font-pad-display text-4xl font-bold leading-none text-pad-ink lg:text-5xl">
                {section.heading}
              </h2>
              <div>
                {section.clauses.map((clause, index) => (
                  <details
                    key={clause.question}
                    open={sectionIndex === 0 && index === 0}
                    className="group border-b border-pad-rule"
                  >
                    <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[2.5rem_1fr_1.75rem] items-center gap-x-4 py-4 [&::-webkit-details-marker]:hidden">
                      <span aria-hidden="true" className="font-pad-display text-xl leading-none text-pad-red">
                        {String(clausesBefore(sectionIndex) + index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-bold leading-snug text-pad-ink sm:text-xl">{clause.question}</span>
                      <PenCross />
                    </summary>
                    <p className="-mt-1 max-w-[62ch] pb-6 ps-[3.5rem] text-base leading-[1.9] text-pad-ink-soft sm:text-lg">
                      {clause.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-cta-heading" className="bg-pad-carbon text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div>
            <h2 id="faq-cta-heading" className="font-pad-display text-5xl font-bold leading-[0.9] sm:text-6xl">
              {faqPageCopy.ctaTitle}
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-pad-carbon-ink">{faqPageCopy.ctaText}</p>
          </div>
          <FAQCta />
        </div>
      </section>
    </div>
  )
}
