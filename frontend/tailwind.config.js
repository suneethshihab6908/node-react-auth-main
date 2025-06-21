/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define a "forest" green palette
        forest: {
          50:  '#f2faf1',
          100: '#d9f0da',
          200: '#b6e0b3',
          300: '#8dd088',
          400: '#5bb75c',
          500: '#329e33',
          600: '#267e28',
          700: '#1c601f',
          800: '#114116',
          900: '#0a2b0f',
        },
      },
    },
  },
  plugins: [],
};
