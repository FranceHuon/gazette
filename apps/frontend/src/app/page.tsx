'use client'

import { Flex, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" width="100vw" bgColor="chaletGreen">
      <Heading
        size={{ base: 'lg', md: 'xl' }}
        fontSize={{ base: 'lg', md: 'xl' }}
        lineHeight="1.2"
        color="white"
        textAlign="center"
        fontFamily="Staatliches"
      >
        {t('common.appDescription')}
      </Heading>
    </Flex>
  )
}
