// Optimized image configurations for portfolio items
export const portfolioImages = {
  AmosKitchen: {
    src: '/images/AmosKitchen',
    original: '/images/AmosKitchen.png',
    webp: '/images/AmosKitchen.webp',
    sizes: {
      desktop: '/images/AmosKitchen-desktop.webp',
      display: '/images/AmosKitchen-display.webp',
      mobile: '/images/AmosKitchen-mobile.webp',
      thumbnail: '/images/AmosKitchen-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 757, height: 519 },
      display: { width: 391, height: 268 },
      mobile: { width: 320, height: 220 },
      thumbnail: { width: 200, height: 137 }
    }
  },
  LolaMartin: {
    src: '/images/LolaMartin',
    original: '/images/LolaMartin.png',
    webp: '/images/LolaMartin.webp',
    sizes: {
      desktop: '/images/LolaMartin-desktop.webp',
      display: '/images/LolaMartin-display.webp',
      mobile: '/images/LolaMartin-mobile.webp',
      thumbnail: '/images/LolaMartin-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 757, height: 519 },
      display: { width: 391, height: 268 },
      mobile: { width: 320, height: 220 },
      thumbnail: { width: 200, height: 137 }
    }
  },
  TalNadlan: {
    src: '/images/TalNadlan',
    original: '/images/TalNadlan.png',
    webp: '/images/TalNadlan.webp',
    sizes: {
      desktop: '/images/TalNadlan-desktop.webp',
      display: '/images/TalNadlan-display.webp',
      mobile: '/images/TalNadlan-mobile.webp',
      thumbnail: '/images/TalNadlan-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 757, height: 519 },
      display: { width: 391, height: 268 },
      mobile: { width: 320, height: 220 },
      thumbnail: { width: 200, height: 137 }
    }
  },
  TheFader: {
    src: '/images/TheFader',
    original: '/images/TheFader.png',
    webp: '/images/TheFader.webp',
    sizes: {
      desktop: '/images/TheFader-desktop.webp',
      display: '/images/TheFader-display.webp',
      mobile: '/images/TheFader-mobile.webp',
      thumbnail: '/images/TheFader-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 757, height: 519 },
      display: { width: 391, height: 268 },
      mobile: { width: 320, height: 220 },
      thumbnail: { width: 200, height: 137 }
    }
  }
}

export type PortfolioImageKey = keyof typeof portfolioImages;