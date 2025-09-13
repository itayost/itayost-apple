'use client'

import { motion } from 'framer-motion'
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Globe, 
  Database, 
  Cloud,
  Shield,
  Zap,
  Settings,
  Users,
  TrendingUp,
  HeartHandshake
} from 'lucide-react'
import Link from 'next/link'
import { AppleReveal, AppleStaggerChildren, AppleStaggerItem } from '@/components/ScrollAnimations/AppleAnimations'

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
    gradient: 'from-blue-500 to-cyan-500',
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
    gradient: 'from-purple-500 to-pink-500',
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
    gradient: 'from-orange-500 to-red-500',
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
    gradient: 'from-green-500 to-teal-500',
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
    gradient: 'from-indigo-500 to-purple-500',
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
    gradient: 'from-gray-500 to-gray-700',
    price: 'לפי שעה או פרויקט'
  }
]

const process = [
  {
    icon: HeartHandshake,
    title: 'פגישת היכרות',
    description: 'הבנת הצרכים והיעדים העסקיים'
  },
  {
    icon: Settings,
    title: 'תכנון ועיצוב',
    description: 'יצירת פרוטוטייפ ועיצוב הממשק'
  },
  {
    icon: Code2,
    title: 'פיתוח',
    description: 'כתיבת הקוד ובניית המוצר'
  },
  {
    icon: Shield,
    title: 'בדיקות',
    description: 'בדיקות איכות ותיקון באגים'
  },
  {
    icon: Zap,
    title: 'השקה',
    description: 'העלאה לאוויר וליווי ראשוני'
  },
  {
    icon: TrendingUp,
    title: 'תמיכה ושדרוג',
    description: 'תחזוקה שוטפת ושיפורים'
  }
]

export default function ServicesPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-white to-apple-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        
        <div className="container relative z-10">
          <AppleReveal>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-apple-blue/10 backdrop-blur-xl rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4 text-apple-blue" />
                <span className="text-sm font-medium text-apple-blue">
                  השירותים שלנו
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apple-gray-900 mb-6">
                פתרונות דיגיטליים
                <span className="block mt-2 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                  מקצה לקצה
                </span>
              </h1>
              
              <p className="text-xl text-apple-gray-600">
                מהרעיון הראשוני ועד להשקה המוצלחת - אני מספק את כל השירותים הדרושים להצלחה הדיגיטלית שלך
              </p>
            </div>
          </AppleReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container">
          <AppleStaggerChildren>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AppleStaggerItem key={service.id}>
                  <motion.div
                    className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                        <service.icon size={32} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-apple-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-apple-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-apple-gray-600 mb-6 leading-relaxed">
                      {service.longDescription}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-apple-gray-900 mb-3">
                        מה כולל השירות:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-apple-gray-600">
                            <span className="text-apple-green mt-0.5">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-apple-gray-900 mb-3">
                        טכנולוגיות:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-apple-gray-100 rounded-lg text-xs font-medium text-apple-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-apple-gray-200">
                      <span className="text-2xl font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">
                        {service.price}
                      </span>
                      
                      <Link
                        href={`/contact?service=${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white rounded-full font-medium hover:shadow-lg transition-all"
                      >
                        קבל הצעה
                      </Link>
                    </div>
                  </motion.div>
                </AppleStaggerItem>
              ))}
            </div>
          </AppleStaggerChildren>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-apple-gray-50 to-white">
        <div className="container">
          <AppleReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apple-gray-900 mb-6">
                תהליך העבודה שלנו
              </h2>
              <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
                תהליך מסודר ושקוף מתחילת הפרויקט ועד להשקה
              </p>
            </div>
          </AppleReveal>
          
          <AppleStaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <AppleStaggerItem key={index}>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                        <step.icon size={32} className="text-apple-blue" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-apple-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-apple-gray-600">
                      {step.description}
                    </p>
                  </motion.div>
                </AppleStaggerItem>
              ))}
            </div>
          </AppleStaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-apple-blue to-apple-purple text-white">
        <div className="container">
          <AppleReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                מוכנים להתחיל?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                בואו נדבר על הפרויקט הבא שלכם ונראה איך אפשר להפוך את הרעיון למציאות
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-apple-blue rounded-full font-medium text-lg hover:shadow-xl transition-all"
                  >
                    קבל הצעת מחיר
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-full font-medium text-lg hover:bg-white/30 transition-all"
                  >
                    צפה בעבודות שלנו
                  </Link>
                </motion.div>
              </div>
            </div>
          </AppleReveal>
        </div>
      </section>
    </main>
  )
}
