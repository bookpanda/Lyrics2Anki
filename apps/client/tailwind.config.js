/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/design/src/**/*.{js,ts,jsx,tsx,css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        "primary.light": "var(--primary-light)",
        "primary.main": "var(--primary-main)",
        "primary.dark": "var(--primary-dark)",
        "secondary.light": "var(--secondary-light)",
        "secondary.main": "var(--secondary-main)",
        "secondary.dark": "var(--secondary-dark)",
      },
    },
  },
  plugins: [],
};
