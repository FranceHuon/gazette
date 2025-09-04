'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SettingsMenu from '@/components/custom/SettingsMenu'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'

function SettingsPageContent() {
  const { t } = useTranslation()

  return (
    <ResponsiveLayout>
      <Flex
        flexDirection="column"
        flexGrow={1}
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        width="100%"
      >
        {/* Titre - masqué sur mobile, visible sur desktop */}
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          color="chaletGreen"
          fontWeight="bold"
          mb={4}
          display={{ base: 'none', lg: 'block' }}
        >
          {t('navigation.settings')}
        </Heading>

        {/* Contenu principal */}
        <Flex
          flexDirection="column"
          gap={{ base: '16px', md: '24px', lg: '32px' }}
          backgroundColor="lightGray"
          borderRadius={{ base: '20px', md: '30px', lg: '40px' }}
          padding={{ base: '24px', md: '32px', lg: '40px' }}
          marginBottom={{ base: '20px', md: '0' }}
        >
          {/* Titre pour desktop dans le conteneur */}
          <VStack spacing={3} textAlign="center" display={{ base: 'none', lg: 'flex' }}>
            <Title
              text={t('pages.manageAccount')}
              fontColor="chaletGreen"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              as="h2"
            />
          </VStack>

          {/* Menu des paramètres */}
          <SettingsMenu />
        </Flex>
      </Flex>
    </ResponsiveLayout>
  )
}

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsPageContent />
    </AuthGuard>
  )
}
