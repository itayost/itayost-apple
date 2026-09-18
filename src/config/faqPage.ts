// The FAQ page prints the same questions Google reads from the FAQPage JSON-LD
// in `seoConfig.structuredData.faqPage`, so the page and the markup can never
// drift apart. The only thing added here is the filing: which clause belongs
// under which printed heading.
import { seoConfig } from '@/config/seo'

export interface FaqClause {
  question: string
  answer: string
}

export interface FaqSection {
  id: string
  label: string
  heading: string
  clauses: FaqClause[]
}

// Questions that were only ever on the page (never in the JSON-LD). Kept as
// page copy; they are not added to the markup, so the two stay in step.
const pageOnlyClauses: Array<FaqClause & { section: string }> = [
  {
    section: 'work',
    question: 'מה קורה אם אני רוצה לשנות משהו באמצע?',
    answer:
      'אין בעיה. אני עובד עם עדכונים שוטפים, ושינויים קטנים הם חלק מהתהליך. לשינויים גדולים נתאם ציפיות ולוחות זמנים מחדש לפני שממשיכים.',
  },
  {
    section: 'tech',
    question: 'באיזה טכנולוגיות אתה משתמש?',
    answer:
      'React, Next.js, Node.js, TypeScript, PostgreSQL ו-Supabase. בוחר את הטכנולוגיה לפי מה שהפרויקט צריך, לא לפי מה שמוכר יותר.',
  },
  {
    section: 'services',
    question: 'האם אתה עושה גם עיצוב?',
    answer: 'כן. עיצוב ממשק וחוויית משתמש הם חלק מהעבודה, כולל זהות ויזואלית בסיסית לעסקים שאין להם.',
  },
  {
    section: 'after',
    question: 'האם אני יכול לנהל את האתר בעצמי?',
    answer: 'כן. אני בונה מערכות ניהול פשוטות, ומעביר הדרכה מלאה ותיעוד ברור לפני המסירה.',
  },
  {
    section: 'work',
    question: 'האם אתה עובד עם לקוחות מחוץ לישראל?',
    answer:
      'כן, מכל הארץ ומחוצה לה. רוב התקשורת דרך וידאו, וואטסאפ וכלים מקוונים, ואפשר גם להיפגש פנים מול פנים באזור המרכז.',
  },
]

// Which printed heading each question is filed under. Questions that are not
// listed fall into the general section, so a new question in the JSON-LD still
// appears on the page instead of disappearing.
const SECTION_BY_QUESTION: Record<string, string> = {
  'כמה זמן לוקח לפתח אתר?': 'work',
  'איך תהליך העבודה נראה?': 'work',
  'האם אני יכול לראות את האתר בזמן הפיתוח?': 'work',
  'איפה אתה נמצא? האם אפשר להיפגש?': 'work',
  'האם אתה עובד עם עסקים קטנים?': 'work',
  'למה לבחור בך ולא בחברת פיתוח גדולה?': 'work',
  'האם אני צריך להבין בטכנולוגיה?': 'work',
  'מה ההבדל בין Next.js לוורדפרס?': 'tech',
  'איזה טכנולוגיות אתה משתמש בהן?': 'tech',
  'האם האתר יהיה מהיר?': 'tech',
  'האם האתר יהיה מאובטח?': 'tech',
  'האם האתר יופיע בגוגל?': 'tech',
  'האם אתה בונה אפליקציות מובייל?': 'services',
  'האם אתה בונה חנויות אונליין?': 'services',
  'האם אתה גם עושה שיווק דיגיטלי?': 'services',
  'מה קורה אם אני רוצה לשנות משהו אחרי שהאתר מוכן?': 'after',
  'מה כלול בחבילת התחזוקה?': 'after',
}

const SECTIONS: Array<{ id: string; label: string; heading: string }> = [
  { id: 'work', label: 'העבודה', heading: 'איך עובדים ביחד' },
  { id: 'tech', label: 'טכנולוגיה', heading: 'מה בונים ואיך' },
  { id: 'services', label: 'שירותים', heading: 'מה אפשר להזמין' },
  { id: 'after', label: 'אחרי המסירה', heading: 'אחריות ותחזוקה' },
]

/** Every question on the page, filed under its printed heading. */
export const faqSections = (): FaqSection[] => {
  const fromMarkup = seoConfig.structuredData.faqPage.mainEntity.map(
    (item: { name: string; acceptedAnswer: { text: string } }) => ({
      question: item.name,
      answer: item.acceptedAnswer.text,
      section: SECTION_BY_QUESTION[item.name] ?? 'work',
    }),
  )
  const all = [...fromMarkup, ...pageOnlyClauses]
  return SECTIONS.map((section) => ({
    ...section,
    clauses: all
      .filter((clause) => clause.section === section.id)
      .map(({ question, answer }) => ({ question, answer })),
  })).filter((section) => section.clauses.length > 0)
}

export const faqPageCopy = {
  title: 'שאלות',
  subtitle: 'ותשובות',
  description: 'מה שנשאל הכי הרבה לפני שמתחילים פרויקט, עם התשובות כפי שאני עונה אותן בשיחה.',
  clausesLabel: 'שאלות',
  sectionsLabel: 'נושאים',
  listLabel: 'שאלות ותשובות',
  ctaTitle: 'לא מצאתם את התשובה?',
  ctaText: 'שלחו את השאלה בוואטסאפ ותקבלו תשובה ישירה, בדרך כלל תוך שעה בשעות העבודה',
  ctaWhatsApp: 'שאלו בוואטסאפ',
  ctaContact: 'צור קשר',
  whatsAppMessage: 'היי, יש לי שאלה שלא מצאתי עליה תשובה באתר',
}
