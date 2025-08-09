'use client'

import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import AccessibilityStyles from '@/components/accessibility/AccessibilityStyles'
import KeyboardShortcuts from '@/components/accessibility/KeyboardShortcuts'
import SkipLink from '@/components/accessibility/SkipLink'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import useKeyboardDetection from '@/hooks/useKeyboardDetection'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'

interface MainLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const { containerRef } = useKeyboardNavigation({
    enableArrowKeys: true,
    enableEscapeKey: true,
  })

  // Activer la détection de navigation au clavier
  useKeyboardDetection()

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
    <>
      <AccessibilityStyles />
      <SkipLink href="#main-content">Aller au contenu principal</SkipLink>
      <SkipLink href="#navigation">Aller à la navigation</SkipLink>

      <Box
        ref={containerRef}
        minHeight="100vh"
        width="100%"
        position="relative"
        display="flex"
        flexDirection="column"
        role="application"
        aria-label="Application Gazette"
      >
        <Header pageTitle={getPageTitle()} />

        <Box
          id="main-content"
          as="main"
          flex="1"
          flexGrow={1}
          display="flex"
          flexDirection="column"
          pb={{ base: '80px', lg: '0' }}
          tabIndex={-1}
          role="main"
          aria-label={`Contenu principal: ${getPageTitle()}`}
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

        <KeyboardShortcuts />
      </Box>
    </>
  )
}
