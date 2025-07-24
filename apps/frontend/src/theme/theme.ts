import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { textStyles } from './textStyles'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  textStyles,
  breakpoints: {
    'sm': '30em', // 480px
    'md': '48em', // 768px
    'lg': '62em', // 992px
    'xl': '80em', // 1280px
    '2xl': '96em', // 1536px
  },
  fonts: {
    heading: `'Staatliches', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    color: {
      chaletGreen: '#606c38', // A muted green color
      white: '#ffffff', // Pure white
      mineShaft: '#1F1F1F', // Dark gray, almost black
      black: '#000000', // Pure black
      lightGray: '#F5F5F5', // Light gray
    },
  },
})
