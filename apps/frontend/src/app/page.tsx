import { Flex, Heading } from '@chakra-ui/react'

export default function LandingPage() {
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
        Bienvenue sur Gazette, cette application vous permet de vous abonner à des médias et de consulter des articles
      </Heading>
    </Flex>
  )
}
