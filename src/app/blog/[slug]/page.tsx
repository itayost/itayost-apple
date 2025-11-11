import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostPage from './BlogPostPage'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog'
import { JsonLd } from '@/components/common/JsonLd'
import { seoConfig } from '@/config/seo'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'מאמר לא נמצא',
      description: 'המאמר שחיפשת לא קיים'
    }
  }

  return {
    title: `${post.title} | בלוג ITAYOST`,
    description: post.description || post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      url: `https://www.itayost.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://www.itayost.com/blog/${slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post, 3)

  // Structured data for blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // BlogPosting schema
      {
        '@type': 'BlogPosting',
        '@id': `https://www.itayost.com/blog/${slug}/#article`,
        headline: post.title,
        description: post.description || post.excerpt,
        image: post.image || 'https://www.itayost.com/og-image.png',
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
          url: 'https://www.itayost.com/about'
        },
        publisher: {
          '@id': 'https://www.itayost.com/#organization'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.itayost.com/blog/${slug}/#webpage`
        },
        keywords: post.tags.join(', '),
        articleSection: post.category,
        inLanguage: 'he-IL',
      },
      // Breadcrumbs
      seoConfig.structuredData.breadcrumbs(`/blog/${slug}`),
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `https://www.itayost.com/blog/${slug}/#webpage`,
        url: `https://www.itayost.com/blog/${slug}`,
        name: post.title,
        description: post.description || post.excerpt,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website'
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: post.image || 'https://www.itayost.com/og-image.png'
        },
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'he-IL',
      }
    ]
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  )
}
