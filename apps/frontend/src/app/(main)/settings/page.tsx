'use client'

import { Flex } from '@chakra-ui/react'
import SettingsMenu from '@/components/custom/SettingsMenu'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'

function SettingsPageContent() {
  return (
    <ResponsiveLayout>
      <Flex
        gap={{ base: '24px', md: '32px', lg: '40px' }}
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="60vh"
      >
        <SettingsMenu />
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
