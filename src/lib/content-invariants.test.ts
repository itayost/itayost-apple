import { describe, test, expect } from 'vitest'
import { getAllPosts } from './blog'
import { getAllGuides } from './guides'
import {
  seoConfig,
  SITE_TITLE_SUFFIX,
  SERP_TITLE_MAX,
  META_DESCRIPTION_MIN,
  META_DESCRIPTION_MAX,
} from '@/config/seo'

// Snippet standard: the rendered <title> must fit Google's display budget
// and descriptions must be substantial but untruncated.
//
// Legacy posts that predate the standard are grandfathered below. The list is
// a ratchet: a slug may only be removed (by fixing its frontmatter), never
// added. New content must comply from day one.
const LEGACY_LONG_TITLES = [
  'app-store-upload-guide-2025',
  'building-online-store-israel-complete-guide',
  'contact-forms-best-practices-conversion',
  'custom-crm-vs-monday-hubspot-2026',
  'custom-website-vs-wix-squarespace-2026',
  'ecommerce-platform-comparison-israel-2025',
  'mobile-first-design-importance-2025',
  'nextjs-vs-wordpress-2025',
  'react-native-vs-native-2025',
  'react-vs-wordpress-2024',
  'seo-basics-small-business-israel',
  'website-speed-optimization-guide',
]

// Static pages that predate the standard, same ratchet rules as above.
// 'home' additionally double-brands (its title starts with the brand AND the
// layout template appends the suffix) — fixing it is a content decision.
const LEGACY_LONG_PAGE_TITLES = ['home', 'web-development', 'landing-pages']

const renderedTitleLength = (seoTitle: string) =>
  seoTitle.length + SITE_TITLE_SUFFIX.length

describe('content snippet invariants', () => {
  test('every non-legacy blog post renders a title within the SERP budget', async () => {
    // Arrange
    const posts = await getAllPosts()
    const enforced = posts.filter(p => !LEGACY_LONG_TITLES.includes(p.slug))

    // Act
    const violations = enforced
      .filter(p => renderedTitleLength(p.metaTitle || p.title) > SERP_TITLE_MAX)
      .map(p => `${p.slug} (${renderedTitleLength(p.metaTitle || p.title)})`)

    // Assert
    expect(violations).toEqual([])
  })

  test('every blog post description is within the meta description range', async () => {
    // Arrange
    const posts = await getAllPosts()

    // Act
    const violations = posts
      .filter(
        p =>
          p.description.length < META_DESCRIPTION_MIN ||
          p.description.length > META_DESCRIPTION_MAX
      )
      .map(p => `${p.slug} (${p.description.length})`)

    // Assert
    expect(violations).toEqual([])
  })

  test('every guide renders a title and description within budget', async () => {
    // Arrange
    const guides = await getAllGuides()

    // Act
    const titleViolations = guides
      .filter(g => renderedTitleLength(g.metaTitle || g.title) > SERP_TITLE_MAX)
      .map(g => g.slug)
    const descViolations = guides
      .filter(
        g =>
          g.description.length < META_DESCRIPTION_MIN ||
          g.description.length > META_DESCRIPTION_MAX
      )
      .map(g => g.slug)

    // Assert
    expect(titleViolations).toEqual([])
    expect(descViolations).toEqual([])
  })

  test('every non-legacy seoConfig page renders a title within the SERP budget', () => {
    // Arrange
    const pages = Object.entries(seoConfig.pages).filter(
      ([slug]) => !LEGACY_LONG_PAGE_TITLES.includes(slug)
    )

    // Act
    const violations = pages
      .filter(([, page]) => renderedTitleLength(page.title) > SERP_TITLE_MAX)
      .map(([slug, page]) => `${slug} (${renderedTitleLength(page.title)})`)

    // Assert
    expect(violations).toEqual([])
  })

  test('every seoConfig page description is within the meta description range', () => {
    // Arrange
    const pages = Object.entries(seoConfig.pages)

    // Act
    const violations = pages
      .filter(
        ([, page]) =>
          page.description.length < META_DESCRIPTION_MIN ||
          page.description.length > META_DESCRIPTION_MAX
      )
      .map(([slug, page]) => `${slug} (${page.description.length})`)

    // Assert
    expect(violations).toEqual([])
  })

  test('ratchet: every grandfathered page slug still violates, so fixed pages leave the list', () => {
    // Arrange
    const pages = seoConfig.pages as Record<string, { title: string }>

    // Act
    const fixedButStillListed = LEGACY_LONG_PAGE_TITLES.filter(slug => {
      const page = pages[slug]
      if (!page) return true // removed pages must leave the list too
      return renderedTitleLength(page.title) <= SERP_TITLE_MAX
    })

    // Assert
    expect(fixedButStillListed).toEqual([])
  })

  test('ratchet: every grandfathered slug still violates, so fixed posts leave the list', async () => {
    // Arrange
    const posts = await getAllPosts()

    // Act
    const fixedButStillListed = LEGACY_LONG_TITLES.filter(slug => {
      const post = posts.find(p => p.slug === slug)
      if (!post) return true // deleted posts must leave the list too
      return renderedTitleLength(post.metaTitle || post.title) <= SERP_TITLE_MAX
    })

    // Assert
    expect(fixedButStillListed).toEqual([])
  })
})
