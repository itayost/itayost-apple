// Blog posts data
export interface BlogPost {
  id: number
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    role: string
    email: string
  }
  publishedAt: string
  updatedAt: string
  readTime: string
  featured: boolean
  featuredImage: {
    url: string
    alt: string
  }
  internalLinks: Array<{
    text: string
    url: string
  }>
  structuredData?: any
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'בניית-חנות-אונליין-בישראל-מדריך-שלם',
    title: 'בניית חנות אונליין בישראל: מדריך שלם מתחילים ועד השקה (2025)',
    metaTitle: 'בניית חנות אונליין בישראל: מדריך מקיף 2025 | ItayOst',
    metaDescription: 'מדריך מקיף לבניית חנות אונליין בישראל: השוואת פלטפורמות, עלויות, מערכות תשלום, ועצות מעשיות להשקה מוצלחת. כל מה שצריך לדעת על מסחר אלקטרוני בישראל.',
    excerpt: 'קורונה שינתה את השוק הישראלי לצמיתות - מכירות אונליין הן כבר לא אופציה אלא הכרח. המדריך המקיף הזה יוביל אתכם צעד אחר צעד מהרעיון ועד להשקה המוצלחת של החנות האונליין שלכם.',
    category: 'ecommerce',
    tags: ['בניית חנות אונליין', 'מסחר אלקטרוני ישראל', 'e-commerce', 'אתר מכירות', 'חנות אונליין'],
    author: {
      name: 'איתי אוסטרייך',
      role: 'מפתח Full-Stack',
      email: 'itayost1@gmail.com'
    },
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    readTime: '15 דקות קריאה',
    featured: true,
    featuredImage: {
      url: '/images/blog/online-store-israel-guide.jpg',
      alt: 'בניית חנות אונליין בישראל - מדריך מקיף עם מחשב נייד ומוצרים'
    },
    internalLinks: [
      { text: 'Kitchen Optimizer - דוגמה למערכת הזמנות', url: '/portfolio#kitchen-optimizer' },
      { text: 'מחירון שירותי פיתוח', url: '/services#pricing' },
      { text: 'צור קשר לייעוץ חינם', url: '/contact' },
      { text: 'תיק עבודות', url: '/portfolio' }
    ],
    content: ``, // Will be filled with the article content
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'בניית חנות אונליין בישראל: מדריך שלם מתחילים ועד השקה (2025)',
      description: 'מדריך מקיף לבניית חנות אונליין בישראל: השוואת פלטפורמות, עלויות, מערכות תשלום, ועצות מעשיות להשקה מוצלחת.',
      image: '/images/blog/online-store-israel-guide.jpg',
      datePublished: '2025-01-15',
      dateModified: '2025-01-15',
      author: {
        '@type': 'Person',
        name: 'איתי אוסטרייך',
        url: 'https://www.itayost.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ItayOst',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.itayost.com/logo.png'
        }
      }
    }
  }
]

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts
  return blogPosts.filter(post => post.category === category)
}
