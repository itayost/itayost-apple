// Centralized statistics bank with verified sources for AI SEO citability.
// Re-checked 2026-11-18 against primary sources; entries with no traceable
// primary source (Kissflow ROI, HashStudioz/Binmile savings, Forrester UX $100)
// were removed rather than kept as "verified".
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
    claim: 'שיפור של 0.1 שנייה במהירות אתר המובייל הגדיל המרות בקמעונאות ב-8.4% וערך הזמנה ממוצע ב-9.2%',
    claimEn: 'A 0.1-second improvement in mobile site speed increased retail conversions by 8.4% and average order value by 9.2%',
    value: '8.4%',
    source: 'Deloitte / Google, Milliseconds Make Millions',
    year: 2020,
    url: 'https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html',
    category: 'web-speed',
  },
  {
    id: 'speed-portent-conversion',
    claim: 'אתר B2B שנטען בשנייה אחת ממיר פי 3 מאתר שנטען ב-5 שניות, ובאתרי מסחר פי 2.5',
    claimEn: 'A B2B site that loads in 1 second converts 3x higher than one that loads in 5 seconds; 2.5x for e-commerce',
    value: '3x',
    source: 'Portent, Site Speed is (Still) Impacting Your Conversion Rate',
    year: 2022,
    url: 'https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm',
    category: 'web-speed',
  },
  {
    id: 'speed-google-3s-bounce',
    claim: '53% מהביקורים באתרי מובייל ננטשים אם הדף נטען יותר מ-3 שניות',
    claimEn: '53% of mobile site visits are abandoned if a page takes longer than 3 seconds to load',
    value: '53%',
    source: 'Google / DoubleClick, The Need for Mobile Speed',
    year: 2016,
    url: 'https://blog.google/products/admanager/the-need-for-mobile-speed/',
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
    claim: 'כ-60% מהגלישה באינטרנט בעולם היא ממובייל',
    claimEn: 'About 60% of global web traffic comes from mobile devices',
    value: '60%',
    source: 'StatCounter Global Stats',
    year: 2025,
    url: 'https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet',
    category: 'mobile',
  },
  {
    id: 'mobile-israel-smartphone',
    claim: '91.1% מהישראלים מחוברים לאינטרנט',
    claimEn: '91.1% of Israelis use the internet',
    value: '91.1%',
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
    claim: 'ב-2025 נמצאו 11,334 פרצות אבטחה חדשות באקוסיסטם של וורדפרס, עלייה של 42% לעומת 2024; 91% מהן בתוספים',
    claimEn: 'In 2025, 11,334 new vulnerabilities were found in the WordPress ecosystem, up 42% on 2024; 91% were in plugins',
    value: '11,334',
    source: 'Patchstack, State of WordPress Security in 2026',
    year: 2026,
    url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/',
    category: 'wordpress-security',
  },
  {
    id: 'wp-hacked-sucuri',
    claim: '95.5% מאתרי ה-CMS שנפרצו וטופלו על ידי Sucuri ב-2023 היו וורדפרס',
    claimEn: '95.5% of the CMS infections Sucuri cleaned up in 2023 were WordPress sites',
    value: '95.5%',
    source: 'Sucuri, Hacked Website & Malware Threat Report 2023',
    year: 2023,
    url: 'https://sucuri.net/reports/2023-hacked-website-report/',
    category: 'wordpress-security',
  },
  {
    id: 'wp-pagespeed-vs-nextjs',
    claim: 'כש-Digital Polygon העבירה את האתר שלה מוורדפרס ל-Next.js, ציון PageSpeed במובייל עלה מ-51 ל-86',
    claimEn: 'When Digital Polygon rebuilt its own site from WordPress to Next.js, its mobile PageSpeed score rose from 51 to 86',
    value: '35',
    source: 'Digital Polygon',
    year: 2024,
    url: 'https://www.digitalpolygon.com/blog/wordpress-vs-nextjs-performance',
    category: 'wordpress-security',
  },

  // --- SEO ---
  {
    id: 'seo-cwv-ranking',
    claim: 'דומיינים שנכשלו ב-Core Web Vitals קיבלו מדד נראות נמוך ב-3.7 נקודות אחוז מדומיינים שעברו',
    claimEn: 'Domains failing Core Web Vitals had a Visibility Index 3.7 percentage points lower than domains passing',
    value: '3.7pp',
    source: 'SISTRIX, Core Web Vitals is a measurable ranking factor',
    year: 2021,
    url: 'https://www.sistrix.com/blog/core-web-vitals-is-a-measurable-ranking-factor/',
    category: 'seo',
  },

  // --- Website ROI ---
  {
    id: 'web-roi-credibility',
    claim: 'במחקר עם 2,684 משתתפים, מראה האתר היה הגורם שהוזכר הכי הרבה בהערכת האמינות שלו: ב-46.1% מההערות',
    claimEn: 'In a study of 2,684 people, design look was the most-mentioned factor in judging a site\'s credibility: 46.1% of comments',
    value: '46.1%',
    source: 'Stanford Persuasive Technology Lab / Consumer WebWatch',
    year: 2002,
    url: 'https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility',
    category: 'web-roi',
  },
  {
    id: 'web-roi-no-website',
    claim: '17% מהעסקים הקטנים בארה"ב עדיין בלי אתר',
    claimEn: '17% of US small businesses still have no website',
    value: '17%',
    source: 'Clutch',
    year: 2025,
    url: 'https://clutch.co/press-releases/smb-websites-2025',
    category: 'web-roi',
  },

  // --- CRM ---
  // Retired 2026-11: the 2014 Nucleus "$8.71" figure (superseded by its own
  // 2023 study below), the "29% sales / 34% productivity / 42% forecast"
  // figures (no primary Salesforce source could be traced) and the "47-55%
  // fail" range (traces to a 2009 Forrester study at best; the 55% to nothing).
  // content-invariants.test.ts keeps them out of the site copy.
  {
    id: 'crm-roi',
    claim: 'CRM מחזיר בממוצע $3.10 על כל $1 שמושקע',
    claimEn: 'CRM returns an average of $3.10 for every $1 spent',
    value: '$3.10',
    source: 'Nucleus Research, CRM returns $3.10 per dollar spent',
    year: 2023,
    url: 'https://nucleusresearch.com/research/single/crm-returns-3-10-per-dollar-spent/',
    category: 'crm',
  },
  {
    id: 'crm-roi-time-savings',
    claim: '51% מהתשואה של CRM מגיעים מחיסכון בזמן עבודה ומייעול תהליכים; הגדלת ההכנסות תורמת הכי מעט',
    claimEn: 'Time savings and process efficiency make up 51% of total CRM ROI; increased revenue contributes the least',
    value: '51%',
    source: 'Nucleus Research, CRM benefit areas with the greatest ROI impact',
    year: 2024,
    url: 'https://nucleusresearch.com/research/single/crm-benefit-areas-with-the-greatest-roi-impact/',
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

  // --- Automation ---
  {
    id: 'auto-time-savings',
    claim: '53% מהעובדים מעריכים שאוטומציה יכולה לחסוך להם עד שעתיים ביום (כ-240 שעות בשנה); 78% מהמנהלים מעריכים עד 3 שעות ביום',
    claimEn: '53% of employees believe automation could save them up to 2 hours a day (~240 hours a year); 78% of leaders up to 3 hours a day',
    value: '240',
    source: 'WorkMarket, 2020 In(Sight) Report',
    year: 2017,
    url: 'https://www.globenewswire.com/news-release/2017/7/13/1044173/0/en/WorkMarket-2020-In-Sight-Report-What-AI-Automation-Really-Mean-For-Work.html',
    category: 'automation',
  },
  {
    id: 'auto-data-errors',
    claim: 'שיעור הטעויות הממוצע בהזנת נתונים ידנית הוא כ-1%',
    claimEn: 'The average error rate of manual data entry is about 1%',
    value: '1%',
    source: 'Quality Magazine, Manual Data Entry and Its Effects on Quality',
    year: 2022,
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
    claim: 'לידים שקיבלו מענה תוך 5 דקות היו בסיכוי גבוה פי 21 להפוך לליד איכותי לעומת מענה אחרי 30 דקות',
    claimEn: 'Leads called within 5 minutes were 21x more likely to qualify than leads called after 30 minutes',
    value: '21x',
    source: 'InsideSales.com / MIT (Oldroyd), Lead Response Management Study',
    year: 2007,
    url: 'https://resources.insidesales.com/wp-content/uploads/2019/11/2014-Lead-Response-Report.pdf',
    category: 'lead-response',
  },
  {
    id: 'lead-1min',
    claim: 'מענה לליד תוך דקה העלה את סיכויי ההמרה ב-391% לעומת מענה מאוחר יותר',
    claimEn: 'Calling a lead within 1 minute made conversion 391% more likely than any later call',
    value: '391%',
    source: 'Velocify',
    year: 2012,
    url: 'https://velocify.com/blog/press-release/infographic-sales-processes-boost-lead-conversion-by-391-percent/',
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
    claim: 'שיעור נטישת העגלה הממוצע הוא 70.22%',
    claimEn: 'The average documented cart abandonment rate is 70.22%',
    value: '70.22%',
    source: 'Baymard Institute, Cart Abandonment Rate',
    year: 2025,
    url: 'https://baymard.com/blog/cart-abandonment-rate',
    category: 'ecommerce',
  },
  {
    id: 'ecom-checkout-fix',
    claim: 'תיקון עיצוב הקופה יכול להעלות המרות ב-35.26% באתר מסחר גדול',
    claimEn: 'Fixing checkout design issues could raise conversion by 35.26% for an average large e-commerce site',
    value: '35.26%',
    source: 'Baymard Institute',
    year: 2025,
    url: 'https://baymard.com/blog/cart-abandonment-rate',
    category: 'ecommerce',
  },
  {
    id: 'ecom-israel-market',
    claim: 'שוק המסחר המקוון בישראל הסתכם בכ-10.2 מיליארד דולר ב-2025',
    claimEn: 'Israel\'s e-commerce market reached about $10.2 billion in 2025',
    value: '$10.2B',
    source: 'ECDB',
    year: 2025,
    url: 'https://ecdb.com/resources/sample-data/market/il/all',
    category: 'ecommerce',
  },
  {
    id: 'ecom-mobile-share',
    claim: 'כ-59% ממכירות המסחר המקוון בעולם נעשות במובייל',
    claimEn: 'About 59% of worldwide retail e-commerce sales happen on mobile',
    value: '59%',
    source: 'Statista Market Insights',
    year: 2025,
    url: 'https://www.statista.com/statistics/1449284/retail-mobile-commerce-revenue-worldwide/',
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
    claim: 'רק אחד מכל 7 ניסויי A/B מנצח',
    claimEn: 'Only 1 in 7 A/B tests is a winning test',
    value: '1 in 7',
    source: 'VWO, CRO industry insights',
    year: 2025,
    url: 'https://vwo.com/blog/cro-industry-insights/',
    category: 'landing-pages',
  },

  // --- Mobile Apps ---
  {
    id: 'app-push-retention',
    claim: 'משתמשים שקיבלו Push Notifications ב-90 הימים הראשונים נשמרו בשיעור גבוה כמעט פי 3',
    claimEn: 'Users who received push notifications in their first 90 days had nearly 3x higher retention',
    value: '3x',
    source: 'Urban Airship, mobile app retention study',
    year: 2017,
    url: 'https://www.airship.com/newsroom/new-urban-airship-mobile-app-retention-study/',
    category: 'mobile-apps',
  },
  {
    id: 'app-crossplatform-market',
    claim: 'Flutter ו-React Native הם שני הפריימוורקים חוצי-הפלטפורמות הנפוצים ביותר',
    claimEn: 'Flutter and React Native are the two most used cross-platform frameworks',
    value: 'top 2',
    source: 'Stack Overflow Developer Survey',
    year: 2024,
    url: 'https://survey.stackoverflow.co/2024/technology',
    category: 'mobile-apps',
  },

  // --- UX Design ---
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
    claim: 'חברות ברבעון העליון של מדד העיצוב של McKinsey הגדילו הכנסות ב-32 נקודות אחוז יותר מהמתחרות שלהן ותשואה לבעלי מניות ב-56 נקודות אחוז יותר, לאורך 5 שנים',
    claimEn: 'Top-quartile McKinsey Design Index companies had 32 percentage points higher revenue growth and 56 points higher TSR than peers over five years',
    value: '32pp',
    source: 'McKinsey & Company, The Business Value of Design',
    year: 2018,
    url: 'https://www.mckinsey.com/capabilities/prosper-and-growth/our-insights/the-business-value-of-design',
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
