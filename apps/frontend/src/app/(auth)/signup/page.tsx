'use client'

import { Heading, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'

export default function SignupPage() {
  const { t } = useTranslation('common')

  return (
    <VStack
      spacing={{ base: 4, md: 8 }}
      align="center"
      width="100%"
      maxW={{ base: '100%', md: '450px' }}
      pb={{ base: 4, md: 0 }}
    >
      <VStack spacing={2} textAlign="center" display={{ base: 'none', md: 'flex' }}>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="chaletGreen"
          fontWeight="bold"
        >
          {t('auth.signup')}
        </Heading>
        <Text
          color="gray.600"
          fontSize={{ base: 'md', md: 'lg' }}
          textAlign="center"
        >
          Créez votre compte en quelques clics
        </Text>
      </VStack>

      <FormSignUp />
    </VStack>
  )
}
