import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getAllPortfolioSorted } from '@/data/portfolio'

export const metadata: Metadata = {
  title: seoConfig.pages.portfolio.title,
  description: seoConfig.pages.portfolio.description,
  keywords: seoConfig.pages.portfolio.keywords,
  openGraph: {
    title: seoConfig.pages.portfolio.title,
    description: seoConfig.pages.portfolio.description,
    url: seoConfig.pages.portfolio.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.portfolio.canonical,
  },
}

export default function Page() {
  const portfolioItems = getAllPortfolioSorted()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/portfolio'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/portfolio/#webpage',
        name: seoConfig.pages.portfolio.title,
        description: seoConfig.pages.portfolio.description,
        url: seoConfig.pages.portfolio.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: portfolioItems.length,
          itemListElement: portfolioItems.map((item, index) => ({
            '@type': 'CreativeWork',
            position: index + 1,
            name: item.title,
            description: item.description,
            url: `https://www.itayost.com/portfolio/${item.slug}`,
          })),
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <PortfolioPage />
    </>
  )
}
