export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 bg-pad-carbon px-5 py-3 text-base font-bold text-white
                 focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:outline
                 focus:outline-2 focus:outline-offset-2 focus:outline-pad-yellow"
    >
      דלג לתוכן הראשי
    </a>
  )
}
