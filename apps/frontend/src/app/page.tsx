'use client'

import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Button from '@/components/custom/Button'
import Title from '@/components/layout/Title'

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <Box minH="100vh">
      <Box
        height="100vh"
        minH="100vh"
        position="relative"
        overflow="hidden"
        backgroundImage="url('/woman-reading-newspaper-coffee-shop.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          zIndex: 1,
        }}
        pb={16}
      >

        <Link href="/">
          <Title
            text={t('common.appTitle')}
            fontColor="darkGreen"
            fontSize={{ base: '4rem', md: '12rem', lg: '14rem' }}
            lineHeight="0.9"
            position="relative"
            zIndex={2}
            as="h1"
            textAlign="center"
            m={16}
          />
        </Link>
        <Title
          text="Croiser l'actu n'a jamais été aussi simple"
          fontColor="darkGreen"
          fontSize={{ base: '4rem', md: '6rem', lg: '8rem' }}
          lineHeight="0.9"
          as="h1"
          position="relative"
          zIndex={2}
          textAlign="center"
        />
        <Flex gap={10} justifyContent="center" position="relative" zIndex={2} w="100%">

          <Link href="/signup">
            <Button
              width="300px"
              text={t('auth.signup')}
              bgColor="chaletGreen"
              color="white"
              _hover={{
                transform: 'translateY(-2px)',
              }}
              cursor="pointer"
              rounded="md"
              py="3.5rem"
              px="6rem"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              mt="1rem"
            />
          </Link>

          <Link href="/login">
            <Button
              width="300px"
              text={t('auth.login')}
              bgColor="chaletGreen"
              color="white"
              _hover={{
                transform: 'translateY(-2px)',
              }}
              cursor="pointer"
              rounded="md"
              py="3.5rem"
              px="6rem"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              mt="1rem"
            />
          </Link>

        </Flex>
      </Box>
    </Box>
  )
}
