import { Metadata } from 'next'
import BlogPage from './BlogPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.blog.title,
  description: seoConfig.pages.blog.description,
  keywords: seoConfig.pages.blog.keywords,
  openGraph: {
    title: seoConfig.pages.blog.title,
    description: seoConfig.pages.blog.description,
    url: seoConfig.pages.blog.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.blog.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/blog'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/blog/#webpage',
        name: seoConfig.pages.blog.title,
        description: seoConfig.pages.blog.description,
        url: seoConfig.pages.blog.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPage />
    </>
  )
}
