export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50
                 bg-brand-blue text-white px-4 py-2 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
    >
      דלג לתוכן הראשי
    </a>
  )
}