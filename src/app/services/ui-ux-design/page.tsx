import { Metadata } from 'next'
import UIUXDesignPage from './UIUXDesignPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('ui-ux-design')!

export const metadata: Metadata = {
  title: seoConfig.pages['ui-ux-design'].title,
  description: seoConfig.pages['ui-ux-design'].description,
  keywords: seoConfig.pages['ui-ux-design'].keywords,
  openGraph: {
    title: seoConfig.pages['ui-ux-design'].title,
    description: seoConfig.pages['ui-ux-design'].description,
    url: seoConfig.pages['ui-ux-design'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['ui-ux-design'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/ui-ux-design/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/ui-ux-design'),
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
      {
        '@type': 'WebPage',
        '@id': 'https://www.itayost.com/services/ui-ux-design/#webpage',
        name: seoConfig.pages['ui-ux-design'].title,
        description: seoConfig.pages['ui-ux-design'].description,
        url: seoConfig.pages['ui-ux-design'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <UIUXDesignPage />
    </>
  )
}
