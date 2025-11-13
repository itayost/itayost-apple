import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: string
  image?: string
  content: string
  excerpt: string
}

export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md') && !fileName.includes('metadata') && fileName !== 'README.md' && fileName !== 'DELIVERABLES-SUMMARY.md')
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    // Error reading posts directory - return empty array
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML with sanitization to prevent XSS attacks
    // Configure custom schema to allow necessary HTML elements for blog content
    const customSchema = {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        '*': ['className', 'class', 'id'],
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        code: ['className', 'class'],
      },
      tagNames: [
        ...(defaultSchema.tagNames || []),
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'div', 'span', 'br', 'hr',
        'ul', 'ol', 'li',
        'a', 'strong', 'em', 'b', 'i', 'u', 's',
        'code', 'pre',
        'blockquote',
        'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
      ],
    }

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize, customSchema)
      .use(rehypeStringify)
      .process(content)

    const contentHtml = processedContent.toString()

    // Generate excerpt (first 200 characters)
    const plainText = content.replace(/[#*`\[\]]/g, '').trim()
    const excerpt = plainText.substring(0, 200) + '...'

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'איתי אוסטרייך',
      category: data.category || 'כללי',
      tags: data.tags || [],
      readTime: data.readTime || calculateReadTime(content),
      image: data.image || null,
      content: contentHtml,
      excerpt: data.excerpt || excerpt
    }
  } catch (error) {
    // Error reading post - return null
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  )

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      if (a.date > b.date) return -1
      if (a.date < b.date) return 1
      return 0
    })
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()

  if (category === 'all' || category === 'הכל') {
    return allPosts
  }

  return allPosts.filter(post => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

// Calculate reading time based on word count (average 200 words per minute for Hebrew)
function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} דקות קריאה`
}

// Get related posts based on tags and category
export async function getRelatedPosts(post: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()

  const related = allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      let score = 0

      // Same category gets higher score
      if (p.category === post.category) score += 3

      // Shared tags
      const sharedTags = p.tags.filter(tag => post.tags.includes(tag))
      score += sharedTags.length * 2

      return { post: p, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)

  return related
}
