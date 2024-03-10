/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {
      colors: {
        "text": "#efe9eb",
        "background": "#070405",
        "primary": "#e19eb7",
        "secondary": "#951947",
        "accent": "#f63c81"
      },
      gradientColorStops: {
        'custom-gradient': {
          'start': '#e19eb7',
          'end': '#951947',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
}

