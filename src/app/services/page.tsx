import { Metadata } from 'next'
import ServicesPage from './ServicesPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.services.title,
  description: seoConfig.pages.services.description,
  keywords: seoConfig.pages.services.keywords,
  openGraph: {
    title: seoConfig.pages.services.title,
    description: seoConfig.pages.services.description,
    url: seoConfig.pages.services.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.services.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.service,
      seoConfig.structuredData.breadcrumbs('/services'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/services/#webpage',
        name: seoConfig.pages.services.title,
        description: seoConfig.pages.services.description,
        url: seoConfig.pages.services.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <ServicesPage />
    </>
  )
}
