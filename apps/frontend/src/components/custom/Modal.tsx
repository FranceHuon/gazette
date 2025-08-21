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
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useToaster } from '@/components/ui/toaster'
import { Field } from '../ui/field'
import { PasswordInput, PasswordStrengthMeter } from '../ui/password-input'
import Button from './Button'

// Schema de validation
function createChangePasswordSchema(t: (key: string) => string) {
  return z.object({
    currentPassword: z.string().min(1, t('forms.requiredField')),
    newPassword: z.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
      .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
      .regex(/\W/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: z.string().min(1, t('forms.requiredField')),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: t('auth.passwordMismatch'),
    path: ['confirmPassword'],
  })
}

type ChangePasswordForm = z.infer<ReturnType<typeof createChangePasswordSchema>>

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const { t } = useTranslation('common')
  const toaster = useToaster()
  const [isLoading, setIsLoading] = useState(false)

  const ChangePasswordSchema = createChangePasswordSchema(t)

  const {
    register,
    handleSubmit,
    watch,
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

  const newPassword = watch('newPassword')

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8)
      strength++
    if (/[A-Z]/.test(password))
      strength++
    if (/[a-z]/.test(password))
      strength++
    if (/\d/.test(password))
      strength++
    if (/\W/.test(password))
      strength++
    return Math.min(strength, 4)
  }

  const passwordStrength = calculatePasswordStrength(newPassword || '')

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
              {/* Informations sur les exigences */}
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

              {/* Mot de passe actuel */}
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

              {/* Nouveau mot de passe */}
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
                  {newPassword && (
                    <PasswordStrengthMeter
                      value={passwordStrength}
                      max={4}
                    />
                  )}
                </VStack>
              </Field>

              {/* Confirmation du nouveau mot de passe */}
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
                isDisabled={passwordStrength < 4}
              />
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PasswordModal
