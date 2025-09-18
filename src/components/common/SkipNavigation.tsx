export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50
                 bg-apple-blue text-white px-4 py-2 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-apple-blue"
    >
      דלג לתוכן הראשי
    </a>
  )
}