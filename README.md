# ITAYOST - Apple-Style Portfolio Website 🚀

A modern, Hebrew RTL portfolio website built with Next.js 14, featuring Apple-inspired animations and comprehensive SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055)

## 🌟 Features

### Design & Animation
- ✅ **Apple-Style Design** - Clean, modern interface inspired by Apple's design language
- ✅ **Smooth Animations** - Framer Motion + GSAP for fluid interactions
- ✅ **Parallax Effects** - Multiple scroll-triggered animations
- ✅ **Glass Morphism** - Beautiful translucent UI elements
- ✅ **Responsive Design** - Perfect on all devices

### Hebrew RTL Support
- ✅ **Full RTL Layout** - Complete right-to-left support
- ✅ **Hebrew Typography** - Optimized Hebrew fonts
- ✅ **Hebrew Content** - All content in Hebrew
- ✅ **RTL Animations** - Animations adjusted for RTL

### SEO Optimization
- ✅ **Meta Tags** - Unique for each page
- ✅ **Structured Data** - Rich snippets support
- ✅ **Dynamic Sitemap** - Auto-generated sitemap.xml
- ✅ **OpenGraph** - Social media preview cards
- ✅ **Local SEO** - Israeli market optimization

### Features
- 🎨 **Portfolio Gallery** - Horizontal scroll with filters
- 📱 **WhatsApp Integration** - Floating contact button
- 📝 **Contact Forms** - Beautiful form with validation
- 🌐 **Multi-page** - Services, About, Portfolio, Contact
- ⚡ **Performance** - Optimized for Core Web Vitals

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **Icons:** Lucide React
- **SEO:** Next.js Metadata API
- **Deployment:** Vercel/Netlify Ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with RTL
│   ├── page.tsx           # Homepage
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/
│   ├── ScrollAnimations/  # Animation components
│   │   ├── AppleParallax.tsx
│   │   ├── SmoothReveal.tsx
│   │   ├── StickyScale.tsx
│   │   ├── TextReveal.tsx
│   │   └── HorizontalScroll.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   ├── layout/           # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── common/           # Shared components
│       ├── WhatsAppButton.tsx
│       └── JsonLd.tsx
├── config/
│   ├── content.ts        # Hebrew content
│   └── seo.ts           # SEO configuration
├── data/
│   └── portfolio.ts      # Portfolio items
├── hooks/                # Custom React hooks
├── styles/              # Global styles
└── utils/               # Utility functions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/itayost-apple.git
cd itayost-apple
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.itayost.com
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your website.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🎨 Customization

### Change Colors
Edit `/src/app/globals.css`:
```css
:root {
  --blue: #0071E3;      /* Primary color */
  --purple: #BF5AF2;    /* Secondary color */
  --gradient-hero: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
}
```

### Update Content
Edit `/src/config/content.ts`:
```typescript
export const content = {
  brand: {
    name: 'Your Brand',
    tagline: 'Your Tagline'
  }
  // ... more content
}
```

### Add New Pages
1. Create folder in `/src/app/your-page/`
2. Add `page.tsx` with metadata
3. Update navigation in `/src/components/layout/Navigation.tsx`

## 📱 Features Overview

### Homepage
- Hero section with animated gradient background
- Services showcase with hover effects
- Portfolio preview with horizontal scroll
- Contact section with form

### Services Page
- Service cards with pricing
- Process timeline
- CTA section

### Portfolio Page
- Category filters
- Grid layout with animations
- Project details
- Statistics section

### About Page
- Company story
- Timeline
- Skills progress bars
- Team values

### Contact Page
- Contact form
- Contact information cards
- Office hours
- WhatsApp integration

## 🔍 SEO Features

- ✅ Meta tags optimization
- ✅ Structured data (JSON-LD)
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ OpenGraph tags
- ✅ Twitter cards
- ✅ Canonical URLs
- ✅ Hebrew language optimization

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**ITAYOST**
- Website: [www.itayost.com](https://www.itayost.com)
- Email: hello@itayost.com
- Phone: 054-499-4417

## 🙏 Acknowledgments

- Apple for design inspiration
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Vercel for hosting

---

Built with ❤️ by ITAYOST in Tel Aviv, Israel