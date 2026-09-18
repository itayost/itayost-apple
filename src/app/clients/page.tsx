import { Metadata } from 'next'
import ClientsPage from './ClientsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { portfolioData } from '@/data/portfolio'

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
  // The page lists delivered projects, so it is marked up as a list of the
  // real work. Review and AggregateRating markup was removed: the quotes and
  // ratings behind it were never collected from the clients.
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
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: portfolioData.length,
          itemListElement: portfolioData.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.client,
            url: `https://www.itayost.com/portfolio/${item.slug}`,
          })),
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
