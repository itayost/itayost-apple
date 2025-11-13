'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Code2,
  Rocket,
  Target,
  Heart,
  Users,
  Database,
  Smartphone,
  Sparkles
} from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

const skills = [
  { name: 'React / Next.js', level: 95, color: 'bg-brand-blue', priority: 1 },
  { name: 'TypeScript / JavaScript', level: 92, color: 'bg-brand-navy', priority: 1 },
  { name: 'Node.js / Express', level: 88, color: 'bg-brand-green', priority: 1 },
  { name: 'Python / Django', level: 85, color: 'bg-brand-orange', priority: 2 },
  { name: 'MongoDB / SQL', level: 87, color: 'bg-brand-blue', priority: 1 },
  { name: 'React Native / Swift', level: 82, color: 'bg-brand-navy', priority: 2 },
  { name: 'UI/UX Design', level: 90, color: 'bg-brand-orange', priority: 1 },
  { name: 'Java / Android Studio', level: 80, color: 'bg-brand-gray-600', priority: 2 }
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express',
  'Python', 'Django', 'Java', 'C', 'Swift', 'React Native',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase',
  'REST API', 'GraphQL', 'Git', 'Docker', 'AWS', 'Vercel',
  'Tailwind CSS', 'Material-UI', 'Framer Motion', 'GSAP',
  'Android Studio', 'Xcode', 'VS Code', 'Figma'
]

const values = [
  {
    icon: Heart,
    title: 'מחויבות לתוצאות',
    description: 'לא נרגע עד שהעסק שלך חוסך זמן ומרוויח יותר',
    color: 'bg-red-500'
  },
  {
    icon: Target,
    title: 'פתרונות מדויקים',
    description: 'בדיוק מה שהעסק צריך, לא יותר ולא פחות',
    color: 'bg-brand-orange'
  },
  {
    icon: Users,
    title: 'שפה פשוטה',
    description: 'בלי ז\'רגון טכני - מדברים עסקים',
    color: 'bg-brand-blue'
  },
  {
    icon: Rocket,
    title: 'תמיכה מלאה',
    description: 'לא נעלם אחרי המסירה - איתך לכל השאלות',
    color: 'bg-brand-green'
  }
]

const achievements = [
  { number: '50+', label: 'עסקים ששדרגו', color: 'bg-brand-blue' },
  { number: '100%', label: 'שביעות רצון', color: 'bg-brand-orange' },
  { number: '15', label: 'שעות נחסכות בממוצע', color: 'bg-brand-green' },
  { number: '30%', label: 'גידול בהכנסות', color: 'bg-yellow-400' }
]

