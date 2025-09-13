import { Metadata } from 'next'
import ServicesPage from './ServicesPage'
import { seoConfig } from '@/config/seo'

export const metadata: Metadata = {
  title: seoConfig.pages.services.title,
  description: seoConfig.pages.services.description,
  keywords: seoConfig.pages.services.keywords,
  openGraph: {
    title: seoConfig.pages.services.title,
    description: seoConfig.pages.services.description,
    url: seoConfig.pages.services.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.services.canonical,
  },
}

export default function Page() {
  return <ServicesPage />
}
