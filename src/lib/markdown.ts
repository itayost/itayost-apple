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

// Article bodies conventionally open with a `# ` heading, but the page
// templates already render the title as the page's H1 — leaving crawlers with
// two H1s on every article. Demote body H1s to H2 so the template owns the
// only H1. Runs before rehype-slug so anchor ids are generated on the final
// heading levels. Mutates the tree in place — a deliberate deviation from the
// no-mutation rule: unified transformers own their tree and the whole rehype
// plugin ecosystem mutates it by contract.
function rehypeDemoteH1() {
  interface HastNode {
    type: string
    tagName?: string
    children?: HastNode[]
  }
  const demote = (node: HastNode) => {
    if (node.tagName === 'h1') {
      node.tagName = 'h2'
    }
    node.children?.forEach(demote)
  }
  return (tree: HastNode) => demote(tree)
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeDemoteH1)
    // rehype-slug runs before sanitize; the schema allows `id` on all tags,
    // so in-page #anchor links (guide TOCs) resolve.
    .use(rehypeSlug)
    .use(rehypeSanitize, customSchema)
    .use(rehypeStringify)
    .process(markdown)

  return processed.toString()
}
