/** A ballpoint plus, drawn in the pen-tick stroke; turns into a cross when the fine print is open. */
export function PenCross() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className="h-7 w-7 text-pad-red transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
      fill="none"
    >
      <path d="M14 4.5c.4 6.2-.3 12.6.3 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4.5 14.3c6.4-.5 12.7.2 19-.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

