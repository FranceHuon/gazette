'use client'

import { Box, Container, Flex, VStack } from '@chakra-ui/react'
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
        backgroundPosition={{ base: 'center', md: 'center' }}
        backgroundRepeat="no-repeat"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: {
            base: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
            md: 'rgba(255, 255, 255, 0.4)',
          },
          zIndex: 1,
        }}
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 16 }}
      >

        <Container maxW="6xl" position="relative" zIndex={2}>
          <VStack spacing={{ base: 8, md: 12, lg: 16 }} align="center" textAlign="center">

            {/* Logo/Titre principal */}
            <Link href="/">
              <Title
                text={t('common.appTitle')}
                fontColor="darkGreen"
                fontSize={{ base: '3rem', sm: '4rem', md: '8rem', lg: '12rem', xl: '14rem' }}
                lineHeight="0.9"
                as="h1"
                textAlign="center"
                _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s ease' }}
              />
            </Link>

            {/* Sous-titre */}
            <Title
              text="Croiser l'actu n'a jamais été aussi simple"
              fontColor="darkGreen"
              fontSize={{ base: '1.2rem', sm: '1.5rem', md: '2.5rem', lg: '4rem', xl: '5rem' }}
              lineHeight={{ base: '1.3', md: '1.2' }}
              as="h2"
              textAlign="center"
              maxW={{ base: '90%', md: '80%', lg: '100%' }}
              fontWeight="medium"
            />

            {/* Boutons d'action */}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 4, md: 6, lg: 8 }}
              justify="center"
              align="center"
              w="100%"
              mt={{ base: 4, md: 8 }}
            >

              <Link href="/signup">
                <Button
                  width={{ base: '280px', sm: '300px', md: '350px', lg: '400px' }}
                  height={{ base: '60px', md: '80px', lg: '100px' }}
                  text={t('auth.signup')}
                  bgColor="chaletGreen"
                  color="white"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    bgColor: 'darkGreen',
                  }}
                  cursor="pointer"
                  rounded={{ base: 'xl', md: '2xl' }}
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
                  fontWeight="semibold"
                  transition="all 0.3s ease"
                  shadow="lg"
                />
              </Link>

              <Link href="/login">
                <Button
                  width={{ base: '280px', sm: '300px', md: '350px', lg: '400px' }}
                  height={{ base: '60px', md: '80px', lg: '100px' }}
                  text={t('auth.login')}
                  bgColor="white"
                  color="chaletGreen"
                  border="2px solid"
                  borderColor="chaletGreen"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    bgColor: 'chaletGreen',
                    color: 'white',
                  }}
                  cursor="pointer"
                  rounded={{ base: 'xl', md: '2xl' }}
                  fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
                  fontWeight="semibold"
                  transition="all 0.3s ease"
                  shadow="lg"
                />
              </Link>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
