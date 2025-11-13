import Script from 'next/script'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="afterInteractive"
    />
  )
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Article Schema Generator
export function generateArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  image: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified,
    image,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'ITAYOST',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.itayost.com/logo.png',
      },
    },
  }
}

// Product Schema Generator (for portfolio items)
export function generateProductSchema({
  name,
  description,
  image,
  brand = 'ITAYOST',
  offers,
}: {
  name: string
  description: string
  image: string
  brand?: string
  offers?: {
    price: string
    priceCurrency: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Organization',
      name: brand,
    },
    offers: offers ? {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: 'https://schema.org/InStock',
    } : undefined,
  }
}

// AggregateRating Schema Generator
export function generateAggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: {
  ratingValue: number | string
  reviewCount: number | string
  bestRating?: number | string
  worstRating?: number | string
}) {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: bestRating.toString(),
    worstRating: worstRating.toString(),
  }
}

// Organization with AggregateRating Schema Generator
export function generateOrganizationWithRatingSchema({
  name = 'ITAYOST',
  url = 'https://www.itayost.com',
  logo = 'https://www.itayost.com/logo.png',
  description = 'Professional IT consulting and development services',
  aggregateRating,
}: {
  name?: string
  url?: string
  logo?: string
  description?: string
  aggregateRating?: {
    ratingValue: number | string
    reviewCount: number | string
    bestRating?: number | string
    worstRating?: number | string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(aggregateRating && {
      aggregateRating: generateAggregateRatingSchema(aggregateRating),
    }),
  }
}

// Service with AggregateRating Schema Generator
export function generateServiceWithRatingSchema({
  name,
  description,
  provider = 'ITAYOST',
  aggregateRating,
}: {
  name: string
  description: string
  provider?: string
  aggregateRating?: {
    ratingValue: number | string
    reviewCount: number | string
    bestRating?: number | string
    worstRating?: number | string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    ...(aggregateRating && {
      aggregateRating: generateAggregateRatingSchema(aggregateRating),
    }),
  }
}

// Review Schema Generator
export function generateReviewSchema({
  itemReviewed,
  author,
  reviewRating,
  reviewBody,
  datePublished,
}: {
  itemReviewed: string
  author: string
  reviewRating: number
  reviewBody: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: itemReviewed,
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating,
      bestRating: 5,
    },
    reviewBody,
    datePublished,
  }
}