import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-purple': '#4F08B0',
        'brand-lilac': '#B2B2FF',
        'brand-orange': '#FA7821',
        'brand-yellow': '#FABD26',
        'brand-gray': '#898989',
        'brand-light-gray': '#F3F3F3',
        'brand-pink': '#E2066F',
        'brand-line-gray': '#9D9D9D',
      },
      backgroundImage: (theme) => ({
        'gradient-brand-purple-light': `linear-gradient(90deg, ${theme(
          'colors.brand-lilac',
        )} 0%, ${theme('colors.brand-purple')} 100%)`,
        'gradient-brand-purple-dark': `linear-gradient(90deg, ${theme(
          'colors.brand-purple',
        )} 0.68%, #21034A 100%)`,
        'gradient-brand-orange': `linear-gradient(90deg, ${theme(
          'colors.brand-yellow',
        )} 0%, ${theme('colors.brand-orange')} 100%)`,
        'gradient-brand-multi': `linear-gradient(90deg, ${theme(
          'colors.brand-orange',
        )} 0%, ${theme('colors.brand-purple')} 100%)`,
        'gradient-brand-white': `linear-gradient(90deg, rgba(250, 120, 33, 0.1) 0%, rgba(79, 8, 176, 0.1) 100%)`,
      }),
      borderRadius: {
        base: '25px',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        html: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          fontSmooth: 'never',
          textRendering: 'optimizeLegibility',
        },
        // Placeholder styles
        h1: {
          ...tw`text-7xl text-purple-400`,
        },
        a: {
          ...tw`text-purple-400 hover:text-purple-700 transition-colors duration-200`,
        },
      });
    },
  ],
};
