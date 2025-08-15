'use client'

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import GazetteMobile from '@/components/custom/GazetteMobile'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'

interface MainLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (

    <Flex
      minHeight="100vh"
      width="100%"
      position="relative"
      direction="column"
      role="application"
      aria-label="Application Gazette"
    >
      {isMobile
        ? (
            <Flex width="100%" justifyContent="flex-start" alignItems="center" padding={{ base: '16px', md: '20px' }} gap="16px">
              <GazetteMobile />
            </Flex>
          )
        : (
            <Header />
          )}

      <Box
        id="main-content"
        as="main"
        flex="1"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        pb={{ base: '80px', lg: '0' }}

        role="main"
      >
        {children}
      </Box>

      <Box
        id="navigation"
        as="nav"
        display={{ base: 'block', lg: 'none' }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
        role="navigation"
        aria-label="Navigation principale mobile"
      >
        <Navbar isScrolled={false} />
      </Box>
    </Flex>

  )
}
