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
    clients: {
      title: 'לקוחות ומלצות | סיפורי הצלחה',
      description: 'הכירו את הלקוחות המרוצים שלנו, קראו המלצות אמיתיות וסיפורי הצלחה. למעלה מ-50 עסקים סומכים עלינו לפתרונות דיגיטליים.',
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
          blog: 'בלוג',
          guides: 'מדריכים',
          faq: 'שאלות נפוצות',
          terms: 'תנאי שימוש',
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
            text: 'תלוי במורכבות הפרויקט. אתר תדמית בסיסי (5-7 עמודים): 2-3 שבועות. אתר עסקי מתקדם: 3-5 שבועות. חנות אונליין: 4-6 שבועות. מערכת מורכבת (CRM, פורטל): 6-12 שבועות. הזמנים כוללים אפיון, עיצוב, פיתוח, בדיקות והעלאה. אני תמיד מתחייב ללוחות זמנים ומעדכן לאורך הדרך.',
          },
        },

        // Technical Questions
        {
          '@type': 'Question',
          name: 'מה ההבדל בין Next.js לוורדפרס?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Next.js הוא פריימוורק מודרני לפיתוח מותאם אישית, בעוד WordPress הוא מערכת ניהול תוכן. יתרונות Next.js: ביצועים מעולים (טעינה מהירה), אבטחה גבוהה יותר, גמישות מלאה בעיצוב ופונקציונליות, קוד נקי ומותאם. מתאים לעסקים שרוצים אתר ייחודי ומהיר. WordPress מתאים יותר לאתרי תוכן פשוטים או בלוגים שצריכים עדכוני תוכן תכופים על ידי המשתמש. אני ממליץ Next.js לרוב העסקים שרוצים יתרון תחרותי.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אני צריך להבין בטכנולוגיה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בכלל לא! זה בדיוק התפקיד שלי. אתה רק צריך לספר לי מה העסק שלך עושה ומה המטרות שלך. אני אדאג לכל החלק הטכני - עיצוב, תכנות, שרתים, אבטחה. אני מסביר הכל בעברית פשוטה, בלי ז\'רגון מסובך. בסוף תקבל מערכת שקל לך להשתמש בה, עם הדרכה מלאה.',
          },
        },
        {
          '@type': 'Question',
          name: 'איזה טכנולוגיות אתה משתמש בהן?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני מתמחה בטכנולוגיות מודרניות ומהירות: Next.js 14 (React) לפיתוח אתרים מתקדמים, React Native לאפליקציות מובייל, Node.js לצד שרת, TypeScript לקוד בטוח ואמין, Tailwind CSS לעיצוב מהיר ויפה, MongoDB או PostgreSQL למסדי נתונים. כל הטכנולוגיות מובילות בתעשייה, מהירות, מאובטחות ונתמכות לטווח ארוך.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם האתר יהיה מהיר?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בהחלט! מהירות היא אחד העדיפויות העליונות שלי. כל אתר שאני בונה עובר אופטימיזציה מלאה: תמונות דחוסות, קוד ממוטב, שרת CDN מהיר, טעינה עצלה של תוכן. התוצאה: אתרים שנטענים תוך 1-2 שניות. זה משפיע ישירות על חוויית המשתמש, דירוג בגוגל ושיעורי ההמרה. אני משתמש בכלים כמו Google PageSpeed ו-Lighthouse כדי לוודא ציונים של 90+ מתוך 100.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם האתר יהיה מאובטח?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן, אבטחה היא בראש סדר העדיפויות. כל אתר כולל: תעודת SSL (HTTPS) לחיבור מוצפן, הגנה מפני התקפות נפוצות (XSS, SQL Injection), גיבויים אוטומטיים יומיים, עדכוני אבטחה שוטפים, אימות משתמשים חזק. לעסקים שמטפלים במידע רגיש (כמו תשלומים), אני מיישם תקני אבטחה מתקדמים ועומד בתקנות הגנת פרטיות (GDPR).',
          },
        },

        // Process Questions
        {
          '@type': 'Question',
          name: 'איך תהליך העבודה נראה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'התהליך כולל 5 שלבים: 1) פגישת היכרות - מבינים ביחד את הצרכים והמטרות (חינם). 2) אפיון - מכינים מפרט מפורט ומסמך עם כל הפונקציות. 3) עיצוב - מציגים עיצובים ראשוניים לאישור. 4) פיתוח - בונים את האתר עם עדכונים שבועיים. 5) בדיקות והעלאה - בודקים יסודית, מדריכים ומעלים לאוויר. כל השלב אתה מעורב ומאשר לפני שממשיכים הלאה.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אני יכול לראות את האתר בזמן הפיתוח?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בהחלט! שקיפות חשובה לי. אחרי שלב העיצוב, אני מעלה את האתר לסביבת פיתוח (staging) שאתה יכול לגשת אליה בכל זמן. ככה אתה יכול לראות את ההתקדמות, לתת משוב ולבקש שינויים בזמן אמת. זה חוסך זמן ומבטיח שהתוצאה בדיוק מה שרצית.',
          },
        },
        {
          '@type': 'Question',
          name: 'מה קורה אם אני רוצה לשנות משהו אחרי שהאתר מוכן?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'חודש ראשון אחרי ההשקה - שינויים קטנים בחינם (תיקוני באגים, עדכוני תוכן פשוטים). אחרי זה יש כמה אפשרויות: שינויים קטנים חד-פעמיים בתעריף שעתי (300 ש"ח לשעה), חבילת תחזוקה חודשית (500-1500 ש"ח לפי היקף), או שאני מלמד אותך לערוך תוכן בעצמך במערכת ניהול תוכן פשוטה. אני תמיד זמין לשאלות.',
          },
        },

        // Support & Maintenance
        {
          '@type': 'Question',
          name: 'האם אתה נותן תמיכה אחרי המסירה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן! אני לא נעלם אחרי שהאתר עולה לאוויר. כלול בכל פרויקט: 6 חודשי אחריות מלאה לתקלות טכניות, חודש תמיכה חינם (מענה לשאלות ושינויים קטנים), הדרכה מלאה על השימוש במערכת. אחרי זה אפשר להמשיך עם חבילת תחזוקה חודשית (500-1500 ש"ח) שכוללת: עדכוני אבטחה, גיבויים, שינויי תוכן, תמיכה טכנית. אני זמין בווטסאפ, מייל וטלפון.',
          },
        },
        {
          '@type': 'Question',
          name: 'מה כלול בחבילת התחזוקה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'חבילת תחזוקה חודשית כוללת: עדכוני אבטחה שוטפים, גיבוי יומי אוטומטי, מעקב אחר תקינות האתר (uptime monitoring), שינויי תוכן והוספת עמודים (עד שעתיים בחודש), תמיכה טכנית מהירה (מענה תוך 24 שעות), דוחות ביצועים חודשיים. חבילה בסיסית: 500 ש"ח. חבילה מתקדמת: 1000 ש"ח. חבילה פרימיום: 1500 ש"ח (כולל שיפורים ופיצ\'רים חדשים).',
          },
        },

        // Local & Business
        {
          '@type': 'Question',
          name: 'איפה אתה נמצא? האם אפשר להיפגש?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני נמצא ברמת גן (גוש דן, ליד תל אביב) ומשרת לקוחות בכל רחבי ישראל. בהחלט אפשר להיפגש פנים אל פנים - הפגישה הראשונה תמיד חינם. אני גם עובד עם לקוחות מרחוק (זום, טלפון, ווטסאפ) בצורה מאוד יעילה. רוב הלקוחות שלי מעדיפים תקשורת דיגיטלית כי זה חוסך זמן, אבל אם אתה בסביבה - נשמח להיפגש.',
          },
        },
        {
          '@type': 'Question',
          name: 'למה לבחור בך ולא בחברת פיתוח גדולה?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'יתרונות של עבודה איתי: שירות אישי - אתה מדבר איתי ישירות, לא עם מוקד. מחירים הוגנים - בלי תקורות של חברה גדולה. גמישות - אני יכול להתאים את עצמי ללוחות הזמנים שלך. מקצועיות - ניסיון של מעל 5 שנים ועשרות פרויקטים מוצלחים. זמינות - אני זמין בווטסאפ וטלפון, תמיד. מחויבות - הצלחה שלך היא הצלחה שלי, אני משקיע בכל פרויקט כאילו זה שלי.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה עובד עם עסקים קטנים?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בהחלט! רוב הלקוחות שלי הם עסקים קטנים ובינוניים, עצמאים ויזמים. אני מבין את האתגרים הייחודיים של עסק קטן - תקציב מוגבל, צורך בתוצאות מהירות, רצון להתחרות עם השחקנים הגדולים. אני מתאים את הפתרון בדיוק למה שאתה צריך, בלי "לנפח" את הפרויקט. יש לי גם חבילות במחיר נוח במיוחד לסטארטאפים ועסקים בהתחלה.',
          },
        },

        // SEO & Marketing
        {
          '@type': 'Question',
          name: 'האם האתר יופיע בגוגל?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כל אתר שאני בונה כולל אופטימיזציה בסיסית למנועי חיפוש (SEO): מבנה נכון של כותרות, מטא תגים מותאמים, מפת אתר (sitemap) אוטומטית, קוד נקי ומהיר, תגיות תמונה נכונות, נגישות. זה מבטיח שגוגל יכול למצוא ולאנדקס את האתר. אבל - להגיע למקומות הראשונים דורש עבודת SEO שוטפת: כתיבת תוכן איכותי, קישורים נכנסים, עדכונים קבועים. אני יכול לעזור בזה בנפרד או להפנות לשותף שיווקי.',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה גם עושה שיווק דיגיטלי?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'אני מתמחה בפיתוח ולא בשיווק דיגיטלי, אבל אני יכול לעזור עם היסודות: אופטימיזציה למנועי חיפוש (SEO טכני), חיבור לגוגל אנליטיקס ופייסבוק פיקסל, ייעוץ בסיסי לתוכן. לקמפיינים ממומנים (גוגל, פייסבוק) וניהול שיווקי מקצועי אני משתף פעולה עם מומחי שיווק מצוינים שאני יכול להמליץ עליהם. יחד - תקבל פתרון מלא.',
          },
        },

        // Specific Services
        {
          '@type': 'Question',
          name: 'האם אתה בונה אפליקציות מובייל?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'כן! אני בונה אפליקציות מובייל עם React Native - טכנולוגיה שמאפשרת לבנות אפליקציה אחת שעובדת גם על iOS וגם על Android. זה חוסך זמן ועלויות. המחירים: אפליקציה פשוטה - 25,000-40,000 ש"ח. אפליקציה מורכבת (התחברות, תשלומים, פוש) - 40,000-70,000 ש"ח. התהליך כולל פיתוח, בדיקות והעלאה לחנויות (App Store ו-Google Play).',
          },
        },
        {
          '@type': 'Question',
          name: 'האם אתה בונה חנויות אונליין?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'בהחלט! אני בונה חנויות אונליין מותאמות אישית עם כל מה שצריך: קטלוג מוצרים, עגלת קניות, מערכת תשלומים (אשראי, PayPal, Bit), ניהול הזמנות, חיבור למשלוחים, דוחות ואנליטיקס. אפשר גם אינטגרציה עם מערכות קיימות (ניהול מלאי, חשבשבת). מחיר: 20,000-35,000 ש"ח תלוי במורכבות. החנות תהיה מהירה, מאובטחת ומותאמת למובייל.',
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