import { Metadata } from 'next'
import GuidesPage from './GuidesPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.guides.title,
  description: seoConfig.pages.guides.description,
  keywords: seoConfig.pages.guides.keywords,
  openGraph: {
    title: seoConfig.pages.guides.title,
    description: seoConfig.pages.guides.description,
    url: seoConfig.pages.guides.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.guides.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/guides'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/guides/#webpage',
        name: seoConfig.pages.guides.title,
        description: seoConfig.pages.guides.description,
        url: seoConfig.pages.guides.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <GuidesPage />
    </>
  )
}
