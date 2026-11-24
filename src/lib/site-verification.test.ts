import { describe, test, expect } from 'vitest'
import { verificationCode } from './site-verification'

describe('verificationCode', () => {
  test('drops the env template placeholders', () => {
    // Arrange
    const google = 'your_google_verification_code_here'
    const bing = 'your_bing_verification_code_here'

    // Act
    const codes = [verificationCode('google', google), verificationCode('bing', bing)]

    // Assert
    expect(codes).toEqual([undefined, undefined])
  })

  test('keeps codes in the real formats', () => {
    // Arrange
    const google = 'AbCdEfGhIjKlMnOpQrStUvWxYz0123456789_-abcde'
    const bing = '0123456789ABCDEF0123456789ABCDEF'

    // Act
    const codes = [verificationCode('google', ` ${google} `), verificationCode('bing', bing)]

    // Assert
    expect(codes).toEqual([google, bing])
  })

  test('treats a missing value as no code', () => {
    // Arrange
    const missing = undefined

    // Act
    const code = verificationCode('bing', missing)

    // Assert
    expect(code).toBeUndefined()
  })
})