export default function AboutPage() {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show only top 5 skills on mobile unless expanded
  const displayedSkills = isMobile && !showAllSkills
    ? skills.filter(s => s.priority === 1).slice(0, 5)
    : skills

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
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <User className="w-5 h-5 text-brand-blue" />
                <span className="text-base font-bold text-brand-blue">
                  אודות
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              איתי אוסטרייך
              <span className="block mt-2 text-brand-blue">
                Full-Stack Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700 max-w-3xl mx-auto"
            >
              מפתח אתרים ואפליקציות מותאמות אישית לעסקים ברמת גן והמרכז
              <br />
              מתמחה בפתרונות שחוסכים זמן ומגדילים רווחים
            </motion.p>
          </div>
        </div>
      </section>

      {/* Two Column Content Section */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
                למה עסקים ברמת גן והמרכז בוחרים בי?
              </h2>

              <p className="text-lg sm:text-xl text-brand-gray-700 mb-4 leading-relaxed">
                <strong>אני לא עוד מפתח אתרים.</strong> אני שותף עסקי שמבין שבעסקים קטנים ובינוניים,
                כל שעה שנחסכת היא כסף, וכל תהליך שמשתפר הוא הזדמנות לגדול.
              </p>

              <p className="text-lg sm:text-xl text-brand-gray-700 mb-4 leading-relaxed">
                <strong>המומחיות שלי?</strong> לקחת תהליכים ידניים ומסורבלים ולהפוך אותם לאוטומטיים.
                לבנות מערכות שעובדות בשבילך 24/7 - גם כשאתה ישן. ליצור אתרים ואפליקציות שממירים
                מבקרים ללקוחות משלמים.
              </p>

              <p className="text-lg sm:text-xl text-brand-gray-700 mb-4 leading-relaxed">
                <strong>איך זה עובד?</strong> אני לא פשוט כותב קוד. אני מקשיב, מבין את הכאבים העסקיים שלך,
                ובונה פתרון מדויק שעונה על הצורך. בלי ז&apos;רגון טכני מיותר, בלי פיצ&apos;רים מיותרים -
                רק מה שבאמת עוזר לעסק שלך לצמוח.
              </p>

              <p className="text-lg sm:text-xl text-brand-gray-700 mb-8">
                📍 <strong>ממוקם ברמת גן</strong> | משרת עסקים בכל המרכז והארץ
                <br />
                📞 זמין בטלפון, WhatsApp, וידאו קונפרנס ופגישות אישיות
              </p>

              <div className="flex flex-wrap gap-4">
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
                    className="inline-block px-8 py-4 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    בואו נדבר
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
                    className="inline-block px-8 py-4 bg-white border-3 border-brand-navy text-brand-navy rounded-full font-semibold text-lg hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    צפייה בעבודות
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
                  <a
                    href="https://github.com/itayost"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-brand-navy text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    GitHub
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: bouncyEasing }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Main visual */}
                <motion.div
                  className="relative bg-brand-blue rounded-3xl p-8 text-white shadow-2xl"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                >
                  <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Code2 size={64} className="mb-4" />
                    </motion.div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">מתמחה בפתרונות שמניבים תוצאות</h3>
                    <p className="text-white/90 text-center text-lg">
                      אתרים, מערכות CRM ואפליקציות מותאמות<br />
                      שחוסכות זמן ומגדילות הכנסות
                    </p>
                    <div className="flex gap-6 mt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold">15</div>
                        <div className="text-sm text-white/80">שעות נחסכות</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">30%</div>
                        <div className="text-sm text-white/80">גידול בהכנסות</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">24/7</div>
                        <div className="text-sm text-white/80">זמינות</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Database className="text-brand-orange" size={32} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center"
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <Smartphone className="text-brand-green" size={32} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange/10 rounded-full mb-6"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: bouncyEasing }
              }}
            >
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <span className="text-base font-bold text-brand-orange">
                הכישורים שלי
              </span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              טכנולוגיות מתקדמות
            </h2>
            <p className="text-xl sm:text-2xl text-brand-gray-700">
              כלים מקצועיים לפתרונות מקצועיים - מעודכן תמיד עם הטכנולוגיות החדשות
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Skill Bars */}
            <div className="grid gap-6 mb-6">
              {displayedSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: bouncyEasing }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-brand-navy text-lg">{skill.name}</span>
                    <span className="text-base font-semibold text-brand-gray-600">{skill.level}%</span>
                  </div>
                  <div className="relative h-4 bg-brand-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.05, ease: bouncyEasing }}
                      className={`absolute top-0 left-0 h-full ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More Button - Mobile Only */}
            {isMobile && !showAllSkills && skills.length > displayedSkills.length && (
              <motion.button
                onClick={() => setShowAllSkills(true)}
                className="w-full mb-12 py-4 text-brand-blue font-semibold text-lg bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                הצג עוד כישורים ({skills.length - displayedSkills.length})
              </motion.button>
            )}

            {/* Technology Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: bouncyEasing }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-navy mb-6 text-center">
                טכנולוגיות נוספות
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.02,
                      duration: 0.3,
                      ease: bouncyEasing
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      transition: { duration: 0.2, ease: bouncyEasing }
                    }}
                    className="px-4 py-2 bg-brand-gray-100 rounded-full text-sm font-medium text-brand-gray-700 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              הערכים שמנחים אותי
            </h2>
            <p className="text-xl sm:text-2xl text-brand-gray-700">
              העקרונות שעומדים בבסיס העבודה שלי
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: bouncyEasing }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow"
              >
                <motion.div
                  className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5, ease: bouncyEasing }
                  }}
                >
                  <value.icon size={36} />
                </motion.div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: bouncyEasing }}
                whileHover={{
                  y: -8,
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className={`${achievement.color} rounded-3xl p-8 text-center text-white shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="text-4xl md:text-5xl font-bold mb-3">
                  {achievement.number}
                </div>
                <div className="text-sm md:text-base opacity-90 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              יש לכם פרויקט? בואו נדבר!
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              שיחת ייעוץ ראשונית חינם - נדבר על הצרכים של העסק שלכם
              ואיך אוכל לעזור לכם לחסוך זמן, לגדול ולהצליח יותר.
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
                  className="inline-block px-10 py-5 bg-brand-orange text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  צור קשר
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
                <a
                  href="https://wa.me/972544994417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-5 bg-white text-brand-blue rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
