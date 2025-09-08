import { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { seoConfig } from '@/config/seo'

// Generate metadata for this page
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

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
    </main>
  )
}