// Presentation helpers for long service copy. They only cut the existing text
// into pieces for layout; the words themselves are never changed (SEO copy).

export interface CopyPart {
  text: string
  isCitation: boolean
}

/** A period, ! or ? followed by whitespace ends a sentence; "$8.71" and "Next.js" do not. */
const SENTENCE_BREAK = /(?<=[.!?])\s+/

const PARENTHETICAL = /\([^()]*\)/g
const HEBREW = /[֐-׿]/
const YEAR = /\b(19|20)\d{2}\b/
const INSTITUTION = /\b(Institute|University|Research|Group)\b/

export function splitSentences(text: string): string[] {
  return text
    .trim()
    .split(SENTENCE_BREAK)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

/** A source note: Latin-only parenthetical carrying a year or a named institution. */
function isCitation(parenthetical: string): boolean {
  if (HEBREW.test(parenthetical)) return false
  return YEAR.test(parenthetical) || INSTITUTION.test(parenthetical)
}

export function splitCitations(sentence: string): CopyPart[] {
  const parts: CopyPart[] = []
  let cursor = 0

  for (const match of sentence.matchAll(PARENTHETICAL)) {
    const start = match.index ?? 0
    if (!isCitation(match[0])) continue
    if (start > cursor) parts.push({ text: sentence.slice(cursor, start), isCitation: false })
    parts.push({ text: match[0], isCitation: true })
    cursor = start + match[0].length
  }

  if (cursor < sentence.length) parts.push({ text: sentence.slice(cursor), isCitation: false })
  return parts
}
