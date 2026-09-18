'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioItem } from '@/data/portfolio'
import { trackPortfolioClick } from '@/lib/analytics'

const CATEGORY_LABEL: Record<PortfolioItem['category'], string> = {
  system: 'מערכת',
  web: 'אתר',
  mobile: 'אפליקציה',
  ecommerce: 'חנות',
}

// Legible crops of real client screens (see public/images/pad). Screens that
// already read well at card size use their existing portfolio image.
const SCREEN_OVERRIDES: Record<string, string> = {
  'amit-eyebrows': '/images/pad/amit-eyebrows-copy.webp',
  'kitchen-optimizer': '/images/pad/kitchen-optimizer-copy.webp',
  'ta-crm': '/images/pad/ta-crm-copy.webp',
}

const TILTS = ['-rotate-1', 'rotate-[0.6deg]', '-rotate-[0.4deg]', 'rotate-[0.5deg]', '-rotate-[0.8deg]', 'rotate-[0.3deg]']

// The copy number belongs to the project, not to its position, so a copy keeps
// the same "No." on the wall, in a filtered view and on its own case study.
const FIRST_COPY_NUMBER = 147
const copyNumber = (item: PortfolioItem) => String(FIRST_COPY_NUMBER + item.id).padStart(4, '0')



function Staple() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1.5 start-8 z-10 h-2 w-10 rotate-[-6deg] border-2 border-b-0 border-[#8A8FA8] bg-transparent shadow-[0_1px_0_rgba(0,0,0,0.25)]"
    />
  )
}

interface ClientCopyCardProps {
  item: PortfolioItem
  index: number
  size?: 'lead' | 'filed'
  sizes?: string
}

/** A real client project as a filed copy from the pad: stapled, numbered, with its screen. */
export function ClientCopyCard({
  item,
  index,
  size = 'lead',
  sizes = '(min-width: 1024px) 400px, (min-width: 768px) 45vw, 80vw',
}: ClientCopyCardProps) {
  const isLead = size === 'lead'
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      onClick={() => trackPortfolioClick(item.title, item.category)}
      className={`pad-paper group relative block pad-sheet-shadow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none ${
        isLead ? 'p-5 pb-6' : 'p-4 pb-5'
      } ${TILTS[index % TILTS.length] ?? ''}`}
    >
      <Staple />
      <div className="flex items-baseline justify-between border-b border-dashed border-pad-red/50 pb-2 text-sm">
        <span className="font-bold text-pad-red">עותק לקוח</span>
        <span className="font-pad-display text-lg leading-none text-pad-red" dir="ltr">
          No. {copyNumber(item)}
        </span>
      </div>
      <div
        className={`relative mt-4 overflow-hidden border border-pad-ink/15 bg-[#EEF1F6] ${
          isLead ? 'aspect-[4/3]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={isLead ? (SCREEN_OVERRIDES[item.slug] ?? item.imageSizes.display ?? item.image) : (item.imageSizes.desktop ?? item.image)}
          alt={`${item.title}: ${item.subtitle}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          loading="lazy"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className={`font-pad-display font-bold leading-none text-pad-ink ${isLead ? 'text-4xl' : 'text-3xl'}`}>
          {item.title}
        </h3>
        <span className="flex-shrink-0 border border-pad-red px-1.5 text-sm font-bold text-pad-red">
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>
      <p className="mt-2 text-base leading-snug text-pad-ink-soft">{item.subtitle}</p>
      {item.client !== item.title && <p className="mt-3 font-pad-hand text-base text-pad-ballpoint">{item.client}</p>}
    </Link>
  )
}
