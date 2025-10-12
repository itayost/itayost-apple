'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  Shield,
  Cookie,
  Copyright
} from 'lucide-react'
import { content } from '@/config/content'

const sections = [
  {
    id: 'terms',
    icon: FileText,
    title: content.terms.sections.terms,
    content: `
      <h3 class="text-xl font-bold mb-4">1. קבלת התנאים</h3>
      <p class="mb-4">
        השימוש באתר itayost.com מהווה הסכמה מלאה לתנאי השימוש המפורטים כאן.
        אם אינך מסכים לתנאים אלה, נא להימנע משימוש באתר.
      </p>

      <h3 class="text-xl font-bold mb-4">2. שירותים</h3>
      <p class="mb-4">
        ITAYOST מספקת שירותי פיתוח תוכנה, עיצוב ויעוץ טכנולוגי. כל השירותים ניתנים
        על בסיס "כפי שהם" (AS IS) ואנו שומרים על הזכות לשנות או להפסיק שירותים בכל עת.
      </p>

      <h3 class="text-xl font-bold mb-4">3. זכויות יוצרים</h3>
      <p class="mb-4">
        כל התוכן באתר, לרבות טקסט, גרפיקה, לוגו, קוד ועיצוב, מוגן בזכויות יוצרים
        השייכות ל-ITAYOST. אין להעתיק, לשכפל או להפיץ תוכן כלשהו ללא אישור בכתב.
      </p>

      <h3 class="text-xl font-bold mb-4">4. הגבלת אחריות</h3>
      <p class="mb-4">
        ITAYOST לא תהיה אחראית לכל נזק ישיר או עקיף הנובע משימוש באתר או בשירותים,
        לרבות אובדן רווחים, נתונים או הזדמנויות עסקיות.
      </p>

      <h3 class="text-xl font-bold mb-4">5. שינויים בתנאים</h3>
      <p class="mb-4">
        אנו שומרים על הזכות לעדכן תנאים אלה בכל עת. שינויים יכנסו לתוקף מיד עם
        פרסומם באתר. המשך שימוש באתר לאחר שינויים מהווה הסכמה לתנאים המעודכנים.
      </p>
    `
  },
  {
    id: 'privacy',
    icon: Shield,
    title: content.terms.sections.privacy,
    content: `
      <h3 class="text-xl font-bold mb-4">1. איסוף מידע</h3>
      <p class="mb-4">
        אנו אוספים מידע שאתם מספקים לנו בצורה פעילה, כגון שם, אימייל, טלפון ופרטי
        פרויקט בעת יצירת קשר או מילוי טפסים באתר.
      </p>

      <h3 class="text-xl font-bold mb-4">2. שימוש במידע</h3>
      <p class="mb-4">
        אנו משתמשים במידע שנאסף כדי:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>לספק ולשפר את השירותים שלנו</li>
        <li>לתקשר איתכם בנוגע לפרויקטים ושירותים</li>
        <li>לשלוח עדכונים שיווקיים (רק באישורכם)</li>
        <li>לשפר את חוויית המשתמש באתר</li>
      </ul>

      <h3 class="text-xl font-bold mb-4">3. שיתוף מידע</h3>
      <p class="mb-4">
        אנו לא מוכרים או משתפים את המידע האישי שלכם עם צדדים שלישיים, למעט במקרים
        הבאים:
      </p>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li>כאשר נדרש על פי חוק</li>
        <li>עם ספקי שירות המסייעים בהפעלת האתר (כגון אחסון ענן)</li>
        <li>באישורכם המפורש</li>
      </ul>

      <h3 class="text-xl font-bold mb-4">4. אבטחת מידע</h3>
      <p class="mb-4">
        אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם, כולל הצפנה, גישה
        מוגבלת ואחסון מאובטח. עם זאת, אין אבטחה מושלמת באינטרנט.
      </p>

      <h3 class="text-xl font-bold mb-4">5. זכויותיכם</h3>
      <p class="mb-4">
        יש לכם זכות לגשת, לתקן או למחוק את המידע האישי שלכם. צרו קשר לכל בקשה.
      </p>
    `
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: content.terms.sections.cookies,
    content: `
      <h3 class="text-xl font-bold mb-4">1. מהם Cookies?</h3>
      <p class="mb-4">
        Cookies הם קבצי טקסט קטנים המאוחסנים במחשב או במכשיר הנייד שלכם בעת גלישה
        באתר. הם מאפשרים לאתר לזכור את העדפותיכם ולשפר את חוויית הגלישה.
      </p>

      <h3 class="text-xl font-bold mb-4">2. סוגי Cookies שאנו משתמשים בהם</h3>
      <ul class="list-disc list-inside mb-4 mr-4">
        <li><strong>Cookies הכרחיים:</strong> נדרשים להפעלת האתר ותפקודו הבסיסי</li>
        <li><strong>Cookies אנליטיים:</strong> עוזרים לנו להבין איך משתמשים באתר (Google Analytics)</li>
        <li><strong>Cookies פונקציונליים:</strong> זוכרים את ההעדפות והבחירות שלכם</li>
      </ul>

      <h3 class="text-xl font-bold mb-4">3. ניהול Cookies</h3>
      <p class="mb-4">
        אתם יכולים לנהל או למחוק Cookies דרך הגדרות הדפדפן שלכם. שימו לב שחסימת
        Cookies מסוימים עלולה להשפיע על תפקוד האתר.
      </p>

      <h3 class="text-xl font-bold mb-4">4. Google Analytics</h3>
      <p class="mb-4">
        אנו משתמשים ב-Google Analytics לאיסוף נתונים סטטיסטיים אנונימיים על השימוש
        באתר. מידע זה עוזר לנו לשפר את השירות.
      </p>
    `
  },
  {
    id: 'copyright',
    icon: Copyright,
    title: content.terms.sections.copyright,
    content: `
      <h3 class="text-xl font-bold mb-4">1. בעלות על תוכן</h3>
      <p class="mb-4">
        כל התוכן באתר itayost.com, לרבות אך לא רק טקסט, עיצוב גרפי, לוגואים,
        תמונות, קוד ותוכנה, הוא רכושה הבלעדי של ITAYOST ומוגן על ידי חוקי זכויות
        יוצרים ישראליים ובינלאומיים.
      </p>

      <h3 class="text-xl font-bold mb-4">2. שימוש מותר</h3>
      <p class="mb-4">
        אתם רשאים לצפות ולהדפיס תוכן מהאתר לשימוש אישי בלבד. כל שימוש מסחרי, העתקה,
        שכפול, הפצה או שידור של תוכן כלשהו מהאתר אסורים ללא אישור בכתב מראש.
      </p>

      <h3 class="text-xl font-bold mb-4">3. סימני מסחר</h3>
      <p class="mb-4">
        "ITAYOST" והלוגו שלנו הם סימני מסחר רשומים. אין להשתמש בהם ללא אישור מפורש
        בכתב.
      </p>

      <h3 class="text-xl font-bold mb-4">4. תוכן של משתמשים</h3>
      <p class="mb-4">
        כל תוכן שאתם מעלים או משתפים דרך האתר (כגון הודעות בטפסי יצירת קשר) נשאר
        בבעלותכם, אך אתם מעניקים לנו רישיון להשתמש בו לצורך מתן השירות.
      </p>

      <h3 class="text-xl font-bold mb-4">5. הפרות</h3>
      <p class="mb-4">
        הפרה של זכויות היוצרים שלנו עלולה לגרור צעדים משפטיים. אם אתם סבורים שתוכן
        באתר מפר את זכויות היוצרים שלכם, צרו איתנו קשר מיד.
      </p>
    `
  }
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('terms')

  const activeContent = sections.find(s => s.id === activeSection)

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-apple-gray-800/10 backdrop-blur-xl rounded-full mb-6"
            >
              <FileText className="w-4 h-4 text-apple-gray-800" />
              <span className="text-sm font-medium text-apple-gray-800">
                {content.terms.sectionLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6"
            >
              {content.terms.title}
              <span className="block mt-2 bg-gradient-to-r from-apple-gray-700 to-apple-gray-900 bg-clip-text text-transparent">
                {content.terms.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-apple-gray-600 max-w-3xl mx-auto mb-4"
            >
              {content.terms.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-apple-gray-500"
            >
              {content.terms.lastUpdated}: ינואר 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="py-8 bg-white border-b border-apple-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-br from-apple-gray-800 to-apple-gray-900 text-white shadow-lg'
                      : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                  <span className="text-sm">{section.title}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-apple-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              {activeContent && (
                <>
                  <div className="w-12 h-12 bg-gradient-to-br from-apple-gray-800 to-apple-gray-900 rounded-xl flex items-center justify-center">
                    <activeContent.icon size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-apple-gray-900">
                    {activeContent.title}
                  </h2>
                </>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none text-apple-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeContent?.content || '' }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-apple-gray-800 to-apple-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            יש לכם שאלות?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            אם יש לכם שאלות לגבי תנאי השימוש או מדיניות הפרטיות, אנחנו כאן לעזור
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-apple-gray-900 rounded-full font-medium hover:shadow-xl transition-all"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </main>
  )
}
