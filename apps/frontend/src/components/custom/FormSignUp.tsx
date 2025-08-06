'use client'

import { Flex, Input, List, ListItem, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { SignUpFormSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import { createUser } from '@/services/api/user'
import { Field } from '../ui/field'
import Button from './Button'

const SignUpSchema = SignUpFormSchema

function FormSignUp() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const toast = useToast()
  const { login } = useAuth()

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
  }

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="-webkit-fit-content" paddingTop={6}>
          <VStack gap="2" justifyContent="flex-start" alignItems="flex-start">
            <Field
              label={t('pseudo')}
              isInvalid={!!errors.pseudo}
              errorText={errors.pseudo?.message}
            >
              <Input
                variant="flushed"
                rounded="md"
                shadow="none"
                border="1px solid"
                borderColor="lightGray"
                padding="0.8rem"
                height="auto"
                {...register('pseudo', { required: t('requiredField') })}
              />
            </Field>
            <Field
              label={t('mail')}
              isInvalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                variant="flushed"
                rounded="md"
                shadow="none"
                border="1px solid"
                borderColor="lightGray"
                padding="0.8rem"
                height="auto"
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
                shadow="none"
                border="1px solid"
                borderColor="lightGray"
                padding="0.8rem"
                height="auto"
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
                shadow="none"
                border="1px solid"
                borderColor="lightGray"
                padding="0.8rem"
                height="auto"
                variant="flushed"
                {...register('confirmPassword', {
                  required: t('requiredField'),
                })}
              />
            </Field>

            <Text fontSize="0.7rem">
              Votre mot de passe doit inclure :
              <List>
                <ListItem listStyleType="disc" ml="1rem">au moins 8 caractères</ListItem>
                <ListItem listStyleType="disc" ml="1rem">une majuscule</ListItem>
                <ListItem listStyleType="disc" ml="1rem">une minuscule</ListItem>
                <ListItem listStyleType="disc" ml="1rem">un chiffre</ListItem>
                <ListItem listStyleType="disc" ml="1rem">un caractère spécial (- [ ] ( ) * ~ _ # : ?)</ListItem>
              </List>
            </Text>

            <Button
              type="submit"
              textStyle="button"
              text={t('signIn')}
              py="1.5rem"
              mt="1rem"
              width="100%"
              rounded="md"
            />
            <Text width="100%" align="center">
              {`${t('alreadyCreated')} `}
              <Link href="/">
                <b>{t('login')}</b>
              </Link>
            </Text>
          </VStack>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormSignUp
