/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1D3557',
        red: '#E63946',
        sea: '#457B9D',
        sky: '#A8DADC',
        cloud: '#F1FAEE'
      },
      backgroundImage: {
        hero: "url('/src/img/blob/electric.svg')"
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#E63946',

          secondary: '#1D3557',

          accent: '#457B9D',

          neutral: '#A8DAD',

          'base-100': '#F1FAEE',

          info: '#5c91db',

          success: '#1f8e51',

          warning: '#a48904',

          error: '#ea485b'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}
