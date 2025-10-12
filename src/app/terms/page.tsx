import { Metadata } from 'next'
import TermsPage from './TermsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.terms.title,
  description: seoConfig.pages.terms.description,
  keywords: seoConfig.pages.terms.keywords,
  openGraph: {
    title: seoConfig.pages.terms.title,
    description: seoConfig.pages.terms.description,
    url: seoConfig.pages.terms.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.terms.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/terms'),
      {
        '@type': 'WebPage',
        '@id': 'https://www.itayost.com/terms/#webpage',
        name: seoConfig.pages.terms.title,
        description: seoConfig.pages.terms.description,
        url: seoConfig.pages.terms.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <TermsPage />
    </>
  )
}
