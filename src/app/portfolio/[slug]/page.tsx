import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioData } from '@/data/portfolio'
import { JsonLd } from '@/components/common/JsonLd'
import { PortfolioBreadcrumbs } from '@/components/common/Breadcrumbs'
import { ArrowRight, ExternalLink, Calendar, Clock, Tag, CheckCircle2, Quote } from 'lucide-react'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all portfolio items
export async function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.slug,
  }))
}

// Generate metadata for each portfolio item
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = portfolioData.find(item => item.slug === slug)

  if (!project) {
    return {
      title: 'פרויקט לא נמצא',
      description: 'הפרויקט המבוקש לא נמצא במערכת'
    }
  }

  return {
    title: `${project.title} - ${project.subtitle} | תיק עבודות ITAYOST`,
    description: project.longDescription || project.description,
    keywords: [...project.tags, ...project.technologies, 'תיק עבודות', 'פרויקט', project.category],
    openGraph: {
      title: `${project.title} - ${project.subtitle}`,
      description: project.longDescription || project.description,
      type: 'article',
      url: `https://www.itayost.com/portfolio/${project.slug}`,
      images: [
        {
          url: `https://www.itayost.com${project.imageSizes?.desktop || project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: `https://www.itayost.com/portfolio/${project.slug}`,
    },
  }
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params
  const project = portfolioData.find(item => item.slug === slug)

  if (!project) {
    notFound()
  }

  // Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Creative Work
      {
        '@type': 'CreativeWork',
        '@id': `https://www.itayost.com/portfolio/${project.slug}#creativework`,
        name: project.title,
        description: project.longDescription || project.description,
        image: `https://www.itayost.com${project.imageSizes?.desktop || project.image}`,
        dateCreated: project.year,
        creator: {
          '@type': 'Organization',
          name: 'ITAYOST',
          url: 'https://www.itayost.com',
        },
        keywords: [...project.tags, ...project.technologies].join(', '),
        about: project.category === 'web' ? 'Web Development' : 'Software Development',
      },
      // Breadcrumbs
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'דף הבית',
            item: 'https://www.itayost.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'תיק עבודות',
            item: 'https://www.itayost.com/portfolio',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `https://www.itayost.com/portfolio/${project.slug}`,
          },
        ],
      },
      // Review (if exists)
      ...(project.review ? [project.review] : []),
    ],
  }

  const categoryLabels: Record<string, string> = {
    web: 'פיתוח אתרים',
    system: 'מערכות וניהול',
    ecommerce: 'חנות אונליין',
    mobile: 'אפליקציות מובייל'
  }

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="pt-20 lg:pt-24 min-h-screen bg-white">
        {/* Breadcrumbs */}
        <section className="py-6 bg-section-light-blue">
          <div className="container mx-auto px-4">
            <PortfolioBreadcrumbs projectTitle={project.title} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/10 rounded-full mb-6">
                <Tag className="w-4 h-4 text-brand-navy" />
                <span className="text-sm font-bold text-brand-navy">
                  {categoryLabels[project.category] || project.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-4">
                {project.title}
              </h1>
              <p className="text-2xl text-brand-gray-600 mb-8">
                {project.subtitle}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-brand-gray-600 mb-8">
                {project.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{project.year}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{project.duration}</span>
                  </div>
                )}
                {project.client && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">לקוח:</span>
                    <span>{project.client}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-navy/90 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>צפה באתר החי</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Project Image */}
        <section className="py-12 bg-section-light-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={project.imageSizes?.desktop || project.image}
                  alt={project.title}
                  width={1200}
                  height={700}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-3xl font-bold text-brand-navy mb-6">אודות הפרויקט</h2>
                  <p className="text-lg text-brand-gray-700 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-brand-navy mb-6">תכונות עיקריות</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                          <span className="text-brand-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-brand-navy mb-6">תוצאות</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {project.results.map((result, index) => (
                        <div key={index} className="bg-section-light-blue rounded-2xl p-6 text-center">
                          <div className="text-4xl font-bold text-brand-navy mb-2">
                            {result.value}
                          </div>
                          <div className="text-brand-gray-600">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <div className="bg-brand-navy rounded-3xl p-8 lg:p-12 text-white relative">
                    <Quote className="w-12 h-12 text-white/20 absolute top-8 left-8" />
                    <blockquote className="text-xl leading-relaxed mb-6 relative z-10">
                      "{project.testimonial.text}"
                    </blockquote>
                    <div className="relative z-10">
                      <div className="font-bold text-lg">{project.testimonial.author}</div>
                      <div className="text-white/80">{project.testimonial.role}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Technologies */}
                <div className="bg-section-light-blue rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-brand-navy mb-4">טכנולוגיות</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...project.tags, ...project.technologies].map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-brand-navy"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {project.stats && (
                  <div className="bg-brand-navy rounded-3xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">סטטיסטיקות</h3>
                    <div className="space-y-4">
                      {Object.entries(project.stats).map(([key, value], index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/80">{key}</span>
                          <span className="font-bold text-lg">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-section-light-blue rounded-3xl p-6 text-center">
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    רוצים פרויקט דומה?
                  </h3>
                  <p className="text-brand-gray-600 mb-4">
                    בואו נדבר על הפרויקט שלכם
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block w-full px-6 py-3 bg-brand-navy text-white rounded-full font-semibold hover:bg-brand-navy/90 transition-colors"
                  >
                    צור קשר
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Portfolio */}
        <section className="py-12 bg-section-light-blue">
          <div className="container mx-auto px-4 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-navy rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              <ArrowRight className="w-5 h-5" />
              <span>חזרה לתיק עבודות</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
