import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GuidePage from './GuidePage'
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import { getClusterByPillarSlug } from '@/config/clusters'
import { getPostBySlug } from '@/lib/blog'
import { JsonLd } from '@/components/common/JsonLd'
import { seoConfig } from '@/config/seo'
import type { ClusterMember } from '@/components/guides/ClusterMemberList'
import { toSchemaDate } from '@/lib/dates'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs()
  return slugs.map(slug => ({ slug }))
}

// Guides are enumerated at build time; unknown slugs must be a real HTTP 404
// (see the matching comment in blog/[slug]/page.tsx).
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    // Throw in generateMetadata so the response is a real HTTP 404 (see the
    // matching comment in blog/[slug]/page.tsx — returning fallback metadata
    // commits a 200 before the page body's notFound() runs).
    notFound()
  }

  const seoTitle = guide.metaTitle || guide.title

  return {
    // `absolute` bypasses the root layout's `%s | ITAYOST` template to avoid
    // double-branding (same fix as the blog titles).
    title: { absolute: `${seoTitle} | ITAYOST` },
    description: guide.description,
    openGraph: {
      title: seoTitle,
      description: guide.description,
      url: `https://www.itayost.com/guides/${slug}`,
      type: 'article',
      publishedTime: guide.date,
      modifiedTime: guide.lastUpdated || guide.date,
    },
    alternates: {
      canonical: `https://www.itayost.com/guides/${slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  // Resolve the ordered cluster members for the reading path. Null-safe: a
  // renamed post slug in the config must not break the guide page.
  const cluster = getClusterByPillarSlug(slug)
  const members: ClusterMember[] = cluster
    ? (
        await Promise.all(
          cluster.memberSlugs.map(async memberSlug => {
            const post = await getPostBySlug(memberSlug)
            return post
              ? {
                  slug: post.slug,
                  title: post.title,
                  description: post.description,
                  readTime: post.readTime,
                }
              : null
          })
        )
      ).filter((m): m is ClusterMember => m !== null)
    : []

  const wordCount = guide.content.split(/\s+/).length

  const faqPageSchema =
    guide.faq && guide.faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `https://www.itayost.com/guides/${slug}/#faq`,
          mainEntity: guide.faq.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  // Organization/WebSite/Person(#author) come from the root layout on every
  // page with the same @id values; only page-specific nodes go here.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Article (not BlogPosting): evergreen anchor content
      {
        '@type': 'Article',
        '@id': `https://www.itayost.com/guides/${slug}/#article`,
        headline: guide.title,
        description: guide.description,
        image: 'https://www.itayost.com/og-image.jpg',
        datePublished: toSchemaDate(guide.date),
        dateModified: toSchemaDate(guide.lastUpdated || guide.date),
        wordCount,
        author: { '@id': 'https://www.itayost.com/#author' },
        publisher: { '@id': 'https://www.itayost.com/#organization' },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.itayost.com/guides/${slug}/#webpage`,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.post-description', 'h2'],
        },
        inLanguage: 'he-IL',
      },
      seoConfig.structuredData.breadcrumbs(`/guides/${slug}`, { [slug]: guide.title }),
      {
        '@type': 'WebPage',
        '@id': `https://www.itayost.com/guides/${slug}/#webpage`,
        url: `https://www.itayost.com/guides/${slug}`,
        name: guide.title,
        description: guide.description,
        isPartOf: { '@id': 'https://www.itayost.com/#website' },
        datePublished: toSchemaDate(guide.date),
        dateModified: toSchemaDate(guide.lastUpdated || guide.date),
        inLanguage: 'he-IL',
      },
      // ItemList: the cluster's reading path (the "collection" semantics)
      ...(members.length > 0
        ? [
            {
              '@type': 'ItemList',
              '@id': `https://www.itayost.com/guides/${slug}/#cluster`,
              name: `מסלול הקריאה: ${guide.title}`,
              numberOfItems: members.length,
              itemListElement: members.map((member, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: member.title,
                item: `https://www.itayost.com/blog/${member.slug}`,
              })),
            },
          ]
        : []),
      ...(faqPageSchema ? [faqPageSchema] : []),
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <GuidePage guide={guide} members={members} />
    </>
  )
}
