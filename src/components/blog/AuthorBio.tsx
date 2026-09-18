'use client'

import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { trackWhatsAppClick, trackGenerateLead } from '@/lib/analytics'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

interface AuthorBioProps {
  author?: string
}

export default function AuthorBio({ author = 'איתי אוסטרייך' }: AuthorBioProps) {
  const whatsappLink = buildWhatsAppUrl('היי, קראתי את המאמר שלך ורציתי לשאול...')

  return (
    <aside className="my-12 border-y-[3px] border-double border-pad-red py-6">
      <p className="text-sm font-bold text-pad-red">נכתב על ידי</p>
      <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-pad-hand text-4xl text-pad-ballpoint" style={{ transform: 'rotate(-2deg)' }}>
            <Link href="/about" className="hover:text-pad-carbon">
              {author}
            </Link>
          </h3>
          <p className="mt-2 text-base text-pad-ink-soft">בונה מערכות, אתרים ואוטומציות לעסקים קטנים בישראל.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick(window.location.pathname, 'author_bio')
              trackGenerateLead('whatsapp', window.location.pathname)
            }}
            className="inline-flex min-h-11 items-center gap-2 text-base font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon"
          >
            <MessageCircle aria-hidden="true" size={16} />
            שאלו אותי בוואטסאפ
          </a>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center gap-1.5 text-base font-bold text-pad-ink underline decoration-pad-red decoration-2 underline-offset-4"
          >
            עוד עליי
            <ArrowLeft aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </aside>
  )
}
