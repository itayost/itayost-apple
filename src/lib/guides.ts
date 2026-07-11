import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from './markdown'

const guidesDirectory = path.join(process.cwd(), 'content/guides')

// Pillar guide: evergreen anchor content for a topic cluster. Deliberately a
// separate type and loader from BlogPost so guides never leak into the blog
// listing, RSS, or related-posts scoring. The tldr/faq/sources shapes match
// BlogPost exactly so KeyTakeaways/FAQSection/SourcesList render them as-is.
export interface Guide {
  slug: string
  title: string
  metaTitle?: string
  description: string
  date: string
  lastUpdated?: string
  readTime: string
  content: string
  tldr?: string[]
  faq?: { question: string; answer: string }[]
  sources?: { title: string; url: string }[]
}

export function getAllGuideSlugs(): string[] {
  try {
    return fs
      .readdirSync(guidesDirectory)
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch {
    // Directory missing or unreadable: fail soft so sitemap/llms never throw.
    return []
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const contentHtml = await markdownToHtml(content)

    return {
      slug,
      title: data.title || '',
      metaTitle: data.metaTitle || undefined,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      lastUpdated: data.lastUpdated || undefined,
      readTime: data.readTime || calculateReadTime(content),
      content: contentHtml,
      tldr: Array.isArray(data.tldr) ? data.tldr : undefined,
      faq: Array.isArray(data.faq) ? data.faq : undefined,
      sources: Array.isArray(data.sources) ? data.sources : undefined,
    }
  } catch {
    return null
  }
}

export async function getAllGuides(): Promise<Guide[]> {
  const slugs = getAllGuideSlugs()
  const guides = await Promise.all(slugs.map(slug => getGuideBySlug(slug)))
  return guides
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}

function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} דקות קריאה`
}
