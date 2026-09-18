/**
 * The pad waiting for the next sheet: printed rules filling an empty form.
 * Shared by every route-level loading state so a pending page still looks
 * like the pad and never flashes a foreign spinner.
 */
export function PadLoading({ label = 'טוען...' }: { label?: string }) {
  return (
    <div className="pad-world">
      <div className="pad-paper min-h-[70vh]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="font-pad-display text-4xl leading-none text-pad-red" role="status" aria-live="polite">
            {label}
          </p>
          <div className="mt-8 border-t-2 border-pad-ink" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((line) => (
              <div key={line} className="flex items-center gap-5 border-b border-pad-rule py-5">
                <span className="h-5 w-10 flex-shrink-0 bg-pad-rule/60" />
                <span className="h-5 flex-1 bg-pad-rule/40" style={{ maxWidth: `${88 - line * 9}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
