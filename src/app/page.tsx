import { Metadata } from 'next'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'
import { getAllPosts } from '@/lib/blog'
import { PadHero } from '@/components/pad/PadHero'
import { PainLines } from '@/components/pad/PainLines'
import { OrderForm } from '@/components/pad/OrderForm'
import { ClientCopies } from '@/components/pad/ClientCopies'
import { PersonSheet } from '@/components/pad/PersonSheet'
import { PadNotes } from '@/components/pad/PadNotes'
import { PadContact } from '@/components/pad/PadContact'

export const metadata: Metadata = {
  title: seoConfig.pages.home.title,
  description: seoConfig.pages.home.description,
  keywords: seoConfig.pages.home.keywords,
  openGraph: {
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    url: seoConfig.pages.home.canonical,
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ITAYOST - מערכות, אוטומציות ואתרים לעסקים',
      },
    ],
  },
  alternates: {
    canonical: seoConfig.pages.home.canonical,
  },
}

export default async function HomePage() {
  // Get latest blog posts
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 3)

  // Structured data for homepage. Organization/WebSite/LocalBusiness are
  // already emitted on every page by the root layout with the same @id values,
  // so only page-specific nodes go here to avoid duplicate graph nodes.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/'),
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      {/* The root layout already renders <main>; this is the page's own world. */}
      <div className="pad-world overflow-x-clip bg-pad-carbon">
        <PadHero />
        <PainLines />
        <OrderForm />
        <ClientCopies />
        <PersonSheet />
        <PadNotes posts={latestPosts} />
        <PadContact />
      </div>
    </>
  )
}
