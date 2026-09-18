// About page copy (Carbon Order Pad).
// Carried over from content.ts, minus the unconfirmed figures: the story's
// "5 years / 100+ systems / 50+ businesses", the achievement cards
// ("מעל 50", "100% שביעות רצון", "30% גידול בהכנסות"), the PageSpeed and
// hours-saved line, and the self-rated skill bars (all removed 2026-09-17).
import { content } from './content'

export const aboutPage = {
  name: content.about.intro.title,
  role: content.about.intro.role,
  intro: content.about.intro.description,
  whatsappMessage: 'היי, קראתי עליך ואשמח לשמוע עוד',
  whatsappCta: 'דברו איתי בוואטסאפ',

  card: {
    title: 'כרטיס ביקור',
    facts: [
      { label: 'מי', value: 'מפתח עצמאי, אדם אחד' },
      { label: 'מאיפה', value: 'רמת גן, עובד עם לקוחות מכל הארץ' },
      { label: 'שפות', value: 'עברית ואנגלית, ממשקים ב-RTL מלא' },
      { label: 'קו ישיר', value: 'וואטסאפ, בלי מוקד שירות' },
    ],
  },

  story: {
    title: content.about.story.title,
    paragraphs: [
      'אני איתי, מפתח עצמאי מרמת גן. אני בונה מערכות, אתרים וחנויות לעסקים קטנים בישראל: מסעדות, נדל"ן, חנויות, אקדמיות ועוד.',
      content.about.story.paragraph2,
    ],
    missionTitle: content.about.mission.title,
    mission: content.about.mission.description,
  },

  process: {
    title: content.about.services.title,
    steps: content.about.services.process.map((step) => ({ title: step.title, description: step.description })),
  },

  values: {
    title: content.about.values.title,
    subtitle: content.about.values.subtitle,
    items: [
      { title: 'תמיד זמין', description: 'עונה בוואטסאפ, בדרך כלל תוך שעה. נסו את זה עם סוכנות.' },
      { title: 'מדבר בעברית פשוטה', description: 'בלי ז\'רגון. מסביר מה נבנה, למה, ומה זה אומר לעסק שלכם.' },
      { title: 'עומד במילה', description: 'לוח זמנים ומחיר סגורים מראש. אם יש שינוי תדעו על כך מראש.' },
      { title: 'בלי הפתעות בחשבון', description: 'מחיר שמתאים לעסק שלכם, ללא תוספות מפתיעות.' },
    ],
  },

  tools: {
    title: content.about.expertise.title,
    subtitle: content.about.expertise.subtitle,
    groups: [
      { label: 'אתרים ואפליקציות', items: ['Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind CSS'] },
      { label: 'שרת ונתונים', items: ['Node.js', 'PostgreSQL', 'Supabase', 'Prisma', 'REST API'] },
      { label: 'עיצוב ותשתית', items: ['Figma', 'Framer Motion', 'Vercel', 'Git'] },
    ],
  },

  work: { title: 'עבודות אחרונות', subtitle: 'מערכות ואתרים שעובדים היום בעסקים', allLabel: 'לכל תיק העבודות' },

  close: {
    title: content.about.cta.title,
    subtitle: content.about.cta.subtitle,
    button: content.about.cta.button,
    signatureLabel: 'חתימת המבצע',
  },
} as const
