'use client'

import { Heading, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormLogin from '@/components/custom/FormLogin'

export default function LoginPage() {
  const { t } = useTranslation('common')

  return (
    <VStack
      spacing={{ base: 6, md: 8 }}
      align="center"
      width="100%"
      maxW={{ base: '100%', md: '400px' }}
    >
      <VStack spacing={2} textAlign="center" display={{ base: 'none', md: 'flex' }}>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="chaletGreen"
          fontWeight="bold"
        >
          {t('auth.login')}
        </Heading>
        <Text
          color="gray.600"
          fontSize={{ base: 'md', md: 'lg' }}
          textAlign="center"
        >
          Accédez à votre espace personnel
        </Text>
      </VStack>

      <FormLogin />
    </VStack>
  )
}
