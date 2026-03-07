// SEO configuration for all pages
export const seoConfig = {
  // Default SEO
  default: {
    title: 'ITAYOST | מערכות, אוטומציות ובניית אתרים לעסקים',
    titleTemplate: '%s | ITAYOST',
    description: 'מערכות ניהול, אוטומציות ואתרים שעוזרים לעסקים לעבוד חכם יותר. חוסכים לכם שעות עבודה בשבוע ומביאים יותר לקוחות.',
    keywords: [
      'מערכות ניהול',
      'אוטומציות לעסקים',
      'בניית אתרים',
      'מערכת CRM',
      'אוטומציה עסקית',
      'פיתוח אתרים',
      'מערכות מותאמות',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'פיתוח Full Stack',
      'ניהול עסק חכם',
      'דיגיטציה לעסקים',
      'רמת גן',
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
          alt: 'ITAYOST - מערכות, אוטומציות ואתרים לעסקים',
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
      title: 'ITAYOST | פיתוח אתרים, CRM, אוטומציות ואפליקציות לעסקים',
      description: 'פיתוח אתרים Next.js, מערכות CRM, אוטומציות, חנויות אונליין, אפליקציות מובייל, דפי נחיתה ועיצוב UI/UX. שירות אישי ברמת גן. הצעת מחיר תוך 24 שעות.',
      keywords: [
        'פיתוח אתרים',
        'מערכת CRM',
        'אוטומציות לעסקים',
        'חנויות אונליין',
        'אפליקציות מובייל',
        'דפי נחיתה',
        'עיצוב UI/UX',
        'Next.js',
        'React Native',
        'רמת גן',
        'תל אביב',
      ],
      canonical: 'https://www.itayost.com',
    },
    services: {
      title: 'שירותים | מערכות, אוטומציות ובניית אתרים',
      description: 'מערכות CRM מותאמות, אוטומציות שחוסכות זמן, ואתרים שמביאים לקוחות. פתרונות מקצה לקצה לעסקים קטנים ובינוניים.',
      keywords: ['מערכות ניהול', 'אוטומציה לעסקים', 'בניית אתרים', 'מערכת CRM מותאמת'],
      canonical: 'https://www.itayost.com/services',
    },
    portfolio: {
      title: 'תיק עבודות | פרויקטים ולקוחות',
      description: 'צפו בפרויקטים המובילים שלי: אתרי מסחר אלקטרוני, מערכות ניהול, דפי נחיתה ועוד. ראו איך אני הופך רעיונות למוצרים דיגיטליים מצליחים.',
      keywords: ['תיק עבודות', 'פרויקטים', 'לקוחות', 'הצלחות', 'case studies'],
      canonical: 'https://www.itayost.com/portfolio',
    },
    about: {
      title: 'אודות | איתי אוסטרייך — מפתח עצמאי',
      description: 'הכירו את איתי אוסטרייך — מפתח עצמאי עם למעלה מ-5 שנות ניסיון ו-100+ פרויקטים. בונה מערכות, אוטומציות ואתרים לעסקים קטנים ובינוניים.',
      keywords: ['אודות החברה', 'צוות פיתוח', 'חזון וערכים', 'ניסיון בפיתוח'],
      canonical: 'https://www.itayost.com/about',
    },
    contact: {
      title: 'צור קשר | קבל הצעת מחיר לפרויקט שלך',
      description: 'רוצים להתחיל פרויקט חדש? צרו איתי קשר לקבלת ייעוץ חינם והצעת מחיר מותאמת. מענה תוך שעה. טלפון: 054-499-4417',
      keywords: ['צור קשר', 'הצעת מחיר', 'ייעוץ חינם', 'פגישת היכרות'],
      canonical: 'https://www.itayost.com/contact',
    },
    blog: {
      title: 'בלוג | מאמרים וטיפים בפיתוח תוכנה',
      description: 'מאמרים, טיפים וטריקים בנושאי פיתוח תוכנה, עיצוב UI/UX, טכנולוגיות חדשות ומגמות בעולם הדיגיטל. תוכן איכותי בעברית למפתחים ויזמים.',
      keywords: ['בלוג פיתוח', 'מאמרים טכניים', 'טיפים לפיתוח', 'מדריכי תכנות', 'עדכוני טכנולוגיה'],
      canonical: 'https://www.itayost.com/blog',
    },
    guides: {
      title: 'מדריכים | מדריכי פיתוח ותכנות',
      description: 'מדריכים מפורטים ומעשיים לפיתוח אתרים ואפליקציות. למדו React, Next.js, Node.js, TypeScript ועוד. מדריכים בעברית עם דוגמאות קוד.',
      keywords: ['מדריכי תכנות', 'לימוד פיתוח', 'React tutorial', 'Next.js guide', 'מדריך עברית'],
      canonical: 'https://www.itayost.com/guides',
    },
    faq: {
      title: 'שאלות נפוצות | כל מה שרציתם לדעת',
      description: 'תשובות לשאלות הנפוצות ביותר על שירותי הפיתוח, מחירים, לוחות זמנים, תהליך העבודה ותמיכה טכנית. קבלו תשובות ברורות לכל השאלות.',
      keywords: ['שאלות נפוצות', 'FAQ', 'מחירון פיתוח', 'זמני פיתוח', 'תמיכה טכנית'],
      canonical: 'https://www.itayost.com/faq',
    },
    terms: {
      title: 'תנאי שימוש ומדיניות פרטיות',
      description: 'תנאי השימוש, מדיניות הפרטיות וזכויות היוצרים של האתר. הגנת המידע האישי שלכם חשובה לנו.',
      keywords: ['תנאי שימוש', 'מדיניות פרטיות', 'זכויות יוצרים', 'הגנת פרטיות'],
      canonical: 'https://www.itayost.com/terms',
    },
    'privacy-policy': {
      title: 'מדיניות פרטיות | הגנה על המידע האישי שלכם',
      description: 'מדיניות הפרטיות של ITAYOST - כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם. הגנת הפרטיות שלכם בראש סדר העדיפויות שלנו.',
      keywords: ['מדיניות פרטיות', 'הגנת מידע', 'GDPR', 'הגנת פרטיות', 'אבטחת מידע', 'זכויות משתמש'],
      canonical: 'https://www.itayost.com/privacy-policy',
    },
    clients: {
      title: 'לקוחות ומלצות | סיפורי הצלחה',
      description: 'הכירו את הלקוחות המרוצים שלי, קראו המלצות אמיתיות וסיפורי הצלחה. למעלה מ-50 עסקים סומכים עליי לפתרונות דיגיטליים.',
      keywords: ['לקוחות', 'המלצות', 'ביקורות', 'סיפורי הצלחה', 'לקוחות מרוצים', 'תיקי עבודות'],
      canonical: 'https://www.itayost.com/clients',
    },

    // Service landing pages
    'web-development': {
      title: 'פיתוח אתרים | Next.js, React, אתרים מהירים ומאובטחים',
      description: 'פיתוח אתרים מקצועיים עם Next.js 14 - אתרים מהירים פי 3 מוורדפרס, אבטחה מובנית, SEO מעולה. תמיכה מלאה בעברית RTL. קבל הצעת מחיר מותאמת.',
      keywords: ['פיתוח אתרים', 'Next.js', 'React', 'פיתוח אתר לעסק', 'בניית אתר תדמית', 'אתר מהיר', 'אתר עברית'],
      canonical: 'https://www.itayost.com/services/web-development',
    },
    'ecommerce': {
      title: 'חנויות אונליין | מסחר אלקטרוני עם תשלומים ישראליים',
      description: 'בניית חנויות אונליין מותאמות עם Bit, PayBox, Tranzila. ניהול מלאי, משלוחים, קופונים, דוחות. ללא עמלות חודשיות. קבל הצעת מחיר מותאמת.',
      keywords: ['חנות אונליין', 'מסחר אלקטרוני', 'e-commerce', 'בניית חנות', 'Shopify', 'תשלומים ישראליים', 'Bit', 'PayBox'],
      canonical: 'https://www.itayost.com/services/ecommerce',
    },
    'crm-systems': {
      title: 'מערכות CRM | ניהול לקוחות ואוטומציה מותאמת',
      description: 'פיתוח מערכות CRM מותאמות לניהול לקוחות, עסקאות, משימות ואוטומציה. שליטה מלאה, ללא עמלות. אינטגרציה עם דואר, לוח שנה, WhatsApp. קבל הצעת מחיר.',
      keywords: ['מערכת CRM', 'ניהול לקוחות', 'CRM מותאם', 'אוטומציה שיווקית', 'ניהול עסקאות', 'מערכת ניהול'],
      canonical: 'https://www.itayost.com/services/crm-systems',
    },
    'ui-ux-design': {
      title: 'עיצוב UI/UX | עיצוב ממשקים שממירים',
      description: 'עיצוב ממשקים ומסעות משתמש מבוסס מחקר, נתונים וCRO. עיצוב ב-Figma, בדיקות משתמשים, Design System מלא. נגישות WCAG 2.1. קבל הצעת מחיר.',
      keywords: ['עיצוב UI/UX', 'עיצוב ממשק משתמש', 'Figma', 'User Experience', 'עיצוב אפליקציה', 'עיצוב אתר', 'CRO'],
      canonical: 'https://www.itayost.com/services/ui-ux-design',
    },
    'landing-pages': {
      title: 'דפי נחיתה | Landing Pages שמייצרים לידים',
      description: 'דפי נחיתה ממירים לקמפיינים, השקות ומבצעים. בנייה מהירה תוך 3-7 ימים. A/B Testing, אנליטיקס, אופטימיזציה שוטפת. קבל הצעת מחיר.',
      keywords: ['דף נחיתה', 'Landing Page', 'דף קמפיין', 'דף המרה', 'Google Ads', 'Facebook Ads', 'A/B Testing'],
      canonical: 'https://www.itayost.com/services/landing-pages',
    },
    'automations': {
      title: 'אוטומציות | חיבור מערכות וחיסכון בזמן',
      description: 'אוטומציה של תהליכים עסקיים, חיבור בין מערכות קיימות (Gmail, Sheets, CRM, WhatsApp). חוסכים שעות עבודה בשבוע. Make, Zapier, n8n. קבל הצעת מחיר.',
      keywords: ['אוטומציה עסקית', 'חיבור מערכות', 'Zapier', 'Make', 'Integromat', 'אוטומציה לעסקים', 'n8n', 'workflow automation'],
      canonical: 'https://www.itayost.com/services/automations',
    },
    'mobile-apps': {
      title: 'אפליקציות מובייל | React Native לiOS ו-Android',
      description: 'פיתוח אפליקציות מובייל Cross-Platform עם React Native. אפליקציה אחת ל-iOS ו-Android. Push notifications, מיקום, מצלמה. קבל הצעת מחיר.',
      keywords: ['אפליקציות מובייל', 'React Native', 'פיתוח אפליקציה', 'iOS', 'Android', 'Expo', 'אפליקציה לעסק'],
      canonical: 'https://www.itayost.com/services/mobile-apps',
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
      description: 'מערכות, אוטומציות ואתרים שעוזרים לעסקים לעבוד חכם יותר',
      publisher: {
        '@id': 'https://www.itayost.com/#organization',
      },
      inLanguage: 'he-IL',
    },

    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': 'https://www.itayost.com/#localbusiness',
      name: 'ITAYOST - מערכות, אוטומציות ואתרים לעסקים',
      alternateName: 'איתי אוסט - מערכות ואוטומציות',
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
        postalCode: '5244110',
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
        ratingValue: '5.0',
        reviewCount: '10',
        bestRating: '5',
        worstRating: '1',
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

    author: {
      '@type': 'Person',
      '@id': 'https://www.itayost.com/#author',
      name: 'איתי אוסטרייך',
      jobTitle: 'מפתח Full-Stack ומומחה מערכות דיגיטליות',
      description: 'מפתח Full-Stack עם למעלה מ-5 שנות ניסיון. מתמחה בבניית אתרים, מערכות CRM, אוטומציות ואפליקציות מובייל לעסקים קטנים ובינוניים בישראל.',
      url: 'https://www.itayost.com/about',
      worksFor: {
        '@id': 'https://www.itayost.com/#organization',
      },
      sameAs: [
        'https://www.linkedin.com/in/itayost/',
        'https://www.instagram.com/itayost/',
        'https://www.facebook.com/itayost/',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'React Native',
        'CRM Development',
        'Business Automation',
        'UI/UX Design',
        'SEO',
        'Web Performance',
      ],
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
          blog: 'בלוג',
          guides: 'מדריכים',
          faq: 'שאלות נפוצות',
          terms: 'תנאי שימוש',
          'privacy-policy': 'מדיניות פרטיות',
          clients: 'לקוחות',
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
        // General Questions
        {
          '@type': 'Question',
          name: 'כמה זמן לוקח לפתח אתר?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'פיתוח אתר לוקח בין 2 ל-12 שבועות, תלוי במורכבות. אתר תדמית בסיסי (5-7 עמודים): 2-3 שבועות. אתר עסקי מתקדם: 3-5 שבועות. חנות אונליין: 4-6 שבועות. מערכת מורכבת (CRM, פורטל): 6-12 שבועות. הזמנים כוללים אפיון, עיצוב, פיתוח, בדיקות והעלאה. אני תמיד מתחייב ללוחות זמנים ומעדכן לאורך הדרך.',
          },
        },

        // Technical Questions
        {
          '@type': 'Question',
          name: 'מה ההבדל בין Next.js לוורדפרס?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Next.js הוא פריימוורק מודרני לפיתוח מותאם אישית שמהיר פי 3-5 מוורדפרס ומאובטח יותר. WordPress הוא מערכת ניהול תוכן עם ממשק ידידותי אבל איטית יותר ופגיעה לפריצות. יתרונות Next.js: ביצועים מעולים (טעינה תוך פחות משנייה), אבטחה גבוהה, גמישות מלאה בעיצוב וקוד נקי. WordPress מתאים יותר לבלוגים פשוטים שצריכים עדכוני תוכן תכופים. לרוב העסקים שרוצים אתר מהיר וייחודי, Next.js הוא הבחירה הנכונה.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אני צריך להבין בטכנולוגיה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'לא, לא צריך שום ידע טכני. אתה רק מספר מה העסק עושה ומה המטרות, ואני מטפל בכל השאר - עיצוב, תכנות, שרתים, אבטחה. אני מסביר הכל בעברית פשוטה, בלי ז\'רגון מסובך. בסוף תקבל מערכת שקל להשתמש בה, עם הדרכה מלאה.',
          },
        },
        {
          '@type': 'Question',
          name: 'איזה טכנולוגיות אתה משתמש בהן?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני עובד עם הטכנולוגיות המובילות בתעשייה: Next.js 14 (React) לאתרים מתקדמים, React Native לאפליקציות מובייל, Node.js לצד שרת, TypeScript לקוד בטוח ואמין, Tailwind CSS לעיצוב, ו-MongoDB או PostgreSQL למסדי נתונים. כולן מהירות, מאובטחות ונתמכות לטווח ארוך.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם האתר יהיה מהיר?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, כל אתר שאני בונה נטען תוך 1-2 שניות ומגיע לציון 90+ מתוך 100 ב-Google PageSpeed. כל אתר עובר אופטימיזציה מלאה: תמונות דחוסות, קוד ממוטב, שרת CDN מהיר, טעינה עצלה של תוכן. מהירות משפיעה ישירות על דירוג בגוגל, חוויית משתמש ושיעורי המרה.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם האתר יהיה מאובטח?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אבטחה כלולה בכל אתר כסטנדרט. כל אתר מגיע עם: תעודת SSL (HTTPS) לחיבור מוצפן, הגנה מפני התקפות נפוצות (XSS, SQL Injection), גיבויים אוטומטיים יומיים, עדכוני אבטחה שוטפים, ואימות משתמשים חזק. לעסקים עם מידע רגיש כמו תשלומים, אני מיישם תקני אבטחה מתקדמים ועומד בתקנות GDPR.',
          },
        },

        // Process Questions
        {
          '@type': 'Question',
          name: 'איך תהליך העבודה נראה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'תהליך העבודה כולל 5 שלבים ברורים: 1) פגישת היכרות חינם - מבינים את הצרכים והמטרות. 2) אפיון - מסמך מפורט עם כל הפונקציות. 3) עיצוב - עיצובים ראשוניים לאישור. 4) פיתוח - בניית האתר עם עדכונים שבועיים. 5) בדיקות והעלאה - בדיקות יסודיות, הדרכה והשקה. בכל שלב אתה מעורב ומאשר לפני שממשיכים הלאה.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אני יכול לראות את האתר בזמן הפיתוח?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אתה יכול לצפות באתר בזמן אמת דרך סביבת פיתוח (staging). אחרי שלב העיצוב, אני מעלה את האתר לסביבה שאתה יכול לגשת אליה בכל זמן, לתת משוב ולבקש שינויים. שקיפות מלאה לאורך כל התהליך.',
          },
        },
        {
          '@type': 'Question',
          name: 'מה קורה אם אני רוצה לשנות משהו אחרי שהאתר מוכן?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'חודש ראשון אחרי ההשקה - שינויים קטנים בחינם. אחרי זה יש כמה אפשרויות: שינויים חד-פעמיים בתעריף שעתי (300 ש"ח לשעה), חבילת תחזוקה חודשית (500-1500 ש"ח לפי היקף), או הדרכה לעריכת תוכן עצמאית. אני תמיד זמין לשאלות.',
          },
        },

        // Support & Maintenance
        {
          '@type': 'Question',
          name: 'האם אתה נותן תמיכה אחרי המסירה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, כלול בכל פרויקט: 6 חודשי אחריות מלאה לתקלות טכניות, חודש תמיכה חינם, והדרכה מלאה. אחרי זה אפשר להמשיך עם חבילת תחזוקה חודשית (500-1500 ש"ח) שכוללת עדכוני אבטחה, גיבויים, שינויי תוכן ותמיכה טכנית. אני זמין בווטסאפ, מייל וטלפון.',
          },
        },
        {
          '@type': 'Question',
          name: 'מה כלול בחבילת התחזוקה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'חבילת תחזוקה חודשית כוללת עדכוני אבטחה, גיבוי יומי, מעקב תקינות (uptime monitoring), שינויי תוכן (עד שעתיים בחודש), תמיכה טכנית (מענה תוך 24 שעות) ודוחות ביצועים. שלוש רמות: חבילה בסיסית 500 ש"ח, מתקדמת 1000 ש"ח, פרימיום 1500 ש"ח (כולל שיפורים ופיצ\'רים חדשים).',
          },
        },

        // Local & Business
        {
          '@type': 'Question',
          name: 'איפה אתה נמצא? האם אפשר להיפגש?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני נמצא ברמת גן ומשרת לקוחות בכל רחבי ישראל. פגישה ראשונה תמיד חינם, אפשר פנים אל פנים או מרחוק (זום, טלפון, ווטסאפ). רוב הלקוחות מעדיפים תקשורת דיגיטלית כי זה חוסך זמן, אבל אני תמיד שמח להיפגש.',
          },
        },
        {
          '@type': 'Question',
          name: 'למה לבחור בך ולא בחברת פיתוח גדולה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'שלושה יתרונות מרכזיים: שירות אישי (מדברים ישירות עם המפתח, לא עם מוקד), מחירים הוגנים (בלי תקורות של חברה גדולה), וזמינות מלאה (ווטסאפ וטלפון, תמיד). בנוסף: גמישות מלאה, ניסיון של מעל 5 שנים ועשרות פרויקטים מוצלחים, ומחויבות אישית - הצלחה שלך היא הצלחה שלי.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה עובד עם עסקים קטנים?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, רוב הלקוחות שלי הם עסקים קטנים ובינוניים, עצמאים ויזמים. אני מתאים את הפתרון בדיוק למה שצריך, בלי לנפח את הפרויקט. יש גם חבילות במחיר נוח לסטארטאפים ועסקים בהתחלה. אני מבין את האתגרים - תקציב מוגבל, צורך בתוצאות מהירות, ורצון להתחרות עם השחקנים הגדולים.',
          },
        },

        // SEO & Marketing
        {
          '@type': 'Question',
          name: 'האם האתר יופיע בגוגל?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, כל אתר שאני בונה כולל SEO בסיסי מובנה: מבנה כותרות נכון, מטא תגים, sitemap אוטומטי, קוד מהיר ונגישות. גוגל יוכל למצוא ולאנדקס את האתר. להגיע למקומות הראשונים דורש עבודת SEO שוטפת נוספת (תוכן, קישורים, עדכונים). אני יכול לעזור בזה או להפנות לשותף שיווקי.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה גם עושה שיווק דיגיטלי?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני מתמחה בפיתוח, לא בשיווק, אבל עוזר עם היסודות: SEO טכני, חיבור לגוגל אנליטיקס ופייסבוק פיקסל, וייעוץ בסיסי לתוכן. לקמפיינים ממומנים וניהול שיווקי מקצועי אני משתף פעולה עם מומחי שיווק שאני ממליץ עליהם.',
          },
        },

        // Specific Services
        {
          '@type': 'Question',
          name: 'האם אתה בונה אפליקציות מובייל?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אני בונה אפליקציות מובייל עם React Native - אפליקציה אחת שעובדת גם על iOS וגם על Android. מחירים: אפליקציה פשוטה 25,000-40,000 ש"ח, אפליקציה מורכבת (התחברות, תשלומים, פוש) 40,000-70,000 ש"ח. כולל פיתוח, בדיקות והעלאה לחנויות (App Store ו-Google Play).',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה בונה חנויות אונליין?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אני בונה חנויות אונליין מותאמות אישית במחיר של 20,000-35,000 ש"ח. כולל: קטלוג מוצרים, עגלת קניות, מערכת תשלומים (אשראי, PayPal, Bit), ניהול הזמנות, חיבור למשלוחים, דוחות ואנליטיקס. אפשר גם אינטגרציה עם מערכות קיימות (ניהול מלאי, חשבשבת). החנות תהיה מהירה, מאובטחת ומותאמת למובייל.',
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
    'Content-Security-Policy': [
      "default-src 'self'",
      // Scripts: Allow Google Analytics/Tag Manager and inline scripts (required for GA initialization)
      // Note: 'unsafe-inline' for scripts should be replaced with nonces in production
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles: Allow inline styles (required for Tailwind/Framer Motion) and Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Allow self and Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: Allow self, data URIs, and HTTPS images
      "img-src 'self' data: https:",
      // Connect: Allow API calls to self, Google Analytics, and CRM API
      "connect-src 'self' https://www.google-analytics.com https://crm-system-alpha-eight.vercel.app",
      // Frame: Prevent embedding (clickjacking protection)
      "frame-ancestors 'none'",
      // Base URI: Restrict base tag to same origin
      "base-uri 'self'",
      // Form actions: Only allow forms to submit to same origin
      "form-action 'self'",
      // Object: Block plugins (Flash, Java, etc.)
      "object-src 'none'",
      // Media: Allow self
      "media-src 'self'",
      // Upgrade insecure requests
      "upgrade-insecure-requests"
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },
}

export type SEOConfig = typeof seoConfig
export type PageSlug = keyof typeof seoConfig.pages