import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.itayost.com'
  const currentDate = new Date()

  // Main static pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]

  // Add language alternates if multi-language support is added
  // const pagesWithAlternates = pages.map(page => ({
  //   ...page,
  //   alternates: {
  //     languages: {
  //       'he-IL': page.url,
  //       'en-US': page.url.replace(baseUrl, `${baseUrl}/en`),
  //     },
  //   },
  // }))

  return pages
}