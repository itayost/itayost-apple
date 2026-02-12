import { Metadata } from 'next'
import { seoConfig, type PageSlug } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

/**
 * Generate metadata for a service page.
 * Eliminates duplicated metadata blocks across all 7 service page.tsx files.
 */
export function generateServiceMetadata(slug: PageSlug): Metadata {
  const pageConfig = seoConfig.pages[slug]
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    openGraph: {
      title: pageConfig.title,
      description: pageConfig.description,
      url: pageConfig.canonical,
      type: 'website',
    },
    alternates: {
      canonical: pageConfig.canonical,
    },
  }
}

/**
 * Generate structured data (JSON-LD) for a service page.
 * Returns a wrapper component with JsonLd + the page component.
 */
export function ServicePageWithJsonLd({
  slug,
  children,
}: {
  slug: PageSlug
  children: React.ReactNode
}) {
  const service = getServiceBySlug(slug)!
  const pageConfig = seoConfig.pages[slug]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `https://www.itayost.com/services/${slug}/#service`,
        name: service.name,
        description: service.description,
        provider: {
          '@id': 'https://www.itayost.com/#organization',
        },
        serviceType: service.name,
        areaServed: {
          '@type': 'Country',
          name: 'Israel',
        },
      },
      seoConfig.structuredData.breadcrumbs(`/services/${slug}`),
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `https://www.itayost.com/services/${slug}/#webpage`,
        name: pageConfig.title,
        description: pageConfig.description,
        url: pageConfig.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  )
}
