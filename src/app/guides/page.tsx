import { Metadata } from 'next'
import GuidesPage, { GuideCard } from './GuidesPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { clusters } from '@/config/clusters'
import { getGuideBySlug } from '@/lib/guides'

export const metadata: Metadata = {
  title: seoConfig.pages.guides.title,
  description: seoConfig.pages.guides.description,
  keywords: seoConfig.pages.guides.keywords,
  openGraph: {
    title: seoConfig.pages.guides.title,
    description: seoConfig.pages.guides.description,
    url: seoConfig.pages.guides.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.guides.canonical,
  },
}

export default async function Page() {
  // Guides in cluster order (pricing, crm, websites), null-safe against a
  // pillar markdown file that is missing or fails to parse.
  const guides: GuideCard[] = (
    await Promise.all(
      clusters.map(async cluster => {
        const guide = await getGuideBySlug(cluster.pillarSlug)
        return guide
          ? {
              slug: guide.slug,
              title: guide.title,
              description: guide.description,
              readTime: guide.readTime,
              lastUpdated: guide.lastUpdated || guide.date,
              memberCount: cluster.memberSlugs.length,
              clusterLabel: cluster.label,
            }
          : null
      })
    )
  ).filter((g): g is GuideCard => g !== null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/guides'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/guides/#webpage',
        name: seoConfig.pages.guides.title,
        description: seoConfig.pages.guides.description,
        url: seoConfig.pages.guides.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
      ...(guides.length > 0
        ? [
            {
              '@type': 'ItemList',
              '@id': 'https://www.itayost.com/guides/#list',
              numberOfItems: guides.length,
              itemListElement: guides.map((guide, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: guide.title,
                item: `https://www.itayost.com/guides/${guide.slug}`,
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <GuidesPage guides={guides} />
    </>
  )
}
