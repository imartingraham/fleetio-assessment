/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/client/**/*.{js,jsx,ts,tsx,vue}',
    './app/views/devise/sessions/new.html.slim',
    './app/views/shared/alerts/_admin_navbar.html.slim'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
