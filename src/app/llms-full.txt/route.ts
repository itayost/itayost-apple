/**
 * llms-full.txt - long-form site corpus for AI agents.
 *
 * Convention: https://llmstxt.org/. Same overview as llms.txt plus the
 * full markdown body of every blog post, concatenated, so an LLM can
 * ingest the whole content corpus in a single request without crawling.
 *
 * Reads raw markdown directly (not through getAllPosts()) because that
 * helper renders sanitized HTML; for AI ingestion we want clean markdown.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllServices } from '@/data/services'

const SITE_URL = 'https://www.itayost.com'
const POSTS_DIR = path.join(process.cwd(), 'content/blog')

export const revalidate = 3600

interface RawPost {
  slug: string
  title: string
  description: string
  date: string
  lastUpdated?: string
  category: string
  body: string
}

function readAllPosts(): RawPost[] {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(POSTS_DIR)
  } catch {
    return []
  }

  const posts: RawPost[] = []
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue
    if (fileName === 'README.md' || fileName === 'DELIVERABLES-SUMMARY.md') continue
    if (fileName.includes('metadata')) continue

    const slug = fileName.replace(/\.md$/, '')
    try {
      const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8')
      const { data, content } = matter(raw)
      posts.push({
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        lastUpdated: data.lastUpdated || undefined,
        category: data.category || '',
        body: content.trim(),
      })
    } catch {
      // Skip unreadable post but keep going.
      continue
    }
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}

export async function GET() {
  const services = getAllServices()
  const posts = readAllPosts()

  const servicesBlock = services
    .map(s => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.description}`)
    .join('\n')

  const postsBody = posts
    .map(p => {
      const updated = p.lastUpdated || p.date
      return [
        '---',
        `# ${p.title}`,
        '',
        `URL: ${SITE_URL}/blog/${p.slug}`,
        `Category: ${p.category}`,
        `Published: ${p.date}`,
        `Last updated: ${updated}`,
        '',
        p.description ? `> ${p.description}` : '',
        '',
        p.body,
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n\n')

  const body = `# ITAYOST - Full Corpus

> ITAYOST (itayost.com) is a freelance full-stack development studio run by Itay Ostraich, serving small and medium businesses in Israel. This file contains a site overview followed by the full markdown body of every published blog post, intended for AI ingestion.

## Services

${servicesBlock}

## Key Pages

- Homepage: ${SITE_URL}/
- Portfolio: ${SITE_URL}/portfolio
- Blog: ${SITE_URL}/blog
- FAQ: ${SITE_URL}/faq
- About: ${SITE_URL}/about
- Clients: ${SITE_URL}/clients
- Contact: ${SITE_URL}/contact

## Contact

Based in Ramat Gan, Israel. Serves businesses across Israel.
- Phone/WhatsApp: 054-499-4417
- Email: itayost1@gmail.com
- Website: ${SITE_URL}

## Machine-Readable Surfaces

- Sitemap: ${SITE_URL}/sitemap.xml
- RSS feed: ${SITE_URL}/rss.xml
- llms.txt: ${SITE_URL}/llms.txt

---

# Blog Posts (Full Content)

${postsBody}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
