'use client'

import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import SettingsMenu from '@/components/custom/SettingsMenu'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'

function SettingsPageContent() {
  return (
    <ResponsiveLayout backgroundColor="lightGray">
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        gap={{ base: '24px', md: '32px' }}
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="60vh"
      >
        <SettingsMenu />
      </Flex>

      <Box display={{ base: 'none', lg: 'block' }}>
        <Container maxW="4xl" py={16}>
          <VStack spacing={12} align="center">

            <VStack spacing={3} textAlign="center">
              <Title
                text="Gérez mon compte"
                fontColor="chaletGreen"
                fontSize="4rem"
                as="h1"
              />
            </VStack>

            <Box width="100%" maxW="500px">
              <SettingsMenu />
            </Box>

          </VStack>
        </Container>
      </Box>
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
