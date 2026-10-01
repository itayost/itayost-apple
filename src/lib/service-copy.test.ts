import { describe, test, expect } from 'vitest'
import { splitSentences, splitCitations } from './service-copy'

describe('splitSentences', () => {
  test('splits Hebrew copy on sentence-ending punctuation followed by a space', () => {
    // Arrange
    const text = 'בניית מערכת היא לב העסק. לפי Nucleus Research, CRM מחזיר כסף. עסקים רואים עלייה!'

    // Act
    const sentences = splitSentences(text)

    // Assert
    expect(sentences).toEqual(['בניית מערכת היא לב העסק.', 'לפי Nucleus Research, CRM מחזיר כסף.', 'עסקים רואים עלייה!'])
  })

  test('keeps decimals, versions and domains inside their sentence', () => {
    // Arrange
    const text = 'CRM מחזיר $8.71 על כל דולר עם Next.js 14 ושיפור של 0.1 שנייה. משפט שני.'

    // Act
    const sentences = splitSentences(text)

    // Assert
    expect(sentences).toEqual(['CRM מחזיר $8.71 על כל דולר עם Next.js 14 ושיפור של 0.1 שנייה.', 'משפט שני.'])
  })

  test('splits after a closing citation that ends the sentence', () => {
    // Arrange
    const text = 'עלייה של 29% במכירות (Salesforce, 2024). במקום להסתדר.'

    // Act
    const sentences = splitSentences(text)

    // Assert
    expect(sentences).toEqual(['עלייה של 29% במכירות (Salesforce, 2024).', 'במקום להסתדר.'])
  })

  test('returns an empty list for blank input and trims stray whitespace', () => {
    expect(splitSentences('   ')).toEqual([])
    expect(splitSentences('  משפט אחד.  ')).toEqual(['משפט אחד.'])
  })
})

describe('splitCitations', () => {
  test('marks a Latin source with a year as a citation', () => {
    // Act
    const parts = splitCitations('עלייה במכירות (Salesforce, 2024).')

    // Assert
    expect(parts).toEqual([
      { text: 'עלייה במכירות ', isCitation: false },
      { text: '(Salesforce, 2024)', isCitation: true },
      { text: '.', isCitation: false },
    ])
  })

  test('marks a named institution without a year as a citation', () => {
    // Act
    const parts = splitCitations('שיעור נטישה 70% (Baymard Institute) ולכן')

    // Assert
    expect(parts.filter((part) => part.isCitation).map((part) => part.text)).toEqual(['(Baymard Institute)'])
  })

  test('leaves content parentheticals alone: Hebrew inside, or a plain list of products', () => {
    // Arrange
    const withHebrew = 'מהטמעות (47-55% נכשלות לפי Forrester) ועוד'
    const productList = 'תשלומים מובנים (Bit, PayBox) והקוד'

    // Act / Assert
    expect(splitCitations(withHebrew).some((part) => part.isCitation)).toBe(false)
    expect(splitCitations(productList).some((part) => part.isCitation)).toBe(false)
  })

  test('returns the sentence as one plain part when it has no parentheses', () => {
    expect(splitCitations('משפט פשוט.')).toEqual([{ text: 'משפט פשוט.', isCitation: false }])
  })
})
