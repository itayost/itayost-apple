import { Metadata } from 'next'
import AboutPage from './AboutPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.about.title,
  description: seoConfig.pages.about.description,
  keywords: seoConfig.pages.about.keywords,
  openGraph: {
    title: seoConfig.pages.about.title,
    description: seoConfig.pages.about.description,
    url: seoConfig.pages.about.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.about.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/about'),
      {
        '@type': 'AboutPage',
        '@id': 'https://www.itayost.com/about/#webpage',
        name: seoConfig.pages.about.title,
        description: seoConfig.pages.about.description,
        url: seoConfig.pages.about.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <AboutPage />
    </>
  )
}
