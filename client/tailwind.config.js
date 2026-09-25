/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'], // map serif to modern display to instantly modernize any font-serif
      },
      colors: {
        paper: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        surface: {
          light: '#F8FAFC',
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          elevated: '#FFFFFF',
          cream: '#F8FAFC',
          muted: '#F1F5F9',
          dark: '#0F172A',
          'dark-card': '#1E293B',
          'dark-elevated': '#334155',
          'dark-border': '#334155',
          'dark-muted': '#1E293B',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          dark: '#F8FAFC',
          'dark-muted': '#94A3B8',
        },
        terracotta: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          soft: '#FFEDD5',
          night: '#FB923C',
          'night-soft': '#7C2D12',
        },
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
          hover: '#CBD5E1',
          'dark-hover': '#475569',
        },
        sand: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
        'fade-up': 'fadeUp 0.35s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.97)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'lift': '0 12px 28px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 8px 24px -4px rgba(249, 115, 22, 0.35)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 14px 30px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
