'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioData } from '@/data/portfolio'

interface ServicePortfolioProps {
  portfolioIds: string[]
  gradient: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export default function ServicePortfolio({ portfolioIds, gradient }: ServicePortfolioProps) {
  // Filter portfolio items based on IDs
  const relevantProjects = portfolioData.filter(project =>
    portfolioIds.includes(project.id.toString())
  )

  // If no relevant projects, don't render the section
  if (relevantProjects.length === 0) {
    return null
  }

  return (
    <section className="bg-apple-gray-50 py-20 lg:py-24" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-apple-gray-900 sm:text-4xl lg:text-5xl">
            עבודות קשורות
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-apple-gray-700">
            פרויקטים שביצענו בתחום זה
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {relevantProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
            >
              <Link
                href={`/portfolio/${project.id}`}
                className="group block overflow-hidden rounded-2xl border border-apple-gray-200 bg-white shadow-sm transition-all hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-apple-gray-100">
                  <Image
                    src={project.imageSizes?.thumbnail || project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-20`}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category badge */}
                  <span className={`mb-3 inline-block rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-white`}>
                    {project.category === 'web' ? 'אתר' :
                     project.category === 'system' ? 'מערכת' :
                     project.category === 'app' ? 'אפליקציה' :
                     'פרויקט'}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold text-apple-gray-900 transition-colors group-hover:text-apple-blue">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mb-4 text-sm text-apple-gray-600">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-apple-gray-700">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-apple-gray-100 px-2 py-1 text-xs text-apple-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View more link */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-apple-blue transition-colors group-hover:text-apple-blue-dark">
                    <span>צפה בפרויקט</span>
                    <span className="transition-transform group-hover:translate-x-1">←</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all portfolio link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-apple-gray-300 bg-white px-8 py-4 text-base font-semibold text-apple-gray-900 transition-all hover:border-apple-gray-400 hover:bg-apple-gray-50"
          >
            <span>צפה בכל העבודות</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
