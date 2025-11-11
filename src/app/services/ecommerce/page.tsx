import { Metadata } from 'next'
import EcommercePage from './EcommercePage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('ecommerce')!

export const metadata: Metadata = {
  title: seoConfig.pages['ecommerce'].title,
  description: seoConfig.pages['ecommerce'].description,
  keywords: seoConfig.pages['ecommerce'].keywords,
  openGraph: {
    title: seoConfig.pages['ecommerce'].title,
    description: seoConfig.pages['ecommerce'].description,
    url: seoConfig.pages['ecommerce'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['ecommerce'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/ecommerce/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/ecommerce'),
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
        '@id': 'https://www.itayost.com/services/ecommerce/#webpage',
        name: seoConfig.pages['ecommerce'].title,
        description: seoConfig.pages['ecommerce'].description,
        url: seoConfig.pages['ecommerce'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <EcommercePage />
    </>
  )
}
