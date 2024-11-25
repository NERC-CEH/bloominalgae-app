// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flumensTailwind = require('@flumens/tailwind/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@flumens/ionic/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/@flumens/tailwind/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...flumensTailwind.theme?.extend,

      colors: {
        primary: {
          // https://www.tailwindshades.com/#color=158.3076923076923%2C87.83783783783784%2C29.01960784313725&step-up=12&step-down=8&hue-shift=0&name=salem&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#098B5C',
          50: '#E7FDF5',
          100: '#CAFCEA',
          200: '#91F8D3',
          300: '#57F4BB',
          400: '#1EF0A4',
          500: '#0DC482',
          600: '#098B5C',
          700: '#076543',
          800: '#043E29',
          900: '#021810',
          950: '#000503',
        },

        secondary: {
          // https://www.tailwindshades.com/#color=76.21621621621621%2C59.20000000000001%2C50.98039215686274&step-up=8&step-down=14&hue-shift=0&name=atlantis&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#A4CC38',
          50: '#F6FAEB',
          100: '#EEF6DA',
          200: '#DFEDBA',
          300: '#D1E599',
          400: '#C2DD79',
          500: '#B3D458',
          600: '#A4CC38',
          700: '#789626',
          800: '#4B5D18',
          900: '#1D2409',
          950: '#060802',
        },

        tertiary: {
          // https://www.tailwindshades.com/#color=203.89830508474577%2C100%2C46.27450980392157&step-up=9&step-down=12&hue-shift=0&name=azure-radiance&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#008EEC',
          50: '#E9F6FF',
          100: '#D3EDFF',
          200: '#A5DBFF',
          300: '#77C9FF',
          400: '#49B6FF',
          500: '#1BA4FF',
          600: '#008EEC',
          700: '#0069AF',
          800: '#004472',
          900: '#002034',
          950: '#000D16',
        },

        success: {
          // https://www.tailwindshades.com/#color=128.25396825396825%2C100%2C32&step-up=8&step-down=11&hue-shift=0&name=fun-green&base-stop=7&v=1&overrides=e30%3D
          DEFAULT: '#00A316',
          50: '#ADFFB9',
          100: '#99FFA7',
          200: '#70FF84',
          300: '#47FF61',
          400: '#1FFF3D',
          500: '#00F522',
          600: '#00CC1C',
          700: '#00A316',
          800: '#006B0F',
          900: '#003307',
          950: '#001703',
        },

        warning: {
          // https://www.tailwindshades.com/#color=39.01345291479821%2C100%2C43.72549019607843&step-up=10&step-down=12&hue-shift=0&name=tangerine&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#DF9100',
          50: '#FFF7E9',
          100: '#FFF0D5',
          200: '#FFE2AC',
          300: '#FFD483',
          400: '#FFC55A',
          500: '#FFB732',
          600: '#FFA909',
          700: '#DF9100',
          800: '#8D5C00',
          900: '#3C2700',
          950: '#130C00',
        },

        danger: {
          // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=8&step-down=11&hue-shift=0&name=flamingo&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#F04141',
          50: '#FDEBEB',
          100: '#FCD8D8',
          200: '#F9B2B2',
          300: '#F68D8D',
          400: '#F36767',
          500: '#F04141',
          600: '#E71212',
          700: '#B30E0E',
          800: '#7F0A0A',
          900: '#4B0606',
          950: '#310404',
        },
      },
    },
  },
  plugins: flumensTailwind.plugins,
};
