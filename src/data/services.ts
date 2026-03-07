// Services data for service landing pages - Hebrew content
export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface ServiceProcess {
  step: number
  title: string
  description: string
  duration?: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface Service {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  icon: string
  lucideIcon: string // Lucide icon name for UI components
  color: string // Solid brand color: brand-blue, brand-orange, brand-green, brand-navy
  pattern: string // Background pattern: dots, circles, lines, waves, none
  accentColor: string // For decorative elements
  featured: boolean // Show on homepage (max 4)
  displayOrder: number // Sort order for lists
  features: ServiceFeature[]
  process: ServiceProcess[]
  technologies?: string[]
  portfolio: string[] // IDs from portfolio data
  faq: ServiceFAQ[]
  cta: {
    primary: string
    secondary: string
  }
  relatedServices?: string[] // IDs of related services for internal linking
  lastUpdated?: string // ISO date string for schema freshness signals
}

export const servicesData: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'פיתוח אתרים',
    tagline: 'אתר מהיר שמביא לקוחות — לא סתם כרטיס ביקור דיגיטלי',
    description: 'בניית אתרים מקצועיים עם הטכנולוגיות המתקדמות ביותר - Next.js, React, TypeScript. אתרים שנטענים תוך שנייה, מדורגים גבוה בגוגל וממירים מבקרים ללקוחות.',
    longDescription: 'מתמחה בפיתוח אתרים מודרניים עם Next.js 14 - הפריימוורק המוביל מבית Vercel. בניגוד לוורדפרס (שבו נמצאו 11,334 פרצות אבטחה ב-2025 לפי Patchstack), Next.js מציע מהירות יוצאת דופן, אבטחה מובנית וSEO מעולה. לפי מחקר של Google ו-Deloitte, שיפור של 0.1 שנייה במהירות האתר מגדיל המרות ב-8.4%. כל אתר שאני בונה מותאם למובייל מלכתחילה (63% מתעבורת האינטרנט מגיעה ממובייל לפי StatCounter 2025), תומך בעברית RTL ברמה הגבוהה ביותר, ומאופטם למנועי חיפוש מהיום הראשון.',
    icon: '💻',
    lucideIcon: 'Code2',
    color: 'brand-blue',
    pattern: 'dots',
    accentColor: 'brand-orange',
    featured: true,
    displayOrder: 3,
    features: [
      {
        icon: '⚡',
        title: 'מהירות יוצאת דופן',
        description: 'אתרים שנטענים תוך פחות משנייה. מהירות = SEO טוב יותר + חווית משתמש מעולה'
      },
      {
        icon: '🔒',
        title: 'אבטחה ללא פשרות',
        description: 'SSL מובנה, הגנה מפני התקפות, גיבויים אוטומטיים'
      },
      {
        icon: '📱',
        title: 'מובייל ראשון',
        description: 'עיצוב רספונסיבי מושלם. נראה ועובד מעולה על כל מכשיר'
      },
      {
        icon: '🔍',
        title: 'SEO מובנה',
        description: 'מבנה HTML תקין, מטא תגים, sitemap אוטומטי. גוגל יאהב את האתר'
      },
      {
        icon: '🌐',
        title: 'תמיכה מלאה בעברית',
        description: 'RTL מושלם, טיפוגרפיה עברית מקצועית'
      },
      {
        icon: '🎨',
        title: 'עיצוב מותאם אישית',
        description: 'לא תבניות גנריות. עיצוב ייחודי שמשקף את המותג שלך'
      }
    ],
    process: [
      {
        step: 1,
        title: 'פגישת היכרות',
        description: 'מבינים את העסק, הצרכים והמטרות. הפגישה חינם',
        duration: '1-2 שעות'
      },
      {
        step: 2,
        title: 'אפיון ותכנון',
        description: 'מכינים מסמך אפיון מפורט, מפת אתר, wireframes',
        duration: '3-5 ימים'
      },
      {
        step: 3,
        title: 'עיצוב UI/UX',
        description: 'מעצבים את האתר ב-Figma. גרסת מובייל ודסקטופ',
        duration: '5-7 ימים'
      },
      {
        step: 4,
        title: 'פיתוח',
        description: 'בניית האתר עם Next.js. רואה התקדמות בזמן אמת',
        duration: '2-3 שבועות'
      },
      {
        step: 5,
        title: 'בדיקות ו-QA',
        description: 'בדיקות על כל הדפדפנים והמכשירים',
        duration: '3-5 ימים'
      },
      {
        step: 6,
        title: 'השקה ותמיכה',
        description: 'העלאה לאוויר, הדרכה, תמיכה. אחריות 6 חודשים',
        duration: 'יום אחד'
      }
    ],
    technologies: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    portfolio: ['2', '3', '4'], // Lola Martin, The Fader, Tal Nadlan
    faq: [
      {
        question: 'מה ההבדל בין Next.js לוורדפרס?',
        answer: 'Next.js מציע מהירות פי 3-5 מוורדפרס, אבטחה טובה יותר, וגמישות מלאה. מתאים לעסקים שרוצים אתר מהיר ומאובטח.'
      },
      {
        question: 'כמה זמן לוקח לפתח אתר?',
        answer: 'אתר בסיסי: 2-3 שבועות. אתר מתקדם: 4-6 שבועות. כולל אפיון, עיצוב, פיתוח והעלאה.'
      },
      {
        question: 'מה כלול במחיר?',
        answer: 'אפיון, עיצוב UI/UX, פיתוח, SEO, העלאה, הדרכה, 6 חודשי אחריות, חודש תמיכה חינם.'
      },
      {
        question: 'האם האתר יהיה מהיר?',
        answer: 'בהחלט! כל אתר עובר אופטימיזציה מלאה. נטען תוך 1-2 שניות, ציון 90+ ב-PageSpeed.'
      }
    ],
    cta: {
      primary: 'קבל הצעת מחיר מותאמת',
      secondary: 'צפה בעבודות'
    },
    relatedServices: ['ui-ux-design', 'landing-pages', 'ecommerce'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'ecommerce',
    slug: 'ecommerce',
    name: 'חנויות אונליין',
    tagline: 'חנות אונליין שעובדת בשבילכם 24/7',
    description: 'בניית חנויות אונליין מותאמות עם מערכות תשלום ישראליות (Bit, PayBox), משלוחים, ניהול מלאי ודוחות.',
    longDescription: 'שוק המסחר האלקטרוני בישראל הגיע ל-$9.5 מיליארד ב-2024 (eCommerceDB) וצומח 8.1% בשנה. 59% מהקניות מתבצעות ממובייל (Statista, 2025) ושיעור נטישת עגלה ממוצע הוא 70.19% (Baymard Institute) - לכן חנות מותאמת עם UX מצוין היא קריטית. אני בונה חנויות עם שליטה מלאה, תשלומים ישראליים (Bit, PayBox), ללא עמלות חודשיות.',
    icon: '🛒',
    lucideIcon: 'ShoppingCart',
    color: 'brand-green',
    pattern: 'circles',
    accentColor: 'brand-blue',
    featured: false,
    displayOrder: 5,
    features: [
      {
        icon: '💳',
        title: 'תשלומים ישראליים',
        description: 'Bit, PayBox, Tranzila, Meshulam, כרטיסי אשראי'
      },
      {
        icon: '📦',
        title: 'ניהול מלאי',
        description: 'ניהול בזמן אמת, קטגוריות, וריאציות, תמונות'
      },
      {
        icon: '🚚',
        title: 'משלוחים ישראליים',
        description: 'דואר ישראל, Chita, Baldar. חישוב אוטומטי'
      },
      {
        icon: '🎟️',
        title: 'קופונים והנחות',
        description: 'מערכת קופונים, הנחות, מבצעים מתוזמנים'
      },
      {
        icon: '👥',
        title: 'אזור לקוחות',
        description: 'רישום, היסטוריית הזמנות, מעקב משלוחים'
      },
      {
        icon: '📊',
        title: 'דוחות',
        description: 'דוחות מכירות, מוצרים פופולריים, אנליטיקס'
      }
    ],
    process: [
      {
        step: 1,
        title: 'אפיון העסק',
        description: 'מבינים מוצרים, קהל יעד, תהליך מכירה',
        duration: '1-2 פגישות'
      },
      {
        step: 2,
        title: 'בחירת טכנולוגיה',
        description: 'ממליצים על פלטפורמה מתאימה',
        duration: '1 יום'
      },
      {
        step: 3,
        title: 'עיצוב החנות',
        description: 'עיצוב דפים, עגלה, קופה. דגש על המרה',
        duration: '1-2 שבועות'
      },
      {
        step: 4,
        title: 'פיתוח ואינטגרציות',
        description: 'בניה, תשלומים, משלוחים, ERP',
        duration: '3-5 שבועות'
      },
      {
        step: 5,
        title: 'העלאת מוצרים',
        description: 'קטלוג, תמונות, תיאורים, מחירים',
        duration: '1-2 שבועות'
      },
      {
        step: 6,
        title: 'בדיקות והשקה',
        description: 'בדיקות קנייה מקצה לקצה, הדרכה',
        duration: '1 שבוע'
      }
    ],
    technologies: ['Next.js', 'React', 'Stripe', 'Tranzila API', 'Bit API', 'PostgreSQL'],
    portfolio: ['1'], // Kitchen Optimizer
    faq: [
      {
        question: 'איזו פלטפורמה הכי טובה?',
        answer: 'תלוי בצרכים. פיתוח מותאם (Next.js) - שליטה מלאה, אין עמלות. Shopify - מוכן אבל יקר.'
      },
      {
        question: 'כמה זמן לוקח לבנות חנות?',
        answer: 'חנות בסיסית: 4-6 שבועות. חנות מתקדמת: 6-10 שבועות.'
      },
      {
        question: 'איך מחברים תשלומים?',
        answer: 'עובד עם Bit, PayBox, Tranzila. מלווה בכל התהליך.'
      },
      {
        question: 'האם יש עמלות על מכירה?',
        answer: 'בפיתוח מותאם - אין עמלות! רק עלויות תשלומים (2-3%).'
      }
    ],
    cta: {
      primary: 'בוא נדבר על החנות שלך',
      secondary: 'קרא מדריך מלא'
    },
    relatedServices: ['web-development', 'automations', 'crm-systems'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'crm-systems',
    slug: 'crm-systems',
    name: 'מערכות CRM',
    tagline: 'מאקסל ווואטסאפ למערכת שעושה סדר',
    description: 'מערכות CRM מותאמות אישית לניהול לקוחות, עסקאות, משימות ואוטומציה. שליטה מלאה במסע הלקוח.',
    longDescription: 'מערכת CRM מותאמת אישית היא לב העסק. לפי Nucleus Research, CRM מחזיר $8.71 על כל דולר שמושקע. עסקים עם CRM רואים עלייה של 29% במכירות ו-34% בפרודוקטיביות (Salesforce, 2024). במקום להסתדר עם פתרונות גנריים כמו HubSpot או Salesforce (47-55% מהטמעות CRM נכשלות לפי Forrester, בעיקר בגלל חוסר התאמה), אני בונה מערכות שמתאימות בדיוק לתהליכי העבודה שלך. ניהול לידים, מעקב אחר עסקאות, אוטומציות, תזכורות, דוחות - הכל במקום אחד. המערכת משתלבת עם הכלים הקיימים שלך (דואר, לוח שנה, WhatsApp Business) ונגישה מכל מכשיר.',
    icon: '📊',
    lucideIcon: 'BarChart3',
    color: 'brand-navy',
    pattern: 'lines',
    accentColor: 'brand-orange',
    featured: true,
    displayOrder: 1,
    features: [
      {
        icon: '👥',
        title: 'ניהול לקוחות מרכזי',
        description: 'כל המידע על הלקוח במקום אחד. היסטוריה, קבצים, הערות, עסקאות'
      },
      {
        icon: '💼',
        title: 'מעקב אחר עסקאות',
        description: 'משפך מכירות ויזואלי. גרור ושחרר. חישובים אוטומטיים'
      },
      {
        icon: '🤖',
        title: 'אוטומציות חכמות',
        description: 'תזכורות אוטומטיות, משימות, מיילים. חוסכת שעות עבודה'
      },
      {
        icon: '📧',
        title: 'אינטגרציית דואר',
        description: 'כל התכתבות עם הלקוח נשמרת אוטומטית במערכת'
      },
      {
        icon: '📈',
        title: 'דוחות ואנליטיקס',
        description: 'דוחות מכירות, ביצועי צוות, תחזיות. החלטות מבוססות נתונים'
      },
      {
        icon: '📱',
        title: 'נגיש מכל מקום',
        description: 'אפליקציה מותאמת למובייל. עבוד מהבית, מהלקוח, מכל מקום'
      }
    ],
    process: [
      {
        step: 1,
        title: 'מיפוי תהליכים',
        description: 'מבינים איך אתה עובד היום. מה עובד ומה לא',
        duration: '2-3 פגישות'
      },
      {
        step: 2,
        title: 'אפיון המערכת',
        description: 'מעצבים את המערכת שמתאימה לך. שדות, שלבים, אוטומציות',
        duration: '1-2 שבועות'
      },
      {
        step: 3,
        title: 'עיצוב ממשק',
        description: 'ממשק נקי ואינטואיטיבי. גם עובדים חדשים יבינו מיד',
        duration: '1 שבוע'
      },
      {
        step: 4,
        title: 'פיתוח ואינטגרציות',
        description: 'בניית המערכת, חיבור לדואר, לוח שנה, כלים נוספים',
        duration: '4-6 שבועות'
      },
      {
        step: 5,
        title: 'העברת נתונים',
        description: 'מעבירים את כל הנתונים מהמערכת הקודמת',
        duration: '3-5 ימים'
      },
      {
        step: 6,
        title: 'הדרכה והשקה',
        description: 'מדריך את הצוות, לווייה צמודה בשבועיים הראשונים',
        duration: '1-2 שבועות'
      }
    ],
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Prisma ORM', 'NextAuth.js', 'Resend API'],
    portfolio: [], // Will be added when CRM projects are completed
    faq: [
      {
        question: 'מה ההבדל בין CRM מותאם לבין מערכת מוכנה?',
        answer: 'מערכת מוכנה (HubSpot, Salesforce) גנרית ויקרה. מערכת מותאמת נבנית בדיוק לפי התהליכים שלך, ללא עמלות חודשיות.'
      },
      {
        question: 'כמה זמן לוקח לבנות מערכת CRM?',
        answer: 'תלוי במורכבות. מערכת בסיסית: 6-8 שבועות. מערכת מתקדמת: 10-14 שבועות. כולל אפיון, פיתוח, העברת נתונים והדרכה.'
      },
      {
        question: 'האם אפשר להוסיף תכונות אחרי ההשקה?',
        answer: 'בהחלט! זה היופי של מערכת מותאמת. אפשר להוסיף תכונות, לשנות תהליכים, להתאים למבנה הארגון.'
      },
      {
        question: 'איך עובדת האינטגרציה עם כלים אחרים?',
        answer: 'מחברים את המערכת לדואר (Gmail/Outlook), לוח שנה, WhatsApp Business, מערכות הנהלת חשבונות. הכל אוטומטי.'
      },
      {
        question: 'מה קורה עם הנתונים שלי?',
        answer: 'הנתונים שלך שייכים לך בלבד. מאוחסנים בשרתים מאובטחים בישראל או באירופה. גיבויים יומיים אוטומטיים.'
      },
      {
        question: 'האם הצוות שלי יצטרך הדרכה?',
        answer: 'ממשק אינטואיטיבי לא דורש הרבה הדרכה. מספק הדרכה מקיפה בהשקה + מדריכי וידאו + תמיכה שוטפת.'
      }
    ],
    cta: {
      primary: 'בוא נדבר על המערכת שלך',
      secondary: 'למד עוד על CRM'
    },
    relatedServices: ['automations', 'web-development', 'mobile-apps'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    name: 'עיצוב UI/UX',
    tagline: 'עיצוב שמרגיש נכון ומעודד פעולה',
    description: 'עיצוב ממשקים ומסעות משתמש עם דגש על המרה. מבוסס על מחקר, נתונים ועקרונות פסיכולוגיה.',
    longDescription: 'עיצוב טוב הוא לא רק יפה - הוא עובד. לפי Forrester Research, כל $1 שמושקע ב-UX מחזיר $100. משתמשים מגבשים דעה על אתר תוך 50 מילישניות בלבד (Carleton University, 2006), ו-75% מהצרכנים שופטים אמינות עסק לפי עיצוב האתר (Stanford University). חברות מובלות עיצוב הכו את מדד S&P 500 ב-211% לאורך 10 שנים (Design Management Institute). הגישה שלי מבוססת על מחקר, נתונים ופסיכולוגיה של המרה. אני עובד עם Figma ומתמחה בעיצוב ממשקים מורכבים. כל עיצוב עובר בדיקות עם 5 משתמשים - מספיק לגלות 85% מבעיות השימושיות (Nielsen Norman Group).',
    icon: '🎨',
    lucideIcon: 'Palette',
    color: 'brand-orange',
    pattern: 'waves',
    accentColor: 'brand-blue',
    featured: false,
    displayOrder: 6,
    features: [
      {
        icon: '🔍',
        title: 'מחקר משתמשים',
        description: 'מבין מי הלקוחות שלך ומה הם צריכים. לא משערים'
      },
      {
        icon: '📱',
        title: 'עיצוב רספונסיבי',
        description: 'כל מסך מעוצב בנפרד. לא סתם התאמה למובייל'
      },
      {
        icon: '🎯',
        title: 'אופטימיזציה להמרה',
        description: 'כל אלמנט מעוצב כדי להוביל לפעולה. CRO מובנה'
      },
      {
        icon: '♿',
        title: 'נגישות מלאה',
        description: 'עיצוב נגיש לכולם. עומד בתקני WCAG 2.1'
      },
      {
        icon: '🧪',
        title: 'בדיקות משתמשים',
        description: 'מבדיקים את העיצוב עם משתמשים אמיתיים לפני פיתוח'
      },
      {
        icon: '📐',
        title: 'מערכת עיצוב',
        description: 'Design system מלא. עקביות מושלמת בכל העמודים'
      }
    ],
    process: [
      {
        step: 1,
        title: 'מחקר והבנה',
        description: 'מנתח את הקהל יעד, מתחרים, ומטרות העסק',
        duration: '3-5 ימים'
      },
      {
        step: 2,
        title: 'אפיון מסעות משתמש',
        description: 'מתכנן User flows, Wireframes, מפת האתר',
        duration: '5-7 ימים'
      },
      {
        step: 3,
        title: 'עיצוב ויזואלי',
        description: 'מעצב ב-Figma. גרסאות מובייל + דסקטופ',
        duration: '1-2 שבועות'
      },
      {
        step: 4,
        title: 'בדיקות משתמשים',
        description: 'בודק עם 3-5 משתמשים אמיתיים. משפר',
        duration: '3-5 ימים'
      },
      {
        step: 5,
        title: 'Design System',
        description: 'בונה ספריית קומפוננטים לפיתוח עקבי',
        duration: '3-5 ימים'
      },
      {
        step: 6,
        title: 'מסירה למפתחים',
        description: 'קבצי Figma מושלמים, מדריכי סטייל, ליווי הפיתוח',
        duration: 'שוטף'
      }
    ],
    technologies: ['Figma', 'Adobe XD', 'FigJam', 'Miro', 'Maze', 'Hotjar'],
    portfolio: ['2', '3', '4'], // Portfolio items with strong design
    faq: [
      {
        question: 'מה ההבדל בין UI ל-UX?',
        answer: 'UI = ממשק (איך זה נראה). UX = חוויה (איך זה עובד). שניהם חשובים באותה המידה להצלחה.'
      },
      {
        question: 'כמה זמן לוקח עיצוב?',
        answer: 'אתר בסיסי: 2-3 שבועות. אתר מורכב: 4-6 שבועות. כולל מחקר, עיצוב, בדיקות ותיקונים.'
      },
      {
        question: 'מה כלול בשירות העיצוב?',
        answer: 'מחקר, אפיון, Wireframes, עיצוב ויזואלי (כל העמודים), בדיקות משתמשים, Design System, קבצי Figma.'
      },
      {
        question: 'האם אני מקבל את קבצי Figma?',
        answer: 'בהחלט! אתה מקבל גישה מלאה לכל קבצי Figma + הסבר על שימוש במערכת העיצוב.'
      },
      {
        question: 'איך אתה בודק את העיצוב?',
        answer: 'בודק עם משתמשים אמיתיים דרך Maze או UserTesting. גם מנתח Heatmaps ו-Session recordings אם יש אתר קיים.'
      },
      {
        question: 'מה אם אני רוצה שינויים אחרי העיצוב?',
        answer: 'כלול סבב תיקונים אחד. שינויים נוספים אפשריים במחיר מופחת (שעתי).'
      }
    ],
    cta: {
      primary: 'בוא נעצב משהו מדהים',
      secondary: 'צפה בעיצובים שלי'
    },
    relatedServices: ['web-development', 'landing-pages', 'mobile-apps'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'landing-pages',
    slug: 'landing-pages',
    name: 'דפי נחיתה',
    tagline: 'דף אחד ממוקד שהופך מבקרים ללקוחות',
    description: 'דפי נחיתה ממירים לקמפיינים, השקות מוצרים ומבצעים. עיצוב + פיתוח מהיר תוך 3-7 ימים.',
    longDescription: 'דף נחיתה טוב הוא מכונת המרה. שיעור ההמרה החציוני בדפי נחיתה הוא 6.6% (Unbounce, 2024 - 41,000 דפים, 464 מיליון מבקרים), ודפים בשפה פשוטה ממירים 11.1% לעומת 5.3% בשפה מורכבת. בניגוד לאתר מלא, דף נחיתה ממוקד במטרה אחת: להביא לפעולה. אני בונה דפי נחיתה מהירים (נטענים תוך שנייה - כי 53% מהמבקרים עוזבים אחרי 3 שניות, Google), ממירים (עיצוב CRO) ומאופטמים למודעות. כל דף כולל A/B Testing (שיפור של עד 30% בהמרות לפי VWO), אנליטיקס מתקדם ואופטימיזציה שוטפת.',
    icon: '🎯',
    lucideIcon: 'Target',
    color: 'brand-orange',
    pattern: 'none',
    accentColor: 'brand-green',
    featured: false,
    displayOrder: 7,
    features: [
      {
        icon: '⚡',
        title: 'בנייה מהירה',
        description: '3-7 ימים מרעיון לדף חי. מושלם לקמפיינים'
      },
      {
        icon: '💰',
        title: 'אופטימיזציה להמרה',
        description: 'עיצוב מבוסס CRO. כל אלמנט בדוק וממיר'
      },
      {
        icon: '📊',
        title: 'אנליטיקס מתקדם',
        description: 'מעקב אחר כל קליק. יודע מה עובד ומה לא'
      },
      {
        icon: '🧪',
        title: 'A/B Testing',
        description: 'בודק גרסאות שונות. משפר ללא הפסקה'
      },
      {
        icon: '📱',
        title: 'מותאם למובייל',
        description: '80% מהמודעות נפתחות במובייל. הדף שלכם מוכן'
      },
      {
        icon: '🔗',
        title: 'אינטגרציות',
        description: 'חיבור ישיר ל-CRM, אימייל, מערכות תשלום'
      }
    ],
    process: [
      {
        step: 1,
        title: 'בריפינג מהיר',
        description: 'מבין את המטרה, המוצר, קהל היעד והקמפיין',
        duration: '1 שעה'
      },
      {
        step: 2,
        title: 'אפיון ותכנון',
        description: 'מגדיר מסר, CTA, מבנה דף, אלמנטים ממירים',
        duration: '1-2 ימים'
      },
      {
        step: 3,
        title: 'עיצוב',
        description: 'עיצוב ב-Figma מהיר ומדויק. מובייל + דסקטופ',
        duration: '1-2 ימים'
      },
      {
        step: 4,
        title: 'פיתוח',
        description: 'בניית הדף עם Next.js. מהיר ומאובטח',
        duration: '2-3 ימים'
      },
      {
        step: 5,
        title: 'בדיקות',
        description: 'בדיקה על כל הדפדפנים והמכשירים',
        duration: '1 יום'
      },
      {
        step: 6,
        title: 'השקה ואופטימיזציה',
        description: 'העלאה, חיבור אנליטיקס, ניטור ושיפור',
        duration: 'שוטף'
      }
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Google Analytics', 'Hotjar'],
    portfolio: ['3', '4'], // Landing page style projects
    faq: [
      {
        question: 'מה ההבדל בין דף נחיתה לאתר רגיל?',
        answer: 'דף נחיתה ממוקד במטרה אחת (רכישה, רישום). אתר מספק מידע רחב יותר. לקמפיינים - דף נחיתה עדיף.'
      },
      {
        question: 'כמה זמן לוקח לבנות דף נחיתה?',
        answer: 'דף פשוט: 3-5 ימים. דף מורכב: 5-7 ימים. כולל עיצוב, פיתוח, בדיקות והעלאה.'
      },
      {
        question: 'איך אתה משפר את שיעור ההמרה?',
        answer: 'עיצוב מבוסס CRO + A/B Testing + ניתוח נתונים. בודק כל אלמנט (כותרות, CTA, צבעים) ומשפר.'
      },
      {
        question: 'האם אפשר לשנות את הדף אחרי ההשקה?',
        answer: 'בהחלט! חלק מהשירות. משנה תוכן, תמונות, CTA לפי הנתונים. אופטימיזציה שוטפת.'
      },
      {
        question: 'איך מודדים הצלחה?',
        answer: 'מעקב אחר: שיעור המרה, מקור תנועה, זמן בדף, נקודות נטישה. דוח מפורט כל שבוע.'
      },
      {
        question: 'האם זה מתאים לקמפיין חד-פעמי?',
        answer: 'בהחלט! דפי נחיתה מושלמים למבצעים, השקות מוצרים, אירועים. בנייה מהירה + תוצאות מיידיות.'
      }
    ],
    cta: {
      primary: 'בוא נבנה דף שממיר',
      secondary: 'ראה דוגמאות'
    },
    relatedServices: ['ui-ux-design', 'web-development', 'automations'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'automations',
    slug: 'automations',
    name: 'אוטומציות',
    tagline: 'תנו למחשב לעשות את העבודה המשעממת',
    description: 'אוטומציה של תהליכים עסקיים, חיבור בין מערכות קיימות, והפחתת עבודה ידנית חוזרת.',
    longDescription: 'תפסיקו לעשות ידנית מה שמחשב יכול לעשות בשבילכם. לפי Zapier, אוטומציה יכולה לחסוך 240 שעות בשנה לעובד. 60% מהארגונים משיגים ROI תוך 12 חודשים מהטמעת אוטומציה (Kissflow, 2025). הזנת נתונים ידנית כוללת שיעור שגיאות של 1-4%, לעומת 0.01-0.04% במערכות אוטומטיות (Quality Magazine, 2024). אני מחבר בין הכלים שאתם כבר משתמשים בהם (Gmail, Google Sheets, WhatsApp, CRM) ויוצר תהליכים שעובדים בלי מגע יד אדם.',
    icon: '⚡',
    lucideIcon: 'Zap',
    color: 'brand-green',
    pattern: 'waves',
    accentColor: 'brand-blue',
    featured: true,
    displayOrder: 2,
    features: [
      {
        icon: '🔗',
        title: 'חיבור מערכות',
        description: 'מחברים Gmail, Sheets, CRM, WhatsApp - הכל עובד ביחד'
      },
      {
        icon: '⏰',
        title: 'חיסכון בזמן',
        description: 'משימות שלוקחות שעות נעשות תוך שניות, אוטומטית'
      },
      {
        icon: '🤖',
        title: 'תהליכים אוטומטיים',
        description: 'מיילים, תזכורות, עדכונים - בלי מגע יד'
      },
      {
        icon: '📊',
        title: 'דוחות אוטומטיים',
        description: 'דוחות יומיים/שבועיים נשלחים אליכם אוטומטית'
      },
      {
        icon: '🔔',
        title: 'התראות חכמות',
        description: 'קבלו התראה כשמשהו חשוב קורה בעסק'
      },
      {
        icon: '💡',
        title: 'ללא קוד',
        description: 'אתם יכולים לשנות ולהתאים בעצמכם אחרי ההדרכה'
      }
    ],
    process: [
      {
        step: 1,
        title: 'מיפוי תהליכים',
        description: 'מבינים מה אתם עושים ידנית ומה אפשר לאוטמט',
        duration: '1-2 פגישות'
      },
      {
        step: 2,
        title: 'תכנון האוטומציה',
        description: 'מתכננים את התהליך האוטומטי - מה מפעיל מה',
        duration: '2-3 ימים'
      },
      {
        step: 3,
        title: 'בניית חיבורים',
        description: 'מחברים את המערכות שלכם (APIs, Webhooks)',
        duration: '3-5 ימים'
      },
      {
        step: 4,
        title: 'בניית האוטומציה',
        description: 'בונים את התהליך האוטומטי ב-Make/Zapier/n8n',
        duration: '1-2 שבועות'
      },
      {
        step: 5,
        title: 'בדיקות',
        description: 'מריצים בדיקות, מתקנים edge cases',
        duration: '3-5 ימים'
      },
      {
        step: 6,
        title: 'הדרכה והשקה',
        description: 'מדריכים אתכם איך לנטר ולשנות בעצמכם',
        duration: '1-2 ימים'
      }
    ],
    technologies: ['Make (Integromat)', 'Zapier', 'n8n', 'Custom APIs', 'Webhooks', 'Google Apps Script'],
    portfolio: [],
    faq: [
      {
        question: 'מה אפשר לאוטמט?',
        answer: 'כמעט הכל! שליחת מיילים, עדכון גיליונות, יצירת חשבוניות, תזכורות ללקוחות, סנכרון בין מערכות, דוחות אוטומטיים.'
      },
      {
        question: 'איזה כלים אתם משתמשים?',
        answer: 'Make (Integromat), Zapier, n8n - תלוי בצרכים. גם פיתוח מותאם עם APIs כשצריך.'
      },
      {
        question: 'כמה זמן לוקח לבנות אוטומציה?',
        answer: 'אוטומציה פשוטה: 3-5 ימים. מערכת מורכבת: 2-4 שבועות. תלוי במספר המערכות והחיבורים.'
      },
      {
        question: 'האם זה עולה כסף חודשי?',
        answer: 'הכלים (Make/Zapier) עולים $20-50 לחודש בממוצע. עבודת הבנייה היא חד פעמית.'
      },
      {
        question: 'מה קורה אם משהו נשבר?',
        answer: 'מובנות התראות על תקלות + תמיכה שוטפת. רוב הבעיות נפתרות תוך שעות.'
      },
      {
        question: 'האם אני יכול לשנות בעצמי?',
        answer: 'בהחלט! מדריך אתכם להשתמש בכלים. שינויים קטנים תוכלו לעשות לבד.'
      }
    ],
    cta: {
      primary: 'בוא נחסוך לך זמן',
      secondary: 'ראה דוגמאות'
    },
    relatedServices: ['crm-systems', 'ecommerce', 'web-development'],
    lastUpdated: '2026-03-06'
  },

  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    name: 'אפליקציות מובייל',
    tagline: 'אפליקציה אחת שעובדת על כל מכשיר',
    description: 'פיתוח אפליקציות מובייל Cross-Platform עם React Native. אפליקציה אחת שעובדת על כל המכשירים.',
    longDescription: 'אפליקציות מובייל שנראות ומרגישות נייטיביות - גם ב-iOS וגם ב-Android. React Native חוסך 30-40% בעלויות ו-40% בזמן פיתוח לעומת Native (HashStudioz/Binmile, 2025), ומחזיק 35% מנתח שוק הפריימוורקים חוצי-פלטפורמות (Stack Overflow Developer Survey, 2024). אני משתמש ב-React Native ו-Expo כדי לפתח אפליקציה אחת שעובדת על כל המכשירים. טיפ: משתמשים שמקבלים Push Notifications ב-90 הימים הראשונים נשמרים פי 3 יותר (Airship, 2025).',
    icon: '📱',
    lucideIcon: 'Smartphone',
    color: 'brand-navy',
    pattern: 'dots',
    accentColor: 'brand-orange',
    featured: true,
    displayOrder: 4,
    features: [
      {
        icon: '🍎',
        title: 'iOS + Android',
        description: 'אפליקציה אחת שעובדת על כל המכשירים'
      },
      {
        icon: '⚡',
        title: 'ביצועים נייטיביים',
        description: 'מהירות וחלקות כמו אפליקציה נייטיבית'
      },
      {
        icon: '🔔',
        title: 'Push Notifications',
        description: 'התראות לייב ללקוחות שלכם'
      },
      {
        icon: '📍',
        title: 'מיקום ומפות',
        description: 'GPS, מפות, ניווט - מובנה באפליקציה'
      },
      {
        icon: '📷',
        title: 'מצלמה וגלריה',
        description: 'גישה למצלמה, העלאת תמונות, סריקה'
      },
      {
        icon: '🏪',
        title: 'העלאה לחנויות',
        description: 'מטפל בכל תהליך ההעלאה ל-App Store ו-Google Play'
      }
    ],
    process: [
      {
        step: 1,
        title: 'אפיון האפליקציה',
        description: 'מגדירים פיצ\'רים, מסכים, User flows',
        duration: '1-2 שבועות'
      },
      {
        step: 2,
        title: 'עיצוב UI/UX',
        description: 'עיצוב כל המסכים ב-Figma. iOS + Android',
        duration: '2-3 שבועות'
      },
      {
        step: 3,
        title: 'פיתוח',
        description: 'בניית האפליקציה עם React Native',
        duration: '6-10 שבועות'
      },
      {
        step: 4,
        title: 'Backend ו-API',
        description: 'בניית השרת ומסד הנתונים',
        duration: '2-4 שבועות'
      },
      {
        step: 5,
        title: 'בדיקות',
        description: 'בדיקות על מכשירים אמיתיים, תיקון באגים',
        duration: '2-3 שבועות'
      },
      {
        step: 6,
        title: 'השקה בחנויות',
        description: 'העלאה ל-App Store ו-Google Play',
        duration: '1-2 שבועות'
      }
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Node.js', 'PostgreSQL'],
    portfolio: [],
    faq: [
      {
        question: 'מה ההבדל בין React Native לפיתוח נייטיבי?',
        answer: 'React Native מאפשר לפתח אפליקציה אחת ל-iOS ו-Android, במקום שתיים נפרדות. חוסך 40-60% בעלויות ובזמן פיתוח.'
      },
      {
        question: 'כמה זמן לוקח לפתח אפליקציה?',
        answer: 'אפליקציה בסיסית: 2-3 חודשים. אפליקציה מורכבת: 4-6 חודשים. כולל עיצוב, פיתוח, בדיקות והעלאה לחנויות.'
      },
      {
        question: 'מה כלול במחיר?',
        answer: 'אפיון, עיצוב UI/UX, פיתוח (iOS + Android), Backend, בדיקות, העלאה לחנויות, 3 חודשי תמיכה.'
      },
      {
        question: 'האם אתם מטפלים בהעלאה לחנויות?',
        answer: 'כן! מטפל בכל התהליך - פתיחת חשבונות מפתח, הכנת Assets, העלאה, טיפול בדחיות אם יש.'
      },
      {
        question: 'מה לגבי עדכונים אחרי ההשקה?',
        answer: 'מציע חבילות תחזוקה חודשיות. תיקוני באגים, עדכוני אבטחה, פיצ\'רים חדשים.'
      },
      {
        question: 'האם אפשר להוסיף פיצ\'רים בהמשך?',
        answer: 'בהחלט! הארכיטקטורה מתוכננת להרחבה. אפשר להוסיף פיצ\'רים בכל שלב.'
      }
    ],
    cta: {
      primary: 'בוא נבנה אפליקציה',
      secondary: 'ראה דוגמאות'
    },
    relatedServices: ['ui-ux-design', 'crm-systems', 'automations'],
    lastUpdated: '2026-03-06'
  }
]

// Legacy export for compatibility
export const services = servicesData.map(s => ({
  id: s.id,
  icon: s.icon,
  title: s.name,
  description: s.description,
  features: s.features.map(f => f.title)
}))

export const getServiceBySlug = (slug: string): Service | undefined => {
  return servicesData.find(service => service.slug === slug)
}

export const getAllServices = (): Service[] => {
  return servicesData
}

// Get featured services for homepage (sorted by displayOrder)
export const getFeaturedServices = (): Service[] => {
  return servicesData
    .filter(s => s.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

// Get all services sorted by displayOrder
export const getAllServicesSorted = (): Service[] => {
  return [...servicesData].sort((a, b) => a.displayOrder - b.displayOrder)
}

// Get service links for footer/navigation
export const getServiceLinks = (): { label: string; href: string; slug: string }[] => {
  return getAllServicesSorted().map(s => ({
    label: s.name,
    href: `/services/${s.slug}`,
    slug: s.slug
  }))
}

// Get related services for a given service
export const getRelatedServices = (serviceId: string): Service[] => {
  const service = servicesData.find(s => s.id === serviceId)
  if (!service?.relatedServices) return []

  return service.relatedServices
    .map(id => servicesData.find(s => s.id === id))
    .filter((s): s is Service => s !== undefined)
}

export default servicesData
