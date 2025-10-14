import { Metadata } from 'next'
import ClientsPage from './ClientsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.clients.title,
  description: seoConfig.pages.clients.description,
  keywords: seoConfig.pages.clients.keywords,
  openGraph: {
    title: seoConfig.pages.clients.title,
    description: seoConfig.pages.clients.description,
    url: seoConfig.pages.clients.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.clients.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/clients'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/clients/#webpage',
        name: seoConfig.pages.clients.title,
        description: seoConfig.pages.clients.description,
        url: seoConfig.pages.clients.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <ClientsPage />
    </>
  )
}
