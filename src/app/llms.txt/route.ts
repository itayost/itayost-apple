/**
 * llms.txt - public site overview for AI agents.
 *
 * Convention: https://llmstxt.org/. Short, link-rich summary that lets
 * an LLM understand the site without crawling. Services + blog post lists
 * are generated dynamically so the file stays in sync with content.
 */

import { getAllPosts } from '@/lib/blog'
import { getAllServices } from '@/data/services'

const SITE_URL = 'https://www.itayost.com'

export const revalidate = 3600

export async function GET() {
  const [services, posts] = await Promise.all([
    Promise.resolve(getAllServices()),
    getAllPosts(),
  ])

  const servicesBlock = services
    .map(s => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.description}`)
    .join('\n')

  const postsBlock = posts
    .map(p => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join('\n')

  const body = `# ITAYOST - Custom Web Development & Business Automation

> ITAYOST (itayost.com) is a freelance full-stack development studio run by Itay Ostraich, serving small and medium businesses in Israel. We build custom websites, CRM systems, business automations, e-commerce stores, mobile apps, landing pages, and UI/UX design — all tailored to each client's specific needs.

## About

- **Studio**: ITAYOST (איתי אוסט)
- **Founder**: Itay Ostraich (איתי אוסטרייך), full-stack developer with 5+ years of experience.
- **Founded**: 2024.
- **Based in**: Ramat Gan, Israel. Serves clients across Israel; remote-friendly.
- **Specialty**: Custom CRM systems and Hebrew-RTL web/mobile applications for Israeli SMBs. Hand-coded with Next.js and React Native rather than no-code platforms.
- **Pricing model**: One-time build fee + flat monthly maintenance. No per-seat / per-user fees.
- **Languages of delivery**: Hebrew (primary) and English.
- **Contact**: 054-499-4417 (phone/WhatsApp), itayost1@gmail.com.

## Services

${servicesBlock}

## Key Pages

- [Homepage](${SITE_URL}/): Overview of services and proof points
- [Portfolio](${SITE_URL}/portfolio): Case studies including Lola Martin, Shepes Group, Kitchen Optimizer, and more
- [Blog](${SITE_URL}/blog): Hebrew-language articles on web development, app development, SEO, security, and technology comparisons for Israeli business owners
- [FAQ](${SITE_URL}/faq): Frequently asked questions about services, pricing, process, and technology
- [About](${SITE_URL}/about): Background on Itay Ostraich
- [Clients](${SITE_URL}/clients): Testimonials and success stories
- [Contact](${SITE_URL}/contact): Contact form and WhatsApp (054-499-4417)

## Blog Posts

${postsBlock}

## Tech Stack

Next.js 14, React, TypeScript, Tailwind CSS, Node.js, React Native, Framer Motion, GSAP. Deployed on Vercel.

## Location & Contact

Based in Ramat Gan, Israel. Serves businesses across Israel (remote work supported).
- Phone/WhatsApp: 054-499-4417
- Email: itayost1@gmail.com
- Website: ${SITE_URL}

## Machine-Readable Surfaces

- [Sitemap](${SITE_URL}/sitemap.xml)
- [RSS feed](${SITE_URL}/rss.xml)
- [llms-full.txt](${SITE_URL}/llms-full.txt) — full corpus including blog post bodies
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
