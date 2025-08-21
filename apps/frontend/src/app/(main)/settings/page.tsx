'use client'

import { Flex, Heading, VStack } from '@chakra-ui/react'
import SettingsMenu from '@/components/custom/SettingsMenu'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'

function SettingsPageContent() {
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
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="chaletGreen"
          mb={4}
          display={{ base: 'none', lg: 'block' }}
        >
          Paramètres
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
              text="Gérez votre compte"
              fontColor="chaletGreen"
              fontSize="3rem"
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
