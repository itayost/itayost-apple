import { Metadata } from 'next'
import ContactPage from './ContactPage'
import { seoConfig } from '@/config/seo'

export const metadata: Metadata = {
  title: seoConfig.pages.contact.title,
  description: seoConfig.pages.contact.description,
  keywords: seoConfig.pages.contact.keywords,
  openGraph: {
    title: seoConfig.pages.contact.title,
    description: seoConfig.pages.contact.description,
    url: seoConfig.pages.contact.canonical,
    type: 'website',
  },
  alternates: {
    canonical: seoConfig.pages.contact.canonical,
  },
}

export default function Page() {
  return <ContactPage />
}
