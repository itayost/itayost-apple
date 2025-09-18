import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.portfolio.title,
  description: seoConfig.pages.portfolio.description,
  keywords: seoConfig.pages.portfolio.keywords,
  openGraph: {
    title: seoConfig.pages.portfolio.title,
    description: seoConfig.pages.portfolio.description,
    url: seoConfig.pages.portfolio.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.portfolio.canonical,
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.breadcrumbs('/portfolio'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/portfolio/#webpage',
        name: seoConfig.pages.portfolio.title,
        description: seoConfig.pages.portfolio.description,
        url: seoConfig.pages.portfolio.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: 6,
          itemListElement: [
            {
              '@type': 'CreativeWork',
              position: 1,
              name: 'פלטפורמת E-Commerce',
              description: 'מערכת מסחר אלקטרוני מתקדמת עם ניהול מלאי ותשלומים',
            },
            {
              '@type': 'CreativeWork',
              position: 2,
              name: 'אפליקציית בנקאות',
              description: 'אפליקציית מובייל לניהול חשבון בנק עם אבטחה מקסימלית',
            },
            {
              '@type': 'CreativeWork',
              position: 3,
              name: 'מערכת ניהול SaaS',
              description: 'דאשבורד מתקדם לניהול עסקים וצוותים',
            },
            {
              '@type': 'CreativeWork',
              position: 4,
              name: 'מחולל תוכן AI',
              description: 'פלטפורמה ליצירת תוכן אוטומטית בעזרת בינה מלאכותית',
            },
            {
              '@type': 'CreativeWork',
              position: 5,
              name: 'פלטפורמת נדל"ן',
              description: 'אתר נדל"ן עם חיפוש מתקדם ותצוגה אינטראקטיבית',
            },
            {
              '@type': 'CreativeWork',
              position: 6,
              name: 'אפליקציית כושר',
              description: 'אפליקציית אימונים אישית עם מעקב התקדמות',
            },
          ],
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <PortfolioPage />
    </>
  )
}
