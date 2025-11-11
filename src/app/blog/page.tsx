import { Metadata } from 'next'
import BlogListingClient from './BlogListingClient'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getAllPosts } from '@/lib/blog'

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

export default async function Page() {
  const posts = await getAllPosts()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Blog schema
      {
        '@type': 'Blog',
        '@id': 'https://www.itayost.com/blog/#blog',
        name: seoConfig.pages.blog.title,
        description: seoConfig.pages.blog.description,
        url: seoConfig.pages.blog.canonical,
        publisher: {
          '@id': 'https://www.itayost.com/#organization',
        },
        inLanguage: 'he-IL',
      },
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
      <BlogListingClient posts={posts} />
    </>
  )
}
