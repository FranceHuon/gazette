'use client'

import { Box, Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (pathname) {
      case '/explore':
        return 'Explorer'
      case '/settings':
        return 'Paramètres'
      case '/subscriptions':
        return 'Abonnements'
      default:
        return 'Gazette'
    }
  }

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      position="relative"
    >
      {/* Header - Desktop seulement */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <Header pageTitle={getPageTitle()} />
      </Box>

      {/* Contenu principal */}
      <Box
        flex="1"
        pb={{ base: '80px', lg: '0' }} // Espace pour navbar mobile
      >
        {children}
      </Box>

      {/* Navigation mobile - Bottom */}
      <Box
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
      >
        <Navbar />
      </Box>
    </Flex>
  )
}
