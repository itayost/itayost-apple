// src/data/portfolio.ts

export interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image?: string
  gradient: string
  technologies: string[]
  link?: string | null
  linkType?: 'live' | 'demo' | 'github'
  featured?: boolean
  year?: number
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Kitchen Optimizer',
    category: 'מערכות ניהול',
    description: 'מערכת מתקדמת לניהול הזמנות אוכל וניהול מלאי - כולל ניהול אלרגנים והתאמות אישיות ללקוחות',
    image: '/images/AmosKitchen.png',
    gradient: 'from-blue-500 to-purple-500',
    technologies: ['React', 'Node.js', 'SupaBase', 'TypeScript'],
    link: null,
    linkType: 'demo',
    featured: true,
    year: 2024
  },
  {
    id: 2,
    title: 'Lola Martin',
    category: 'מסעדות',
    description: 'אתר תדמית למסעדה יוקרתית עם תפריט אינטראקטיבי, מערכת הזמנות און-ליין ועיצוב מרשים',
    image: '/images/LolaMartin.png',
    gradient: 'from-orange-500 to-red-500',
    technologies: ['Next.js', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://lolamartin.co.il',
    linkType: 'live',
    featured: true,
    year: 2024
  },
  {
    id: 3,
    title: 'The Fader Academy',
    category: 'אתרי תדמית',
    description: 'פלטפורמה דיגיטלית לאקדמיית ספרות עם מערכת CRM מובנית, ניהול קורסים ומעקב אחר תלמידים',
    image: '/images/TheFader.png',
    gradient: 'from-purple-500 to-pink-500',
    technologies: ['Next.js', 'Google API', 'Python', 'CRM', 'MongoDB'],
    link: 'https://thefader.co.il',
    linkType: 'live',
    featured: true,
    year: 2024
  },
  {
    id: 4,
    title: 'טל נדל"ן',
    category: 'דפי נחיתה',
    description: 'דף נחיתה מותאם אישית לסוכן נדל"ן מוביל עם מערכת ניהול לידים אוטומטית וחיבור ל-CRM',
    image: '/images/TalNadlan.png',
    gradient: 'from-green-500 to-teal-500',
    technologies: ['Next.js', 'Vercel', 'Lead Management', 'Analytics'],
    link: 'https://tanadlan.com',
    linkType: 'live',
    featured: true,
    year: 2024
  },
  {
    id: 5,
    title: 'E-Commerce Platform',
    category: 'חנויות אונליין',
    description: 'פלטפורמת מסחר אלקטרוני מלאה עם ניהול מלאי, עגלת קניות מתקדמת ואינטגרציה עם מערכות תשלום',
    gradient: 'from-indigo-500 to-blue-500',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Docker'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2024
  },
  {
    id: 6,
    title: 'SaaS Dashboard',
    category: 'מערכות ניהול',
    description: 'לוח בקרה מתקדם למערכת SaaS עם ויזואליזציה של נתונים בזמן אמת ודוחות מותאמים אישית',
    gradient: 'from-cyan-500 to-blue-500',
    technologies: ['React', 'D3.js', 'WebSocket', 'Node.js', 'MongoDB'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2023
  },
  {
    id: 7,
    title: 'Real Estate Portal',
    category: 'פורטלים',
    description: 'פורטל נדל"ן מקיף עם חיפוש מתקדם, מפות אינטראקטיביות ומערכת השוואת נכסים',
    gradient: 'from-emerald-500 to-green-500',
    technologies: ['Next.js', 'Mapbox', 'PostgreSQL', 'Elasticsearch'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2023
  },
  {
    id: 8,
    title: 'Learning Platform',
    category: 'חינוך',
    description: 'פלטפורמת למידה מרחוק עם שיעורים חיים, מערכת בחינות ומעקב התקדמות תלמידים',
    gradient: 'from-pink-500 to-rose-500',
    technologies: ['React', 'WebRTC', 'Socket.io', 'Express', 'MySQL'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2023
  },
  {
    id: 9,
    title: 'Health & Fitness App',
    category: 'אפליקציות',
    description: 'אפליקציית בריאות וכושר עם תוכניות אימון מותאמות אישית, מעקב תזונה ומדדי התקדמות',
    gradient: 'from-red-500 to-pink-500',
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Charts.js'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2023
  },
  {
    id: 10,
    title: 'Event Management',
    category: 'מערכות ניהול',
    description: 'מערכת ניהול אירועים מקצה לקצה - רישום משתתפים, מכירת כרטיסים וניהול לוגיסטיקה',
    gradient: 'from-violet-500 to-purple-500',
    technologies: ['Next.js', 'Stripe', 'Calendar API', 'Email Service'],
    link: null,
    linkType: 'demo',
    featured: false,
    year: 2023
  }
]

export const categories = [
  'הכל',
  'אתרי תדמית',
  'מסעדות',
  'מערכות ניהול',
  'דפי נחיתה',
  'חנויות אונליין',
  'פורטלים',
  'חינוך',
  'אפליקציות'
]

// Helper function to get featured projects
export const getFeaturedProjects = () => {
  return portfolioItems.filter(item => item.featured)
}

// Helper function to get projects by category
export const getProjectsByCategory = (category: string) => {
  if (category === 'הכל') return portfolioItems
  return portfolioItems.filter(item => item.category === category)
}

// Helper function to get recent projects
export const getRecentProjects = (limit: number = 6) => {
  return portfolioItems
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, limit)
}

// Gradient variations for dynamic use
export const gradients = [
  'from-blue-500 to-purple-500',
  'from-orange-500 to-red-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-indigo-500 to-blue-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-green-500',
  'from-pink-500 to-rose-500',
  'from-red-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-amber-500 to-orange-500',
  'from-teal-500 to-cyan-500'
]