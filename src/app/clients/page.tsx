import { Metadata } from 'next'
import ClientsPage from './ClientsPage'
import { seoConfig } from '@/config/seo'
import { JsonLd } from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: seoConfig.pages.clients.title,
  description: seoConfig.pages.clients.description,
  keywords: seoConfig.pages.clients.keywords,
  openGraph: {
    title: seoConfig.pages.clients.title,
    description: seoConfig.pages.clients.description,
    url: seoConfig.pages.clients.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.clients.canonical,
  },
}

// Testimonials for structured data (mirrors ClientsPage component data)
const testimonials = [
  { name: 'דוד כהן', company: 'מסעדת עמוס', text: 'איתי בנה לנו אתר מדהים שהגדיל את ההזמנות שלנו ב-40%. שירות מקצועי, מהיר ותמיכה מעולה. ממליץ בחום!', rating: 5 },
  { name: 'שרה לוי', company: 'טל נדל"ן', text: 'המערכת שאיתי פיתח לנו חסכה לנו שעות עבודה כל יום. הכל אוטומטי, פשוט ועובד מצוין. השקעה שמשתלמת!', rating: 5 },
  { name: 'יוסי אברהם', company: 'The Fader', text: 'עבדנו עם כמה מפתחים לפני איתי. ההבדל? איתי באמת מבין עסקים. לא רק קוד - פתרונות שעובדים.', rating: 5 },
  { name: 'מיכל ברק', company: 'לולה מרטין', text: 'האתר שאיתי בנה לנו הפך את העסק. עיצוב מהמם, מהיר וממיר. המכירות עלו ב-60% מאז ההשקה!', rating: 5 },
  { name: 'רן גולן', company: 'מרכז רפואי', text: 'מערכת ניהול התורים שאיתי פיתח שינתה לנו את החיים. הכל ממוחשב, מסודר ומקצועי. לקוחות מרוצים ואנחנו חוסכים זמן.', rating: 5 },
  { name: 'נעמה שפירא', company: 'סטודיו לעיצוב', text: 'איתי לא רק פיתח לנו אתר - הוא עזר לנו לבנות את הנוכחות הדיגיטלית שלנו. תמיד זמין, תמיד עוזר. ממש שותף!', rating: 5 },
]

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.structuredData.organization,
      seoConfig.structuredData.breadcrumbs('/clients'),
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.itayost.com/clients/#webpage',
        name: seoConfig.pages.clients.title,
        description: seoConfig.pages.clients.description,
        url: seoConfig.pages.clients.canonical,
        isPartOf: {
          '@id': 'https://www.itayost.com/#website',
        },
      },
      // Individual Review schemas
      ...testimonials.map((t) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewBody: t.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(t.rating),
          bestRating: '5',
          worstRating: '1',
        },
        itemReviewed: {
          '@id': 'https://www.itayost.com/#organization',
        },
      })),
      // AggregateRating
      {
        '@type': 'AggregateRating',
        itemReviewed: {
          '@id': 'https://www.itayost.com/#organization',
        },
        ratingValue: '5.0',
        reviewCount: String(testimonials.length),
        bestRating: '5',
        worstRating: '1',
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <ClientsPage />
    </>
  )
}
