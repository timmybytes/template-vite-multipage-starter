const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // REMINDER: Figma file shows all sizes and measurements at 2x
        // Size variables names here are same as in design
        h1_headline: ['32.5px', { lineHeight: '45px', fontWeight: '700' }],
        h2_subhead: ['21px', { lineHeight: '25px', fontWeight: '700' }],
        h3_subhead: ['19px', { lineHeight: '24px', fontWeight: '600' }],
        body_copy: ['17.5px', { lineHeight: '22.5px', fontWeight: '400' }],
        disclaimer_copy: ['10px', { lineHeight: '13px', fontWeight: '500' }],
        base: ['17.5px', { lineHeight: '22.5px', fontWeight: '400' }],
      },
      colors: {
        'brand-dark-gray': '#221F20',
        'brand-gray': '#898989',
        'brand-light-gray': '#F3F3F3',
        'brand-lilac': '#B2B2FF',
        'brand-lilac-overlay': '#B2B2FFe6',
        // Note: this is a workaround to correctly match the opacity-created color in the design
        'brand-lilac-gray': '#F0EDF8',
        'brand-line-gray': '#9D9D9D',
        'brand-orange': '#FA7821',
        'brand-pink': '#E2066F',
        'brand-gray': '#4C4C4C',
        'brand-purple-gray': '#D0C8E4',
        'brand-purple': '#4F08B0',
        'brand-purple-overlay': '#4F08B0e6',
        'brand-yellow': '#FABD26',
      },
      backgroundImage: ({ theme }) => ({
        'gradient-brand-purple-light': `linear-gradient(90deg, ${theme(
          'colors.brand-lilac',
        )} 0%, ${theme('colors.brand-purple')} 100%)`,
        'gradient-brand-purple-light-to-bottom': `linear-gradient(167deg, ${theme('colors.brand-lilac')} -5.69%, ${theme('colors.brand-purple')} 36.75%)`,
        'gradient-brand-purple-overlay': `linear-gradient(167deg, ${theme('colors.brand-lilac-overlay')} -5.69%, ${theme('colors.brand-purple-overlay')} 36.75%)`,
        'gradient-brand-purple-dark': `linear-gradient(90deg, ${theme(
          'colors.brand-purple',
        )} 0.68%, #21034A 100%)`,
        'gradient-brand-orange': `linear-gradient(90deg, ${theme(
          'colors.brand-yellow',
        )} 0%, ${theme('colors.brand-orange')} 100%)`,
        'gradient-brand-multi': `linear-gradient(90deg, ${theme(
          'colors.brand-orange',
        )} 0%, ${theme('colors.brand-purple')} 100%)`,
        'gradient-brand-multi-reverse': `linear-gradient(90deg, ${theme(
          'colors.brand-purple',
        )} 0%, ${theme('colors.brand-orange')} 100%)`,
        'gradient-brand-white':
          'linear-gradient(90deg, rgba(250, 120, 33, 0.1) 0%, rgba(79, 8, 176, 0.1) 100%)',
      }),
      borderRadius: {
        base: '25px',
      },
    },
  },
  // Placeholder defaults
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        body: {
          color: '#000000',
        },
      });
    },
  ],
};
