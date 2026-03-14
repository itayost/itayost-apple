/**
 * Google API Authentication
 *
 * Uses a service account for server-side access to GA4 Data API and Search Console API.
 * The service account JSON key is stored as a base64-encoded env var for security.
 */

import { google, Auth } from 'googleapis'

let authClient: Auth.GoogleAuth | null = null

export function getGoogleAuth() {
  if (authClient) return authClient

  const credentialsBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!credentialsBase64) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set. ' +
        'See /docs/ANALYTICS_SETUP.md for instructions.'
    )
  }

  try {
    const credentials = JSON.parse(
      Buffer.from(credentialsBase64, 'base64').toString('utf-8')
    )

    authClient = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/analytics.readonly',
        'https://www.googleapis.com/auth/webmasters.readonly',
      ],
    })

    return authClient
  } catch {
    throw new Error(
      'Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY. Ensure it is valid base64-encoded JSON.'
    )
  }
}

/**
 * GA4 Property ID from env
 */
export function getGA4PropertyId(): string {
  const propertyId = process.env.GA4_PROPERTY_ID

  if (!propertyId) {
    throw new Error(
      'GA4_PROPERTY_ID environment variable is not set. ' +
        'Find it in GA4 Admin > Property Settings.'
    )
  }

  // Ensure it has the "properties/" prefix
  return propertyId.startsWith('properties/')
    ? propertyId
    : `properties/${propertyId}`
}

/**
 * Site URL for Search Console (e.g., "sc-domain:itayost.com" or "https://www.itayost.com/")
 */
export function getGSCSiteUrl(): string {
  const siteUrl = process.env.GSC_SITE_URL

  if (!siteUrl) {
    throw new Error(
      'GSC_SITE_URL environment variable is not set. ' +
        'Use format: "sc-domain:itayost.com" or "https://www.itayost.com/"'
    )
  }

  return siteUrl
}
