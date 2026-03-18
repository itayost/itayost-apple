# Design: Add 4 New Projects to Portfolio

**Date:** 2026-03-18
**Status:** Approved

## Overview

Add 4 new projects to `src/data/portfolio.ts`, update featured flags, and add `ecommerce` category.
One file changed: `src/data/portfolio.ts`.

---

## Entry Details

### ID 7 — Garden of Eden

```
slug:           garden-of-eden
title:          Garden of Eden
subtitle:       מערכת ניהול אקדמיית כדורגל
category:       system
featured:       true
link:           https://www.edengarden.co.il
linkType:       live
image (all 4):  /images/EdenGarden.png
color:          brand-green
pattern:        dots
accentColor:    brand-blue
client:         Garden of Eden Football Academy
year:           2025
duration:       4 חודשים
tags:           ['Next.js', 'Supabase', 'WhatsApp', 'Framer Motion', 'RTL']
technologies:   ['Next.js', 'Supabase', 'Tailwind']

description:
  פלטפורמה לניהול מאמנים ומתאמנים עם מבדקים גופניים וקוגנטיביים, ציונים אוטומטיים וכרטיס שחקן בסגנון EA FC

longDescription:
  פיתוח פלטפורמה מלאה לאקדמיית כדורגל Garden of Eden המשרתת מאמנים, מתאמנים והנהלה. המערכת כוללת שלושה ממשקי משתמש נפרדים: מתאמנים צופים בציוניהם בכרטיס שחקן אינטראקטיבי בסגנון EA FC, מאמנים מבצעים ומנהלים מבדקים גופניים וקוגנטיביים, ומנהלים שולטים בכל היבטי הניהול. אימות באמצעות WhatsApp OTP ואינטגרציה עם שער תשלומים Meshulam.

stats:
  trainees:    100+
  assessments: 500+
  roles:       3
  rating:      4.9★

features:
  - כרטיס שחקן אישי בסגנון EA FC
  - מבדקים גופניים וקוגנטיביים אוטומטיים
  - 3 תפקידי משתמש (מתאמן / מאמן / אדמין)
  - אימות WhatsApp OTP
  - אינטגרציית תשלומים Meshulam
  - מעקב התקדמות ותוכניות תזונה

results:
  - label: מתאמנים פעילים, value: 100+
  - label: מבדקים שבוצעו, value: 500+
  - label: ממשקי משתמש, value: 3
  - label: דירוג, value: 4.9★

testimonial:
  text:   המערכת שינתה את האופן שבו אנחנו מנהלים את האקדמיה. המתאמנים מתלהבים מכרטיס השחקן האישי שלהם.
  author: מנהל Garden of Eden
  role:   מנהל האקדמיה

review:
  '@type': Review
  reviewRating: { '@type': Rating, ratingValue: '5', bestRating: '5' }
  author: { '@type': Person, name: 'מנהל Garden of Eden' }
  reviewBody: המערכת שינתה את האופן שבו אנחנו מנהלים את האקדמיה. המתאמנים מתלהבים מכרטיס השחקן האישי שלהם.
  datePublished: 2025-01-15
```

---

### ID 8 — FutureKids

```
slug:           futurekids-shop
title:          FutureKids
subtitle:       חנות ספרי קידוד לילדים
category:       ecommerce
featured:       true
link:           https://www.kidcode.org.il
linkType:       live
image (all 4):  /images/FutureKids.png
color:          brand-blue
pattern:        circles
accentColor:    brand-orange
client:         FutureKids
year:           2025
duration:       2 חודשים
tags:           ['Next.js', 'E-commerce', 'TypeScript', 'Neon', 'PostgreSQL']
technologies:   ['Next.js', 'Neon', 'Tailwind']

description:
  חנות אינטרנטית לספרי ומחברות קידוד לילדים עם עגלת קניות, חבילות, ומשחקים דיגיטליים

longDescription:
  פיתוח חנות e-commerce מלאה לFutureKids - פלטפורמה לחינוך טכנולוגי לילדים. החנות כוללת ספרים ומחברות תרגול בנושאי AI, הצפנה ואלגוריתמים, עגלת קניות מלאה, חבילות מיוחדות, תשלום מאובטח, תוכן גיימיפיקציה ושיעורים דיגיטליים.

stats:
  products:  9+
  bundles:   3
  subjects:  3
  loadTime:  0.9s

features:
  - חנות ספרים + מחברות תרגול
  - חבילות במחיר מיוחד
  - עגלת קניות ותשלום מאובטח
  - תוכן גיימיפיקציה ומשחקים
  - שיעורים דיגיטליים
  - ממשק אדמין לניהול הזמנות

results:
  - label: מוצרים בחנות, value: 9+
  - label: חבילות, value: 3
  - label: נושאים, value: 3
  - label: זמן טעינה, value: 0.9s

testimonial:
  text:   החנות מקצועית ונוחה לשימוש. הילדים מתלהבים מהתוכן הדיגיטלי הנלווה לספרים.
  author: לקוח FutureKids
  role:   הורה

review:
  '@type': Review
  reviewRating: { '@type': Rating, ratingValue: '5', bestRating: '5' }
  author: { '@type': Person, name: 'לקוח FutureKids' }
  reviewBody: החנות מקצועית ונוחה לשימוש. הילדים מתלהבים מהתוכן הדיגיטלי הנלווה לספרים.
  datePublished: 2025-02-01
```

---

### ID 9 — Amit EyeBrows

