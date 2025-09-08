/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired colors
        'apple-blue': '#0071E3',
        'apple-blue-dark': '#0077ED',
        'apple-purple': '#BF5AF2',
        'apple-pink': '#FF375F',
        'apple-orange': '#FF9500',
        'apple-cyan': '#5AC8FA',
        'apple-green': '#30D158',
        'apple-gray': {
          50: '#FBFBFD',
          100: '#F5F5F7',
          200: '#E8E8ED',
          300: '#D1D1D6',
          400: '#C7C7CC',
          500: '#86868B',
          600: '#6E6E73',
          700: '#424245',
          800: '#1D1D1F',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 20s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
