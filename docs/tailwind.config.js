/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-primary': 'var(--color-background-primary)',
        'background-secondary': 'var(--color-background-secondary)',
        'background-secondary-solid': 'var(--color-background-secondary-solid)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-text': 'var(--color-accent-text)',
        'border': 'var(--color-border)',
        'info': 'var(--color-info)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'danger': 'var(--color-danger)',
      },
    },
  },
  plugins: [],
};
