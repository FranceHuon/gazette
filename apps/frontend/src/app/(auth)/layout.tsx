'use client'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import GazetteIllu from '@/components/custom/GazetteIllu'
import MobileHeader from '@/components/layout/MobileHeader'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const pathname = usePathname()
  const { t } = useTranslation('common', { keyPrefix: 'auth' })

  // Fonction pour obtenir le nom de la page courante
  const getCurrentPageName = () => {
    switch (pathname) {
      case '/login':
        return t('login')
      case '/signup':
        return t('signup')
      default:
        return 'Gazette'
    }
  }

  return (
    <Flex
      height={{ base: 'auto', md: '100vh' }}
      minHeight="100vh"
      width="100vw"
      direction="column"
    >
      {/* Mobile Header - uniquement sur mobile */}
      {isMobile && (
        <MobileHeader currentPage={getCurrentPageName()} showNotifications={false} />
      )}

      {/* Contenu principal */}
      <Flex
        alignItems={{ base: 'stretch', md: 'stretch' }}
        flex="1"
        direction={{ base: 'column', md: 'row' }}
        height="100%"
      >
        {/* Desktop uniquement : illustration */}
        {!isMobile && <GazetteIllu />}

        {/* Contenu du formulaire */}
        <Flex
          direction="column"
          alignItems="center"
          width={{ base: '100%', md: '50%' }}
          px={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
          flexGrow={1}
          gap={{ base: 4, md: 8 }}
          justifyContent={{ base: 'flex-start', md: 'center' }}
          overflow="auto"
          height="100%"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
