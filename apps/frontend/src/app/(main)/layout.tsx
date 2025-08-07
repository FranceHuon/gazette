'use client'

import { Box } from '@chakra-ui/react'
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
      case '/library':
        return 'Bibliothèque'
      case '/onboarding':
        return 'Bienvenue'
      default:
        return 'Gazette'
    }
  }

  return (
    <Box
      minHeight="100vh"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Header pageTitle={getPageTitle()} />

      {/* Contenu principal */}
      <Box
        flex="1"
        flexGrow={1}
        display="flex"
        flexDirection="column"
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
        <Navbar isScrolled={false} />
      </Box>
    </Box>
  )
}
