import { describe, test, expect } from 'vitest'
import robots from './robots'

type Rule = { userAgent?: string | string[]; disallow?: string | string[] }

const asList = <T,>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value]

const rules = (): Rule[] => asList(robots().rules as Rule | Rule[])

describe('robots', () => {
  test('no crawler group blocks the JS and CSS pages need to render', () => {
    // Arrange
    const all = rules()

    // Act
    const blocking = all.filter(rule => asList(rule.disallow).some(path => path.startsWith('/_next')))

    // Assert
    expect(blocking.map(rule => rule.userAgent)).toEqual([])
  })

  test('private routes stay blocked for the default group', () => {
    // Arrange
    const all = rules()

    // Act
    const defaultGroup = all.find(rule => asList(rule.userAgent).includes('*'))

    // Assert
    expect(asList(defaultGroup?.disallow)).toEqual(expect.arrayContaining(['/api/', '/admin/']))
  })
})
