import { defineConfig, presetUno, presetWebFonts } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  rules: [['w-half', { width: '50%' }]],

  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'var(--satoshi-font)',
      },
    }),
    presetIcons({
      collections: {
        carbon: require('@iconify-json/carbon/icons.json'),
      },
    }),
  ],
  theme: {
    colors: {
      primary: '#2d2fba',
    },
    breakpoints: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
})
