# 🍎 ITAYOST Apple-Style Website

A modern, Hebrew RTL portfolio/business website built with Next.js 14, featuring Apple-inspired design language, smooth animations, and comprehensive SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055)

## ✨ Features

- 🎨 **Apple-Inspired Design** - Clean, minimalist design with attention to detail
- 🚀 **Performance Optimized** - 95+ Lighthouse scores with optimized images and code splitting
- 📱 **Mobile-First** - Fully responsive design optimized for all devices
- 🌍 **Hebrew RTL Support** - Complete right-to-left language support
- ✨ **Advanced Animations** - Smooth scroll animations, parallax effects, and micro-interactions
- 🔍 **SEO Optimized** - Complete SEO setup with meta tags, structured data, and sitemap
- 💬 **WhatsApp Integration** - Floating WhatsApp button for instant communication
- 🎯 **Lead Generation** - Strategic CTAs and contact forms

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/itayost-apple.git
cd itayost-apple
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=https://www.itayost.com
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/
│   ├── ScrollAnimations/  # Apple-style animations
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   ├── layout/          # Navigation & Footer
│   ├── common/          # Reusable components
│   └── ui/             # UI components
├── hooks/               # Custom React hooks
│   └── useAppleScrollEffects.ts
├── config/             # Configuration files
│   └── seo.ts         # SEO configuration
├── data/              # Static data
├── types/            # TypeScript types
├── utils/           # Helper functions
└── styles/         # Global styles
```

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### Animation & Interactions
- **Framer Motion:** For smooth animations
- **GSAP:** Advanced scroll animations
- **React Intersection Observer:** Viewport detection

### Performance
- **Sharp:** Image optimization
- **Dynamic Imports:** Code splitting
- **Lazy Loading:** Components and images

### SEO & Analytics
- **Next.js Metadata API:** Dynamic meta tags
- **Structured Data:** JSON-LD schemas
- **Google Analytics 4:** User tracking

## 🎨 Design System

### Colors
```css
Primary: #0071E3 (Apple Blue)
Secondary: #BF5AF2 (Purple)
Accent: #FF375F (Pink)
Success: #30D158 (Green)
Background: #FBFBFD (Off-White)
Text: #1D1D1F (Black)
```

### Typography
- **Headlines:** Heebo 700-800
- **Body:** Heebo 400
- **Captions:** Heebo 500

### Components
- Apple-style glass morphism effects
- Smooth reveal animations
- Gradient backgrounds
- Rounded corners (Apple style)

## 📱 Pages

### Homepage (`/`)
- Animated hero section with gradient mesh
- Services showcase
- Portfolio preview
- Contact CTA

### Services (`/services`)
- Detailed service offerings
- Pricing information
- Process explanation
- Technology stack

### Portfolio (`/portfolio`)
- Project gallery
- Category filters
- Case studies
- Project statistics

### About (`/about`)
- Company story
- Team information
- Values & mission
- Skills & expertise

### Contact (`/contact`)
- Contact form
- Contact information
- WhatsApp integration
- Office hours

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/itayost-apple)

### Manual Deployment

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm run start
# or
yarn start
```

### Environment Variables

Required environment variables for production:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.itayost.com
```

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
npm run analyze      # Bundle size analysis
```

## 📈 Performance

The site is optimized for performance with:

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Cumulative Layout Shift:** < 0.1

## 🔍 SEO

Complete SEO setup including:

- Dynamic meta tags for each page
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD)
- XML sitemap
- Robots.txt
- Canonical URLs
- Hebrew language tags

## 📝 Customization

### Update Content

1. **Homepage:** Edit `src/components/sections/Hero.tsx`
2. **Services:** Update `src/app/services/ServicesPage.tsx`
3. **Portfolio:** Modify `src/components/sections/Portfolio.tsx`
4. **Contact:** Edit `src/components/sections/Contact.tsx`

### Change Colors

Update colors in `tailwind.config.js`:

```javascript
colors: {
  'apple-blue': '#0071E3',
  'apple-purple': '#BF5AF2',
  // Add your colors
}
```

### Add New Pages

1. Create a new folder in `src/app/your-page/`
2. Add `page.tsx` and `YourPage.tsx`
3. Update navigation in `src/components/layout/Navigation.tsx`
4. Add SEO configuration in `src/config/seo.ts`

## 🐛 Troubleshooting

### Common Issues

1. **Hebrew text not displaying correctly:**
   - Ensure Heebo font is loaded
   - Check RTL direction in layout

2. **Animations not working:**
   - Check Framer Motion installation
   - Verify component imports

3. **Build errors:**
   - Clear `.next` folder
   - Delete `node_modules` and reinstall

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👤 Contact

**איתי אוסטרייך (Itay Ostraich)**

- 📧 Email: itayost1@gmail.com
- 📱 Phone: 054-499-4417
- 💬 WhatsApp: [Direct Link](https://wa.me/972544994417)
- 🌐 Website: [itayost.com](https://www.itayost.com)

## 🙏 Acknowledgments

- Design inspired by Apple's design language
- Built with Next.js and React
- Animations powered by Framer Motion
- Styled with Tailwind CSS

---

Made with ❤️ by ITAYOST
