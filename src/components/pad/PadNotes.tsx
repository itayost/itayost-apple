import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { home } from '@/config/home'

const { notes } = home

interface PadNotesProps {
  posts: BlogPost[]
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

/** Latest articles as an index of loose notes clipped behind the pad. */
export function PadNotes({ posts }: PadNotesProps) {
  if (posts.length === 0) return null

  return (
    <section aria-labelledby="notes-heading" className="border-t-2 border-pad-ink bg-pad-sheet">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 id="notes-heading" className="font-pad-display text-6xl font-bold leading-[0.9] text-pad-ink">
              {notes.title}
            </h2>
            <p className="mt-3 text-lg text-pad-ink-soft">{notes.intro}</p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex min-h-11 items-center gap-2 self-start text-lg font-bold text-pad-carbon underline decoration-pad-carbon/30 decoration-2 underline-offset-4 hover:decoration-pad-carbon md:self-auto"
          >
            {notes.allLabel}
            <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <ul className="mt-10 border-t border-pad-ink">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-pad-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 transition-colors hover:bg-pad-yellow/30 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <time dateTime={post.date} className="text-sm font-semibold text-pad-red md:col-span-2">
                  {formatDate(post.date)}
                </time>
                <span className="text-xl font-bold leading-snug text-pad-ink md:col-span-8 md:text-2xl">
                  {post.title}
                </span>
                <span className="flex items-center gap-2 text-sm text-pad-ink-soft md:col-span-2 md:justify-end">
                  {post.readTime}
                  <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
