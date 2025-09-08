# ITAYOST Apple-Style Website Documentation

## 📁 Project Structure

```
itayost-apple/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with RTL support
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # Services page
│   │   ├── portfolio/          # Portfolio page
│   │   ├── about/             # About page
│   │   └── contact/           # Contact page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── Select.tsx
│   │   ├── ScrollAnimations/  # Animation components
│   │   │   ├── AppleParallax.tsx
│   │   │   ├── SmoothReveal.tsx
│   │   │   ├── StickyScale.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   └── HorizontalScroll.tsx
│   │   ├── common/            # Common components
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── JsonLd.tsx
│   │   └── index.ts           # Barrel export file
│   ├── config/
│   │   ├── index.ts           # Central configuration
│   │   ├── content.ts         # Hebrew content
│   │   ├── seo.ts            # SEO configuration
│   │   └── socialLinks.ts    # Social media links
│   ├── data/
│   │   └── portfolio.ts      # Portfolio items data
│   ├── hooks/                 # Custom React hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useDebounce.ts
│   │   ├── useScrollAnimation.ts
│   │   ├── useInView.ts
│   │   └── index.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   ├── cn.ts
│   │   ├── formatDate.ts
│   │   ├── formatPhone.ts
│   │   ├── validateEmail.ts
│   │   ├── validatePhone.ts
│   │   └── index.ts
│   └── styles/               # Global styles
│       └── globals.css
├── public/
│   └── images/              # Portfolio images
│       ├── AmosKitchen.png
│       ├── LolaMartin.png
│       ├── TheFader.png
│       └── TalNadlan.png
└── ...config files
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#0071E3`
- **Secondary Purple**: `#BF5AF2`
- **Dark**: `#1D1D1F`
- **Light**: `#F5F5F7`
- **Gray**: `#86868B`
- **Success**: `#30D158`
- **Warning**: `#FF9F0A`
- **Danger**: `#FF3B30`

### Typography
- **Font Family**: SF Pro Display (Apple system font)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, good line-height for Hebrew

### Components

#### Button Component
```tsx
import { Button } from '@/components/ui/Button'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Learn more
</Button>

// With loading state
<Button loading={isLoading}>
  Submit
</Button>
```

#### Card Component
```tsx
import { Card } from '@/components/ui/Card'

// Basic card
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Glass morphism card
<Card glass hover gradient="from-blue-500 to-purple-500">
  <div className="p-6">Content</div>
</Card>
```

#### Form Components
```tsx
import { Input, Textarea, Select } from '@/components/ui'

// Input field
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email}
/>

// Textarea
<Textarea
  label="Message"
  placeholder="Tell us about your project..."
  error={errors.message}
/>

// Select dropdown
<Select
  label="Subject"
  options={[
    { value: 'project', label: 'New Project' },
    { value: 'support', label: 'Support' }
  ]}
  placeholder="Choose a subject"
/>
```

## 🔧 Configuration

### Content Configuration
Edit `/src/config/content.ts` to update all text content:
```ts
export const content = {
  brand: {
    name: 'ItayOst',
    tagline: 'פתרונות דיגיטליים לעסקים',
  },
  // ... more content
}
```

### SEO Configuration
Edit `/src/config/seo.ts` for SEO settings:
```ts
export const seoConfig = {
  default: {
    title: 'Your Title',
    description: 'Your description',
  },
  // ... more SEO settings
}
```

### Social Links
Edit `/src/config/socialLinks.ts`:
```ts
export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/itayost/',
  instagram: 'https://www.instagram.com/itayost/',
  // ... more links
}
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

Use the custom hooks for responsive behavior:
```tsx
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks'

function Component() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}
```

## 🎭 Animations

### Scroll Animations
```tsx
import { SmoothReveal, AppleParallax } from '@/components'

// Smooth reveal on scroll
<SmoothReveal direction="up" delay={0.2}>
  <h2>Animated Heading</h2>
</SmoothReveal>

// Parallax effect
<AppleParallax speed={0.5}>
  <div>Parallax content</div>
</AppleParallax>
```

### Custom Scroll Hook
```tsx
import { useScrollAnimation } from '@/hooks'

function Component() {
  const y = useScrollAnimation({
    inputRange: [0, 1],
    outputRange: [0, 100]
  })
  
  return <motion.div style={{ y }}>Scrolling element</motion.div>
}
```

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.itayost.com
```

### Deploy to Vercel
```bash
npx vercel --prod
```

## 📋 Checklist

### Before Launch
- [ ] Update all content in `/src/config/content.ts`
- [ ] Add portfolio images to `/public/images/`
- [ ] Configure SEO metadata
- [ ] Set up Google Analytics
- [ ] Test all forms
- [ ] Check WhatsApp integration
- [ ] Verify responsive design
- [ ] Test animations performance
- [ ] Add favicon and social media images
- [ ] Create robots.txt and sitemap
- [ ] Test RTL layout thoroughly
- [ ] Verify Hebrew content
- [ ] Check all external links
- [ ] Test loading speed
- [ ] Validate accessibility

## 🛠️ Maintenance

### Adding New Portfolio Items
Edit `/src/data/portfolio.ts`:
```ts
export const portfolioItems = [
  {
    id: 5,
    title: 'New Project',
    category: 'Category',
    description: 'Project description',
    image: '/images/new-project.png',
    gradient: 'from-color-500 to-color-500',
    technologies: ['Tech1', 'Tech2'],
    link: 'https://project-url.com',
    featured: true,
  },
  // ... existing items
]
```

### Updating Services
Edit the services section in `/src/config/content.ts`:
```ts
services: {
  items: [
    {
      icon: '🎯',
      title: 'New Service',
      description: 'Service description',
    },
    // ... existing services
  ]
}
```

## 📞 Support

For any issues or questions:
- **Developer**: איתי אוסטרייך
- **Email**: itayost1@gmail.com
- **Phone**: 054-499-4417
- **WhatsApp**: [Click to chat](https://wa.me/972544994417)