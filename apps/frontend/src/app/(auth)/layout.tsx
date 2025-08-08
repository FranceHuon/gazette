'use client'

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import GazetteIllu from '@/components/custom/GazetteIllu'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation('common')
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex
      alignItems="center"
      height="100vh"
      width="100vw"
      direction={{ base: 'column', md: 'row' }}
    >
      {/* Section gauche - Logo/Illustration */}
      {isMobile
        ? (
            <Box
              bgColor="chaletGreen"
              width="100%"
              height="40%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              textAlign="center"
              fontSize="6rem"
              fontFamily="Staatliches"
            >
              {t('common.appTitle')}
            </Box>
          )
        : (
            <GazetteIllu />
          )}

      {/* Section droite - Contenu des formulaires */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width={{ base: '100%', md: '50%' }}
        px={{ base: 6, md: 0 }}
        flexGrow={1}
        gap={{ base: 6, md: 8 }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
