import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { portfolioData } from '@/data/portfolio'
import { JsonLd } from '@/components/common/JsonLd'
import { CaseStudyView } from '@/components/case-study/CaseStudyView'

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

// Projects are enumerated at build time; unknown slugs must be a real HTTP 404
// (see the matching comment in blog/[slug]/page.tsx).
export const dynamicParams = false

// Generate metadata for each portfolio item
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = portfolioData.find(item => item.slug === slug)

  if (!project) {
    // Throw in generateMetadata so the response is a real HTTP 404 (see the
    // matching comment in blog/[slug]/page.tsx — returning fallback metadata
    // commits a 200 before the page body's notFound() runs).
    notFound()
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
      // Review JSON-LD removed 2026-09-17: client ratings stay hidden until confirmed (PRODUCT.md).
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <CaseStudyView project={project} />
    </>
  )
}
