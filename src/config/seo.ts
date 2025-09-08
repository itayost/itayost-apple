// SEO configuration for all pages
export const seoConfig = {
  // Default SEO
  default: {
    title: 'ITAYOST - חוויות דיגיטליות | פיתוח אתרים ואפליקציות',
    titleTemplate: '%s | ITAYOST',
    description: 'פיתוח אתרים ואפליקציות מותאמים אישית לעסקים. מומחים ב-React, Next.js, Node.js. צרו איתנו קשר לקבלת הצעת מחיר.',
    keywords: [
      'פיתוח אתרים',
      'בניית אתרים',
      'עיצוב אתרים',
      'פיתוח אפליקציות',
      'אפליקציות מובייל',
      'עיצוב UI/UX',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'פיתוח Full Stack',
      'חברת פיתוח',
      'סטארטאפ',
      'טרנספורמציה דיגיטלית',
      'תל אביב',
    ],
    openGraph: {
      type: 'website',
      locale: 'he_IL',
      url: 'https://www.itayost.com',
      siteName: 'ITAYOST',
      images: [
        {
          url: 'https://www.itayost.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'ITAYOST - פיתוח אתרים ואפליקציות',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      handle: '@itayost',
      site: '@itayost',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: 'ITAYOST',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        property: 'og:locale:alternate',
        content: 'en_US',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
  },

  // Page-specific SEO
  pages: {
    home: {
      title: 'ITAYOST - פיתוח אתרים ואפליקציות | חברת פיתוח מובילה',
      description: 'חברת ITAYOST מתמחה בפיתוח אתרים ואפליקציות מתקדמות. פתרונות דיגיטליים מותאמים אישית לעסקים עם טכנולוגיות React, Next.js, Node.js. קבלו הצעת מחיר היום.',
      keywords: ['פיתוח אתרים תל אביב', 'חברת פיתוח תוכנה', 'בניית אתר לעסק', 'פיתוח אפליקציה'],
      canonical: 'https://www.itayost.com',
    },
    services: {
      title: 'שירותים | פיתוח אתרים, אפליקציות ועיצוב UI/UX',
      description: 'שירותי פיתוח מקצה לקצה: אתרי אינטרנט רספונסיביים, אפליקציות מובייל, עיצוב UI/UX, פיתוח API ומערכות ניהול. מחירים תחרותיים ואיכות ללא פשרות.',
      keywords: ['שירותי פיתוח', 'מחירון פיתוח אתרים', 'עלות פיתוח אפליקציה', 'פיתוח מערכות'],
      canonical: 'https://www.itayost.com/services',
    },
    portfolio: {
      title: 'תיק עבודות | פרויקטים ולקוחות',
      description: 'צפו בפרויקטים המובילים שלנו: אתרי מסחר אלקטרוני, אפליקציות בנקאות, מערכות ניהול SaaS ועוד. ראו איך אנחנו הופכים רעיונות למוצרים דיגיטליים מצליחים.',
      keywords: ['תיק עבודות', 'פרויקטים', 'לקוחות', 'הצלחות', 'case studies'],
      canonical: 'https://www.itayost.com/portfolio',
    },
    about: {
      title: 'אודות | הסיפור שלנו וצוות המומחים',
      description: 'הכירו את ITAYOST - צוות של מפתחים ומעצבים מנוסים עם למעלה מ-5 שנות ניסיון. אנחנו מאמינים בחדשנות, מצוינות ושיתוף פעולה.',
      keywords: ['אודות החברה', 'צוות פיתוח', 'חזון וערכים', 'ניסיון בפיתוח'],
      canonical: 'https://www.itayost.com/about',
    },
    contact: {
      title: 'צור קשר | קבל הצעת מחיר לפרויקט שלך',
      description: 'רוצים להתחיל פרויקט חדש? צרו איתנו קשר לקבלת ייעוץ חינם והצעת מחיר מותאמת. מענה תוך 24 שעות. טלפון: 054-499-4417',
      keywords: ['צור קשר', 'הצעת מחיר', 'ייעוץ חינם', 'פגישת היכרות'],
      canonical: 'https://www.itayost.com/contact',
    },
  },

  // Structured Data Schemas
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.itayost.com/#organization',
      name: 'ITAYOST',
      alternateName: 'איתי אוסט',
      url: 'https://www.itayost.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.itayost.com/logo.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.linkedin.com/company/itayost',
        'https://github.com/itayost',
        'https://www.facebook.com/itayost',
        'https://twitter.com/itayost',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'תל אביב',
        addressRegion: 'תל אביב',
        addressCountry: 'IL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+972-54-499-4417',
        contactType: 'sales',
        email: 'hello@itayost.com',
        areaServed: 'IL',
        availableLanguage: ['Hebrew', 'English'],
      },
      founder: {
        '@type': 'Person',
        name: 'איתי אוסט',
        jobTitle: 'מנכ"ל ומייסד',
      },
      foundingDate: '2020',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 10,
      },
    },

    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.itayost.com/#website',
      url: 'https://www.itayost.com',
      name: 'ITAYOST',
      description: 'פיתוח אתרים ואפליקציות מותאמים אישית לעסקים',
      publisher: {
        '@id': 'https://www.itayost.com/#organization',
      },
      inLanguage: 'he-IL',
    },

    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://www.itayost.com/#localbusiness',
      name: 'ITAYOST - פיתוח אתרים ואפליקציות',
      image: 'https://www.itayost.com/og-image.jpg',
      url: 'https://www.itayost.com',
      telephone: '+972-54-499-4417',
      email: 'hello@itayost.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'תל אביב',
        addressRegion: 'תל אביב',
        addressCountry: 'IL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.0853,
        longitude: 34.7818,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '₪₪₪',
      servesCuisine: '',
      acceptsReservations: 'True',
    },

    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'פיתוח תוכנה',
      provider: {
        '@id': 'https://www.itayost.com/#organization',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Israel',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'שירותי פיתוח',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'פיתוח אתרים',
              description: 'אתרים מודרניים ורספונסיביים עם הטכנולוגיות החדישות',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'פיתוח אפליקציות',
              description: 'אפליקציות נייטיב וקרוס-פלטפורם',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'עיצוב UI/UX',
              description: 'ממשקים יפהפיים ואינטואיטיביים',
            },
          },
        ],
      },
    },

    breadcrumbs: (pathname: string) => {
      const paths = pathname.split('/').filter(Boolean)
      const items = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'דף הבית',
          item: 'https://www.itayost.com',
        },
      ]

      paths.forEach((path, index) => {
        const url = `https://www.itayost.com/${paths.slice(0, index + 1).join('/')}`
        const name = {
          services: 'שירותים',
          portfolio: 'תיק עבודות',
          about: 'אודות',
          contact: 'צור קשר',
        }[path] || path

        items.push({
          '@type': 'ListItem',
          position: index + 2,
          name,
          item: url,
        })
      })

      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      }
    },

    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'כמה עולה פיתוח אתר?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'עלות פיתוח אתר משתנה בהתאם לדרישות הפרויקט. אתר תדמית בסיסי מתחיל מ-5,000 ש"ח, אתר מסחר אלקטרוני מ-15,000 ש"ח, ומערכות מורכבות יכולות להגיע ל-50,000 ש"ח ומעלה.',
          },
        },
        {
          '@type': 'Question',
          name: 'כמה זמן לוקח לפתח אתר?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'זמן הפיתוח תלוי במורכבות הפרויקט. אתר תדמית פשוט: 2-4 שבועות, אתר מסחר אלקטרוני: 6-8 שבועות, מערכת מורכבת: 2-6 חודשים.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתם נותנים אחריות ותמיכה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אנחנו נותנים 6 חודשי אחריות על כל פרויקט וכוללים חודש תמיכה חינם. לאחר מכן ניתן לרכוש חבילות תמיכה חודשיות.',
          },
        },
        {
          '@type': 'Question',
          name: 'באילו טכנולוגיות אתם עובדים?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אנחנו מתמחים ב-React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, React Native, Flutter ועוד. בוחרים את הטכנולוגיה המתאימה ביותר לכל פרויקט.',
          },
        },
      ],
    },
  },

  // Robots.txt content
  robots: `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://www.itayost.com/sitemap.xml
Sitemap: https://www.itayost.com/sitemap-0.xml`,

  // Additional meta tags for security
  securityHeaders: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;",
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },
}

export type SEOConfig = typeof seoConfig