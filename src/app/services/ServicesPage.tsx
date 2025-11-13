'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  Smartphone,
  Palette,
  Globe,
  Database,
  Shield,
  Zap,
  Settings,
  Users,
  TrendingUp,
  HeartHandshake,
  Sparkles,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

const services = [
  {
    id: 'web-development',
    icon: Code2,
    title: 'פיתוח אתרים',
    description: 'אתרים מותאמים אישית עם הטכנולוגיות המתקדמות ביותר',
    longDescription: 'אני מפתח אתרים מודרניים ומהירים עם React, Next.js ו-TypeScript. כל אתר מותאם במדויק לצרכים העסקיים שלך עם דגש על ביצועים, אבטחה וחוויית משתמש.',
    features: [
      'אתרים רספונסיביים לכל המכשירים',
      'ביצועים מהירים במיוחד',
      'SEO מתקדם לדירוג גבוה בגוגל',
      'אבטחה ברמה הגבוהה ביותר',
      'ממשק ניהול נוח ופשוט',
      'אינטגרציות עם מערכות חיצוניות'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    color: 'bg-brand-blue',
    price: 'נקבע לפי פרויקט'
  },
  {
    id: 'mobile-apps',
    icon: Smartphone,
    title: 'אפליקציות מובייל',
    description: 'אפליקציות נייטיב ו-Cross Platform עם חוויית משתמש מושלמת',
    longDescription: 'פיתוח אפליקציות מובייל מתקדמות עם React Native ו-Flutter. אפליקציות שעובדות בצורה מושלמת גם ב-iOS וגם ב-Android עם ביצועים נייטיביים.',
    features: [
      'תמיכה ב-iOS ו-Android',
      'ביצועים נייטיביים',
      'עיצוב מותאם למובייל',
      'התראות Push',
      'עבודה אופליין',
      'אינטגרציה עם חומרת המכשיר'
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Redux', 'GraphQL'],
    color: 'bg-brand-navy',
    price: 'נקבע לפי פרויקט'
  },
  {
    id: 'ui-ux',
    icon: Palette,
    title: 'עיצוב UI/UX',
    description: 'עיצוב ממשקים מרהיבים עם דגש על חוויית משתמש',
    longDescription: 'עיצוב ממשקי משתמש מודרניים ואינטואיטיביים. מחקר משתמשים, פרוטוטייפים ומערכות עיצוב שיגרמו למוצר שלך להיראות ולהרגיש מדהים.',
    features: [
      'מחקר משתמשים מעמיק',
      'פרוטוטייפים אינטראקטיביים',
      'מערכות עיצוב (Design Systems)',
      'עיצוב רספונסיבי',
      'אנימציות ומיקרו-אינטראקציות',
      'בדיקות משתמשים'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
    color: 'bg-brand-orange',
    price: 'נקבע לפי פרויקט'
  },
  {
    id: 'ecommerce',
    icon: Globe,
    title: 'מסחר אלקטרוני',
    description: 'חנויות אונליין מתקדמות עם מערכת ניהול מלאה',
    longDescription: 'פיתוח חנויות אונליין מקצה לקצה עם מערכות תשלום מאובטחות, ניהול מלאי, ומערכת משלוחים. הכל מותאם לצרכים הספציפיים של העסק שלך.',
    features: [
      'מערכת תשלומים מאובטחת',
      'ניהול מלאי אוטומטי',
      'מערכת משלוחים',
      'קופונים ומבצעים',
      'דוחות מכירות',
      'אינטגרציה עם מערכות CRM'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Next.js'],
    color: 'bg-brand-green',
    price: 'נקבע לפי פרויקט'
  },
  {
    id: 'backend',
    icon: Database,
    title: 'פיתוח Backend',
    description: 'מערכות צד שרת חזקות ומאובטחות',
    longDescription: 'פיתוח APIs ומערכות Backend מתקדמות עם Node.js, Python או PHP. בסיסי נתונים מהירים ומאובטחים עם MongoDB או PostgreSQL.',
    features: [
      'RESTful APIs',
      'GraphQL',
      'אימות והרשאות',
      'בסיסי נתונים NoSQL/SQL',
      'Microservices',
      'Real-time communication'
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
    color: 'bg-brand-navy',
    price: 'נקבע לפי פרויקט'
  },
  {
    id: 'consulting',
    icon: Users,
    title: 'ייעוץ טכנולוגי',
    description: 'ליווי וייעוץ בבחירת הטכנולוגיות הנכונות',
    longDescription: 'ייעוץ מקצועי לעסקים בבחירת הטכנולוגיות והאסטרטגיה הדיגיטלית הנכונה. ליווי צמוד מהרעיון ועד ההשקה.',
    features: [
      'ניתוח צרכים טכנולוגיים',
      'בחירת טכנולוגיות',
      'תכנון ארכיטקטורה',
      'הערכת עלויות וזמנים',
      'ליווי צוותי פיתוח',
      'ביקורות קוד'
    ],
    technologies: ['All Technologies'],
    color: 'bg-brand-gray-600',
    price: 'לפי שעה או פרויקט'
  }
]

const process = [
  {
    icon: HeartHandshake,
    title: 'פגישת היכרות',
    description: 'הבנת הצרכים והיעדים העסקיים',
    color: 'bg-red-500'
  },
  {
    icon: Settings,
    title: 'תכנון ועיצוב',
    description: 'יצירת פרוטוטייפ ועיצוב הממשק',
    color: 'bg-brand-blue'
  },
  {
    icon: Code2,
    title: 'פיתוח',
    description: 'כתיבת הקוד ובניית המוצר',
    color: 'bg-brand-orange'
  },
  {
    icon: Shield,
    title: 'בדיקות',
    description: 'בדיקות איכות ותיקון באגים',
    color: 'bg-brand-green'
  },
  {
    icon: Zap,
    title: 'השקה',
    description: 'העלאה לאוויר וליווי ראשוני',
    color: 'bg-yellow-400'
  },
  {
    icon: TrendingUp,
    title: 'תמיכה ושדרוג',
    description: 'תחזוקה שוטפת ושיפורים',
    color: 'bg-brand-navy'
  }
]

export default function ServicesPage() {
  return (
    <main className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span className="text-base font-bold text-brand-blue">
                  השירותים שלנו
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              פתרונות דיגיטליים
              <span className="block mt-2 text-brand-blue">
                מקצה לקצה
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700"
            >
              מהרעיון הראשוני ועד להשקה המוצלחת - אני מספק את כל השירותים הדרושים להצלחה הדיגיטלית שלך
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: bouncyEasing
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start gap-6 mb-6">
                  <motion.div
                    className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5, ease: bouncyEasing }
                    }}
                  >
                    <service.icon size={36} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-brand-gray-700 text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>

                <p className="text-brand-gray-700 mb-6 leading-relaxed text-lg">
                  {service.longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-brand-navy mb-4 text-lg">
                    מה כולל השירות:
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + idx * 0.05,
                          duration: 0.5,
                          ease: bouncyEasing
                        }}
                        className="flex items-start gap-3 text-brand-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-brand-navy mb-4 text-lg">
                    טכנולוגיות:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-brand-gray-100 rounded-full text-sm font-medium text-brand-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-brand-gray-200">
                  <span className="text-2xl font-bold text-brand-blue">
                    {service.price}
                  </span>

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
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <span>קבל הצעה</span>
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              תהליך העבודה שלנו
            </h2>
            <p className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto">
              תהליך מסודר ושקוף מתחילת הפרויקט ועד להשקה
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: bouncyEasing
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow text-center"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center text-white`}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6, ease: bouncyEasing }
                    }}
                  >
                    <step.icon size={36} />
                  </motion.div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-brand-blue text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed">
              בואו נדבר על הפרויקט הבא שלכם ונראה איך אפשר להפוך את הרעיון למציאות
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  className="inline-flex items-center justify-center px-10 py-5 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  קבל הצעת מחיר
                </Link>
              </motion.div>

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
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-blue rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  צפה בעבודות שלנו
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
