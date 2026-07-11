import { Metadata } from 'next'
import FAQPage from './FAQPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.faq.title,
  description: seoConfig.pages.faq.description,
  keywords: seoConfig.pages.faq.keywords,
  openGraph: {
    title: seoConfig.pages.faq.title,
    description: seoConfig.pages.faq.description,
    url: seoConfig.pages.faq.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.faq.canonical,
  },
}

export default function Page() {
  // Organization is already emitted on every page by the root layout with the
  // same @id, so only page-specific nodes go here to avoid duplicate graph nodes.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/faq'),
      seoConfig.structuredData.faqPage,
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <FAQPage />
    </>
  )
}
