import { Box, Flex } from '@chakra-ui/react'

import GazetteIllu from '@/components/custom/GazetteIllu'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Flex className="auth-layout" height="100%">
      <GazetteIllu />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        {children}
      </Box>
    </Flex>
  )
}
