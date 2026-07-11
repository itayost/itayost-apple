import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

// Shared markdown -> sanitized HTML pipeline for blog posts and guides.
// The custom schema whitelists the HTML that article content legitimately
// needs; everything else is stripped to prevent XSS from content files.
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

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    // rehype-slug runs before sanitize; the schema allows `id` on all tags,
    // so in-page #anchor links (guide TOCs) resolve.
    .use(rehypeSlug)
    .use(rehypeSanitize, customSchema)
    .use(rehypeStringify)
    .process(markdown)

  return processed.toString()
}
