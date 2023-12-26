/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'Nav': '#F3F3F3',
        'Primary': '#FF3535',
        'Secondary': '#0049C6',
        'Tertiary': '#FFA2C0',
        'Quaternary': '#FFCE73',
        'Dark': '#1B1D21',
        'Sucess': '#00C853',
        'Warning': '#FFD600',
        'Danger': '#DD2C00',
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
