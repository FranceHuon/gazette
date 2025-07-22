'use client'

import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SettingsMenu from '@/components/custom/SettingsMenu'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'

export default function SettingsPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  return (
    <ResponsiveLayout>
      <VStack
        spacing={{ base: '24px', md: '32px', lg: '40px' }}
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="60vh"
      >
        <Title text={t('account')} fontColor="color.chaletGreen" />
        <SettingsMenu />
      </VStack>
    </ResponsiveLayout>
  )
}
