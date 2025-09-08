import { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { seoConfig } from '@/config/seo'

// Generate metadata for this page
export const metadata: Metadata = {
  title: seoConfig.pages.services.title,
  description: seoConfig.pages.services.description,
  keywords: seoConfig.pages.services.keywords,
  openGraph: {
    title: seoConfig.pages.services.title,
    description: seoConfig.pages.services.description,
    url: seoConfig.pages.services.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.services.canonical,
  },
}

// Structured data for services page
export default function ServicesPage() {
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'שירותי פיתוח תוכנה',
    provider: {
      '@type': 'Organization',
      name: 'ITAYOST',
      url: 'https://www.itayost.com',
    },
    serviceType: [
      'פיתוח אתרים',
      'פיתוח אפליקציות',
      'עיצוב UI/UX',
      'פיתוח API',
      'אבטחת מידע',
      'ייעוץ טכנולוגי',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    availableLanguage: ['Hebrew', 'English'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      <ServicesClient />
    </>
  )
}