// Topic clusters: single source of truth for pillar guides and their member
// blog posts. Both directions of the internal linking render from this config
// (pillar page lists members; member posts link back to their pillar), so
// adding a post to a cluster is one line here, no markdown edits.

export type ClusterId = 'pricing' | 'crm' | 'websites'

export interface TopicCluster {
  id: ClusterId
  // Guide slug under content/guides/ and /guides/[slug]
  pillarSlug: string
  // Hebrew cluster name (shown in UI labels)
  label: string
  // Ordered reading path of blog post slugs
  memberSlugs: string[]
  // Primary /services/[slug] route this cluster sells (pillar CTA links here)
  serviceId: string
  // Commercial anchor text for the service link
  serviceAnchor: string
}

export const clusters: TopicCluster[] = [
  {
    id: 'pricing',
    pillarSlug: 'digital-project-costs-israel',
    label: 'מחירים ועלויות דיגיטל',
    memberSlugs: [
      'website-pricing-guide-2025',
      'website-maintenance-cost-per-month',
      'app-development-cost-guide-2025',
      'crm-system-cost-israel-2026',
      'custom-website-vs-wix-squarespace-2026',
      'ai-website-builders-vs-developer-2026',
    ],
    serviceId: 'web-development',
    serviceAnchor: 'בניית אתר מותאם אישית לעסק',
  },
  {
    id: 'crm',
    pillarSlug: 'crm-for-small-business-israel',
    label: 'מערכות CRM לעסקים',
    memberSlugs: [
      'crm-system-cost-israel-2026',
      'crm-vs-excel-spreadsheets',
      'custom-crm-vs-monday-hubspot-2026',
    ],
    serviceId: 'crm-systems',
    serviceAnchor: 'בניית מערכת CRM לפי הזמנה',
  },
  {
    id: 'websites',
    pillarSlug: 'website-that-brings-customers',
    label: 'אתר שמביא לקוחות',
    memberSlugs: [
      'website-not-bringing-customers',
      'common-website-mistakes-2025',
      'contact-forms-best-practices-conversion',
      'landing-page-conversion-checklist',
      'seo-basics-small-business-israel',
      'website-speed-optimization-guide',
      'mobile-first-design-importance-2025',
      'nextjs-vs-wordpress-2025',
    ],
    serviceId: 'web-development',
    serviceAnchor: 'פיתוח אתרים שמביאים לקוחות',
  },
]

export function getClusterByPillarSlug(pillarSlug: string): TopicCluster | undefined {
  return clusters.find(c => c.pillarSlug === pillarSlug)
}

// A post can belong to more than one cluster (e.g. the CRM cost post sits in
// both pricing and crm).
export function getClustersForPost(postSlug: string): TopicCluster[] {
  return clusters.filter(c => c.memberSlugs.includes(postSlug))
}
