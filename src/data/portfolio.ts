// Portfolio data with real projects
export const portfolioData = [
  {
    id: 1,
    title: 'Kitchen Optimizer',
    subtitle: 'מערכת לניהול הזמנות אוכל וניהול מלאי',
    category: 'web',
    description: 'מערכת ניהול מלאי והזמנות אוכל - שמירת נתוני לקוחות כולל בעיות אלרגנים להתאמת הזמנות',
    longDescription: 'פיתחתי מערכת מקיפה לניהול מטבח מסחרי הכוללת ניהול מלאי חכם, מעקב אחר הזמנות, וניהול פרופילי לקוחות עם התחשבות באלרגנים ומגבלות תזונתיות. המערכת מאפשרת למסעדות לנהל את כל תהליכי המטבח בצורה יעילה ומדויקת.',
    image: '/images/AmosKitchen.png',
    tags: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
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
    }
  },
  {
    id: 2,
    title: 'Lola Martin',
    subtitle: 'אתר תדמית למסעדה',
    category: 'web',
    description: 'אתר תדמית מרשים למסעדה עם תפריט אינטראקטיבי וחוויית משתמש מעולה',
    longDescription: 'עיצוב ופיתוח אתר תדמית יוקרתי למסעדת Lola Martin. האתר כולל תפריט אינטראקטיבי, גלריית תמונות מרהיבה, מערכת הזמנת שולחנות, ואינטגרציה עם רשתות חברתיות. דגש מיוחד על חוויית משתמש מעולה במובייל.',
    image: '/images/LolaMartin.png',
    tags: ['Next.js', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
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
    }
  },
  {
    id: 3,
    title: 'The Fader Academy',
    subtitle: 'אתר תדמית לאקדמיית ספרות',
    category: 'web',
    description: 'אתר תדמית לאקדמיית ספרות עם מערכת CRM למעקב אחר לידים',
    longDescription: 'פיתוח פלטפורמה מקיפה לאקדמיית ספרות The Fader, הכוללת אתר תדמית מרשים, מערכת רישום לקורסים, ומערכת CRM מתקדמת למעקב אחר לידים ותלמידים. אינטגרציה מלאה עם Google APIs לניהול יומנים ואירועים.',
    image: '/images/TheFader.png',
    tags: ['Next.js', 'Google API', 'Python', 'CRM', 'PostgreSQL'],
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
    }
  },
  {
    id: 4,
    title: 'טל נדל״ן',
    subtitle: 'דף נחיתה לסוכן נדל״ן',
    category: 'web',
    description: 'דף נחיתה מותאם אישית לסוכן נדל״ן עם מערכת ניהול לידים',
    longDescription: 'עיצוב ופיתוח דף נחיתה ממוקד המרות לסוכן נדל״ן מוביל. הדף כולל טפסי יצירת קשר חכמים, גלריית נכסים דינמית, מערכת ניהול לידים, ואינטגרציה עם מערכות שיווק. דגש על חוויית משתמש מעולה ושיעורי המרה גבוהים.',
    image: '/images/TalNadlan.png',
    tags: ['Next.js', 'Vercel', 'Lead Generation', 'Analytics'],
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
    }
  }
]

export default portfolioData
