import { home, type ChaosNote } from '@/config/home'

const { hero } = home
const PEN_INK = 'text-pad-ballpoint'

function NoteText({ note }: { note: ChaosNote }) {
  if (!note.circled || !note.text.includes(note.circled)) {
    return <span className={note.struck ? 'line-through decoration-pad-red decoration-2' : ''}>{note.text}</span>
  }
  const [before, after] = note.text.split(note.circled)
  return (
    <span>
      {before}
      <span className="relative inline-block px-1">
        {note.circled}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] text-pad-red"
          fill="none"
        >
          <path d="M6 22C8 8 40 3 64 4c22 1 32 8 30 18-2 11-30 15-52 14C20 35 4 30 7 18c2-5 9-9 18-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      {after}
    </span>
  )
}

/** Top sheet: the owner's day, scrawled in ballpoint. */
export function ChaosSheet() {
  return (
    <div className="pad-paper pad-ruled relative h-full w-full overflow-hidden [--pad-line:2.4rem]">
      {/* Red margin rule on the inline-start side, as on Hebrew pads */}
      <span aria-hidden="true" className="absolute inset-y-0 start-12 w-px bg-pad-red/70" />
      <div className="flex items-baseline justify-between ps-16 pe-5 pt-2">
        <span className="font-pad-display text-2xl leading-[2.4rem] text-pad-red">{hero.sheetLabel}</span>
        <span className="font-pad-hand text-sm text-pad-ink-soft" dir="ltr">
          <span className="line-through decoration-pad-red">16/09</span> 17/09
        </span>
      </div>
      <ul className="ps-16 pe-5" aria-label={hero.sheetLabel}>
        {hero.chaos.map((note, index) => (
          <li
            key={note.text}
            className={`font-pad-hand text-base leading-[2.4rem] ${PEN_INK} sm:text-lg ${index % 3 === 1 ? 'ps-4' : ''}`}
            style={{ transform: `rotate(${index % 2 === 0 ? -0.8 : 0.6}deg)` }}
          >
            <NoteText note={note} />
          </li>
        ))}
      </ul>
      {/* A pen arrow from the unpaid supplier to the reminder to move everything to Excel */}
      <svg
        aria-hidden="true"
        viewBox="0 0 60 110"
        className={`absolute bottom-6 start-3 h-24 w-10 ${PEN_INK} opacity-80`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 6C12 24 10 62 30 98" />
        <path d="M18 88l12 12 8-15" />
      </svg>
    </div>
  )
}
