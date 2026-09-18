// Shared article typography for blog posts and pillar guides, so long-form
// content renders identically wherever the sanitized markdown HTML is used.
// Carbon Order Pad: the article is printed on the pad, so headings use the
// printed-form face, links are carbon blue, quotes sit behind a red margin
// rule, and tables are ruled rather than boxed and shadowed.
// The measure is capped so a line of Hebrew stays inside the 65-75 character
// reading floor even when the column around it is wider.
export const PROSE_CLASSES = `prose prose-lg max-w-[62ch]
  prose-headings:font-pad-display prose-headings:font-bold prose-headings:text-pad-ink prose-headings:leading-none
  prose-h2:text-4xl prose-h2:lg:text-5xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b-[3px] prose-h2:border-double prose-h2:border-pad-red
  prose-h3:text-3xl prose-h3:lg:text-4xl prose-h3:mt-10 prose-h3:mb-3
  prose-h4:text-2xl prose-h4:lg:text-3xl prose-h4:mt-8 prose-h4:mb-2
  prose-p:text-pad-ink prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-lg
  prose-a:text-pad-carbon prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-pad-carbon/30 hover:prose-a:border-pad-carbon prose-a:transition-colors
  prose-strong:text-pad-ink prose-strong:font-bold
  prose-ul:my-6 prose-ul:ms-6 prose-ul:space-y-2.5
  prose-ol:my-6 prose-ol:ms-6 prose-ol:space-y-2.5
  prose-li:text-pad-ink prose-li:leading-relaxed prose-li:marker:text-pad-red prose-li:marker:font-bold
  prose-code:text-pad-carbon prose-code:bg-pad-carbon/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:border prose-code:border-pad-carbon/20 prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-code:text-base
  prose-pre:bg-pad-ink prose-pre:text-pad-sheet prose-pre:rounded-none prose-pre:border-2 prose-pre:border-pad-ink
  prose-blockquote:border-s-2 prose-blockquote:border-pad-red prose-blockquote:ps-5 prose-blockquote:ms-0 prose-blockquote:not-italic prose-blockquote:bg-transparent prose-blockquote:py-1 prose-blockquote:text-lg prose-blockquote:leading-[1.9] prose-blockquote:font-semibold prose-blockquote:text-pad-ink
  prose-img:rounded-none prose-img:border prose-img:border-pad-ink/15
  prose-table:w-full prose-table:my-0 prose-table:min-w-[34rem] prose-table:rounded-none prose-table:border-0
  prose-thead:border-b-[3px] prose-thead:border-double prose-thead:border-pad-red
  prose-th:p-3 prose-th:font-bold prose-th:text-pad-red prose-th:text-start
  prose-td:p-3 prose-td:border-b prose-td:border-pad-rule prose-td:text-pad-ink
  prose-hr:border-pad-rule prose-hr:my-12`
