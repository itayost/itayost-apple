import { Metadata } from 'next'
import MobileAppsPage from './MobileAppsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('mobile-apps')!

export const metadata: Metadata = {
  title: seoConfig.pages['mobile-apps'].title,
  description: seoConfig.pages['mobile-apps'].description,
  keywords: seoConfig.pages['mobile-apps'].keywords,
  openGraph: {
    title: seoConfig.pages['mobile-apps'].title,
    description: seoConfig.pages['mobile-apps'].description,
    url: seoConfig.pages['mobile-apps'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['mobile-apps'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Service schema
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/mobile-apps/#service',
        name: service.name,
        description: service.description,
        provider: {
          '@id': 'https://www.itayost.com/#organization',
        },
        serviceType: service.name,
        areaServed: {
          '@type': 'Country',
          name: 'Israel'
        },
      },
      // Breadcrumbs
      seoConfig.structuredData.breadcrumbs('/services/mobile-apps'),
      // FAQ Page schema
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      },
      // WebPage schema
      {
        '@type': 'WebPage',
        '@id': 'https://www.itayost.com/services/mobile-apps/#webpage',
        name: seoConfig.pages['mobile-apps'].title,
        description: seoConfig.pages['mobile-apps'].description,
        url: seoConfig.pages['mobile-apps'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <MobileAppsPage />
    </>
  )
}
