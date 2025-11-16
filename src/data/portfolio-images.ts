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
  },
  ShepesGroup: {
    src: '/images/ShepesGroup',
    original: '/images/shepes-group.png',
    webp: '/images/ShepesGroup.webp',
    sizes: {
      desktop: '/images/ShepesGroup-desktop.webp',
      display: '/images/ShepesGroup-display.webp',
      mobile: '/images/ShepesGroup-mobile.webp',
      thumbnail: '/images/ShepesGroup-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 1920, height: 844 },
      display: { width: 1200, height: 528 },
      mobile: { width: 768, height: 338 },
      thumbnail: { width: 400, height: 176 }
    }
  },
  NeshaTamar: {
    src: '/images/NeshaTamar',
    original: '/images/nes-hatamar.png',
    webp: '/images/NeshaTamar.webp',
    sizes: {
      desktop: '/images/NeshaTamar-desktop.webp',
      display: '/images/NeshaTamar-display.webp',
      mobile: '/images/NeshaTamar-mobile.webp',
      thumbnail: '/images/NeshaTamar-thumbnail.webp'
    },
    dimensions: {
      desktop: { width: 1920, height: 844 },
      display: { width: 1200, height: 528 },
      mobile: { width: 768, height: 338 },
      thumbnail: { width: 400, height: 176 }
    }
  }
}

export type PortfolioImageKey = keyof typeof portfolioImages;