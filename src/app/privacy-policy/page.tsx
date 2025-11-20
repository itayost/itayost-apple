
import { Metadata } from 'next'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages['privacy-policy'].title,
  description: seoConfig.pages['privacy-policy'].description,
  keywords: seoConfig.pages['privacy-policy'].keywords,
  openGraph: {
    title: seoConfig.pages['privacy-policy'].title,
    description: seoConfig.pages['privacy-policy'].description,
    url: seoConfig.pages['privacy-policy'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['privacy-policy'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/privacy-policy'),
      {
        '@type': 'WebPage',
        '@id': 'https://www.itayost.com/privacy-policy/#webpage',
        name: seoConfig.pages['privacy-policy'].title,
        description: seoConfig.pages['privacy-policy'].description,
        url: seoConfig.pages['privacy-policy'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <PrivacyPolicyPage />
    </>
  )
}
