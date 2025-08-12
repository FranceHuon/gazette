'use client'

import { Box, Container, Flex, Grid, GridItem, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { FiBookmark, FiRss, FiSearch, FiSmartphone } from 'react-icons/fi'
import Button from '@/components/custom/Button'
import Title from '@/components/layout/Title'

export default function LandingPage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: FiRss,
      title: t('landing.features.rssAggregation.title'),
      description: t('landing.features.rssAggregation.description'),
    },
    {
      icon: FiBookmark,
      title: t('landing.features.personalLibrary.title'),
      description: t('landing.features.personalLibrary.description'),
    },
    {
      icon: FiSearch,
      title: t('landing.features.cleanInterface.title'),
      description: t('landing.features.cleanInterface.description'),
    },
    {
      icon: FiSmartphone,
      title: t('landing.features.responsive.title'),
      description: t('landing.features.responsive.description'),
    },
  ]

  return (
    <Box>
      <Box bg="chaletGreen" minH="100vh" position="relative" overflow="hidden">
        <Container maxW="7xl" h="100vh">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} h="full" alignItems="center" gap={8}>
            <GridItem>
              <VStack align="flex-start" spacing={8} py={8}>
                <Title
                  text={t('common.appTitle')}
                  fontColor="white"
                  fontSize={{ base: '4rem', md: '6rem', lg: '8rem' }}
                  lineHeight="0.9"
                />

                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  lineHeight="1.8"
                  color="white"
                  fontFamily="Poppins"
                  maxW="500px"
                >
                  {t('landing.hero.description')}
                </Text>

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="rgba(255,255,255,0.8)"
                  fontWeight="medium"
                >
                  {t('landing.hero.subtitle')}
                </Text>

                <HStack spacing={4} pt={4}>
                  <Link href="/signup">
                    <Button
                      text={t('auth.signup')}
                      bgColor="white"
                      color="chaletGreen"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Link>
                  <Link href="/login">
                    <Button
                      text={t('auth.login')}
                      bgColor="transparent"
                      color="white"
                      border="2px solid white"
                      _hover={{
                        bgColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      }}
                    />
                  </Link>
                </HStack>
              </VStack>
            </GridItem>

            <GridItem display={{ base: 'none', lg: 'flex' }} justifyContent="center" alignItems="center">
              <Box position="relative">
                <Image
                  src="/explore.png"
                  alt="Interface Gazette"
                  maxWidth="600px"
                  height="auto"
                  objectFit="contain"
                  borderRadius="20px"
                  boxShadow="0 20px 40px rgba(0,0,0,0.1)"
                />
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Box bg="white" py={{ base: 16, md: 20, lg: 24 }}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack textAlign="center" spacing={4}>
              <Heading
                fontFamily="Staatliches"
                fontSize={{ base: '3rem', md: '4rem' }}
                color="chaletGreen"
                lineHeight="1.1"
              >
                {t('landing.features.title')}
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="mineShaft"
                maxW="600px"
                lineHeight="1.6"
              >
                {t('landing.features.subtitle')}
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={8}
              w="full"
            >
              {features.map(feature => (
                <GridItem key={feature.title}>
                  <VStack
                    align="center"
                    spacing={4}
                    p={6}
                    borderRadius="20px"
                    bg="lightGray"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 30px rgba(96, 108, 56, 0.1)',
                    }}
                    height="full"
                  >
                    <Flex
                      width="60px"
                      height="60px"
                      borderRadius="full"
                      bg="chaletGreen"
                      align="center"
                      justify="center"
                    >
                      <Icon as={feature.icon} color="white" boxSize={6} />
                    </Flex>
                    <Heading
                      fontSize="xl"
                      fontFamily="Staatliches"
                      color="chaletGreen"
                      textAlign="center"
                    >
                      {feature.title}
                    </Heading>
                    <Text
                      fontSize="md"
                      color="mineShaft"
                      textAlign="center"
                      lineHeight="1.5"
                    >
                      {feature.description}
                    </Text>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      <Box bg="darkGreen" py={{ base: 16, md: 20 }}>
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center">
            <Heading
              fontFamily="Staatliches"
              fontSize={{ base: '3rem', md: '4rem' }}
              color="white"
              lineHeight="1.1"
            >
              {t('landing.cta.title')}
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="rgba(255,255,255,0.9)"
              maxW="500px"
              lineHeight="1.6"
            >
              {t('landing.cta.description')}
            </Text>
            <Link href="/signup">
              <Button
                width="100%"
                text={t('auth.signup')}
                bgColor="white"
                color="darkGreen"
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />
            </Link>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
