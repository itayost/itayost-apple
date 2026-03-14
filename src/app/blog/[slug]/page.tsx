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

  const seoTitle = post.metaTitle || post.title

  return {
    title: `${seoTitle} | בלוג ITAYOST`,
    description: post.description || post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: seoTitle,
      description: post.description || post.excerpt,
      url: `https://www.itayost.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastUpdated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{ url: post.image }] : undefined,
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

  const wordCount = post.content.split(/\s+/).length

  // ItemList schema for comparison posts (detected by "vs" or "השוואת" in title/tags)
  const isComparison = post.title.toLowerCase().includes(' vs ') ||
    post.title.includes('השוואה') ||
    post.title.includes(' או ') ||
    post.tags.some(t => t.includes('השוואת'))

  const comparisonItemNames = isComparison
    ? post.tags.filter(t =>
      !t.includes('השוואת') && !t.includes('בניית') && !t.includes('בחירת') &&
      !t.includes('פיתוח אתרים') && !t.includes('ניהול עסק') &&
      !t.includes('אתר מותאם') && !t.includes('מערכת מותאמת')
    ).slice(0, 5)
    : []

  const itemListSchema = isComparison && comparisonItemNames.length >= 2 ? {
    '@type': 'ItemList',
    name: post.title,
    description: post.description || post.excerpt,
    numberOfItems: comparisonItemNames.length,
    itemListElement: comparisonItemNames.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
    })),
  } : null

  // HowTo schema for step-by-step guide posts
  const howToSchema = post.schemaType === 'howto' ? {
    '@type': 'HowTo',
    name: post.title,
    description: post.description || post.excerpt,
    author: { '@id': 'https://www.itayost.com/#author' },
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    inLanguage: 'he-IL',
  } : null

  // Structured data for blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Author
      seoConfig.structuredData.author,
      // BlogPosting schema
      {
        '@type': 'BlogPosting',
        '@id': `https://www.itayost.com/blog/${slug}/#article`,
        headline: post.title,
        description: post.description || post.excerpt,
        image: post.image || 'https://www.itayost.com/og-image.png',
        datePublished: post.date,
        dateModified: post.lastUpdated || post.date,
        wordCount,
        author: { '@id': 'https://www.itayost.com/#author' },
        publisher: {
          '@id': 'https://www.itayost.com/#organization'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.itayost.com/blog/${slug}/#webpage`
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.post-description', '.post-content h2'],
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
        dateModified: post.lastUpdated || post.date,
        inLanguage: 'he-IL',
      },
      // HowTo schema (conditionally included for guide posts)
      ...(howToSchema ? [howToSchema] : []),
      // ItemList schema (conditionally included for comparison posts)
      ...(itemListSchema ? [itemListSchema] : [])
    ]
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  )
}
