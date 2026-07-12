// Schema.org datePublished/dateModified want full ISO 8601 date-times with a
// timezone. Frontmatter stores plain dates ("2026-07-11"), which the Rich
// Results Test flags as missing time and timezone. This normalizes to UTC
// midnight; invalid input falls through unchanged rather than emitting
// "Invalid Date".
export function toSchemaDate(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString()
}
