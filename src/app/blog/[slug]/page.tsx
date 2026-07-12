import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostPage from './BlogPostPage'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog'
import { getGuideBySlug } from '@/lib/guides'
import { getClustersForPost } from '@/config/clusters'
import { JsonLd } from '@/components/common/JsonLd'
import { seoConfig } from '@/config/seo'
import { toSchemaDate } from '@/lib/dates'

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

// All posts are enumerated at build time (content lives in the repo), so
// unknown slugs must return a real HTTP 404. Without this, the loading.tsx
// boundary streams a 200 shell before the page's notFound() runs, and Google
// flags every dead blog URL as a soft 404.
export const dynamicParams = false

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    // Throwing here (not just in the page body) is what makes the response a
    // real HTTP 404. If generateMetadata resolves normally, Next commits a
    // 200 and starts streaming before the page's notFound() runs — Google
    // then flags the URL as a soft 404.
    notFound()
  }

  const seoTitle = post.metaTitle || post.title

  return {
    // `absolute` bypasses the root layout's `%s | ITAYOST` template. Without it
    // the blog title was double-branded (`… | בלוג ITAYOST | ITAYOST`), pushing
    // titles past ~60 chars and truncating them in the SERP.
    title: { absolute: `${seoTitle} | בלוג ITAYOST` },
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

  // Pillar guides this post belongs to (two-way cluster linking). Null-safe:
  // a config typo or missing guide file must not break the post page.
  const clusterPillars = (
    await Promise.all(
      getClustersForPost(slug).map(async cluster => {
        const guide = await getGuideBySlug(cluster.pillarSlug)
        return guide ? { title: guide.title, href: `/guides/${guide.slug}` } : null
      })
    )
  ).filter((p): p is { title: string; href: string } => p !== null)

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

  // HowTo schema for step-by-step guide posts. Only emitted when the post
  // provides structured `steps` — a HowTo without a step array is invalid and
  // gets ignored by search/AI engines.
  const howToSchema = post.schemaType === 'howto' && post.steps && post.steps.length > 0 ? {
    '@type': 'HowTo',
    name: post.title,
    description: post.description || post.excerpt,
    author: { '@id': 'https://www.itayost.com/#author' },
    datePublished: toSchemaDate(post.date),
    dateModified: toSchemaDate(post.lastUpdated || post.date),
    inLanguage: 'he-IL',
    step: post.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null

  // FAQPage schema from structured frontmatter (same source as the on-page FAQ).
  const faqPageSchema = post.faq && post.faq.length > 0 ? {
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  // Structured data for blog post. The Person (#author) node comes from the
  // root layout on every page; BlogPosting references it by @id.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // BlogPosting schema
      {
        '@type': 'BlogPosting',
        '@id': `https://www.itayost.com/blog/${slug}/#article`,
        headline: post.title,
        description: post.description || post.excerpt,
        image: post.image || 'https://www.itayost.com/og-image.jpg',
        datePublished: toSchemaDate(post.date),
        dateModified: toSchemaDate(post.lastUpdated || post.date),
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
          url: post.image || 'https://www.itayost.com/og-image.jpg'
        },
        datePublished: toSchemaDate(post.date),
        dateModified: toSchemaDate(post.lastUpdated || post.date),
        inLanguage: 'he-IL',
      },
      // HowTo schema (conditionally included for guide posts)
      ...(howToSchema ? [howToSchema] : []),
      // FAQPage schema (conditionally included when the post has structured FAQ)
      ...(faqPageSchema ? [faqPageSchema] : []),
      // ItemList schema (conditionally included for comparison posts)
      ...(itemListSchema ? [itemListSchema] : [])
    ]
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPostPage post={post} relatedPosts={relatedPosts} clusterPillars={clusterPillars} />
    </>
  )
}
