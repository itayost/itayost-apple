/**
 * Search-engine verification codes from env vars, or undefined when the value is
 * not a real code. The env template ships placeholders such as
 * "your_bing_verification_code_here"; rendering those publishes a broken tag.
 *
 * Google Search Console is verified by DNS TXT record, and Bing can verify by
 * importing the site from Search Console, so neither tag is required.
 */
const FORMATS = {
  // Google HTML-tag tokens are 43 URL-safe base64 characters.
  google: /^[A-Za-z0-9_-]{40,50}$/,
  // Bing msvalidate.01 codes are 32 hex characters.
  bing: /^[0-9A-Fa-f]{32}$/,
} as const

export function verificationCode(engine: keyof typeof FORMATS, value: string | undefined): string | undefined {
  const code = value?.trim()
  return code && FORMATS[engine].test(code) ? code : undefined
}
