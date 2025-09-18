'use client'

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
  Smartphone
} from 'lucide-react'

const skills = [
  { name: 'React / Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
  { name: 'TypeScript / JavaScript', level: 92, color: 'from-purple-500 to-pink-500' },
  { name: 'Node.js / Express', level: 88, color: 'from-green-500 to-teal-500' },
  { name: 'Python / Django', level: 85, color: 'from-yellow-500 to-orange-500' },
  { name: 'MongoDB / SQL', level: 87, color: 'from-indigo-500 to-purple-500' },
  { name: 'React Native / Swift', level: 82, color: 'from-pink-500 to-rose-500' },
  { name: 'UI/UX Design', level: 90, color: 'from-orange-500 to-red-500' },
  { name: 'Java / Android Studio', level: 80, color: 'from-gray-500 to-gray-700' }
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
    title: 'תשוקה לטכנולוגיה',
    description: 'אהבה אמיתית לקוד ולפתרון אתגרים מורכבים'
  },
  {
    icon: Target,
    title: 'מצוינות ודיוק',
    description: 'שאיפה לקוד נקי, יעיל ומתוחזק'
  },
  {
    icon: Users,
    title: 'חווית משתמש',
    description: 'המשתמש במרכז - תמיד'
  },
  {
    icon: Rocket,
    title: 'חדשנות מתמדת',
    description: 'למידה והתעדכנות בטכנולוגיות החדשות'
  }
]

const achievements = [
  { number: '50+', label: 'פרויקטים מוצלחים' },
  { number: '100%', label: 'לקוחות מרוצים' },
  { number: '24/7', label: 'זמינות ותמיכה' },
  { number: '∞', label: 'תשוקה לקוד' }
]

export default function AboutPage() {
  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  אודות
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                היי, אני
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  איתי אוסטרייך
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-gray-700">
                  Itay Ostraich
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                <strong>Full-Stack Developer</strong> ומהנדס תוכנה עם תשוקה אמיתית לטכנולוגיה וחדשנות.
                אני מאמין שקוד טוב הוא כמו אמנות - יפה, יעיל ומרגש.
              </p>
              
              <p className="text-lg text-gray-600 mb-4">
                מתמחה בפיתוח אפליקציות ואתרים מורכבים עם דגש על חווית משתמש מושלמת, 
                ביצועים מעולים וקוד נקי ומתוחזק. כל פרויקט עבורי הוא הזדמנות ללמוד, 
                להתפתח וליצור משהו שישפיע על אנשים.
              </p>

              <p className="text-lg text-gray-600 mb-8">
                מרמת גן, ישראל 🇮🇱 | דובר עברית ואנגלית
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  בואו נדבר
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  צפייה בעבודות
                </Link>
                <a
                  href="https://github.com/itayost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
            
            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl opacity-10 blur-3xl" />
                
                {/* Main visual */}
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Code2 size={64} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Full-Stack Developer</h3>
                    <p className="text-white/80 text-center">
                      Creating Digital Excellence<br />
                      One Line of Code at a Time
                    </p>
                    <div className="flex gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-xs text-white/70">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">100%</div>
                        <div className="text-xs text-white/70">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">∞</div>
                        <div className="text-xs text-white/70">Passion</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  >
                    <Database className="text-purple-500" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  >
                    <Smartphone className="text-blue-500" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              הכישורים שלי
            </h2>
            <p className="text-xl text-gray-600">
              טכנולוגיות וכלים שאני עובד איתם ביום יום
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Skill Bars */}
            <div className="grid gap-6 mb-12">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technology Tags */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                טכנולוגיות נוספות
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              הערכים שמנחים אותי
            </h2>
            <p className="text-xl text-gray-600">
              העקרונות שעומדים בבסיס העבודה שלי
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            בואו ניצור משהו מדהים ביחד
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            יש לך רעיון? פרויקט? חלום דיגיטלי?
            אני כאן כדי להפוך אותו למציאות.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:shadow-xl transition-all"
            >
              צור קשר
            </Link>
            <a
              href="https://wa.me/972544994417"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 rounded-full font-medium hover:bg-white/30 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
