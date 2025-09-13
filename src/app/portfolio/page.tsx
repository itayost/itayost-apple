import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { seoConfig } from '@/config/seo'

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
  return <PortfolioPage />
}
