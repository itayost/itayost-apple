// Portfolio index and case study copy (Carbon Order Pad).
// Carried over from the previous pages. The index statistics ("מעל 50",
// "100% לקוחות מרוצים", "ROI 200%", "5★") and the case study quotes, ratings
// and performance results were removed on 2026-09-17 until confirmed.

export const portfolioPage = {
  index: {
    title: ['פרויקטים שיצרתי', 'לעסקים בישראל'],
    subtitle: 'מערכות, אתרים וחנויות שבניתי לעסקים בישראל. כל עותק כאן הוא פרויקט אמיתי שעובד היום.',
    filterLabel: 'סינון פרויקטים לפי קטגוריה',
    sheetTitle: 'תיק עבודות',
    sheetTotalLabel: 'סה״כ',
    countOne: 'פרויקט אחד',
    countMany: (count: number) => `${count} פרויקטים`,
    empty: 'אין כרגע פרויקטים בקטגוריה זו',
    showAll: 'הצג את כל הפרויקטים',
    closeTitle: 'יש לך פרויקט בראש?',
    closeBody: 'בואו נדבר על איך אפשר להפוך את הרעיון שלך למציאות דיגיטלית מרשימה',
    closeCta: 'בואו נתחיל',
    closeServices: 'השירותים שלי',
  },
  caseStudy: {
    breadcrumbHome: 'דף הבית',
    breadcrumbPortfolio: 'תיק עבודות',
    liveSite: 'צפה באתר החי',
    noLinkCta: 'מעוניינים בפרויקט דומה? דברו איתי',
    aboutTitle: 'אודות הפרויקט',
    featuresTitle: 'תכונות עיקריות',
    factsTitle: 'פרטי הפרויקט',
    facts: { client: 'לקוח', year: 'שנה', duration: 'משך', category: 'תחום', tech: 'טכנולוגיות' },
    categoryLabels: {
      web: 'פיתוח אתרים',
      system: 'מערכות וניהול',
      ecommerce: 'חנות אונליין',
      mobile: 'אפליקציות מובייל',
    },
    moreTitle: 'עוד מהתיק',
    backToPortfolio: 'חזרה לתיק עבודות',
    closeTitle: 'רוצים פרויקט דומה?',
    closeBody: 'בואו נדבר על הפרויקט שלכם. מענה תוך שעה.',
    whatsappLabel: 'וואטסאפ',
    whatsappValue: 'דברו איתי בוואטסאפ',
    contactLabel: 'טופס',
    contactValue: 'צור קשר',
    sheetTitle: 'הזמנת עבודה',
  },
} as const
