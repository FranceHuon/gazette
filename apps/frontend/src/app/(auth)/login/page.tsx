'use client'

import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormLogin from '@/components/custom/FormLogin'
import Title from '@/components/layout/Title'

export default function LoginPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  return (
    <VStack
      spacing={{ base: '24px', md: '32px', lg: '40px' }}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      padding={{ base: '16px', md: '24px', lg: '32px' }}
    >
      <Title text={t('login')} fontColor="color.chaletGreen" />
      <FormLogin />
    </VStack>
  )
}
