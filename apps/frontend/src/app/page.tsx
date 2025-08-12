'use client'

import { Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <Flex height="100vh" width="100vw" bgColor="chaletGreen">
      <Flex direction="column" alignItems="flex-start" justifyContent="center" gap="16px" width="40%" padding="24px">

        <Heading
          size={{ base: 'lg', md: 'xl' }}
          fontSize={{ base: '40px', md: '74px' }}
          lineHeight="1.2"
          color="white"
          textAlign="left"
          fontFamily="Staatliches"
        >
          {t('common.appTitle')}
        </Heading>

        <Text fontSize="20px" lineHeight="1.8" color="white">Gazette est un agrégateur de flux RSS moderne qui centralise vos sources d'actualités préférées. L'application vous permet de vous abonner à des médias, de consulter leurs articles dans une interface épurée, et de créer votre propre bibliothèque de contenus favoris. Simple et entièrement gratuit.</Text>
        <Link href="/signup" fontSize="20px" lineHeight="1.8" color="white" fontWeight="bold">{t('auth.signup')}</Link>
        <Link href="/login" fontSize="20px" lineHeight="1.8" color="white" fontWeight="bold">{t('auth.login')}</Link>
      </Flex>
      <Flex width="60%" justifyContent="center" alignItems="center">
        <Image
          src="/explore.png"
          alt="explore"
          maxWidth={{ base: '200px', md: '600px' }}
          height="auto"
          objectFit="contain"
        />
      </Flex>

    </Flex>
  )
}
