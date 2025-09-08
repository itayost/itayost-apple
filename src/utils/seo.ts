import { Metadata } from 'next'
import { seoConfig } from '@/config/seo'

interface PageSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  canonical?: string
  noindex?: boolean
  type?: 'website' | 'article' | 'product'
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  canonical,
  noindex = false,
  type = 'website',
}: PageSEOProps): Metadata {
  const defaultTitle = seoConfig.default.title
  const defaultDescription = seoConfig.default.description
  const defaultImage = 'https://www.itayost.com/og-image.jpg'
  const defaultCanonical = 'https://www.itayost.com'

  const finalTitle = title || defaultTitle
  const finalDescription = description || defaultDescription
  const finalImage = image || defaultImage
  const finalCanonical = canonical || defaultCanonical
  const finalKeywords = keywords || seoConfig.default.keywords

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalCanonical,
      siteName: 'ITAYOST',
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: 'he_IL',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: finalCanonical,
    },
  }
}