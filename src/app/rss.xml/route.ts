/**
 * RSS 2.0 feed for the blog.
 *
 * Public feed reachable at /rss.xml. Used by feed readers, AI ingestion
 * pipelines, and SEO tooling that subscribe to fresh content.
 */

import { getAllPosts } from '@/lib/blog'
import { seoConfig } from '@/config/seo'

const SITE_URL = 'https://www.itayost.com'
const FEED_URL = `${SITE_URL}/rss.xml`

// Cache the rendered feed for an hour. Blog posts publish rarely so this is
// far more than enough freshness.
export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc2822(date: string): string {
  // `lastUpdated` and `date` are YYYY-MM-DD strings from frontmatter.
  // Date.toUTCString() returns an RFC 7231 / RFC 2822-compatible string
  // ("Wed, 06 May 2026 00:00:00 GMT") which RSS 2.0 readers accept.
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return new Date().toUTCString()
  return parsed.toUTCString()
}

export async function GET() {
  const posts = await getAllPosts()
  const feedTitle = 'Blog | ITAYOST'
  const feedDescription = seoConfig.pages.blog.description

  const items = posts
    .map(post => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const pubDate = toRfc2822(post.lastUpdated || post.date)
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const lastBuildDate = posts[0]
    ? toRfc2822(posts[0].lastUpdated || posts[0].date)
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>he-IL</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
