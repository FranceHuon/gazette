'use client'

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChangePasswordSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useToaster } from '@/components/ui/toaster'
import { Field } from '../ui/field'
import { PasswordInput } from '../ui/password-input'
import Button from './Button'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const { t } = useTranslation('common')
  const toaster = useToaster()
  const [isLoading, setIsLoading] = useState(false)

  interface ChangePasswordForm {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ChangePasswordForm) => {
    setIsLoading(true)
    try {
      // TODO: Implémenter l'appel API pour changer le mot de passe
      // eslint-disable-next-line no-console
      console.log('Changing password:', data)

      // Simulation de l'appel API
      await new Promise(resolve => setTimeout(resolve, 1000))

      toaster.create({
        description: t('auth.passwordChanged'),
        type: 'success',
        duration: 5000,
      })

      reset()
      onClose()
    }
    catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error)
      toaster.create({
        description: t('auth.passwordChangeError'),
        type: 'error',
        duration: 5000,
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: 'full', md: 'lg' }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        borderRadius={{ base: 0, md: '20px' }}
        margin={{ base: 0, md: '1.75rem' }}
        maxH={{ base: '100vh', md: '90vh' }}
      >
        <ModalHeader
          fontSize={{ base: '20px', md: '24px' }}
          fontWeight="bold"
          paddingBottom="12px"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          {t('auth.changePassword')}
        </ModalHeader>

        <ModalCloseButton
          size="lg"
          top="16px"
          right="16px"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody padding={{ base: '16px', md: '24px' }}>
            <VStack spacing="24px" align="stretch">
              <Box
                borderRadius="md"
                borderLeft="4px"
                borderLeftColor="chaletGreen"
                bg="green.50"
                padding="16px"
              >
                <Text fontSize="sm" fontWeight="semibold" color="darkGreen" mb="8px">
                  {t('auth.passwordRequirements.title')}
                </Text>
                <Text fontSize="sm" color="chaletGreen">
                  {t('auth.passwordRequirements.description')}
                </Text>
              </Box>

              <Field
                label={t('auth.currentPassword')}
                isInvalid={!!errors.currentPassword}
                errorText={errors.currentPassword?.message}
                isRequired
              >
                <PasswordInput
                  placeholder="Entrez votre mot de passe actuel"
                  autoComplete="current-password"
                  _focus={{
                    borderColor: 'chaletGreen',
                    boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
                  }}
                  _hover={{
                    borderColor: 'gray.300',
                  }}
                  {...register('currentPassword')}
                />
              </Field>

              <Field
                label={t('auth.newPassword')}
                isInvalid={!!errors.newPassword}
                errorText={errors.newPassword?.message}
                isRequired
              >
                <VStack spacing="8px" align="stretch">
                  <PasswordInput
                    placeholder="Entrez votre nouveau mot de passe"
                    autoComplete="new-password"
                    _focus={{
                      borderColor: 'chaletGreen',
                      boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
                    }}
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                    {...register('newPassword')}
                  />

                </VStack>
              </Field>

              <Field
                label={t('auth.confirmNewPassword')}
                isInvalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
                isRequired
              >
                <PasswordInput
                  placeholder="Confirmez votre nouveau mot de passe"
                  autoComplete="new-password"
                  _focus={{
                    borderColor: 'chaletGreen',
                    boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
                  }}
                  _hover={{
                    borderColor: 'gray.300',
                  }}
                  {...register('confirmPassword')}
                />
              </Field>
            </VStack>
          </ModalBody>

          <ModalFooter
            borderTop="1px solid"
            borderColor="gray.100"
            padding={{ base: '16px', md: '24px' }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap="12px"
              width="100%"
              justify={{ base: 'stretch', md: 'flex-end' }}
            >
              <Button
                text={t('common.cancel')}
                variant="outline"
                bgColor="transparent"
                color="gray.600"
                borderColor="gray.300"
                onClick={handleClose}
                width={{ base: '100%', md: 'auto' }}
                isDisabled={isLoading}
              />
              <Button
                type="submit"
                text={isLoading ? t('common.modifying') : t('common.save')}
                width={{ base: '100%', md: 'auto' }}
                isLoading={isLoading}
              />
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PasswordModal
