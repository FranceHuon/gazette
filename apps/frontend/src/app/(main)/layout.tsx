'use client'

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Header from '@/components/layout/Header'
import MobileHeader from '@/components/layout/MobileHeader'
import Navbar from '@/components/layout/Navbar'

interface MainLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const pathname = usePathname()
  const { t } = useTranslation('common', { keyPrefix: 'navigation' })

  // Fonction pour obtenir le nom de la page courante
  const getCurrentPageName = () => {
    switch (pathname) {
      case '/articles':
        return t('articles')
      case '/medias':
        return t('medias')
      case '/settings':
        return t('settings')
      default:
        return 'Gazette'
    }
  }

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
            <MobileHeader currentPage={getCurrentPageName()} />
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
