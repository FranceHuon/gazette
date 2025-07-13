import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { MediaDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSubscriptionsContext } from '@/hooks/useSubscriptions'
import { api } from '../../config'
import { AuthContext } from '../../contexts/AuthContext'
import { AuthGuard } from '../guards/AuthGuard'
import Button from './Button'
import MediaCard from './MediaCard'

interface WelcomeModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function WelcomeModal({ isOpen: externalIsOpen, onClose: externalOnClose }: WelcomeModalProps = {}) {
  const { isOpen: internalIsOpen, onOpen, onClose: internalOnClose } = useDisclosure()
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const onClose = externalOnClose || internalOnClose

  const { user } = useContext(AuthContext) || {}

  const { data: medias, isLoading: isLoadingMedias, isError } = useQuery<MediaDto[]>({
    queryKey: ['medias'],
    queryFn: async () => await api.get('medias').json(),
    enabled: !!user,
  })

  const { subscribe } = useSubscriptionsContext()

  const handleSubscribe = (mediaId: string) => {
    subscribe(mediaId)
  }

  return (
    <AuthGuard>
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
          <Flex gap="20px" flexWrap="wrap" justifyContent="center">
            {isLoadingMedias && <p style={{ color: 'white' }}>Chargement...</p>}
            {isError && <p style={{ color: 'red' }}>Erreur lors du chargement des médias.</p>}
            {medias?.map(media => (
              <MediaCard
                key={media.id}
                media={media}
                onSubscribe={handleSubscribe}
                width="450px"
                height="450px"
              />
            ))}
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <Flex margin="50px" gap="20px" flexWrap="wrap" justifyContent="center">
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AuthGuard>

  )
}
