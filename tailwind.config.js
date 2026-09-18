/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Carbon Order Pad world (homepage + shell). See DESIGN.md.
        'pad': {
          carbon: '#2B3FD6',
          'carbon-deep': '#1B2A9E',
          'carbon-ink': '#C9D0FF',
          sheet: '#FBFBF8',
          pink: '#F4C6D2',
          yellow: '#F2DF6E',
          red: '#D7263D',
          ink: '#15161A',
          'ink-soft': '#4A4C57',
          rule: '#B9C6E8',
          ballpoint: '#1F2A8C',
          whatsapp: '#0F7A40',
          'whatsapp-deep': '#0B5E31',
          'board-line': '#3A3C46',
          'board-text': '#C9CBD6',
          'board-alert': '#FF8A98',
        },
        // New brand color system
        'brand': {
          navy: '#1e3a5f',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f97316',
          // Desaturated violet chosen to sit between brand-navy and brand-blue.
          // Referenced by 21 classes across blog/guides that previously emitted
          // no CSS because this key was missing.
          purple: '#7c68c4',
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
        // Mailchimp-style section backgrounds
        'section': {
          cream: '#FAF7F5',
          'light-blue': '#EFF6FF',
          'light-yellow': '#FFFBEB',
          'light-orange': '#FFF7ED',
          'light-green': '#F0FDF4',
        },
        // Legacy apple colors (mapped to new brand colors for compatibility)
        'apple-blue': '#3b82f6',
        'apple-blue-dark': '#2563eb',
        'apple-purple': '#a855f7',
        'apple-pink': '#ec4899',
        'apple-orange': '#f97316',
        'apple-cyan': '#06b6d4',
        'apple-green': '#10b981',
        'apple-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      boxShadow: {
        // hover:shadow-3xl was used in 10+ files without ever being defined,
        // so those hover states silently no-opped. Tinted with brand-navy
        // rather than pure black to match the colored shadows in globals.css.
        '3xl': '0 35px 60px -15px rgba(30, 58, 95, 0.28)',
      },
      fontFamily: {
        'pad-display': ['var(--font-pad-display)', '"Arial Narrow"', 'sans-serif'],
        'pad-body': ['var(--font-pad-body)', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        'pad-hand': ['var(--font-pad-hand)', 'cursive'],
        sans: [
          'var(--font-pad-body)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          '"Noto Sans Hebrew"',
          'sans-serif',
        ],
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
