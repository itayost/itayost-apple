'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    // In production, you should send this to your error tracking service
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error boundary caught:', error)
    }
  }, [error])

  return (
    <div className="pad-world">
      <section className="bg-pad-carbon text-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
          <div className="max-w-[46ch]">
            <span className="inline-block rotate-[-4deg] border-2 border-pad-yellow px-2.5 pb-0.5 pt-1 font-pad-display text-xl font-bold leading-none text-pad-yellow">
              תקלה
            </span>
            <h1 className="mt-5 font-pad-display text-[clamp(2.75rem,1.6rem+4vw,4.75rem)] font-bold leading-[0.9] [text-wrap:balance]">
              משהו השתבש
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-pad-carbon-ink">
              מצטער, נתקלתי בשגיאה בלתי צפויה. אני עובד על תיקון הבעיה.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 max-w-[70ch] border-2 border-pad-yellow/60 bg-pad-carbon-deep px-5 py-4">
              <p className="break-all font-mono text-sm text-pad-yellow">{error.message}</p>
              {error.digest && <p className="mt-2 font-mono text-xs text-pad-carbon-ink">Error ID: {error.digest}</p>}
            </div>
          )}

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-14 items-center gap-2 bg-pad-yellow px-6 text-lg font-bold text-pad-ink transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <RefreshCw aria-hidden="true" className="h-5 w-5" />
              נסה שוב
            </button>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center text-lg font-bold text-white underline decoration-pad-yellow decoration-2 underline-offset-[6px] hover:text-pad-yellow"
            >
              חזרה לדף הבית
            </Link>
          </div>

          <p className="mt-10 border-t border-pad-carbon-ink/30 pt-5 text-pad-carbon-ink">
            אם הבעיה נמשכת,{' '}
            <Link
              href="/contact"
              className="font-bold text-white underline decoration-pad-yellow/50 decoration-2 underline-offset-4 hover:decoration-pad-yellow"
            >
              צרו איתי קשר
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
