import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const breakpoints = {
  'sm': '30em',
  'md': '48em',
  'lg': '62em',
  'xl': '80em',
  '2xl': '96em',
}

const colors = {
  chaletGreen: '#606c38',
  white: '#ffffff',
  mineShaft: '#1F1F1F',
  black: '#000000',
  lightGray: '#F5F5F5',
}

const fonts = {
  heading: `'Staatliches', sans-serif`,
  body: `'Poppins', sans-serif`,
}

const textStyles = {
  body: {
    fontFamily: '\'Poppins\', sans-serif',
  },
  heading: {
    fontFamily: '\'Staatliches\', sans-serif',
  },
}

export const theme = extendTheme({
  config,
  breakpoints,
  colors,
  fonts,
  textStyles,
})
