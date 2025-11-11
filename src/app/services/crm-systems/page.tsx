import { Metadata } from 'next'
import CRMSystemsPage from './CRMSystemsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('crm-systems')!

export const metadata: Metadata = {
  title: seoConfig.pages['crm-systems'].title,
  description: seoConfig.pages['crm-systems'].description,
  keywords: seoConfig.pages['crm-systems'].keywords,
  openGraph: {
    title: seoConfig.pages['crm-systems'].title,
    description: seoConfig.pages['crm-systems'].description,
    url: seoConfig.pages['crm-systems'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['crm-systems'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/crm-systems/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/crm-systems'),
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
        '@id': 'https://www.itayost.com/services/crm-systems/#webpage',
        name: seoConfig.pages['crm-systems'].title,
        description: seoConfig.pages['crm-systems'].description,
        url: seoConfig.pages['crm-systems'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <CRMSystemsPage />
    </>
  )
}
