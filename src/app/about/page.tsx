import { Metadata } from 'next'
import AboutPage from './AboutPage'
import { seoConfig } from '@/config/seo'

export const metadata: Metadata = {
  title: seoConfig.pages.about.title,
  description: seoConfig.pages.about.description,
  keywords: seoConfig.pages.about.keywords,
  openGraph: {
    title: seoConfig.pages.about.title,
    description: seoConfig.pages.about.description,
    url: seoConfig.pages.about.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.about.canonical,
  },
}

export default function Page() {
  return <AboutPage />
}
