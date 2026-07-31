import { describe, test, expect } from 'vitest'
import { markdownToHtml } from './markdown'

describe('markdownToHtml', () => {
  test('demotes a body H1 to H2 so the page template owns the only H1', async () => {
    // Arrange
    const markdown = '# כמה עולה תחזוקת אתר בחודש?\n\nפסקה ראשונה.'

    // Act
    const html = await markdownToHtml(markdown)

    // Assert
    expect(html).not.toContain('<h1')
    expect(html).toContain('כמה עולה תחזוקת אתר בחודש?')
    expect(html).toMatch(/<h2[^>]*>כמה עולה תחזוקת אתר בחודש\?<\/h2>/)
  })

  test('demoted heading keeps a slug id so in-page anchors still resolve', async () => {
    // Arrange
    const markdown = '# Pricing Guide\n\ntext'

    // Act
    const html = await markdownToHtml(markdown)

    // Assert
    // rehype-sanitize prefixes ids with `user-content-` (clobber protection);
    // that prefix is the site's existing anchor convention.
    expect(html).toContain('<h2 id="user-content-pricing-guide">')
  })

  test('does not demote H2-H6 headings', async () => {
    // Arrange
    const markdown = '## שלב ראשון\n\n### תת שלב\n\n#### פרט\n'

    // Act
    const html = await markdownToHtml(markdown)

    // Assert
    expect(html).toMatch(/<h2[^>]*>שלב ראשון<\/h2>/)
    expect(html).toMatch(/<h3[^>]*>תת שלב<\/h3>/)
    expect(html).toMatch(/<h4[^>]*>פרט<\/h4>/)
  })

  test('markdown without any H1 renders unchanged content', async () => {
    // Arrange
    const markdown = '## כותרת משנה\n\nפסקה עם **הדגשה** ו[קישור](/services).'

    // Act
    const html = await markdownToHtml(markdown)

    // Assert
    expect(html).toMatch(/<h2[^>]*>כותרת משנה<\/h2>/)
    expect(html).toContain('<strong>הדגשה</strong>')
    expect(html).toContain('<a href="/services">קישור</a>')
    expect(html).not.toContain('<h1')
  })
})
