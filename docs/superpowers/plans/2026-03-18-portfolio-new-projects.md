# Portfolio New Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 new portfolio entries (Garden of Eden, FutureKids, Amit EyeBrows, TA CRM) to the portfolio data file, update featured flags, and add the ecommerce category.

**Architecture:** Single-file data change. All portfolio content lives in `src/data/portfolio.ts` as a typed array. No components, routes, or API changes needed. The ecommerce category type already exists in the TypeScript union — only the display filter array needs updating.

**Tech Stack:** TypeScript, Next.js App Router (no runtime changes)

---

## File Map

| Action | File | Change |
|--------|------|--------|
| Modify | `src/data/portfolio.ts` | Add 4 entries, update 3 featured flags, add ecommerce category |

---

### Task 1: Add ecommerce category and update featured flags

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Add ecommerce to portfolioCategories**

In `src/data/portfolio.ts`, find the `portfolioCategories` array (around line 53) and append the new category:

```ts
export const portfolioCategories = [
  { id: 'all', label: 'הכל', value: 'all' },
  { id: 'web', label: 'אתרים', value: 'web' },
  { id: 'system', label: 'מערכות', value: 'system' },
  { id: 'mobile', label: 'אפליקציות', value: 'mobile' },
  { id: 'ecommerce', label: 'חנויות', value: 'ecommerce' },
] as const
```

- [ ] **Step 2: Update featured flags for IDs 1, 5, 6 → false**

