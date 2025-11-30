/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'car-dark': '#0a0a0a',
        'car-accent': '#ff6b35',
      }
    },
  },
  plugins: [],
}
