// Client-safe helpers for working with already-rendered blog post HTML.
// Kept separate from `lib/blog.ts` (which imports `fs`/`remark` and is
// server-only) so it can be imported into client components.

/**
 * Split rendered blog HTML at the top-level <h2> boundary nearest the middle,
 * so a CTA can be injected mid-article. The first heading is skipped so the CTA
 * never lands at the very top of the article.
 *
 * Returns `[before, after]`, or `null` when the post has fewer than two <h2>s
 * (in which case callers should render the content as a single block).
 *
 * Splitting on a top-level <h2> start is safe: each returned half is a complete
 * sequence of sibling block elements, so neither half contains a dangling tag.
 */
export function splitHtmlAtMiddleHeading(html: string): [string, string] | null {
  const headingPositions: number[] = []
  const headingRegex = /<h2[\s>]/gi
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(html)) !== null) {
    headingPositions.push(match.index)
  }

  // Need at least two headings: the first is skipped as a split candidate.
  if (headingPositions.length < 2) {
    return null
  }

  const middle = html.length / 2
  const candidates = headingPositions.slice(1)
  const splitAt = candidates.reduce((closest, position) =>
    Math.abs(position - middle) < Math.abs(closest - middle) ? position : closest
  )

  return [html.slice(0, splitAt), html.slice(splitAt)]
}
