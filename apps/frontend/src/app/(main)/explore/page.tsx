'use client'

import { Text as ChakraText, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import MediaCard from '@/components/custom/MediaCard'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import Title from '@/components/layout/Title'
import { api } from '@/config'
import { useAuth } from '@/hooks/useAuth'

export default function ExplorePage() {
  const { t: tAccount } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { user, loading, logout } = useAuth()

  const { data: medias } = useQuery<MediaDto[]>({
    queryKey: ['medias'],
    queryFn: async () => await api.get('medias').json(),
    enabled: !!user,
  })

  const handleSubscribe = (mediaId: string) => {
    // Exemple : appel API ou mutation
    console.warn('Subscribed to', mediaId)
    // await api.post(`/subscriptions`, { mediaId })
  }

  if (loading) {
    return (
      <ResponsiveLayout>
        <Flex justify="center" align="center" height="100vh">
          <ChakraText>Chargement...</ChakraText>
        </Flex>
      </ResponsiveLayout>
    )
  }

  if (!user) {
    return (
      <ResponsiveLayout>
        <Flex justify="center" align="center" height="100vh">
          <ChakraText color="red.500">
            Utilisateur non connecté
          </ChakraText>
        </Flex>
      </ResponsiveLayout>
    )
  }

  return (
    <ResponsiveLayout>
      <VStack spacing={8} align="stretch">
        <Title text={`Bienvenue ${user.pseudo || user.email || 'Utilisateur'}`} fontColor="color.chaletGreen" />
        <Heading>Médias disponibles</Heading>

        <Flex gap="60px" flexWrap="wrap" justifyContent="center">
          {medias?.map(media => (
            <MediaCard key={media.id} media={media} onSubscribe={handleSubscribe} width="400px" height="400px" />
          ))}
        </Flex>

        <Heading>Articles disponibles</Heading>

        <Link
          href="/"
          fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
          fontSize={{ base: '1rem', lg: '2rem' }}
          onClick={logout}
          _hover={{ textDecoration: 'underline' }}
          textAlign="center"
        >
          {tAccount('logout')}
        </Link>
      </VStack>
    </ResponsiveLayout>
  )
}
