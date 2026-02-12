'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Database,
  Lock,
  Share2,
  Shield,
  UserCheck,
  Cookie,
  Mail,
  Sparkles
} from 'lucide-react'
import { content } from '@/config/content'
import { bouncyEasing } from '@/constants/animations'

const sections = [
  {
    id: 'collection',
    icon: Database,
    title: content.privacyPolicy.sections.collection,
    content: `
      <h3 class="text-xl font-bold mb-4">1. איזה מידע אנו אוספים?</h3>
      <p class="mb-4">
        אנו אוספים מידע שאתם מספקים לנו בצורה פעילה, כולל:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>פרטים אישיים:</strong> שם מלא, כתובת אימייל, מספר טלפון</li>
        <li><strong>פרטי פרויקט:</strong> תיאור הפרויקט, דרישות טכניות, תקציב משוער</li>
        <li><strong>פרטי חברה:</strong> שם החברה, תחום העיסוק, אתר אינטרנט</li>
        <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, נתוני גלישה</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">2. כיצד אנו אוספים מידע?</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>טפסי יצירת קשר ובקשות הצעת מחיר באתר</li>
        <li>תקשורת בדואר אלקטרוני, WhatsApp או טלפון</li>
        <li>Google Analytics לצורך ניתוח תעבורת האתר</li>
        <li>Cookies ועוגיות גלישה</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">3. מידע שאנו לא אוספים</h3>
      <p class="mb-4">
        אנו <strong>לא</strong> אוספים:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>פרטי כרטיסי אשראי או מידע פיננסי רגיש</li>
        <li>מספרי תעודת זהות או דרכון</li>
        <li>מידע רפואי או מידע רגיש אחר</li>
        <li>מידע על קטינים מתחת לגיל 18</li>
      </ul>
    `
  },
  {
    id: 'usage',
    icon: Lock,
    title: content.privacyPolicy.sections.usage,
    content: `
      <h3 class="text-xl font-bold mb-4">1. שימוש במידע לצורך מתן שירות</h3>
      <p class="mb-4">
        אנו משתמשים במידע שנאסף כדי:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>לספק את השירותים המבוקשים (פיתוח, עיצוב, ייעוץ)</li>
        <li>לתקשר איתכם בנוגע לפרויקטים ושאלות טכניות</li>
        <li>לשלוח הצעות מחיר ומסמכי עבודה</li>
        <li>לנהל חשבונות ופרויקטים בצורה יעילה</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">2. שיפור השירות וחווית המשתמש</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>ניתוח נתוני שימוש באתר להבנת צרכי המשתמשים</li>
        <li>אופטימיזציה של ביצועי האתר ותפקודו</li>
        <li>זיהוי ותיקון תקלות טכניות</li>
        <li>פיתוח תכונות וכלים חדשים</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">3. תקשורת שיווקית (באישורכם בלבד)</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>עדכונים על שירותים חדשים ומבצעים מיוחדים</li>
        <li>טיפים ומאמרים בנושאי פיתוח וטכנולוגיה</li>
        <li>הזמנות לאירועים ווורקשופים</li>
      </ul>
      <p class="mb-4 mt-4">
        <strong>חשוב:</strong> ניתן להסיר את עצמכם מרשימת התפוצה השיווקית בכל עת באמצעות
        קישור "הסרה מרשימת תפוצה" בכל דואר אלקטרוני.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">4. חובות משפטיות</h3>
      <p class="mb-4">
        במקרים נדירים, אנו עשויים להשתמש במידע כדי לעמוד בחובות חוקיות, למנוע הונאה או
        להגן על זכויותינו המשפטיות.
      </p>
    `
  },
  {
    id: 'sharing',
    icon: Share2,
    title: content.privacyPolicy.sections.sharing,
    content: `
      <h3 class="text-xl font-bold mb-4">1. מדיניות אי-שיתוף</h3>
      <p class="mb-4">
        <strong>אנו לא מוכרים או משכירים את המידע האישי שלכם לצדדים שלישיים - לעולם.</strong>
      </p>
      <p class="mb-4">
        הפרטיות שלכם היא בראש סדר העדיפויות שלנו, ואנו מתחייבים לא לחשוף, למכור או
        לשתף את המידע שלכם למטרות מסחריות.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">2. מקרים בהם אנו עשויים לשתף מידע</h3>
      <p class="mb-4">
        אנו עשויים לשתף מידע רק במקרים הבאים:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>ספקי שירות:</strong> אחסון ענן (Vercel, AWS), כלי אנליטיקס (Google Analytics),
        מערכות דואר אלקטרוני - כל הספקים חתומים על הסכמי סודיות</li>
        <li><strong>דרישות חוקיות:</strong> כאשר נדרש על פי חוק, צו שיפוטי או רשות ממשלתית</li>
        <li><strong>הגנה משפטית:</strong> כדי להגן על זכויותינו, רכושנו או ביטחון המשתמשים</li>
        <li><strong>באישורכם המפורש:</strong> כאשר אתם מבקשים מאיתנו לשתף מידע עם צד שלישי ספציפי</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">3. ספקי שירות מהימנים</h3>
      <p class="mb-4">
        הספקים איתם אנו עובדים:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>Vercel:</strong> אחסון ו-hosting של האתר (תקני אבטחה SOC 2)</li>
        <li><strong>Google Analytics:</strong> ניתוח תעבורה אנונימי (עומד בתקני GDPR)</li>
        <li><strong>Google Workspace:</strong> דואר אלקטרוני ושירותי ענן</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">4. העברת מידע בינלאומית</h3>
      <p class="mb-4">
        חלק מהשרתים ושירותי הענן שלנו ממוקמים בארצות הברית ובאירופה. אנו מוודאים שכל
        העברת מידע בינלאומית עומדת בתקני הגנת הפרטיות הבינלאומיים (GDPR, Privacy Shield).
      </p>
    `
  },
  {
    id: 'security',
    icon: Shield,
    title: content.privacyPolicy.sections.security,
    content: `
      <h3 class="text-xl font-bold mb-4">1. אמצעי אבטחה טכניים</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>הצפנת SSL/TLS:</strong> כל התקשורת עם האתר מוצפנת (HTTPS)</li>
        <li><strong>הצפנת נתונים:</strong> מסדי נתונים מוצפנים במנוחה ובתנועה</li>
        <li><strong>גישה מוגבלת:</strong> רק צוות מורשה יכול לגשת למידע רגיש</li>
        <li><strong>אימות דו-שלבי:</strong> הגנה על חשבונות ניהול</li>
        <li><strong>חומות אש:</strong> הגנה על שרתים מפני התקפות חיצוניות</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">2. אמצעי אבטחה ארגוניים</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>הדרכות אבטחה:</strong> הצוות עובר הדרכות אבטחת מידע שוטפות</li>
        <li><strong>הסכמי סודיות:</strong> כל הצוות חתום על NDA</li>
        <li><strong>מדיניות סיסמאות חזקות:</strong> דרישות סיסמה מחמירות</li>
        <li><strong>ניטור ולוגים:</strong> מעקב אחר גישה למידע רגיש</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">3. גיבויים ושחזור</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>גיבוי אוטומטי יומי של כל הנתונים</li>
        <li>גיבויים מוצפנים ומאוחסנים במקומות מרובים</li>
        <li>תוכנית שחזור אסון (Disaster Recovery Plan)</li>
        <li>בדיקות שחזור תקופתיות</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">4. הגבלות והתראות</h3>
      <p class="mb-4">
        למרות שאנו נוקטים באמצעי אבטחה מתקדמים, <strong>אין אבטחה מושלמת באינטרנט</strong>.
        אנו ממליצים גם לכם לנקוט באמצעי זהירות:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>השתמשו בסיסמאות חזקות וייחודיות</li>
        <li>אל תשתפו פרטי התחברות עם אחרים</li>
        <li>התנתקו מחשבונות לאחר השימוש במחשבים ציבוריים</li>
        <li>היו ערניים להודעות דיוג (Phishing)</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">5. דיווח על פרצות אבטחה</h3>
      <p class="mb-4">
        במקרה של חשש לפריצת אבטחה או פרצת מידע, אנו מתחייבים:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>לחקור את האירוע באופן מיידי</li>
        <li>להודיע למשתמשים המושפעים תוך 72 שעות</li>
        <li>לנקוט בצעדים מתקנים לסגירת הפרצה</li>
        <li>לדווח לרשויות הרלוונטיות במידת הצורך</li>
      </ul>
    `
  },
  {
    id: 'rights',
    icon: UserCheck,
    title: content.privacyPolicy.sections.rights,
    content: `
      <h3 class="text-xl font-bold mb-4">1. זכות לגישה</h3>
      <p class="mb-4">
        יש לכם זכות לדעת אילו פרטים אישיים אנו מחזיקים עליכם. אתם יכולים לבקש עותק של
        המידע האישי שלכם בכל עת.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">2. זכות לתיקון</h3>
      <p class="mb-4">
        אם המידע שלכם אינו מדויק או לא שלם, אתם יכולים לבקש לתקן או לעדכן אותו. אנחנו
        נפעל לעדכן את המידע תוך 7 ימי עסקים.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">3. זכות למחיקה (Right to be Forgotten)</h3>
      <p class="mb-4">
        אתם יכולים לבקש למחוק את המידע האישי שלכם מהמערכות שלנו. אנו נמחק את המידע תוך
        30 יום, למעט במקרים בהם אנו נדרשים לשמר אותו על פי חוק.
      </p>
      <p class="mb-4">
        <strong>חריגים:</strong> מידע הנדרש לצורכי חשבונאות, מסמכים משפטיים, או הסכמים
        חוזיים עשוי להישמר לתקופה הנדרשת בחוק.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">4. זכות להתנגד</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>אתם יכולים להתנגד לשימוש במידע שלכם למטרות שיווקיות בכל עת</li>
        <li>אתם יכולים לבטל את ההסכמה לקבלת ניוזלטר ועדכונים</li>
        <li>אתם יכולים לחסום Cookies דרך הדפדפן שלכם</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">5. זכות לניידות</h3>
      <p class="mb-4">
        אתם יכולים לבקש להעביר את המידע שלכם לספק שירות אחר. נספק לכם את הנתונים
        בפורמט מובנה ונפוץ (JSON, CSV).
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">6. זכות להגבלת עיבוד</h3>
      <p class="mb-4">
        במקרים מסוימים, אתם יכולים לבקש להגביל את השימוש במידע שלכם, למשל במהלך
        בדיקת דיוק הנתונים.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">7. איך להפעיל את הזכויות שלכם?</h3>
      <p class="mb-4">
        כדי להפעיל כל אחת מהזכויות לעיל, פנו אלינו באחת מהדרכים הבאות:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>אימייל:</strong> itayost1@gmail.com</li>
        <li><strong>טלפון:</strong> 054-499-4417</li>
        <li><strong>WhatsApp:</strong> 054-499-4417</li>
      </ul>
      <p class="mb-4">
        אנו מתחייבים להגיב לבקשות תוך <strong>7 ימי עסקים</strong> ולהשלים את הפעולה
        המבוקשת תוך <strong>30 יום</strong>.
      </p>
    `
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: content.privacyPolicy.sections.cookies,
    content: `
      <h3 class="text-xl font-bold mb-4">1. מה הם Cookies?</h3>
      <p class="mb-4">
        Cookies (עוגיות) הם קבצי טקסט קטנים המאוחסנים במכשיר שלכם בעת גלישה באתר. הם
        מאפשרים לאתר "לזכור" את פעולותיכם והעדפותיכם לאורך זמן.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">2. סוגי Cookies שאנו משתמשים בהם</h3>

      <h4 class="text-lg font-bold mb-3 mt-4">Cookies הכרחיים</h4>
      <p class="mb-4">
        נדרשים לתפקוד בסיסי של האתר. אי אפשר להשבית אותם מבלי לפגוע בחוויית השימוש.
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>זכירת העדפות שפה ונגישות</li>
        <li>שמירה על אבטחת הגלישה</li>
        <li>זיהוי משתמשים מחוברים</li>
      </ul>

      <h4 class="text-lg font-bold mb-3 mt-4">Cookies אנליטיים (Google Analytics)</h4>
      <p class="mb-4">
        עוזרים לנו להבין איך משתמשים באתר ומאפשרים לנו לשפר אותו.
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>מספר מבקרים ודפי צפייה</li>
        <li>זמן שהייה ודפדוף באתר</li>
        <li>מקור התנועה (גוגל, פייסבוק, ישיר)</li>
        <li><strong>כל הנתונים אנונימיים</strong> - אנו לא מזהים משתמשים ספציפיים</li>
      </ul>

      <h4 class="text-lg font-bold mb-3 mt-4">Cookies פונקציונליים</h4>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>זכירת העדפות עיצוב (למשל: מצב כהה/בהיר)</li>
        <li>מילוי טפסים אוטומטי</li>
        <li>שמירת פריטים בעגלת קניות</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">3. Cookies של צדדים שלישיים</h3>
      <p class="mb-4">
        אנו משתמשים בשירותים חיצוניים שעשויים להציב Cookies משלהם:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>Google Analytics:</strong> ניתוח תעבורה ושיפור האתר</li>
        <li><strong>Google Fonts:</strong> טעינת גופנים (לא אוסף נתונים אישיים)</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">4. כיצד לנהל Cookies?</h3>
      <p class="mb-4">
        אתם יכולים לשלוט ב-Cookies דרך הדפדפן שלכם:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>Chrome:</strong> הגדרות → פרטיות ואבטחה → Cookies ונתוני אתרים אחרים</li>
        <li><strong>Firefox:</strong> אפשרויות → פרטיות ואבטחה → Cookies ונתוני אתרים</li>
        <li><strong>Safari:</strong> העדפות → פרטיות → ניהול נתוני אתרים</li>
        <li><strong>Edge:</strong> הגדרות → קוקיז והרשאות אתרים</li>
      </ul>
      <p class="mb-4 mt-4">
        <strong>שימו לב:</strong> חסימת Cookies מסוימים עלולה להשפיע על תפקוד האתר ועל
        חוויית השימוש שלכם.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">5. משך זמן שמירת Cookies</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>Cookies session:</strong> נמחקים בסגירת הדפדפן</li>
        <li><strong>Cookies קבועים:</strong> נשמרים עד 2 שנים (תלוי בסוג)</li>
      </ul>
    `
  },
  {
    id: 'contact',
    icon: Mail,
    title: content.privacyPolicy.sections.contact,
    content: `
      <h3 class="text-xl font-bold mb-4">1. שאלות על מדיניות הפרטיות</h3>
      <p class="mb-4">
        אם יש לכם שאלות, הבהרות או חששות לגבי מדיניות הפרטיות שלנו, אנחנו כאן לעזור.
      </p>

      <h3 class="text-xl font-bold mb-4 mt-6">2. דרכי יצירת קשר</h3>
      <div class="bg-brand-gray-50 rounded-2xl p-6 mb-6">
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="font-bold text-brand-navy min-w-[80px]">אימייל:</span>
            <a href="mailto:itayost1@gmail.com" class="text-brand-blue hover:underline">
              itayost1@gmail.com
            </a>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-brand-navy min-w-[80px]">טלפון:</span>
            <a href="tel:+972544994417" class="text-brand-blue hover:underline">
              054-499-4417
            </a>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-brand-navy min-w-[80px]">WhatsApp:</span>
            <a href="https://wa.me/972544994417" class="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">
              054-499-4417
            </a>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-brand-navy min-w-[80px]">כתובת:</span>
            <span>רמת גן, ישראל</span>
          </li>
        </ul>
      </div>

      <h3 class="text-xl font-bold mb-4 mt-6">3. זמני תגובה</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>פניות רגילות - תגובה תוך 2 ימי עסקים</li>
        <li>בקשות למימוש זכויות (מחיקה, גישה, תיקון) - תגובה תוך 7 ימי עסקים</li>
        <li>תקלות אבטחה - טיפול מיידי תוך 24 שעות</li>
      </ul>

      <h3 class="text-xl font-bold mb-4 mt-6">4. תלונות לרשויות</h3>
      <p class="mb-4">
        אם אינכם מרוצים מהטיפול שלנו בנושאי פרטיות, יש לכם זכות להגיש תלונה לרשות
        להגנת הפרטיות בישראל:
      </p>
      <div class="bg-brand-gray-50 rounded-2xl p-6 mb-4">
        <p class="mb-2"><strong>רשות להגנת הפרטיות</strong></p>
        <p class="mb-2">אתר: <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" class="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">www.gov.il/privacy</a></p>
        <p class="mb-2">טלפון: 02-6467000</p>
        <p>דואר: 2 רחוב קפלן, ירושלים</p>
      </div>

      <h3 class="text-xl font-bold mb-4 mt-6">5. עדכונים למדיניות הפרטיות</h3>
      <p class="mb-4">
        אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים משמעותיים יפורסמו
        באתר ונשלח הודעה למשתמשים רשומים.
      </p>
      <p class="mb-4">
        <strong>עדכון אחרון:</strong> ינואר 2025
      </p>
    `
  }
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('collection')

  const activeContent = sections.find(s => s.id === activeSection)

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-navy" />
                <span className="text-base font-bold text-brand-navy">
                  {content.privacyPolicy.sectionLabel}
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              {content.privacyPolicy.title}
              <span className="block mt-2 text-brand-gray-700">
                {content.privacyPolicy.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-600 max-w-3xl mx-auto mb-4"
            >
              {content.privacyPolicy.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: bouncyEasing }}
              className="text-sm text-brand-gray-500"
            >
              {content.privacyPolicy.lastUpdated}: ינואר 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="py-8 bg-white border-b border-brand-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 max-w-7xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-3xl font-semibold transition-all ${
                    activeSection === section.id
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5, ease: bouncyEasing }
                    }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <span className="text-xs text-center">{section.title}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: bouncyEasing }}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              {activeContent && (
                <>
                  <div className="w-12 h-12 bg-brand-navy rounded-2xl flex items-center justify-center">
                    <activeContent.icon size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-navy">
                    {activeContent.title}
                  </h2>
                </>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none text-brand-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeContent?.content || '' }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-brand-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              שאלות לגבי הפרטיות שלכם?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              אנחנו כאן לעזור ולענות על כל שאלה בנושא הגנת המידע והפרטיות שלכם
            </p>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-navy rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
              >
                צרו קשר
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
