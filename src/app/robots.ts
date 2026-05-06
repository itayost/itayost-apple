import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // AI search bots - explicitly allow for AI citation/visibility
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // OpenAI's user-facing GPT Search crawler (separate from GPTBot training).
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Common Crawl - the corpus most AI models train from.
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Apple Intelligence training opt-in.
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Meta AI training crawler.
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // ByteDance/TikTok AI training crawler.
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // DuckDuckGo's AI assistant crawler.
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Amazon's general/AI crawler.
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Diffbot - powers several AI search products.
      {
        userAgent: 'Diffbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [
      'https://www.itayost.com/sitemap.xml',
      'https://www.itayost.com/rss.xml',
    ],
    host: 'https://www.itayost.com',
  }
}