interface JsonLdProps {
  data: Record<string, unknown>
}

// JSON-LD must be in the initial HTML so non-JS crawlers (most AI bots, some
// SEO crawlers) actually read the structured data. next/script with
// strategy="afterInteractive" streams the tag in the React payload and only
// injects it after hydration — invisible to those crawlers. Per Next.js'
// own docs (https://nextjs.org/docs/app/guides/json-ld), use a plain <script>.
// Escape "<" so a stray "</script>" in schema strings can't break out.
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
