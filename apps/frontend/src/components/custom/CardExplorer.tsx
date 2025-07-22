import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Button from './Button'

function CardExplorer() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    setIsSubscribed(prev => !prev) // inverse la valeur de isSubscribed.
  }

  return (
    <Card maxW="sm" overflow="hidden">
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <CardBody>
        <Heading textStyle="cardTitle" mb={2}>Titre</Heading>
        {/* Using of flex to align the description and the button */}
        <Flex align="center" justify="space-between">
          <Text textStyle="cardContent">Genre</Text>
          <Button
            fontColor={isSubscribed ? '#606c38' : '#ffffff'} // si abonné, 1ere couleur, sinon 2eme
            backgroundColor={isSubscribed ? '#ffffff' : '#606c38'} // si abonné, 1ere couleur, sinon 2eme
            text={isSubscribed ? 'Abonné.e' : 'S\'abonner'} // si abonné, 1er texte, sinon 2eme
            height="19px"
            width="67px"
            fontSize="11px"
            fontWeight="semibold"
            capitalizeText={true}
            onClick={handleSubscribe}
          />
        </Flex>
      </CardBody>
    </Card>
  )
}

export default CardExplorer
