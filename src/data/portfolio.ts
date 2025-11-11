// Portfolio data with real projects
export const portfolioData = [
  {
    id: 1,
    title: 'Kitchen Optimizer',
    subtitle: 'מערכת לניהול הזמנות אוכל וניהול מלאי',
    category: 'system',
    description: 'מערכת ניהול מלאי והזמנות אוכל - שמירת נתוני לקוחות כולל בעיות אלרגנים להתאמת הזמנות',
    longDescription: 'פיתחתי מערכת מקיפה לניהול מטבח מסחרי הכוללת ניהול מלאי חכם, מעקב אחר הזמנות, וניהול פרופילי לקוחות עם התחשבות באלרגנים ומגבלות תזונתיות. המערכת מאפשרת למסעדות לנהל את כל תהליכי המטבח בצורה יעילה ומדויקת.',
    image: '/images/AmosKitchen-display.webp',
    imageSizes: {
      desktop: '/images/AmosKitchen-desktop.webp',
      display: '/images/AmosKitchen-display.webp',
      mobile: '/images/AmosKitchen-mobile.webp',
      thumbnail: '/images/AmosKitchen-thumbnail.webp'
    },
    tags: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
    technologies: ['React', 'Node.js', 'Supabase'],
    gradient: 'from-orange-500 to-red-500',
    stats: { 
      efficiency: '+40%',
      orders: '1000+/חודש',
      accuracy: '99.9%',
      time: '-60%'
    },
    client: 'Kitchen Optimizer',
    year: '2024',
    duration: '4 חודשים',
    link: null,
    featured: true,
    features: [
      'ניהול מלאי בזמן אמת',
      'מעקב אלרגנים והעדפות תזונתיות',
      'ניהול הזמנות אוטומטי',
      'דוחות וניתוחים מתקדמים',
      'ממשק ידידותי למשתמש'
    ],
    results: [
      { label: 'שיפור יעילות', value: '40%' },
      { label: 'דיוק בהזמנות', value: '99.9%' },
      { label: 'חיסכון בזמן', value: '60%' },
      { label: 'שביעות רצון', value: '100%' }
    ],
    testimonial: {
      text: 'המערכת שינתה לחלוטין את האופן שבו אנחנו מנהלים את המטבח. חסכנו המון זמן וכסף, והלקוחות שלנו מרוצים יותר מתמיד.',
      author: 'עמוס כהן',
      role: 'בעל מסעדה'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'עמוס כהן'
      },
      reviewBody: 'המערכת שינתה לחלוטין את האופן שבו אנחנו מנהלים את המטבח. חסכנו המון זמן וכסף, והלקוחות שלנו מרוצים יותר מתמיד.',
      datePublished: '2024-01-15'
    }
  },
  {
    id: 2,
    title: 'Lola Martin',
    subtitle: 'אתר תדמית למסעדה',
    category: 'web',
    description: 'אתר תדמית מרשים למסעדה עם תפריט אינטראקטיבי וחוויית משתמש מעולה',
    longDescription: 'עיצוב ופיתוח אתר תדמית יוקרתי למסעדת Lola Martin. האתר כולל תפריט אינטראקטיבי, גלריית תמונות מרהיבה, מערכת הזמנת שולחנות, ואינטגרציה עם רשתות חברתיות. דגש מיוחד על חוויית משתמש מעולה במובייל.',
    image: '/images/LolaMartin-display.webp',
    imageSizes: {
      desktop: '/images/LolaMartin-desktop.webp',
      display: '/images/LolaMartin-display.webp',
      mobile: '/images/LolaMartin-mobile.webp',
      thumbnail: '/images/LolaMartin-thumbnail.webp'
    },
    tags: ['Next.js', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
    technologies: ['Vercel', 'Next.js'],
    gradient: 'from-purple-500 to-pink-500',
    stats: { 
      views: '50K+/חודש',
      reservations: '+200%',
      loadTime: '0.8s',
      mobile: '75%'
    },
    client: 'Lola Martin Restaurant',
    year: '2024',
    duration: '6 שבועות',
    link: 'https://lolamartin.co.il',
    linkType: 'live',
    featured: true,
    features: [
      'עיצוב רספונסיבי מלא',
      'תפריט אינטראקטיבי',
      'מערכת הזמנות אונליין',
      'גלריית תמונות דינמית',
      'אופטימיזציה למנועי חיפוש'
    ],
    results: [
      { label: 'עלייה בהזמנות', value: '200%' },
      { label: 'זמן טעינה', value: '0.8s' },
      { label: 'תנועה מובייל', value: '75%' },
      { label: 'ציון SEO', value: '98/100' }
    ],
    testimonial: {
      text: 'האתר החדש הביא לנו פי 2 הזמנות אונליין. העיצוב מדהים והלקוחות מתלהבים!',
      author: 'מרטין לוי',
      role: 'בעל המסעדה'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'מרטין לוי'
      },
      reviewBody: 'האתר החדש הביא לנו פי 2 הזמנות אונליין. העיצוב מדהים והלקוחות מתלהבים!',
      datePublished: '2024-02-20'
    }
  },
  {
    id: 3,
    title: 'The Fader Academy',
    subtitle: 'אתר תדמית לאקדמיית ספרות',
    category: 'web',
    description: 'אתר תדמית לאקדמיית ספרות עם מערכת CRM למעקב אחר לידים',
    longDescription: 'פיתוח פלטפורמה מקיפה לאקדמיית ספרות The Fader, הכוללת אתר תדמית מרשים, מערכת רישום לקורסים, ומערכת CRM מתקדמת למעקב אחר לידים ותלמידים. אינטגרציה מלאה עם Google APIs לניהול יומנים ואירועים.',
    image: '/images/TheFader-display.webp',
    imageSizes: {
      desktop: '/images/TheFader-desktop.webp',
      display: '/images/TheFader-display.webp',
      mobile: '/images/TheFader-mobile.webp',
      thumbnail: '/images/TheFader-thumbnail.webp'
    },
    tags: ['Next.js', 'Google API', 'Python', 'CRM', 'PostgreSQL'],
    technologies: ['Next.js', 'GoogleAPI', 'Python'],
    gradient: 'from-indigo-500 to-purple-500',
    stats: { 
      students: '500+',
      conversion: '35%',
      automation: '80%',
      satisfaction: '4.9★'
    },
    client: 'The Fader Academy',
    year: '2024',
    duration: '3 חודשים',
    link: 'https://thefader.co.il',
    linkType: 'live',
    featured: false,
    features: [
      'מערכת CRM מותאמת אישית',
      'ניהול קורסים ותלמידים',
      'אינטגרציה עם Google Calendar',
      'מערכת תשלומים מאובטחת',
      'דוחות וניתוחים מתקדמים'
    ],
    results: [
      { label: 'תלמידים רשומים', value: '500+' },
      { label: 'שיעור המרה', value: '35%' },
      { label: 'אוטומציה', value: '80%' },
      { label: 'דירוג', value: '4.9★' }
    ],
    testimonial: {
      text: 'המערכת חסכה לנו אינספור שעות עבודה ושיפרה משמעותית את חווית הלמידה של התלמידים.',
      author: 'ד״ר רחל פדר',
      role: 'מנהלת האקדמיה'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'ד״ר רחל פדר'
      },
      reviewBody: 'המערכת חסכה לנו אינספור שעות עבודה ושיפרה משמעותית את חווית הלמידה של התלמידים.',
      datePublished: '2024-03-10'
    }
  },
  {
    id: 4,
    title: 'טל נדל״ן',
    subtitle: 'דף נחיתה לסוכן נדל״ן',
    category: 'web',
    description: 'דף נחיתה מותאם אישית לסוכן נדל״ן עם מערכת ניהול לידים',
    longDescription: 'עיצוב ופיתוח דף נחיתה ממוקד המרות לסוכן נדל״ן מוביל. הדף כולל טפסי יצירת קשר חכמים, גלריית נכסים דינמית, מערכת ניהול לידים, ואינטגרציה עם מערכות שיווק. דגש על חוויית משתמש מעולה ושיעורי המרה גבוהים.',
    image: '/images/TalNadlan-display.webp',
    imageSizes: {
      desktop: '/images/TalNadlan-desktop.webp',
      display: '/images/TalNadlan-display.webp',
      mobile: '/images/TalNadlan-mobile.webp',
      thumbnail: '/images/TalNadlan-thumbnail.webp'
    },
    tags: ['Next.js', 'Vercel', 'Lead Generation', 'Analytics'],
    technologies: ['Next.js', 'Vercel'],
    gradient: 'from-blue-500 to-cyan-500',
    stats: { 
      leads: '200+/חודש',
      conversion: '15%',
      pageSpeed: '95/100',
      roi: '450%'
    },
    client: 'טל כהן - יועץ נדל״ן',
    year: '2024',
    duration: '3 שבועות',
    link: 'https://tanadlan.com',
    linkType: 'live',
    featured: false,
    features: [
      'עיצוב ממוקד המרות',
      'טפסי לידים חכמים',
      'גלריית נכסים דינמית',
      'מערכת ניתוח ביצועים',
      'אופטימיזציה למובייל'
    ],
    results: [
      { label: 'לידים חודשיים', value: '200+' },
      { label: 'שיעור המרה', value: '15%' },
      { label: 'מהירות טעינה', value: '95/100' },
      { label: 'החזר השקעה', value: '450%' }
    ],
    testimonial: {
      text: 'הדף נחיתה הזה הכפיל את כמות הלידים שלי. ההשקעה החזירה את עצמה תוך חודש!',
      author: 'טל כהן',
      role: 'יועץ נדל״ן בכיר'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'טל כהן'
      },
      reviewBody: 'הדף נחיתה הזה הכפיל את כמות הלידים שלי. ההשקעה החזירה את עצמה תוך חודש!',
      datePublished: '2024-04-05'
    }
  }
]

// For compatibility with old imports
export const portfolioItems = portfolioData
export const categories = ['הכל', 'אתרים', 'אפליקציות', 'עיצוב']

export default portfolioData
