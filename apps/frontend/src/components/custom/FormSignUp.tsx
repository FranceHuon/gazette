'use client'

import { Box, Flex, Input, List, ListItem, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { SignUpFormSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import { createUser } from '@/services/api/user'
import { Field } from '../ui/field'
import Button from './Button'

const SignUpSchema = SignUpFormSchema

function FormSignUp() {
  const { t } = useTranslation()
  const router = useRouter()
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
      const { shouldRedirectToOnboarding } = await createUser({
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
      })

      await login(data.email, data.password)

      toast({
        title: t('common.success'),
        description: t('auth.confirmCreation'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      if (shouldRedirectToOnboarding) {
        router.push('/onboarding')
      }
      else {
        router.push('/')
      }
    }
    catch (error) {
      console.error(error)
      toast({
        title: t('auth.signupError'),
        description: t('auth.signupErrorMessage'),
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
              label={t('auth.pseudo')}
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
                {...register('pseudo', { required: t('forms.requiredField') })}
              />
            </Field>
            <Field
              label={t('auth.email')}
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
                {...register('email', { required: t('forms.requiredField') })}
              />
            </Field>

            <Field
              label={t('auth.password')}
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
                {...register('password', { required: t('forms.requiredField') })}
              />
            </Field>

            <Field
              label={t('auth.confirmPassword')}
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
                  required: t('forms.requiredField'),
                })}
              />
            </Field>

            <Box fontSize="0.7rem">
              <Text fontSize="0.7rem" mb="0.5rem">
                {t('forms.passwordRequirements')}
              </Text>
              <List>
                <ListItem listStyleType="disc" ml="1rem">{t('forms.passwordRequirementsList.minLength')}</ListItem>
                <ListItem listStyleType="disc" ml="1rem">{t('forms.passwordRequirementsList.uppercase')}</ListItem>
                <ListItem listStyleType="disc" ml="1rem">{t('forms.passwordRequirementsList.lowercase')}</ListItem>
                <ListItem listStyleType="disc" ml="1rem">{t('forms.passwordRequirementsList.number')}</ListItem>
                <ListItem listStyleType="disc" ml="1rem">{t('forms.passwordRequirementsList.specialChar')}</ListItem>
              </List>
            </Box>

            <Button
              type="submit"
              textStyle="button"
              text={t('auth.signup')}
              py="1.5rem"
              mt="1rem"
              width="100%"
              rounded="md"
            />
            <Text width="100%" align="center">
              {`${t('auth.alreadyHaveAccount')} `}
              <Link href="/">
                <b>{t('auth.login')}</b>
              </Link>
            </Text>
          </VStack>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormSignUp
