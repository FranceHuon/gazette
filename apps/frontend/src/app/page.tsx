import { Box } from '@chakra-ui/react'
import WelcomeDisplay from '@/components/custom/WelcomeDisplay'

export default function HomePage() {
  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <WelcomeDisplay />
    </Box>
  )
}
