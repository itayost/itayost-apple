'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
  ArrowUpRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Users,
  X
} from 'lucide-react'

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
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
            >
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                תיק העבודות שלי
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              פרויקטים שיצרתי
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                עם תשוקה וחדשנות
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              כל פרויקט מספר סיפור של אתגר שהפך להצלחה, רעיון שהפך למציאות
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-16 lg:top-20 bg-white z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Centered tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex gap-2 p-1 bg-apple-gray-100 rounded-full">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-white text-apple-blue shadow-lg'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile: Scrollable tabs */}
          <div className="sm:hidden overflow-x-auto -mx-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 p-1 bg-apple-gray-100 rounded-full mx-4 pr-4" style={{ width: 'max-content' }}>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-white text-apple-blue shadow-lg'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{category.label.split(' ')[0]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = getIcon(project.category)
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image/Preview */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                      
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon size={64} className="text-white/30" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-white">
                          <div className="flex items-center gap-4 text-sm">
                            {project.stats && (
                              <>
                                {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                                  <span key={key} className="flex items-center gap-1">
                                    {key === 'efficiency' || key === 'conversion' ? <TrendingUp size={16} /> :
                                     key === 'students' || key === 'users' ? <Users size={16} /> :
                                     key === 'time' ? <Clock size={16} /> :
                                     <Eye size={16} />}
                                    {value}
                                  </span>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Live Badge */}
                      {project.link && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Live
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium">
                          {project.client}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {project.duration} • {project.year}
                        </span>
                        <ArrowUpRight size={20} className="text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-5xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <p className="text-gray-600">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 lg:p-8">
              {/* Project Image */}
              {selectedProject.image && (
                <div className="mb-8 rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">אודות הפרויקט</h3>
                    <p className="text-gray-600">{selectedProject.longDescription}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">תכונות עיקריות</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={16} />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">טכנולוגיות</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
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
                    <h3 className="text-lg font-semibold mb-3">תוצאות</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.results.map((result, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4">
                          <div className="text-2xl font-bold text-purple-600">
                            {result.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.testimonial && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">המלצה</h3>
                      <blockquote className="bg-purple-50 rounded-xl p-6">
                        <p className="text-gray-700 italic mb-4">
                          "{selectedProject.testimonial.text}"
                        </p>
                        <cite className="text-sm text-gray-600 not-italic">
                          <strong>{selectedProject.testimonial.author}</strong>
                          <br />
                          {selectedProject.testimonial.role}
                        </cite>
                      </blockquote>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {selectedProject.link ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-purple-600 text-white text-center rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        צפייה באתר
                        <ExternalLink size={18} />
                      </a>
                    ) : (
                      <div className="flex-1 py-3 bg-gray-200 text-gray-500 text-center rounded-xl font-medium cursor-not-allowed">
                        פרויקט פרטי
                      </div>
                    )}
                    <Link
                      href="/contact"
                      className="flex-1 py-3 bg-gray-100 text-gray-900 text-center rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      בואו נדבר
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Statistics Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              המספרים מדברים
            </h2>
            <p className="text-xl text-gray-600">
              תוצאות מוכחות שמעידות על איכות העבודה
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'פרויקטים הושלמו' },
              { value: '100%', label: 'לקוחות מרוצים' },
              { value: '200%', label: 'ROI ממוצע' },
              { value: '5★', label: 'דירוג ממוצע' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            יש לך פרויקט בראש?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            בואו נדבר על איך אפשר להפוך את הרעיון שלך למציאות דיגיטלית מרשימה
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-medium hover:shadow-xl transition-all"
            >
              בואו נתחיל
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 rounded-full font-medium hover:bg-white/30 transition-all"
            >
              השירותים שלי
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
