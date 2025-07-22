import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { api } from '../../config'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'

interface WelcomeModalProps {
  isOpen?: boolean
  onClose?: () => void
}

const MEDIA_TYPES = [
  { id: 'video', name: 'Vidéos', type: 'video' },
  { id: 'podcast', name: 'Podcasts', type: 'podcast' },
  { id: 'article', name: 'Presse', type: 'article' },
]

export function WelcomeModal({ isOpen: externalIsOpen, onClose: externalOnClose }: WelcomeModalProps = {}) {
  const { isOpen: internalIsOpen, onOpen, onClose: internalOnClose } = useDisclosure()
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const onClose = externalOnClose || internalOnClose
  const toast = useToast()
  const { user } = useAuth()

  const handleMediaSelection = async (mediaType: { id: string, name: string, type: string }) => {
    if (!user?.id) {
      toast({
        title: 'Erreur',
        description: 'Utilisateur non identifié',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      await api.post(`users/${user.id}/preferred-media`, {
        json: { mediaType: mediaType.type },
      }).json()

      toast({
        title: 'Succès',
        description: `${mediaType.name} défini comme votre média préféré !`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
    }
    catch (error) {
      console.error('Erreur lors de la mise à jour de la préférence:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour votre préférence',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      {externalIsOpen === undefined && (
        <Button
          onClick={onOpen}
          fontColor="color.white"
          backgroundColor="color.chaletGreen"
          text="Open Modal"
          width="200px"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="color.chaletGreen"
          width="800px"
          height="800px"
          borderRadius="xl"
          maxWidth="800px"
          maxHeight="800px"
          padding="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="20px"
          paddingTop="100px"
        >
          <Heading color="color.white" fontSize="3.5rem" textAlign="center" letterSpacing="0.05em">
            Choisissez votre média préféré
          </Heading>
          <ModalCloseButton />
          <ModalBody>
            <Flex margin="50px" gap="20px" flexWrap="wrap" justifyContent="center">
              {MEDIA_TYPES.map(mediaType => (
                <Button
                  key={mediaType.id}
                  onClick={() => handleMediaSelection(mediaType)}
                  padding="40px"
                  fontColor="color.white"
                  fontFamily="Staatliches"
                  fontSize="2.5rem"
                  backgroundColor="color.chaletGreen"
                  text={mediaType.name}
                  letterSpacing="0.05em"
                  _hover={{
                    backgroundColor: 'color.white',
                    color: 'color.chaletGreen',
                  }}
                />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
