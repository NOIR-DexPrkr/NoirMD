/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      noir: {
        'color-scheme': 'dark',
        'base-100': 'hsl(240.1 11.4% 3.9%)',
        'base-200': 'hsl(240 6% 10%)',
        'base-300': 'hsl(240.1 4.1% 15.5%)',
        'base-content': 'hsl(210 32% 95%)',
        'primary': 'hsl(190 100% 26.6%)',
        'primary-content': 'hsl(213.8 96.5% 96.8%)',
        'secondary': 'hsl(164.5 100% 20.6%)',
        'secondary-content': 'hsl(78.3 79.8% 94.4%)',
        'accent': 'hsl(33.3 6.3% 31.8%)',
        'accent-content': 'hsl(60 5.4% 97.2%)',
        'neutral': 'hsl(215.3 22.4% 34.1%)',
        'neutral-content': 'hsl(210 27.3% 97.5%)',
        'info': 'hsl(216.9 100% 59.2%)',
        'info-content': 'hsl(204 79% 96.1%)',
        'success': 'hsl(150.5 99% 43.9%)',
        'success-content': 'hsl(78.3 79.8% 94.4%)',
        'warning': 'hsl(40.5 100% 37.9%)',
        'warning-content': 'hsl(33.3 100% 96.5%)',
        'error': 'hsl(358.7 100% 69.3%)',
        'error-content': 'hsl(360 84.1% 97.2%)',
      },
    }],
  },
};