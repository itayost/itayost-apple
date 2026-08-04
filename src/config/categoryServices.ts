// Category -> service mapping: single source of truth for every blog CTA
// (inline, sidebar) that derives a service page from a post's category.
// serviceId must be a real /services/[slug] route.

export interface CategoryService {
  serviceId: string
  serviceName: string
  ctaMessage: string
}

export const categoryServiceMap: Record<string, CategoryService> = {
  'פיתוח אתרים': {
    serviceId: 'web-development',
    serviceName: 'פיתוח אתרים',
    ctaMessage: 'רוצים אתר מקצועי שמביא תוצאות?',
  },
  'טכנולוגיה': {
    serviceId: 'web-development',
    serviceName: 'פתרונות טכנולוגיים',
    ctaMessage: 'צריכים פתרון טכנולוגי מותאם?',
  },
  'מדריכים': {
    serviceId: 'web-development',
    serviceName: 'שירותי פיתוח',
    ctaMessage: 'רוצים שניישם את זה עבורכם?',
  },
  'אבטחת אתרים': {
    serviceId: 'web-development',
    serviceName: 'אבטחת אתרים',
    ctaMessage: 'רוצים לוודא שהאתר שלכם מאובטח?',
  },
  'עיצוב אתרים': {
    serviceId: 'ui-ux-design',
    serviceName: 'עיצוב UI/UX',
    ctaMessage: 'רוצים עיצוב שמרשים ומוכר?',
  },
  'מסחר אלקטרוני': {
    serviceId: 'ecommerce',
    serviceName: 'חנויות אונליין',
    ctaMessage: 'רוצים חנות אונליין שמוכרת?',
  },
  'SEO ושיווק': {
    serviceId: 'web-development',
    serviceName: 'אתרים שמושכים לקוחות',
    ctaMessage: 'רוצים אתר שמביא לקוחות חדשים?',
  },
  'פיתוח אפליקציות': {
    serviceId: 'mobile-apps',
    serviceName: 'פיתוח אפליקציות מובייל',
    ctaMessage: 'רוצים אפליקציה מקצועית ל-iOS ולאנדרואיד?',
  },
  'אפליקציות מובייל': {
    serviceId: 'mobile-apps',
    serviceName: 'פיתוח אפליקציות מובייל',
    ctaMessage: 'רוצים אפליקציה מקצועית ל-iOS ולאנדרואיד?',
  },
  'מערכות ניהול': {
    serviceId: 'crm-systems',
    serviceName: 'מערכות ניהול ו-CRM מותאמות אישית',
    ctaMessage: 'רוצים מערכת ניהול שמתאימה בדיוק לעסק שלכם?',
  },
  'המרות וחווית משתמש': {
    serviceId: 'ui-ux-design',
    serviceName: 'עיצוב חוויית משתמש שממירה',
    ctaMessage: 'רוצים חוויית משתמש שממירה יותר מבקרים ללקוחות?',
  },
  'ביצועים וטכנולוגיה': {
    serviceId: 'web-development',
    serviceName: 'אתרים מהירים ב-Next.js',
    ctaMessage: 'רוצים אתר מהיר שעובר את כל מבחני הביצועים?',
  },
  'דפי נחיתה': {
    serviceId: 'landing-pages',
    serviceName: 'בניית דפי נחיתה ממירים',
    ctaMessage: 'רוצים דף נחיתה שממיר יותר מבקרים ללקוחות?',
  },
}

export const defaultCategoryService: CategoryService = {
  serviceId: 'web-development',
  serviceName: 'פתרונות דיגיטליים',
  ctaMessage: 'רוצים שנעזור לכם להצליח?',
}

export function getServiceForCategory(category?: string): CategoryService {
  return (category && categoryServiceMap[category]) || defaultCategoryService
}
