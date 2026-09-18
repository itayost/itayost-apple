/** A ballpoint tick, drawn over a printed checkbox. */
export function PenTick({ className = 'absolute -top-2 start-0 h-8 w-8' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={`${className} text-pad-ballpoint`} fill="none">
      <path d="M5 17c3 2 6 6 8 9 4-9 9-17 15-23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
