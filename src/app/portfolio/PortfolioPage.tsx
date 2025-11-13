'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'
import {
  ExternalLink,
  Eye,
  Globe,
  Smartphone,
  ShoppingBag,
  Briefcase,
  Code2,
  Filter,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Clock,
  Users,
  X,
  Sparkles
} from 'lucide-react'

// Bouncy easing for Mailchimp-style animations
const bouncyEasing = [0.34, 1.56, 0.64, 1]

const categories = [
  { id: 'all', label: 'הכל', icon: Filter },
  { id: 'web', label: 'אתרים', icon: Globe },
  { id: 'mobile', label: 'אפליקציות', icon: Smartphone },
  { id: 'ecommerce', label: 'מסחר', icon: ShoppingBag },
  { id: 'system', label: 'מערכות', icon: Code2 }
]

const getIcon = (category: string) => {
  switch(category) {
    case 'mobile': return Smartphone
    case 'ecommerce': return ShoppingBag
    case 'system': return Code2
    default: return Globe
  }
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData[0] | null>(null)

  const filteredProjects = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter(p => p.category === selectedCategory)

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
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange/10 rounded-full"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
              >
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span className="text-base font-bold text-brand-orange">
                  תיק העבודות שלי
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: bouncyEasing }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-navy mb-6"
            >
              פרויקטים שיצרתי
              <span className="block mt-2 text-brand-orange">
                עם תשוקה וחדשנות
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: bouncyEasing }}
              className="text-xl sm:text-2xl text-brand-gray-700"
            >
              כל פרויקט מספר סיפור של אתגר שהפך להצלחה, רעיון שהפך למציאות
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-16 lg:top-20 bg-white z-30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Centered tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex gap-2 p-2 bg-brand-gray-100 rounded-full">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700 hover:text-brand-navy'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <category.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile: Scrollable tabs */}
          <div className="sm:hidden overflow-x-auto -mx-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 p-2 bg-brand-gray-100 rounded-full mx-4" style={{ width: 'max-content' }}>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-brand-navy text-white shadow-lg'
                      : 'text-brand-gray-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: bouncyEasing }}
                >
                  <category.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-section-light-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = getIcon(project.category)
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: bouncyEasing
                  }}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                    {/* Image/Preview */}
                    <div className="relative h-64 bg-brand-gray-100 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.description} | ${project.category === 'web' ? 'אתר' : project.category === 'mobile' ? 'אפליקציה' : 'מערכת'} עבור ${project.client}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-blue/10">
                          <Icon size={64} className="text-brand-blue/30" />
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center p-6">
                          <p className="text-lg font-semibold mb-2">לחץ לפרטים מלאים</p>
                          {project.stats && (
                            <div className="flex items-center justify-center gap-4 text-sm">
                              {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                                <span key={key} className="flex items-center gap-1">
                                  {key === 'efficiency' || key === 'conversion' ? <TrendingUp size={16} /> :
                                   key === 'students' || key === 'users' ? <Users size={16} /> :
                                   key === 'time' ? <Clock size={16} /> :
                                   <Eye size={16} />}
                                  {value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Live Badge */}
                      {project.link && (
                        <div className="absolute top-4 left-4">
                          <motion.span
                            className="px-4 py-2 bg-brand-green text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Live
                          </motion.span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold shadow-lg">
                          {project.client}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-brand-gray-700 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-brand-gray-100 rounded-full text-sm font-medium text-brand-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1.5 text-sm text-brand-gray-500 font-medium">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-gray-500 font-medium">
                          {project.duration} • {project.year}
                        </span>
                        <motion.div
                          className="text-brand-blue"
                          whileHover={{ x: -5 }}
                          transition={{ duration: 0.2, ease: bouncyEasing }}
                        >
                          <ArrowLeft size={20} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: bouncyEasing }}
              className="bg-white rounded-3xl max-w-5xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-3xl z-10">
                <div>
                  <h2 className="text-2xl font-bold text-brand-navy">{selectedProject.title}</h2>
                  <p className="text-brand-gray-600">{selectedProject.subtitle}</p>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="w-12 h-12 rounded-2xl bg-brand-gray-100 flex items-center justify-center hover:bg-brand-gray-200 transition-colors"
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    transition: { duration: 0.3, ease: bouncyEasing }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 lg:p-8">
                {/* Project Image */}
                {selectedProject.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden bg-brand-gray-100 shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} - ${selectedProject.description} | פרויקט מפורט עבור ${selectedProject.client}`}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-brand-navy mb-3">אודות הפרויקט</h3>
                      <p className="text-brand-gray-700 leading-relaxed">{selectedProject.longDescription}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-brand-navy mb-4">תכונות עיקריות</h3>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="text-brand-green mt-0.5 flex-shrink-0" size={20} />
                            <span className="text-brand-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-brand-navy mb-4">טכנולוגיות</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-brand-navy mb-4">תוצאות</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProject.results.map((result, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-brand-blue rounded-2xl p-6 text-white text-center"
                            whileHover={{
                              y: -5,
                              transition: { duration: 0.3, ease: bouncyEasing }
                            }}
                          >
                            <div className="text-3xl font-bold mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm opacity-90">
                              {result.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.testimonial && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-brand-navy mb-4">המלצה</h3>
                        <blockquote className="bg-brand-orange/10 rounded-2xl p-6">
                          <p className="text-brand-gray-700 italic mb-4 leading-relaxed">
                            &quot;{selectedProject.testimonial.text}&quot;
                          </p>
                          <cite className="text-sm text-brand-gray-600 not-italic">
                            <strong className="font-bold">{selectedProject.testimonial.author}</strong>
                            <br />
                            {selectedProject.testimonial.role}
                          </cite>
                        </blockquote>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {selectedProject.link ? (
                        <motion.div
                          className="flex-1"
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.3, ease: bouncyEasing }
                          }}
                          whileTap={{
                            scale: 0.98,
                            transition: { duration: 0.3, ease: bouncyEasing }
                          }}
                        >
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-4 bg-brand-orange text-white text-center rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                          >
                            צפייה באתר
                            <ExternalLink size={18} />
                          </a>
                        </motion.div>
                      ) : (
                        <div className="flex-1 py-4 bg-brand-gray-200 text-brand-gray-500 text-center rounded-2xl font-semibold cursor-not-allowed">
                          פרויקט פרטי
                        </div>
                      )}
                      <motion.div
                        className="flex-1"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.3, ease: bouncyEasing }
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { duration: 0.3, ease: bouncyEasing }
                        }}
                      >
                        <Link
                          href="/contact"
                          className="block py-4 bg-brand-navy text-white text-center rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        >
                          בואו נדבר
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Statistics Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: bouncyEasing }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              המספרים מדברים
            </h2>
            <p className="text-xl sm:text-2xl text-brand-gray-700">
              תוצאות מוכחות שמעידות על איכות העבודה
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: 'פרויקטים הושלמו', color: 'bg-brand-blue' },
              { value: '100%', label: 'לקוחות מרוצים', color: 'bg-brand-orange' },
              { value: '200%', label: 'ROI ממוצע', color: 'bg-brand-green' },
              { value: '5★', label: 'דירוג ממוצע', color: 'bg-yellow-400' }
            ].map((stat, index) => (
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
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3, ease: bouncyEasing }
                }}
                className={`${stat.color} rounded-3xl p-8 text-center text-white shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base opacity-90 font-medium">
                  {stat.label}
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
              יש לך פרויקט בראש?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              בואו נדבר על איך אפשר להפוך את הרעיון שלך למציאות דיגיטלית מרשימה
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
                  בואו נתחיל
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
                  href="/services"
                  className="inline-block px-10 py-5 bg-white text-brand-blue rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
                >
                  השירותים שלי
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
