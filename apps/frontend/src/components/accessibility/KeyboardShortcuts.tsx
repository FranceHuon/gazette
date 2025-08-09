'use client'

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { Keyboard } from 'lucide-react'
import { useEffect } from 'react'

interface KeyboardShortcut {
  keys: string
  description: string
  context?: string
}

function KeyboardShortcuts() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const shortcuts: KeyboardShortcut[] = [
    {
      keys: 'Tab',
      description: 'Naviguer vers l\'élément suivant',
      context: 'Global',
    },
    {
      keys: 'Shift + Tab',
      description: 'Naviguer vers l\'élément précédent',
      context: 'Global',
    },
    {
      keys: 'Enter / Espace',
      description: 'Activer un bouton ou un lien',
      context: 'Éléments interactifs',
    },
    {
      keys: 'Flèche ↑/↓',
      description: 'Naviguer dans les listes d\'éléments',
      context: 'Listes et cartes',
    },
    {
      keys: 'Échap',
      description: 'Fermer les modales ou retourner au début',
      context: 'Global',
    },
    {
      keys: 'Alt + 1',
      description: 'Aller au contenu principal',
      context: 'Navigation',
    },
    {
      keys: 'Alt + 2',
      description: 'Aller à la navigation',
      context: 'Navigation',
    },
    {
      keys: '?',
      description: 'Afficher ce guide des raccourcis',
      context: 'Aide',
    },
  ]

  // Raccourci pour ouvrir/fermer le guide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ouvrir avec '?' ou 'h'
      if ((e.key === '?' || e.key === 'h') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Vérifier qu'on n'est pas dans un input
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && (
          activeElement.tagName === 'INPUT'
          || activeElement.tagName === 'TEXTAREA'
          || activeElement.contentEditable === 'true'
        )) {
          return
        }
        e.preventDefault()
        onOpen()
      }
      // Fermer avec Échap
      else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onOpen, onClose])

  return (
    <>
      <Button
        position="fixed"
        bottom="20px"
        right="20px"
        size="sm"
        leftIcon={<Keyboard size={16} />}
        onClick={onOpen}
        bg="chaletGreen"
        color="white"
        _hover={{ bg: 'darkGreen' }}
        zIndex={1000}
        aria-label="Guide des raccourcis clavier"
        title="Guide des raccourcis clavier (appuyez sur ? pour ouvrir)"
      >
        Raccourcis
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" color="chaletGreen">
              🎹 Guide des raccourcis clavier
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4} color="gray.600">
              Utilisez ces raccourcis pour naviguer plus efficacement dans l'application :
            </Text>

            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th color="chaletGreen">Raccourci</Th>
                    <Th color="chaletGreen">Description</Th>
                    <Th color="chaletGreen">Contexte</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {shortcuts.map(shortcut => (
                    <Tr key={shortcut.keys}>
                      <Td>
                        <Box
                          as="kbd"
                          bg="gray.100"
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="sm"
                          fontFamily="mono"
                          border="1px solid"
                          borderColor="gray.300"
                        >
                          {shortcut.keys}
                        </Box>
                      </Td>
                      <Td>{shortcut.description}</Td>
                      <Td>
                        <Text fontSize="sm" color="gray.500">
                          {shortcut.context}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Box mt={6} p={4} bg="gray.50" borderRadius="md">
              <Text fontSize="sm" color="gray.600">
                💡
                {' '}
                <strong>Conseil :</strong>
                {' '}
                Les éléments focusables sont mis en évidence
                avec un contour vert. Utilisez Tab pour naviguer et Entrée/Espace pour activer.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default KeyboardShortcuts
