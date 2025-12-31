import { Metadata } from 'next'
import AutomationsPage from './AutomationsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('automations')!

export const metadata: Metadata = {
  title: seoConfig.pages['automations'].title,
  description: seoConfig.pages['automations'].description,
  keywords: seoConfig.pages['automations'].keywords,
  openGraph: {
    title: seoConfig.pages['automations'].title,
    description: seoConfig.pages['automations'].description,
    url: seoConfig.pages['automations'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['automations'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Service schema
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/automations/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/automations'),
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
        '@id': 'https://www.itayost.com/services/automations/#webpage',
        name: seoConfig.pages['automations'].title,
        description: seoConfig.pages['automations'].description,
        url: seoConfig.pages['automations'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <AutomationsPage />
    </>
  )
}
