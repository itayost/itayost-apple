// The clients page is a work log: every line on it is a project that exists in
// src/data/portfolio.ts, so nothing here can outrun the record. No quotes, no
// ratings and no outcome percentages until a client confirms them in writing.
import { portfolioData, type PortfolioItem } from '@/data/portfolio'

// The field each project was built for. Derived from the project itself, not
// from a claim about market reach.
const FIELD_BY_SLUG: Record<string, string> = {
  'kitchen-optimizer': 'מסעדנות',
  'lola-martin': 'מסעדנות',
  'the-fader-academy': 'חינוך והכשרה',
  'tal-real-estate': 'נדל״ן',
  'shepes-group': 'נדל״ן',
  neshatamar: 'הוצאה לאור',
  'garden-of-eden': 'ספורט',
  'futurekids-shop': 'מסחר אונליין',
  'amit-eyebrows': 'טיפוח ויופי',
  'ta-crm': 'נדל״ן',
}

const DEFAULT_FIELD = 'עסקים קטנים'

export const fieldFor = (slug: string): string => FIELD_BY_SLUG[slug] ?? DEFAULT_FIELD

export const WHAT_WAS_BUILT: Record<PortfolioItem['category'], string> = {
  system: 'מערכת ניהול',
  web: 'אתר',
  mobile: 'אפליקציה',
  ecommerce: 'חנות אונליין',
}

export interface WorkLogEntry {
  slug: string
  client: string
  title: string
  built: string
  subtitle: string
  field: string
  duration: string
  year: string
  category: PortfolioItem['category']
}

const toEntry = (item: PortfolioItem): WorkLogEntry => ({
  slug: item.slug,
  client: item.client,
  title: item.title,
  built: WHAT_WAS_BUILT[item.category],
  subtitle: item.subtitle,
  field: fieldFor(item.slug),
  duration: item.duration,
  year: item.year,
  category: item.category,
})

/** The log, newest year first, newest project first inside each year. */
export const workLogByYear = (): Array<{ year: string; entries: WorkLogEntry[] }> => {
  const entries = portfolioData.map(toEntry)
  const years = [...new Set(entries.map((entry) => entry.year))].sort((a, b) => Number(b) - Number(a))
  return years.map((year) => ({
    year,
    entries: entries.filter((entry) => entry.year === year).sort((a, b) => b.slug.localeCompare(a.slug)),
  }))
}

/** Counts printed on the index sheet. Every figure is a count of the log itself. */
export const workLogSummary = () => {
  const entries = portfolioData.map(toEntry)
  const fields = [...new Set(entries.map((entry) => entry.field))]
  const years = entries.map((entry) => Number(entry.year))
  const counts = fields
    .map((field) => ({ field, count: entries.filter((entry) => entry.field === field).length }))
    .sort((a, b) => b.count - a.count)
  return {
    projects: entries.length,
    fields: fields.length,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
    counts,
  }
}

export const clientsPageCopy = {
  title: 'הלקוחות',
  subtitle: 'שלי',
  description: 'כל שורה כאן היא פרויקט שנמסר: מי הלקוח, מה נבנה ומתי. לחצו על שורה כדי לראות את הפרויקט המלא.',
  logLabel: 'יומן עבודה',
  indexTitle: 'תוכן התיק',
  projectsLabel: 'פרויקטים',
  fieldsLabel: 'תחומים',
  ctaTitle: 'רוצים שהפרויקט שלכם יהיה השורה הבאה?',
  ctaText: 'שיחה קצרה בלי התחייבות, ותקבלו תשובה ישירה על עלות וזמנים',
  ctaButton: 'צור קשר',
  portfolioLink: 'לתיק העבודות המלא',
}
