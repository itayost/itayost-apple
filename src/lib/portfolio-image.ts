// Native width of each project's largest screenshot. Rendering wider than this
// only upscales a small raster, and the screens are the proof on portfolio
// pages. Plain module: both server and client components read it.
const SOURCE_WIDTH: Record<string, number> = {
  'kitchen-optimizer': 757,
  'lola-martin': 757,
  'the-fader-academy': 757,
  'tal-real-estate': 757,
  'shepes-group': 1920,
  neshatamar: 1920,
  'garden-of-eden': 322,
  'futurekids-shop': 1911,
  'amit-eyebrows': 1911,
  'ta-crm': 579,
}

export const DEFAULT_SOURCE_WIDTH = 757

export const sourceWidthFor = (slug: string): number => SOURCE_WIDTH[slug] ?? DEFAULT_SOURCE_WIDTH
