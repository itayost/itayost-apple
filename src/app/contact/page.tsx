import { Metadata } from 'next'
import ContactPage from './ContactPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.contact.title,
  description: seoConfig.pages.contact.description,
  keywords: seoConfig.pages.contact.keywords,
  openGraph: {
    title: seoConfig.pages.contact.title,
    description: seoConfig.pages.contact.description,
    url: seoConfig.pages.contact.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.contact.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/contact'),
      seoConfig.structuredData.faqPage,
      {
        '@type': 'ContactPage',
        '@id': 'https://www.itayost.com/contact/#webpage',
        name: seoConfig.pages.contact.title,
        description: seoConfig.pages.contact.description,
        url: seoConfig.pages.contact.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <ContactPage />
    </>
  )
}