In `portfolioData`, find the entries with `id: 1` (kitchen-optimizer), `id: 5` (shepes-group), and `id: 6` (neshatamar) and change `featured: true` to `featured: false` in each.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat(portfolio): add ecommerce category, unfeature 3 old projects"
```

---

### Task 2: Add Garden of Eden entry (ID 7)

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Append Garden of Eden to portfolioData**

Add after the last existing entry (id: 6), before the closing `]`:

```ts
  {
    id: 7,
    slug: 'garden-of-eden',
    title: 'Garden of Eden',
    subtitle: 'מערכת ניהול אקדמיית כדורגל',
    category: 'system',
    description: 'פלטפורמה לניהול מאמנים ומתאמנים עם מבדקים גופניים וקוגנטיביים, ציונים אוטומטיים וכרטיס שחקן בסגנון EA FC',
    longDescription: 'פיתוח פלטפורמה מלאה לאקדמיית כדורגל Garden of Eden המשרתת מאמנים, מתאמנים והנהלה. המערכת כוללת שלושה ממשקי משתמש נפרדים: מתאמנים צופים בציוניהם בכרטיס שחקן אינטראקטיבי בסגנון EA FC, מאמנים מבצעים ומנהלים מבדקים גופניים וקוגנטיביים, ומנהלים שולטים בכל היבטי הניהול. אימות באמצעות WhatsApp OTP ואינטגרציה עם שער תשלומים Meshulam.',
    image: '/images/EdenGarden.png',
    imageSizes: {
      desktop: '/images/EdenGarden.png',
      display: '/images/EdenGarden.png',
      mobile: '/images/EdenGarden.png',
      thumbnail: '/images/EdenGarden.png',
    },
    tags: ['Next.js', 'Supabase', 'WhatsApp', 'Framer Motion', 'RTL'],
    technologies: ['Next.js', 'Supabase', 'Tailwind'],
    color: 'brand-green',
    pattern: 'dots',
    accentColor: 'brand-blue',
    stats: {
      trainees: '100+',
      assessments: '500+',
      roles: '3',
      rating: '4.9★',
    },
    client: 'Garden of Eden Football Academy',
    year: '2025',
    duration: '4 חודשים',
    link: 'https://www.edengarden.co.il',
    linkType: 'live',
    featured: true,
    features: [
      'כרטיס שחקן אישי בסגנון EA FC',
      'מבדקים גופניים וקוגנטיביים אוטומטיים',
      '3 תפקידי משתמש (מתאמן / מאמן / אדמין)',
      'אימות WhatsApp OTP',
      'אינטגרציית תשלומים Meshulam',
      'מעקב התקדמות ותוכניות תזונה',
    ],
    results: [
      { label: 'מתאמנים פעילים', value: '100+' },
      { label: 'מבדקים שבוצעו', value: '500+' },
      { label: 'ממשקי משתמש', value: '3' },
      { label: 'דירוג', value: '4.9★' },
    ],
    testimonial: {
      text: 'המערכת שינתה את האופן שבו אנחנו מנהלים את האקדמיה. המתאמנים מתלהבים מכרטיס השחקן האישי שלהם.',
      author: 'מנהל Garden of Eden',
      role: 'מנהל האקדמיה',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'מנהל Garden of Eden',
      },
      reviewBody: 'המערכת שינתה את האופן שבו אנחנו מנהלים את האקדמיה. המתאמנים מתלהבים מכרטיס השחקן האישי שלהם.',
      datePublished: '2025-01-15',
    },
  },
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat(portfolio): add Garden of Eden entry"
```

---

### Task 3: Add FutureKids entry (ID 8)

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Append FutureKids to portfolioData**

```ts
  {
    id: 8,
    slug: 'futurekids-shop',
    title: 'FutureKids',
    subtitle: 'חנות ספרי קידוד לילדים',
    category: 'ecommerce',
    description: 'חנות אינטרנטית לספרי ומחברות קידוד לילדים עם עגלת קניות, חבילות, ומשחקים דיגיטליים',
    longDescription: 'פיתוח חנות e-commerce מלאה ל-FutureKids - פלטפורמה לחינוך טכנולוגי לילדים. החנות כוללת ספרים ומחברות תרגול בנושאי AI, הצפנה ואלגוריתמים, עגלת קניות מלאה, חבילות מיוחדות, תשלום מאובטח, תוכן גיימיפיקציה ושיעורים דיגיטליים.',
    image: '/images/FutureKids.png',
    imageSizes: {
      desktop: '/images/FutureKids.png',
      display: '/images/FutureKids.png',
      mobile: '/images/FutureKids.png',
      thumbnail: '/images/FutureKids.png',
    },
    tags: ['Next.js', 'E-commerce', 'TypeScript', 'Neon', 'PostgreSQL'],
    technologies: ['Next.js', 'Neon', 'Tailwind'],
    color: 'brand-blue',
    pattern: 'circles',
    accentColor: 'brand-orange',
    stats: {
      products: '9+',
      bundles: '3',
      subjects: '3',
      loadTime: '0.9s',
    },
    client: 'FutureKids',
    year: '2025',
    duration: '2 חודשים',
    link: 'https://www.kidcode.org.il',
    linkType: 'live',
    featured: true,
    features: [
      'חנות ספרים + מחברות תרגול',
      'חבילות במחיר מיוחד',
      'עגלת קניות ותשלום מאובטח',
      'תוכן גיימיפיקציה ומשחקים',
      'שיעורים דיגיטליים',
      'ממשק אדמין לניהול הזמנות',
    ],
    results: [
      { label: 'מוצרים בחנות', value: '9+' },
      { label: 'חבילות', value: '3' },
      { label: 'נושאים', value: '3' },
      { label: 'זמן טעינה', value: '0.9s' },
    ],
    testimonial: {
      text: 'החנות מקצועית ונוחה לשימוש. הילדים מתלהבים מהתוכן הדיגיטלי הנלווה לספרים.',
      author: 'לקוח FutureKids',
      role: 'הורה',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'לקוח FutureKids',
      },
      reviewBody: 'החנות מקצועית ונוחה לשימוש. הילדים מתלהבים מהתוכן הדיגיטלי הנלווה לספרים.',
      datePublished: '2025-02-01',
    },
  },
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat(portfolio): add FutureKids e-commerce entry"
```

---

### Task 4: Add Amit EyeBrows entry (ID 9)

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Append Amit EyeBrows to portfolioData**

```ts
  {
    id: 9,
    slug: 'amit-eyebrows',
    title: 'Amit EyeBrows',
    subtitle: 'מערכת ניהול תורים חכמה',
    category: 'system',
    description: 'מערכת ניהול תורים לקליניקה עם אינטגרציית WhatsApp לתזכורות, אישורי הגעה, וניהול ביטולים חכם',
    longDescription: 'פיתוח מערכת ניהול תורים מתקדמת לקליניקת גבות Amit EyeBrows. המערכת מנהלת תורים ושולחת תזכורות אוטומטיות ב-WhatsApp ללקוחות לפני הגעתם. כאשר לקוח מבטל תור, המערכת מזהה את הלקוחות הבאים בתור ושואלת אם ברצונם להקדים - כך מנוהל לוח הזמנים של הקליניקה בצורה יעילה אוטומטית.',
    image: '/images/AmitEyeBrows.png',
    imageSizes: {
      desktop: '/images/AmitEyeBrows.png',
      display: '/images/AmitEyeBrows.png',
      mobile: '/images/AmitEyeBrows.png',
      thumbnail: '/images/AmitEyeBrows.png',
    },
    tags: ['Next.js', 'PostgreSQL', 'WhatsApp', 'Docker', 'RTL'],
    technologies: ['Next.js', 'PostgreSQL', 'WAHA'],
    color: 'brand-navy',
    pattern: 'lines',
    accentColor: 'brand-green',
    stats: {
      reminders: 'אוטומטי',
      cancellations: 'חכם',
      response: '< 1 דקה',
      uptime: '99.9%',
    },
    client: 'Amit EyeBrows',
    year: '2025',
    duration: '6 שבועות',
    link: null,
    featured: true,
    features: [
      'תזכורות WhatsApp אוטומטיות',
      'אישורי הגעה דיגיטליים',
      'ניהול ביטולים חכם - הצעת הקדמה ללקוחות הבאים',
      'לוח ניהול בעברית RTL',
      'סנכרון לוח זמנים בזמן אמת',
      'היסטוריית לקוחות ותורים',
    ],
    results: [
      { label: 'תזכורות אוטומטיות', value: '100%' },
      { label: 'זמן תגובה', value: '< 1 דקה' },
      { label: 'ניצולת יומן', value: '+35%' },
      { label: 'זמינות', value: '99.9%' },
    ],
    testimonial: {
      text: 'המערכת חסכה לי המון זמן בטלפון. הלקוחות מקבלים תזכורות אוטומטיות והביטולים מנוהלים לבד.',
      author: 'אמית',
      role: 'בעלת הקליניקה',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'אמית',
      },
      reviewBody: 'המערכת חסכה לי המון זמן בטלפון. הלקוחות מקבלים תזכורות אוטומטיות והביטולים מנוהלים לבד.',
      datePublished: '2025-03-01',
    },
  },
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat(portfolio): add Amit EyeBrows queue system entry"
```

---

### Task 5: Add TA CRM entry (ID 10)

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Append TA CRM to portfolioData**

```ts
  {
    id: 10,
    slug: 'ta-crm',
    title: 'TA CRM',
    subtitle: 'מערכת CRM לתיווך נדל״ן',
    category: 'system',
    description: 'מערכת CRM לניהול לקוחות ונכסים בתחום הנדל״ן עם מנוע התאמה אוטומטי ו-PWA לנייד',
    longDescription: 'פיתוח מערכת CRM מקיפה לסוכנות נדל״ן הכוללת ניהול לקוחות (קונים ושוכרים) עם פרופיל מלא, ניהול נכסים עם תמונות, ומנוע התאמה אוטומטי שמתאים בין לקוחות לנכסים לפי קריטריונים. המערכת מגיעה כ-PWA לשימוש נוח מהנייד בשטח.',
    image: '/images/TaCRM.png',
    imageSizes: {
      desktop: '/images/TaCRM.png',
      display: '/images/TaCRM.png',
      mobile: '/images/TaCRM.png',
      thumbnail: '/images/TaCRM.png',
    },
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'PWA', 'RTL'],
    technologies: ['Next.js', 'Supabase', 'Tailwind'],
    color: 'brand-orange',
    pattern: 'waves',
    accentColor: 'brand-blue',
    stats: {
      clients: '200+',
      properties: '500+',
      matching: 'אוטומטי',
      mobile: 'PWA',
    },
    client: 'TA Real Estate',
    year: '2025',
    duration: '3 חודשים',
    link: null,
    featured: false,
    features: [
      'ניהול לקוחות קונים ושוכרים',
      'ניהול נכסים עם תמונות',
      'מנוע התאמה אוטומטי לקוח-נכס',
      'לוח מחוונים ומדדים',
      'יומן פעילות',
      'PWA למובייל',
    ],
    results: [
      { label: 'לקוחות מנוהלים', value: '200+' },
      { label: 'נכסים במערכת', value: '500+' },
      { label: 'התאמות אוטומטיות', value: 'יומי' },
      { label: 'שימוש מנייד', value: '70%' },
    ],
    testimonial: {
      text: 'המערכת שינתה את אופן העבודה שלנו. ההתאמה האוטומטית חוסכת שעות עבודה ביום.',
      author: 'מנהל TA Real Estate',
      role: 'מנהל סוכנות נדל״ן',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'מנהל TA Real Estate',
      },
      reviewBody: 'המערכת שינתה את אופן העבודה שלנו. ההתאמה האוטומטית חוסכת שעות עבודה ביום.',
      datePublished: '2025-03-10',
    },
  },
```

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Final type-check of entire file**

```bash
npm run type-check
```

Expected: 0 errors, 0 warnings related to portfolio.ts.

- [ ] **Step 4: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat(portfolio): add TA CRM entry"
```

---

### Task 6: Verify in dev server

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check portfolio page**

Open http://localhost:3000 (or wherever the portfolio section is). Verify:
- Homepage shows 4 featured projects: Lola Martin, Garden of Eden, FutureKids, Amit EyeBrows
- Portfolio page shows all 10 projects
- "חנויות" filter category appears and filters to FutureKids only
- "מערכות" filter shows: Kitchen Optimizer, The Fader, Garden of Eden, Amit EyeBrows, TA CRM

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add src/data/portfolio.ts
git commit -m "fix(portfolio): [description of fix]"
```
