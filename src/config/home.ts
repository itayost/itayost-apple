// Homepage copy for the Carbon Order Pad design.
// Existing hero, CTA and contact wording is reused from content.ts so the
// strings that already rank and convert stay identical.
import { content } from './content'

export interface ChaosNote {
  text: string
  struck?: boolean
  /** A fragment of the note the owner circled in pen. */
  circled?: string
}

export interface AppNavItem {
  key: string
  label: string
  badge?: number
}

export interface AppStat {
  key: 'leads' | 'calendar' | 'revenue' | 'customers'
  label: string
  value: string
  delta: string
}

export type AppTone = 'blue' | 'green' | 'violet' | 'orange' | 'red'

/** Demonstration activity for the hero manager app. Synthetic; labeled as an example on the page. */
export interface AppActivity {
  tone: AppTone
  icon: 'lead' | 'payment' | 'whatsapp' | 'quote' | 'calendar'
  title: string
  detail: string
  time: string
}

export interface AppQuickStat {
  label: string
  value: number
  tone: 'blue' | 'green' | 'orange'
}

export interface AppAppointment {
  time: string
  label: string
}

export interface PainLine {
  pain: string
  fix: string
  href: string
  linkLabel: string
}

export const home = {
  hero: {
    formTitle: 'הזמנת עבודה',
    formNumber: '0147',
    title: [content.hero.title.line1, content.hero.title.line2],
    subtitle: content.hero.subtitle,
    lead: 'לידים בוואטסאפ, הזמנות באקסל, תזכורות בראש. אני בונה לעסק שלכם מערכת אחת שמסדרת את זה.',
    ctaPrimary: content.hero.cta.primary,
    ctaSecondary: content.hero.cta.secondary,
    replyStamp: 'מענה תוך שעה',
    sheetLabel: 'הדף של היום',
    exampleLabel: 'דוגמה להמחשה',
    chaos: [
      { text: 'לחזור לרונית!! שאלה על מחיר' },
      { text: 'ליד מאינסטגרם - מי זה??' },
      { text: 'דני שילם? לבדוק באקסל', struck: true },
      { text: 'להזכיר למשה על התור מחר' },
      { text: 'הזמנה 3 - איפה הפתק?' },
      { text: 'ספק ירקות - לשלם 1,800 עד חמישי', circled: '1,800' },
      { text: 'מי ביטל את התור של 14:00?' },
      { text: 'להעביר הכל לאקסל!!!' },
    ] satisfies ChaosNote[],
    app: {
      business: 'העסק שלך',
      plan: 'מערכת ניהול',
      title: 'לוח בקרה',
      greeting: 'בוקר טוב, הנה מה שקורה בעסק היום',
      nav: [
        { key: 'dashboard', label: 'לוח בקרה' },
        { key: 'leads', label: 'לידים', badge: 3 },
        { key: 'customers', label: 'לקוחות' },
        { key: 'calendar', label: 'יומן' },
        { key: 'orders', label: 'הזמנות', badge: 2 },
        { key: 'automations', label: 'אוטומציות' },
        { key: 'reports', label: 'דוחות' },
      ] satisfies AppNavItem[],
      accountLabel: 'חשבון',
      accountNav: [
        { key: 'settings', label: 'הגדרות' },
        { key: 'help', label: 'עזרה ותמיכה' },
      ] satisfies AppNavItem[],
      collapseLabel: 'הסתר',
      stats: [
        { key: 'leads', label: 'פניות היום', value: '12', delta: '+4 מאתמול' },
        { key: 'calendar', label: 'תורים השבוע', value: '38', delta: '+9% מהשבוע שעבר' },
        { key: 'revenue', label: 'הכנסות החודש', value: '₪24,560', delta: '+12% מהחודש שעבר' },
        { key: 'customers', label: 'לקוחות פעילים', value: '214', delta: '+6 חדשים השבוע' },
      ] satisfies AppStat[],
      activityTitle: 'פעילות אחרונה',
      activityAll: 'הצג הכל',
      activity: [
        { tone: 'blue', icon: 'lead', title: 'ליד חדש מאינסטגרם', detail: 'נועה ברק, נקלטה אוטומטית', time: 'לפני 2 דק׳' },
        { tone: 'green', icon: 'payment', title: 'תשלום התקבל', detail: 'דני לוי, ₪2,100, חשבונית הופקה', time: 'לפני 12 דק׳' },
        { tone: 'violet', icon: 'whatsapp', title: 'תזכורת נשלחה בוואטסאפ', detail: 'משה אברהם, תור מחר 11:30', time: 'לפני שעה' },
        { tone: 'orange', icon: 'quote', title: 'הצעת מחיר נשלחה', detail: 'רונית כהן, ₪4,800', time: 'לפני שעתיים' },
        { tone: 'red', icon: 'calendar', title: 'תור בוטל, הוצע תור חלופי', detail: 'אורי דהן, 14:00', time: 'לפני 3 שעות' },
      ] satisfies AppActivity[],
      quickTitle: 'מבט מהיר',
      quick: [
        { label: 'אחוז סגירת לידים', value: 38, tone: 'blue' },
        { label: 'תפוסת יומן', value: 86, tone: 'green' },
        { label: 'מענה בוואטסאפ תוך שעה', value: 92, tone: 'orange' },
      ] satisfies AppQuickStat[],
      upcomingTitle: 'היום ביומן',
      upcoming: [
        { time: '10:00', label: 'רונית כהן, פגישת ייעוץ' },
        { time: '11:30', label: 'משה אברהם, טיפול' },
        { time: '14:00', label: 'נועה ברק, שיחת היכרות' },
        { time: '16:30', label: 'יעל שמש, איסוף הזמנה' },
      ] satisfies AppAppointment[],
    },
  },

  pains: {
    title: 'מכירים את הדף הזה?',
    intro: 'כל שורה כאן היא עוד שעה שהלכה לאיבוד. וכל שורה היא גם משהו שאפשר לבנות.',
    painColumn: 'מה קורה היום',
    fixColumn: 'מה נבנה',
    lines: [
      {
        pain: 'לידים נקברים בוואטסאפ',
        fix: 'מערכת CRM שמרכזת כל פנייה במקום אחד, עם סטטוס ותזכורת',
        href: '/services/crm-systems',
        linkLabel: 'מערכות CRM',
      },
      {
        pain: 'תזכורות, הודעות וחשבוניות ביד',
        fix: 'אוטומציות שעושות את זה לבד, בזמן, בלי לשכוח אף אחד',
        href: '/services/automations',
        linkLabel: 'אוטומציות',
      },
      {
        pain: 'יש אתר, אבל הוא לא מביא פניות',
        fix: 'אתר מהיר שבנוי להביא לקוחות, לא כרטיס ביקור',
        href: '/services/web-development',
        linkLabel: 'פיתוח אתרים',
      },
      {
        pain: 'משלמים על קמפיין ואין דף שממיר',
        fix: 'דף נחיתה ממוקד, עם טופס שנכנס ישר למערכת',
        href: '/services/landing-pages',
        linkLabel: 'דפי נחיתה',
      },
      {
        pain: 'לקוחות רוצים להזמין מהטלפון',
        fix: 'אפליקציה או חנות אונליין שמחוברת לניהול העסק',
        href: '/services/mobile-apps',
        linkLabel: 'אפליקציות',
      },
    ] satisfies PainLine[],
  },

  services: {
    title: 'מה נבנה לכם?',
    intro: 'כל עסק הוא ייחודי. אתאים עבורכם פתרון מדויק, בלי תבניות מוכנות מראש.',
    allLabel: 'כל השירותים',
  },

  work: {
    title: 'עבודות אמיתיות, לקוחות אמיתיים',
    intro: 'העתקים מהתיק: מערכות שעובדות כל יום בעסקים, ואתרים שמביאים להם לקוחות.',
    allLabel: 'לכל תיק העבודות',
    // Systems first, then sites. Slugs from src/data/portfolio.ts.
    slugs: ['garden-of-eden', 'ta-crm', 'kitchen-optimizer', 'amit-eyebrows', 'lola-martin', 'futurekids-shop'],
  },

  person: {
    title: ['אדם אחד.', 'לא סוכנות.'],
    body: content.about.story.paragraph2,
    stepsTitle: 'איך זה עובד',
    signatureLabel: 'חתימת המבצע',
    signature: 'איתי אוסטרייך',
    role: 'מפתח עצמאי, רמת גן',
    aboutLabel: 'עוד עליי',
  },

  notes: {
    title: 'מהבלוג',
    intro: 'מאמרים, טיפים ומדריכים לבעלי עסקים',
    allLabel: 'לכל המאמרים',
  },

  contact: {
    title: 'יש לכם שאלה? רעיון? אתגר?',
    body: 'אני אשמח לשמוע. שיחה קצרה בלי התחייבות, ואני אגיד לכם אם ואיך אפשר לעזור.',
    cta: 'שלחו הודעה ואחזור תוך שעה',
    note: 'משתדל לחזור אליכם תוך שעה בשעות הפעילות',
    phone: '054-499-4417',
    email: 'itay@itayost.com',
    whatsappLabel: 'וואטסאפ',
    whatsappValue: 'שלחו הודעה',
    phoneLabel: 'טלפון',
    emailLabel: 'אימייל',
  },
} as const
