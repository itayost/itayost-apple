// Centralized statistics bank with verified sources for AI SEO citability
// Each statistic includes the claim, source, year, and URL for verification

export interface Statistic {
  id: string
  claim: string // The factual claim (Hebrew)
  claimEn: string // English version for schema/meta
  value: string // The key number
  source: string // Organization/study name
  year: number
  url: string
  category: StatCategory
}

export type StatCategory =
  | 'web-speed'
  | 'mobile'
  | 'wordpress-security'
  | 'seo'
  | 'web-roi'
  | 'crm'
  | 'automation'
  | 'lead-response'
  | 'ecommerce'
  | 'landing-pages'
  | 'mobile-apps'
  | 'ux-design'
  | 'accessibility'

export const statistics: Statistic[] = [
  // --- Web Speed & Performance ---
  {
    id: 'speed-deloitte-01s',
    claim: 'שיפור של 0.1 שנייה במהירות אתר הגדיל המרות בקמעונאות ב-8.4% וערך הזמנה ממוצע ב-9.2%',
    claimEn: 'A 0.1-second improvement in site speed increased retail conversions by 8.4% and average order value by 9.2%',
    value: '8.4%',
    source: 'Google / Deloitte, Milliseconds Make Millions',
    year: 2020,
    url: 'https://web.dev/case-studies/milliseconds-make-millions',
    category: 'web-speed',
  },
  {
    id: 'speed-portent-conversion',
    claim: 'שיעור ההמרה יורד ב-4.42% על כל שנייה נוספת של טעינה. אתר שנטען בשנייה ממיר פי 3 מאתר שנטען ב-5 שניות',
    claimEn: 'Conversion rates drop by 4.42% for each additional second of load time (0-5s). A 1s site converts 3x higher than a 5s site',
    value: '4.42%',
    source: 'Portent (Clearlink)',
    year: 2022,
    url: 'https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm',
    category: 'web-speed',
  },
  {
    id: 'speed-google-3s-bounce',
    claim: '53% מהמבקרים במובייל עוזבים אתר שנטען יותר מ-3 שניות',
    claimEn: '53% of mobile visitors leave a site that takes longer than 3 seconds to load',
    value: '53%',
    source: 'Google, The Need for Mobile Speed',
    year: 2016,
    url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/',
    category: 'web-speed',
  },
  {
    id: 'speed-vodafone-lcp',
    claim: 'וודאפון שיפרה LCP ב-31% וראתה עלייה של 8% במכירות, 15% בלידים ו-11% בעגלות',
    claimEn: 'Vodafone improved LCP by 31%, resulting in 8% more sales, 15% more leads, and 11% more carts',
    value: '8%',
    source: 'Vodafone / web.dev',
    year: 2021,
    url: 'https://web.dev/case-studies/vodafone',
    category: 'web-speed',
  },
  {
    id: 'speed-amazon-100ms',
    claim: 'אמזון גילתה שכל 100ms עיכוב עלו להם 1% מהמכירות',
    claimEn: 'Amazon found that every 100ms of latency cost them 1% in sales',
    value: '1%',
    source: 'Amazon (Greg Linden)',
    year: 2006,
    url: 'https://www.gigaspaces.com/blog/amazon-found-every-100ms-of-latency-cost-them-1-in-sales/',
    category: 'web-speed',
  },

  // --- Mobile ---
  {
    id: 'mobile-traffic-share',
    claim: 'מכשירים ניידים מהווים 62-64% מתעבורת האינטרנט העולמית',
    claimEn: 'Mobile devices account for 62-64% of global web traffic',
    value: '63%',
    source: 'StatCounter / Statista',
    year: 2025,
    url: 'https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/',
    category: 'mobile',
  },
  {
    id: 'mobile-israel-smartphone',
    claim: 'בישראל יש 91% חדירת סמארטפונים ו-91.1% חדירת אינטרנט',
    claimEn: 'Israel has 91% smartphone penetration and 91.1% internet penetration',
    value: '91%',
    source: 'DataReportal, Digital 2025: Israel',
    year: 2025,
    url: 'https://datareportal.com/reports/digital-2025-israel',
    category: 'mobile',
  },
  {
    id: 'mobile-google-indexing',
    claim: 'ב-2024 גוגל השלימה מעבר למובייל-פירסט אינדקסינג ל-100% מהאתרים',
    claimEn: 'In 2024, Google completed transition to mobile-first indexing for 100% of websites',
    value: '100%',
    source: 'Google Search Central',
    year: 2024,
    url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
    category: 'mobile',
  },

  // --- WordPress Security ---
  {
    id: 'wp-vulnerabilities-2025',
    claim: 'ב-2025 נמצאו 11,334 פרצות אבטחה חדשות באקוסיסטם של וורדפרס, עלייה של 42% לעומת 2024',
    claimEn: 'In 2025, 11,334 new security vulnerabilities were found in the WordPress ecosystem, a 42% increase over 2024',
    value: '11,334',
    source: 'Patchstack, State of WordPress Security 2025',
    year: 2025,
    url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/',
    category: 'wordpress-security',
  },
  {
    id: 'wp-hacked-sucuri',
    claim: '96.2% מכלל אתרי CMS שנפרצו ב-2024 היו וורדפרס. כ-13,000 אתרי וורדפרס נפרצים ביום',
    claimEn: '96.2% of all hacked CMS sites in 2024 were WordPress. About 13,000 WordPress sites are hacked daily',
    value: '96.2%',
    source: 'Sucuri, SiteCheck Malware Trends Report 2024',
    year: 2024,
    url: 'https://sucuri.net/reports/sitecheck-malware-trends-report-2024/',
    category: 'wordpress-security',
  },
  {
    id: 'wp-pagespeed-vs-nextjs',
    claim: 'אתר וורדפרס קיבל ציון 51% ב-PageSpeed מובייל לעומת 86% לאתר Next.js זהה - שיפור של 35 נקודות',
    claimEn: 'WordPress scored 51% on mobile PageSpeed while equivalent Next.js site scored 86% - a 35-point improvement',
    value: '35',
    source: 'Digital Polygon',
    year: 2024,
    url: 'https://www.digitalpolygon.com/blog/wordpress-vs-nextjs-performance',
    category: 'wordpress-security',
  },

  // --- SEO ---
  {
    id: 'seo-cwv-ranking',
    claim: 'אתרים "איטיים" (שלא עומדים ב-Core Web Vitals) מדורגים 3.7 נקודות אחוז נמוך יותר מאתרים "מהירים"',
    claimEn: 'Slow domains failing Core Web Vitals rank 3.7 percentage points worse than fast domains',
    value: '3.7%',
    source: 'Advanced Web Ranking / Searchmetrics',
    year: 2024,
    url: 'https://www.corewebvitals.io/core-web-vitals/seo',
    category: 'seo',
  },

  // --- Website ROI ---
  {
    id: 'web-roi-credibility',
    claim: '75% מהצרכנים שופטים את האמינות של עסק לפי העיצוב של האתר שלו',
    claimEn: '75% of consumers judge a business credibility based on its website design',
    value: '75%',
    source: 'Stanford Web Credibility Research Project',
    year: 2002,
    url: 'https://credibility.stanford.edu/',
    category: 'web-roi',
  },
  {
    id: 'web-roi-no-website',
    claim: '27% מהעסקים הקטנים עדיין בלי אתר. 31% מהצרכנים לא קנו מעסק קטן כי לא היה לו אתר',
    claimEn: '27% of small businesses have no website. 31% of shoppers avoided a small business because it lacked a website',
    value: '27%',
    source: 'Top Design Firms / Clutch',
    year: 2025,
    url: 'https://www.networksolutions.com/blog/small-business-website-statistics/',
    category: 'web-roi',
  },

  // --- CRM ---
  {
    id: 'crm-roi',
    claim: 'CRM מחזיר בממוצע $8.71 על כל $1 שמושקע',
    claimEn: 'CRM returns an average of $8.71 for every $1 spent',
    value: '$8.71',
    source: 'Nucleus Research',
    year: 2014,
    url: 'https://nucleusresearch.com/research/single/crm-pays-back-8-71-for-every-dollar-spent/',
    category: 'crm',
  },
  {
    id: 'crm-sales-improvement',
    claim: 'עסקים שמשתמשים ב-CRM רואים עלייה של 29% במכירות, 34% בפרודוקטיביות ו-42% בדיוק תחזיות',
    claimEn: 'Businesses using CRM see 29% increase in sales, 34% in productivity, and 42% in forecast accuracy',
    value: '29%',
    source: 'Salesforce',
    year: 2024,
    url: 'https://www.salesforce.com/crm/',
    category: 'crm',
  },
  {
    id: 'crm-retention',
    claim: 'העלאת שימור לקוחות ב-5% מגדילה רווחים ב-25% עד 95%',
    claimEn: 'Increasing customer retention by 5% increases profits by 25% to 95%',
    value: '25-95%',
    source: 'Bain & Company / Harvard Business Review',
    year: 2014,
    url: 'https://hbr.org/2014/10/the-value-of-keeping-the-right-customers',
    category: 'crm',
  },
  {
    id: 'crm-failure-rate',
    claim: 'שיעור הכישלון בהטמעת CRM הוא 47-55%, בעיקר בגלל אימוץ איטי (49%), ניהול שינוי לקוי (36%) והגדרת דרישות לקויה (33%)',
    claimEn: 'CRM implementation failure rate is 47-55%, primarily due to slow adoption (49%), poor change management (36%), and poor requirements (33%)',
    value: '47-55%',
    source: 'Forrester Research',
    year: 2025,
    url: 'https://www.forrester.com/blogs/poor-change-management-kills-crm-success-here-is-how-to-get-it-right/',
    category: 'crm',
  },

  // --- Automation ---
  {
    id: 'auto-time-savings',
    claim: 'עובדים מעריכים שאוטומציה יכולה לחסוך להם 240 שעות בשנה; מנהלים מעריכים 360 שעות',
    claimEn: 'Employees estimate automation saves 240 hours/year; leaders estimate 360 hours/year',
    value: '240',
    source: 'Zapier / SmartSheet',
    year: 2024,
    url: 'https://smallbiztrends.com/zapier-automation-confidence-survey/',
    category: 'automation',
  },
  {
    id: 'auto-roi-12months',
    claim: '60% מהארגונים משיגים ROI תוך 12 חודשים מהטמעת אוטומציה, עם שיפור פרודוקטיביות של 25-30%',
    claimEn: '60% of organizations achieve ROI within 12 months of automation, with 25-30% productivity improvement',
    value: '60%',
    source: 'Kissflow',
    year: 2025,
    url: 'https://kissflow.com/workflow/workflow-automation-statistics-trends/',
    category: 'automation',
  },
  {
    id: 'auto-data-errors',
    claim: 'הזנת נתונים ידנית כוללת שיעור שגיאות של 1-4%. מערכות אוטומטיות מגיעות לדיוק של 99.96-99.99%',
    claimEn: 'Manual data entry has 1-4% error rate. Automated systems achieve 99.96-99.99% accuracy',
    value: '100x',
    source: 'Conexiom / Quality Magazine',
    year: 2024,
    url: 'https://www.qualitymag.com/articles/96853-manual-data-entry-and-its-effects-on-quality',
    category: 'automation',
  },
  {
    id: 'auto-sellers-time',
    claim: 'אנשי מכירות מבזבזים רק 28-30% מהזמן שלהם על מכירות בפועל. 70%+ הולך למשימות אדמיניסטרטיביות',
    claimEn: 'Sales reps spend only 28-30% of time actually selling. 70%+ goes to admin tasks',
    value: '28%',
    source: 'Salesforce, State of Sales Report',
    year: 2024,
    url: 'https://www.salesforce.com/resources/research-reports/state-of-sales/',
    category: 'automation',
  },

  // --- Lead Response ---
  {
    id: 'lead-5min',
    claim: 'עסקים שמגיבים ללידים תוך 5 דקות הם בסיכוי גבוה פי 21 לטפל בליד בהצלחה',
    claimEn: 'Companies responding to leads within 5 minutes are 21x more likely to qualify the lead',
    value: '21x',
    source: 'MIT / InsideSales.com',
    year: 2007,
    url: 'https://www.insidesales.com/response-time-matters/',
    category: 'lead-response',
  },
  {
    id: 'lead-1min',
    claim: 'תגובה לליד תוך דקה מגדילה המרות ב-391%',
    claimEn: 'Responding to a lead within 1 minute increases conversions by 391%',
    value: '391%',
    source: 'Velocify',
    year: 2015,
    url: 'https://verse.ai/blog/speed-to-lead-statistics',
    category: 'lead-response',
  },
  {
    id: 'lead-avg-response',
    claim: 'זמן תגובה ממוצע לליד B2B הוא 42 שעות. 23% מהעסקים לא מגיבים בכלל',
    claimEn: 'Average B2B lead response time is 42 hours. 23% of companies never respond',
    value: '42h',
    source: 'Harvard Business Review',
    year: 2011,
    url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
    category: 'lead-response',
  },

  // --- Ecommerce ---
  {
    id: 'ecom-cart-abandonment',
    claim: 'שיעור נטישת עגלה ממוצע הוא 70.19%. סיבות עיקריות: 48% עלויות נסתרות, 26% הרשמה כפויה, 25% חששות אבטחה',
    claimEn: 'Average cart abandonment rate is 70.19%. Top reasons: 48% extra costs, 26% forced account creation, 25% security concerns',
    value: '70.19%',
    source: 'Baymard Institute',
    year: 2024,
    url: 'https://baymard.com/lists/cart-abandonment-rate',
    category: 'ecommerce',
  },
  {
    id: 'ecom-checkout-fix',
    claim: 'תיקון בעיות UX בתהליך הקנייה יכול להגדיל המרות ב-35.26%. $260 מיליארד בהזמנות ניתנים להצלה',
    claimEn: 'Fixing checkout UX issues can increase conversions by 35.26%. $260B in lost orders is recoverable',
    value: '35.26%',
    source: 'Baymard Institute',
    year: 2024,
    url: 'https://baymard.com/research/checkout-usability',
    category: 'ecommerce',
  },
  {
    id: 'ecom-israel-market',
    claim: 'שוק המסחר האלקטרוני בישראל הגיע ל-9.5 מיליארד דולר ב-2024 וצפוי לצמוח ב-8.1% בשנה עד 2029',
    claimEn: 'Israeli ecommerce market reached $9.5B in 2024, projected to grow at 8.1% CAGR through 2029',
    value: '$9.5B',
    source: 'eCommerceDB / Research and Markets',
    year: 2024,
    url: 'https://ecommercedb.com/markets/il/all',
    category: 'ecommerce',
  },
  {
    id: 'ecom-mobile-share',
    claim: 'מכשירים ניידים מהווים 59% ממכירות הסחר האלקטרוני העולמי, סך $4.01 טריליון',
    claimEn: 'Mobile devices account for 59% of global ecommerce sales, totaling $4.01 trillion',
    value: '59%',
    source: 'Statista',
    year: 2025,
    url: 'https://www.statista.com/statistics/806336/mobile-retail-commerce-share-worldwide/',
    category: 'ecommerce',
  },

  // --- Landing Pages ---
  {
    id: 'lp-median-conversion',
    claim: 'שיעור ההמרה החציוני בדפי נחיתה הוא 6.6%, על בסיס 41,000 דפי נחיתה ו-464 מיליון מבקרים',
    claimEn: 'Median landing page conversion rate is 6.6%, based on 41,000 landing pages and 464M visitors',
    value: '6.6%',
    source: 'Unbounce Conversion Benchmark Report',
    year: 2024,
    url: 'https://unbounce.com/average-conversion-rates-landing-pages/',
    category: 'landing-pages',
  },
  {
    id: 'lp-simple-language',
    claim: 'דפי נחיתה בשפה פשוטה ממירים 11.1% לעומת 5.3% בשפה אקדמית - פשטות מכפילה המרות',
    claimEn: 'Landing pages with simple language convert at 11.1% vs 5.3% for academic language - simplicity doubles conversion',
    value: '2x',
    source: 'Unbounce',
    year: 2024,
    url: 'https://unbounce.com/landing-pages/whats-a-good-conversion-rate/',
    category: 'landing-pages',
  },
  {
    id: 'lp-ab-testing',
    claim: 'חברות שמשתמשות ב-A/B Testing רואות שיפור של עד 30% בהמרות. 60% מהחברות כבר עושות A/B Testing',
    claimEn: 'Companies using A/B testing see up to 30% conversion improvement. 60% already use A/B testing',
    value: '30%',
    source: 'VWO',
    year: 2024,
    url: 'https://vwo.com/blog/ab-testing-statistics/',
    category: 'landing-pages',
  },

  // --- Mobile Apps ---
  {
    id: 'app-rn-cost-savings',
    claim: 'פיתוח ב-React Native חוסך 30-40% בעלויות ו-40% בזמן פיתוח לעומת Native',
    claimEn: 'React Native saves 30-40% in costs and 40% in development time compared to native',
    value: '40%',
    source: 'HashStudioz / Binmile Technologies',
    year: 2025,
    url: 'https://www.hashstudioz.com/blog/react-native-app-development-cost-budgeting-in-2025/',
    category: 'mobile-apps',
  },
  {
    id: 'app-push-retention',
    claim: 'משתמשים שמקבלים Push Notifications ב-90 הימים הראשונים נשמרים פי 3 יותר',
    claimEn: 'Users receiving push notifications in first 90 days have 3x higher retention',
    value: '3x',
    source: 'Airship',
    year: 2025,
    url: 'https://www.airship.com/resources/benchmark-report/mobile-app-push-notification-benchmarks-for-2025/',
    category: 'mobile-apps',
  },
  {
    id: 'app-crossplatform-market',
    claim: 'Flutter מחזיק 46% ו-React Native 35% מנתח השוק של פריימוורקים חוצי-פלטפורמות',
    claimEn: 'Flutter holds 46% and React Native 35% market share among cross-platform frameworks',
    value: '35%',
    source: 'Stack Overflow Developer Survey',
    year: 2024,
    url: 'https://www.statista.com/statistics/869224/worldwide-software-developer-working-hours/',
    category: 'mobile-apps',
  },

  // --- UX Design ---
  {
    id: 'ux-roi-forrester',
    claim: 'כל $1 שמושקע ב-UX מחזיר $100 - ROI של 9,900%',
    claimEn: 'Every $1 invested in UX yields $100 return - ROI of 9,900%',
    value: '$100',
    source: 'Forrester Research',
    year: 2016,
    url: 'https://www.eficode.com/blog/achieving-roi-with-ux-design',
    category: 'ux-design',
  },
  {
    id: 'ux-50ms-impression',
    claim: 'משתמשים מגבשים דעה על אתר תוך 50 מילישניות בלבד',
    claimEn: 'Users form aesthetic judgments about a website within 50 milliseconds',
    value: '50ms',
    source: 'Gitte Lindgaard et al., Carleton University',
    year: 2006,
    url: 'https://www.tandfonline.com/doi/abs/10.1080/01449290500330448',
    category: 'ux-design',
  },
  {
    id: 'ux-design-led-companies',
    claim: 'חברות מובלות עיצוב הכו את מדד S&P 500 ב-211% לאורך 10 שנים',
    claimEn: 'Design-led companies outperformed the S&P 500 by 211% over 10 years',
    value: '211%',
    source: 'Design Management Institute',
    year: 2016,
    url: 'https://www.dmi.org/blogpost/1093220/182956/Design-Driven-Companies-Outperform-S-P-by-228-Over-Ten-Years--The-DMI-Design-Value-Index',
    category: 'ux-design',
  },
  {
    id: 'ux-mckinsey-revenue',
    claim: 'חברות עם עיצוב מוביל רואות צמיחת הכנסות גבוהה ב-32 נקודות אחוז ותשואה למשקיעים גבוהה ב-56 נקודות',
    claimEn: 'Top-quartile design companies achieved 32pp higher revenue growth and 56pp higher shareholder returns',
    value: '32pp',
    source: 'McKinsey & Company, The Business Value of Design',
    year: 2018,
    url: 'https://www.mckinsey.com/capabilities/mckinsey-design/our-insights/the-business-value-of-design',
    category: 'ux-design',
  },
  {
    id: 'ux-pay-premium',
    claim: '86% מהקונים מוכנים לשלם יותר עבור חוויית לקוח טובה יותר, עד 16% פרמיה',
    claimEn: '86% of buyers willing to pay more for better customer experience, up to 16% premium',
    value: '86%',
    source: 'PwC, Future of Customer Experience',
    year: 2018,
    url: 'https://www.pwc.com/us/en/services/consulting/library/consumer-intelligence-series/future-of-customer-experience.html',
    category: 'ux-design',
  },
  {
    id: 'ux-5-users-test',
    claim: 'בדיקה עם 5 משתמשים בלבד מגלה 85% מבעיות השימושיות',
    claimEn: 'Testing with just 5 users uncovers 85% of usability problems',
    value: '85%',
    source: 'Nielsen Norman Group',
    year: 2012,
    url: 'https://www.nngroup.com/articles/how-many-test-users/',
    category: 'ux-design',
  },
  {
    id: 'ux-design-system-efficiency',
    claim: 'מערכת עיצוב (Design System) מגדילה יעילות צוותי עיצוב ב-38% ופיתוח ב-31%',
    claimEn: 'Design systems increase design team efficiency by 38% and development teams by 31%',
    value: '38%',
    source: 'Sparkbox, The Value of Design Systems',
    year: 2019,
    url: 'https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system',
    category: 'ux-design',
  },

  // --- Accessibility ---
  {
    id: 'a11y-market',
    claim: '1.3 מיליארד אנשים (16% מאוכלוסיית העולם) חיים עם מוגבלות כלשהי. 71% מהלקוחות עם מוגבלות עוזבים אתרים לא נגישים',
    claimEn: '1.3B people (16% of world population) have a disability. 71% of disabled customers leave inaccessible websites',
    value: '1.3B',
    source: 'WHO / W3C WAI',
    year: 2024,
    url: 'https://www.w3.org/WAI/business-case/',
    category: 'accessibility',
  },
  {
    id: 'a11y-compliance',
    claim: '98% מהאתרים לא עומדים בתקני WCAG 2.1. בארה"ב הוגשו כ-4,000 תביעות נגישות ב-2024',
    claimEn: '98% of websites fail WCAG 2.1 compliance. Nearly 4,000 ADA lawsuits filed in 2024 in the US',
    value: '98%',
    source: 'WebAIM Million / UsableNet',
    year: 2024,
    url: 'https://www.allaccessible.org/blog/web-accessibility-statistics-the-impact-of-disabilities-on-web-use',
    category: 'accessibility',
  },
]

// Helper to get statistics by category
export const getStatsByCategory = (category: StatCategory): Statistic[] =>
  statistics.filter(s => s.category === category)

// Helper to get a specific statistic by ID
export const getStatById = (id: string): Statistic | undefined =>
  statistics.find(s => s.id === id)
