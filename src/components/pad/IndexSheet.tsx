import type { ReactNode } from 'react'

export interface IndexSheetRow {
  key: string
  label: ReactNode
  value: ReactNode
}

interface IndexSheetProps {
  title: string
  rows: IndexSheetRow[]
  /** The bottom line, printed in red as the sheet's total. */
  total?: { label: ReactNode; value: ReactNode }
  className?: string
}

/**
 * The pad's index sheet: what is filed under the tabs, counted. A tilted paper
 * sheet with the red margin rule, a double-ruled head and ballpoint counts.
 * One component so the surfaces that carry it cannot drift apart.
 */
export function IndexSheet({ title, rows, total, className = '' }: IndexSheetProps) {
  return (
    <div className={`pad-paper pad-sheet-shadow relative px-6 pb-6 pt-5 text-pad-ink sm:px-8 ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 start-4 w-px bg-pad-red/60" />
      <p className="border-b-[3px] border-double border-pad-red pb-2 ps-4 font-pad-display text-3xl font-bold leading-none text-pad-ink">
        {title}
      </p>
      <dl className="ps-4">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-baseline justify-between gap-4 border-b border-pad-rule py-2.5 last:border-b-0"
          >
            <dt className="text-lg font-bold">{row.label}</dt>
            <dd className="font-pad-hand text-xl text-pad-ballpoint">{row.value}</dd>
          </div>
        ))}
        {total && (
          <div className="flex items-baseline justify-between gap-4 border-t border-pad-rule py-2.5">
            <dt className="text-lg font-bold text-pad-red">{total.label}</dt>
            <dd className="font-pad-display text-3xl leading-none text-pad-red">{total.value}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
