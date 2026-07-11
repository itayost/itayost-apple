// Shared article typography for blog posts and pillar guides, so long-form
// content renders identically wherever the sanitized markdown HTML is used.
export const PROSE_CLASSES = `prose prose-lg prose-slate max-w-none
  prose-headings:font-bold prose-headings:text-brand-navy
  prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:relative prose-h2:pb-4
  prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-brand-blue
  prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mt-8 prose-h4:mb-3
  prose-p:text-brand-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[17px]
  prose-a:text-brand-blue prose-a:font-semibold prose-a:no-underline prose-a:border-b-2 prose-a:border-brand-blue/30 hover:prose-a:border-brand-blue prose-a:transition-colors
  prose-strong:text-brand-navy prose-strong:font-bold
  prose-ul:my-6 prose-ul:mr-6 prose-ul:space-y-3
  prose-ol:my-6 prose-ol:mr-6 prose-ol:space-y-3
  prose-li:text-brand-gray-700 prose-li:leading-relaxed prose-li:marker:text-brand-blue prose-li:marker:font-bold
  prose-code:text-brand-purple prose-code:bg-gradient-to-r prose-code:from-brand-purple/10 prose-code:to-brand-blue/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-code:text-[15px]
  prose-pre:bg-gradient-to-br prose-pre:from-brand-navy prose-pre:to-brand-navy/90 prose-pre:text-brand-gray-100 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:border prose-pre:border-brand-navy/20
  prose-blockquote:border-r-4 prose-blockquote:border-brand-blue prose-blockquote:pr-6 prose-blockquote:mr-0 prose-blockquote:not-italic prose-blockquote:bg-gradient-to-l prose-blockquote:from-brand-blue/5 prose-blockquote:to-brand-purple/5 prose-blockquote:py-6 prose-blockquote:px-6 prose-blockquote:rounded-2xl prose-blockquote:text-brand-gray-700 prose-blockquote:font-medium prose-blockquote:shadow-sm
  prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-brand-gray-100
  prose-table:overflow-hidden prose-table:rounded-xl prose-table:shadow-lg prose-table:border prose-table:border-brand-gray-200
  prose-thead:bg-gradient-to-l prose-thead:from-brand-blue/10 prose-thead:to-brand-purple/10
  prose-th:p-4 prose-th:font-bold prose-th:text-brand-navy prose-th:border-b prose-th:border-brand-gray-200
  prose-td:p-4 prose-td:border-b prose-td:border-brand-gray-100
  prose-tr:hover:bg-brand-gray-50 prose-tr:transition-colors
  prose-hr:border-brand-gray-200 prose-hr:my-12
  [&_h2]:after:content-[''] [&_h2]:after:block [&_h2]:after:w-20 [&_h2]:after:h-1 [&_h2]:after:bg-gradient-to-l [&_h2]:after:from-brand-blue [&_h2]:after:to-brand-purple [&_h2]:after:rounded-full [&_h2]:after:mt-3`