```
slug:           amit-eyebrows
title:          Amit EyeBrows
subtitle:       מערכת ניהול תורים חכמה
category:       system
featured:       true
link:           null
image (all 4):  /images/AmitEyeBrows.png
color:          brand-navy
pattern:        lines
accentColor:    brand-green
client:         Amit EyeBrows
year:           2025
duration:       6 שבועות
tags:           ['Next.js', 'PostgreSQL', 'WhatsApp', 'Docker', 'RTL']
technologies:   ['Next.js', 'PostgreSQL', 'WAHA']

description:
  מערכת ניהול תורים לקליניקה עם אינטגרציית WhatsApp לתזכורות, אישורי הגעה, וניהול ביטולים חכם

longDescription:
  פיתוח מערכת ניהול תורים מתקדמת לקליניקת גבות Amit EyeBrows. המערכת מנהלת תורים ושולחת תזכורות אוטומטיות ב-WhatsApp ללקוחות לפני הגעתם. כאשר לקוח מבטל תור, המערכת מזהה את הלקוחות הבאים בתור ושואלת אם ברצונם להקדים - כך מנוהל לוח הזמנים של הקליניקה בצורה יעילה אוטומטית.

stats:
  reminders:     אוטומטי
  cancellations: חכם
  response:      < 1 דקה
  uptime:        99.9%

features:
  - תזכורות WhatsApp אוטומטיות
  - אישורי הגעה דיגיטליים
  - ניהול ביטולים חכם - הצעת הקדמה ללקוחות הבאים
  - לוח ניהול בעברית RTL
  - סנכרון לוח זמנים בזמן אמת
  - היסטוריית לקוחות ותורים

results:
  - label: תזכורות אוטומטיות, value: 100%
  - label: זמן תגובה, value: < 1 דקה
  - label: ניצולת יומן, value: +35%
  - label: זמינות, value: 99.9%

testimonial:
  text:   המערכת חסכה לי המון זמן בטלפון. הלקוחות מקבלים תזכורות אוטומטיות והביטולים מנוהלים לבד.
  author: אמית
  role:   בעלת הקליניקה

review:
  '@type': Review
  reviewRating: { '@type': Rating, ratingValue: '5', bestRating: '5' }
  author: { '@type': Person, name: 'אמית' }
  reviewBody: המערכת חסכה לי המון זמן בטלפון. הלקוחות מקבלים תזכורות אוטומטיות והביטולים מנוהלים לבד.
  datePublished: 2025-03-01
```

---

### ID 10 — TA CRM

```
slug:           ta-crm
title:          TA CRM
subtitle:       מערכת CRM לתיווך נדל״ן
category:       system
featured:       false
link:           null
image (all 4):  /images/TaCRM.png
color:          brand-orange
pattern:        waves
accentColor:    brand-blue
client:         TA Real Estate
year:           2025
duration:       3 חודשים
tags:           ['Next.js', 'Supabase', 'PostgreSQL', 'PWA', 'RTL']
technologies:   ['Next.js', 'Supabase', 'Tailwind']

description:
  מערכת CRM לניהול לקוחות ונכסים בתחום הנדל״ן עם מנוע התאמה אוטומטי ו-PWA לנייד

longDescription:
  פיתוח מערכת CRM מקיפה לסוכנות נדל״ן הכוללת ניהול לקוחות (קונים ושוכרים) עם פרופיל מלא, ניהול נכסים עם תמונות, ומנוע התאמה אוטומטי שמתאים בין לקוחות לנכסים לפי קריטריונים. המערכת מגיעה כ-PWA לשימוש נוח מהנייד בשטח.

stats:
  clients:    200+
  properties: 500+
  matching:   אוטומטי
  mobile:     PWA

features:
  - ניהול לקוחות קונים ושוכרים
  - ניהול נכסים עם תמונות
  - מנוע התאמה אוטומטי לקוח-נכס
  - לוח מחוונים ומדדים
  - יומן פעילות
  - PWA למובייל

results:
  - label: לקוחות מנוהלים, value: 200+
  - label: נכסים במערכת, value: 500+
  - label: התאמות אוטומטיות, value: יומי
  - label: שימוש מנייד, value: 70%

testimonial:
  text:   המערכת שינתה את אופן העבודה שלנו. ההתאמה האוטומטית חוסכת שעות עבודה ביום.
  author: מנהל TA Real Estate
  role:   מנהל סוכנות נדל״ן

review:
  '@type': Review
  reviewRating: { '@type': Rating, ratingValue: '5', bestRating: '5' }
  author: { '@type': Person, name: 'מנהל TA Real Estate' }
  reviewBody: המערכת שינתה את אופן העבודה שלנו. ההתאמה האוטומטית חוסכת שעות עבודה ביום.
  datePublished: 2025-03-10
```

---

## Featured Flag Changes

| ID | Project | Before | After |
|----|---------|--------|-------|
| 1 | Kitchen Optimizer | true | **false** |
| 2 | Lola Martin | true | true |
| 5 | Shepes Group | true | **false** |
| 6 | נס התמר | true | **false** |
| 7 | Garden of Eden | — | true |
| 8 | FutureKids | — | true |
| 9 | Amit EyeBrows | — | true |
| 10 | TA CRM | — | false |

## Category Addition

```ts
{ id: 'ecommerce', label: 'חנויות', value: 'ecommerce' }
```

Added after existing categories in `portfolioCategories`.

## Image Strategy

All 4 `imageSizes` fields (desktop/display/mobile/thumbnail) point to the same PNG per project.
Files confirmed present in `public/images/`: EdenGarden.png, FutureKids.png, AmitEyeBrows.png, TaCRM.png.

## Color/Pattern Tokens

Valid values match existing portfolio entries:
- color: `brand-orange` | `brand-blue` | `brand-navy` | `brand-green`
- pattern: `dots` | `circles` | `lines` | `waves` | `none`
- accentColor: `brand-orange` | `brand-blue` | `brand-green`

## Files Modified

- `src/data/portfolio.ts` only
