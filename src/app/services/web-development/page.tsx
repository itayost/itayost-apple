import { Metadata } from 'next'
import WebDevelopmentPage from './WebDevelopmentPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('web-development')!

export const metadata: Metadata = {
  title: seoConfig.pages['web-development'].title,
  description: seoConfig.pages['web-development'].description,
  keywords: seoConfig.pages['web-development'].keywords,
  openGraph: {
    title: seoConfig.pages['web-development'].title,
    description: seoConfig.pages['web-development'].description,
    url: seoConfig.pages['web-development'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['web-development'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Service schema
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/web-development/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/web-development'),
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
        '@id': 'https://www.itayost.com/services/web-development/#webpage',
        name: seoConfig.pages['web-development'].title,
        description: seoConfig.pages['web-development'].description,
        url: seoConfig.pages['web-development'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <WebDevelopmentPage />
    </>
  )
}
