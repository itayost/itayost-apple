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
        'https://www.linkedin.com/in/itayost/',
        'https://www.instagram.com/itayost/',
        'https://www.facebook.com/itayost/',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'רמת גן',
        addressRegion: 'תל אביב',
        addressCountry: 'IL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+972-54-499-4417',
        contactType: 'sales',
        email: 'itayost1@gmail.com',
        areaServed: 'IL',
        availableLanguage: ['Hebrew', 'English'],
      },
      founder: {
        '@type': 'Person',
        name: 'איתי אוסטרייך',
        jobTitle: 'מפתח Full-Stack',
      },
      foundingDate: '2024',
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
      '@type': 'ProfessionalService',
      '@id': 'https://www.itayost.com/#localbusiness',
      name: 'ITAYOST - פיתוח אתרים ואפליקציות',
      alternateName: 'איתי אוסט - פיתוח תוכנה',
      image: [
        'https://www.itayost.com/og-image.jpg',
        'https://www.itayost.com/logo.png'
      ],
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.itayost.com/logo.png'
      },
      url: 'https://www.itayost.com',
      telephone: '+972-54-499-4417',
      email: 'itayost1@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'רמת גן',
        addressLocality: 'רמת גן',
        addressRegion: 'תל אביב',
        postalCode: '',
        addressCountry: 'IL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.0853,
        longitude: 34.7818,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '09:00',
          closes: '15:00',
        },
      ],
      priceRange: '₪₪₪',
      paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Bit', 'PayBox'],
      currenciesAccepted: 'ILS',
      areaServed: {
        '@type': 'Country',
        name: 'Israel'
      },
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 32.0853,
          longitude: 34.7818
        },
        geoRadius: '50000'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '27',
        bestRating: '5',
        worstRating: '1'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'שירותי פיתוח תוכנה',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'פיתוח אתרים',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'אתר תדמית',
                  description: 'אתר תדמית רספונסיבי עם עיצוב מותאם אישית'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'אתר מסחר אלקטרוני',
                  description: 'חנות אונליין מלאה עם מערכת תשלומים'
                }
              }
            ]
          },
          {
            '@type': 'OfferCatalog',
            name: 'פיתוח אפליקציות',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'אפליקציית iOS/Android',
                  description: 'אפליקציה נייטיב או קרוס-פלטפורם'
                }
              }
            ]
          }
        ]
      }
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
          name: 'כמה זה עולה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'תלוי בפתרון. אוטומציה פשוטה: 5,000-10,000 ש"ח. אתר תדמית: 8,000-15,000 ש"ח. מערכת CRM: 15,000-25,000 ש"ח. אפשר תשלומים.',
          },
        },
        {
          '@type': 'Question',
          name: 'כמה זמן לוקח לפתח פתרון?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'תלוי במורכבות. אוטומציה פשוטה: 1-2 שבועות. אתר תדמית: 2-4 שבועות. מערכת CRM: 3-6 שבועות.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אני צריך להבין בטכנולוגיה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'לא! זה בדיוק הרעיון - אני דואג לכל החלק הטכני. אתה רק צריך להגיד לי מה מעיק עליך בעסק. אני מדבר עברית פשוטה, בלי ז׳רגון.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה נותן תמיכה אחרי המסירה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בטח! אני לא נעלם אחרי הפרויקט. 6 חודשי אחריות + חודש תמיכה חינם. אחר כך חבילות תמיכה זולות.',
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