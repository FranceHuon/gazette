'use client'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import GazetteIllu from '@/components/custom/GazetteIllu'
import GazetteMobile from '@/components/custom/GazetteMobile'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex
      alignItems="center"
      height="100vh"
      width="100vw"
      direction={{ base: 'column', md: 'row' }}
    >
      {isMobile
        ? (
            <Flex width="100%" justifyContent="flex-start" alignItems="flex-start" padding={{ base: '16px', md: '20px' }}>
              <GazetteMobile />
            </Flex>
          )
        : (
            <GazetteIllu />
          )}

      <Flex
        direction="column"
        alignItems="center"
        width={{ base: '100%', md: '50%' }}
        px={{ base: 6, md: 0 }}
        flexGrow={1}
        gap={{ base: 6, md: 8 }}
        paddingTop={{ base: '16px', md: '20px' }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
