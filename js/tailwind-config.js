// Tailwind config — colors reference the CSS variables in css/colors.css
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: 'rgb(var(--brand-navy) / <alpha-value>)',
          blue: 'rgb(var(--brand-blue) / <alpha-value>)',
          cyan: 'rgb(var(--brand-cyan) / <alpha-value>)',
          emerald: 'rgb(var(--brand-emerald) / <alpha-value>)',
          darkBg: 'rgb(var(--brand-dark-bg) / <alpha-value>)',
          darkSurface: 'rgb(var(--brand-dark-surface) / <alpha-value>)',
          lightBg: 'rgb(var(--brand-light-bg) / <alpha-value>)',
          lightSurface: 'rgb(var(--brand-light-surface) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
        heading: ['Poppins', 'Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 12px rgba(47,128,237,0.7))' },
          '50%': { opacity: .6, filter: 'drop-shadow(0 0 4px rgba(47,128,237,0.3))' }
        }
      }
    }
  }
};
