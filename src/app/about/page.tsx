import { Metadata } from 'next'
import AboutPage from './AboutPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'


export const metadata: Metadata = {
  title: seoConfig.pages.about.title,
  description: seoConfig.pages.about.description,
  keywords: seoConfig.pages.about.keywords,
  openGraph: {
    title: seoConfig.pages.about.title,
    description: seoConfig.pages.about.description,
    url: seoConfig.pages.about.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.about.canonical,
  },
}

export default function Page() {
  // Organization + Person (#author) already come from the root layout with
  // the same @id values, so only page-specific nodes are injected here.
  // AboutPage + ProfilePage: this page is the entity home of the author
  // persona (the Person schema's url points here), so it doubles as the
  // E-E-A-T author profile page.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/about'),
      {
        '@type': ['AboutPage', 'ProfilePage'],
        '@id': 'https://www.itayost.com/about/#webpage',
        name: seoConfig.pages.about.title,
        description: seoConfig.pages.about.description,
        url: seoConfig.pages.about.canonical,
        mainEntity: {
          '@id': 'https://www.itayost.com/#author',
        },
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <AboutPage />
    </>
  )
}
