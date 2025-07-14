'use client'

import { Flex, Input, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { SignUpFormSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import { createUser } from '@/services/api/user'
import { Field } from '../ui/field'
import Button from './Button'
import { WelcomeModal } from './Modal'

// Schéma de validation pour l'inscription
const SignUpSchema = SignUpFormSchema

function FormSignUp() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const router = useRouter()
  const toast = useToast()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)

  interface FormValuesSignUp {
    pseudo: string
    email: string
    password: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesSignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: FormValuesSignUp) => {
    setIsLoading(true)
    try {
      await createUser({
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
      })

      await login(data.email, data.password)

      toast({
        title: t('success'),
        description: t('confirmCreation'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setIsWelcomeModalOpen(true)
    }
    catch (error) {
      console.error(error)
      toast({
        title: t('error'),
        description: t('errorCreation'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="-webkit-fit-content" paddingTop={6}>
          <Text color="fg.error" fontSize="sm" alignSelf="flex-end">
            * Champs obligatoires
          </Text>

          <VStack gap="4">
            <Field
              label={t('pseudo')}
              isInvalid={!!errors.pseudo}
              errorText={errors.pseudo?.message}
            >
              <Input
                rounded="md"
                shadow="md"
                variant="flushed"
                {...register('pseudo', { required: t('requiredField') })}
              />
            </Field>
            <Field
              label={t('mail')}
              isInvalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                rounded="md"
                shadow="md"
                variant="flushed"
                {...register('email', { required: t('requiredField') })}
              />
            </Field>

            <Field
              label={t('password')}
              isInvalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <PasswordInput
                minW="md"
                rounded="md"
                shadow="md"
                variant="flushed"
                {...register('password', { required: t('requiredField') })}
              />
            </Field>

            <Field
              label={t('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            >
              <PasswordInput
                minW="md"
                rounded="md"
                shadow="md"
                variant="flushed"
                {...register('confirmPassword', {
                  required: t('requiredField'),
                })}
              />
            </Field>

            <ul color="red.500">
              Votre mot de passe doit inclure :
              <li>au moins 8 caractères</li>
              <li>une majuscule</li>
              <li>une minuscule</li>
              <li>un chiffre</li>
              <li>un caractère spécial ( - [ ] ( ) * ~ _ # : ?)</li>
            </ul>

            <Button
              type="submit"
              width="22rem"
              fontSize="1.375rem"
              fontWeight="bold"
              fontColor="color.white"
              backgroundColor="color.chaletGreen"
              text={t('signIn')}
              disabled={isLoading}
            />
            <Text>
              {`${t('alreadyCreated')} `}
              <Link href="/login">
                <b>{t('login')}</b>
              </Link>
            </Text>
          </VStack>
        </Stack>
      </form>
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => {
          setIsWelcomeModalOpen(false)
          router.push('/explore')
        }}
      />
    </Flex>
  )
}

export default FormSignUp
