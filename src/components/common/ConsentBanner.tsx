'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { OPEN_CONSENT_EVENT, decide } from '@/lib/consent'
import { saveConsent, useConsent } from '@/lib/use-consent'

// The cookie choice (src/lib/consent.ts): asked once, with "only necessary" as easy as "allow all",
// and analytics and marketing as separate choices behind "settings". Nothing that measures a visitor
// loads until they choose. The footer's "הגדרות עוגיות" opens it again.
export function ConsentBanner() {
  const consent = useConsent()
  const [reopened, setReopened] = useState(false)
  const [custom, setCustom] = useState(false)
  // useConsent reads storage only after hydration, so the banner never flashes on the server render.
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
    const open = () => {
      setReopened(true)
      setCustom(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  if (!mounted || (consent && !reopened)) return null

  const choose = (analytics: boolean, marketing: boolean) => {
    saveConsent(decide({ analytics, marketing }, new Date()))
    setReopened(false)
    setCustom(false)
  }

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-pad-carbon bg-pad-sheet text-pad-ink shadow-[0_-10px_30px_-12px_rgba(10,20,80,0.35)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto max-w-4xl px-5 py-5 sm:px-8">
        <h2 id={titleId} className="text-lg font-bold">עוגיות ומדידה</h2>
        <p className="mt-1 max-w-[65ch] text-base leading-relaxed text-pad-ink-soft">
          האתר עובד בלי עוגיות מדידה. אם תאשרו, אוכל לראות איך משתמשים באתר ולשפר אותו (Google Analytics, PostHog, Clarity), ובנפרד, להתאים פרסום (Meta).{' '}
          <Link href="/privacy-policy" className="font-bold text-pad-carbon underline underline-offset-4">מדיניות פרטיות</Link>
        </p>
        {custom ? (
          <ConsentSettings initial={consent} onSave={choose} />
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose(true, true)} className={PRIMARY}>לאשר הכל</button>
            <button type="button" onClick={() => choose(false, false)} className={SECONDARY}>רק הכרחי</button>
            <button type="button" onClick={() => setCustom(true)} className={QUIET}>הגדרות</button>
          </div>
        )}
      </div>
    </section>
  )
}

function ConsentSettings({ initial, onSave }: { initial: { analytics: boolean; marketing: boolean } | null; onSave: (analytics: boolean, marketing: boolean) => void }) {
  const [analytics, setAnalytics] = useState(initial?.analytics ?? false)
  const [marketing, setMarketing] = useState(initial?.marketing ?? false)
  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSave(analytics, marketing)
      }}
    >
      <Choice checked={analytics} onChange={setAnalytics} label="מדידה" detail="איך משתמשים באתר: Google Analytics, PostHog ו־Clarity" />
      <Choice checked={marketing} onChange={setMarketing} label="שיווק" detail="התאמת פרסום ברשתות של Meta" />
      <div className="flex flex-wrap gap-3 pt-1">
        <button type="submit" className={PRIMARY}>שמירה</button>
        <button type="button" onClick={() => onSave(false, false)} className={SECONDARY}>רק הכרחי</button>
      </div>
    </form>
  )
}

function Choice({ checked, onChange, label, detail }: { checked: boolean; onChange: (value: boolean) => void; label: string; detail: string }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-start gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#2B3FD6]" />
      <span>
        <span className="block font-bold">{label}</span>
        <span className="block text-base text-pad-ink-soft">{detail}</span>
      </span>
    </label>
  )
}

const BUTTON = 'inline-flex min-h-12 items-center justify-center px-5 text-base font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pad-red'
const PRIMARY = `${BUTTON} bg-pad-carbon text-white hover:bg-pad-carbon-deep`
// "Only necessary" carries the same weight as "allow all": no dark patterns (the regulator's paper).
const SECONDARY = `${BUTTON} bg-pad-ink text-white hover:bg-pad-carbon-deep`
const QUIET = `${BUTTON} text-pad-carbon underline underline-offset-4`
