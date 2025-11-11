import { Metadata } from 'next'
import LandingPagesPage from './LandingPagesPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getServiceBySlug } from '@/data/services'

const service = getServiceBySlug('landing-pages')!

export const metadata: Metadata = {
  title: seoConfig.pages['landing-pages'].title,
  description: seoConfig.pages['landing-pages'].description,
  keywords: seoConfig.pages['landing-pages'].keywords,
  openGraph: {
    title: seoConfig.pages['landing-pages'].title,
    description: seoConfig.pages['landing-pages'].description,
    url: seoConfig.pages['landing-pages'].canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages['landing-pages'].canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.itayost.com/services/landing-pages/#service',
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
      seoConfig.structuredData.breadcrumbs('/services/landing-pages'),
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
        '@id': 'https://www.itayost.com/services/landing-pages/#webpage',
        name: seoConfig.pages['landing-pages'].title,
        description: seoConfig.pages['landing-pages'].description,
        url: seoConfig.pages['landing-pages'].canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <LandingPagesPage />
    </>
  )
}
