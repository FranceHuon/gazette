'use client'

import { Box, Flex, Input, List, ListItem, Stack, Text, useToast } from '@chakra-ui/react'
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
    resolver: zodResolver(SignUpFormSchema),
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
        title: t('common.success'),
        description: t('auth.confirmCreation'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.push('/articles')
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
    <Flex direction="column" width="100%">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={{ base: 4, md: 6 }} width="100%">
          <Field
            label={t('auth.pseudo')}
            isInvalid={!!errors.pseudo}
            errorText={errors.pseudo?.message}
          >
            <Input
              rounded="xl"
              border="2px solid"
              borderColor="gray.200"
              padding={{ base: '16px', md: '18px' }}
              height={{ base: '50px', md: '56px' }}
              fontSize={{ base: 'md', md: 'lg' }}
              placeholder="Gazette"
              _focus={{
                borderColor: 'chaletGreen',
                boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
              }}
              _hover={{
                borderColor: 'gray.300',
              }}
              bg="white"
              {...register('pseudo', { required: t('forms.requiredField') })}
            />
          </Field>

          <Field
            label={t('auth.email')}
            isInvalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              rounded="xl"
              border="2px solid"
              borderColor="gray.200"
              padding={{ base: '16px', md: '18px' }}
              height={{ base: '50px', md: '56px' }}
              fontSize={{ base: 'md', md: 'lg' }}
              placeholder={t('auth.placeholderEmail')}
              type="email"
              autoComplete="email"
              _focus={{
                borderColor: 'chaletGreen',
                boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
              }}
              _hover={{
                borderColor: 'gray.300',
              }}
              bg="white"
              {...register('email', { required: t('forms.requiredField') })}
            />
          </Field>

          <Field
            label={t('auth.password')}
            isInvalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              rounded="xl"
              border="2px solid"
              borderColor="gray.200"
              padding={{ base: '16px', md: '18px' }}
              height={{ base: '50px', md: '56px' }}
              fontSize={{ base: 'md', md: 'lg' }}
              placeholder="***********"
              autoComplete="new-password"
              _focus={{
                borderColor: 'chaletGreen',
                boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
              }}
              _hover={{
                borderColor: 'gray.300',
              }}
              bg="white"
              {...register('password', { required: t('forms.requiredField') })}
            />
          </Field>

          <Field
            label={t('auth.confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
          >
            <PasswordInput
              rounded="xl"
              border="2px solid"
              borderColor="gray.200"
              padding={{ base: '16px', md: '18px' }}
              height={{ base: '50px', md: '56px' }}
              fontSize={{ base: 'md', md: 'lg' }}
              placeholder="***********"
              autoComplete="new-password"
              _focus={{
                borderColor: 'chaletGreen',
                boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
              }}
              _hover={{
                borderColor: 'gray.300',
              }}
              bg="white"
              {...register('confirmPassword', {
                required: t('forms.requiredField'),
              })}
            />
          </Field>

          <Box
            bg="green.50"
            p={4}
            rounded="xl"
            border="1px solid"
            borderColor="green.100"
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              mb={3}
              fontWeight="semibold"
              color="darkGreen"
            >
              {t('forms.passwordRequirements')}
            </Text>
            <List spacing={1}>
              <ListItem fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                •
                {' '}
                {t('forms.passwordRequirementsList.minLength')}
              </ListItem>
              <ListItem fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                •
                {' '}
                {t('forms.passwordRequirementsList.uppercase')}
              </ListItem>
              <ListItem fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                •
                {' '}
                {t('forms.passwordRequirementsList.lowercase')}
              </ListItem>
              <ListItem fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                •
                {' '}
                {t('forms.passwordRequirementsList.number')}
              </ListItem>
              <ListItem fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                •
                {' '}
                {t('forms.passwordRequirementsList.specialChar')}
              </ListItem>
            </List>
          </Box>

          <Button
            type="submit"
            width="100%"
            height={{ base: '50px', md: '56px' }}
            rounded="xl"
            text={t('auth.signup')}
            bgColor="chaletGreen"
            color="white"
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="semibold"
            _hover={{
              bgColor: 'darkGreen',
              transform: 'translateY(-1px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s ease"
            mt="2"
          />

          <Text
            width="100%"
            align="center"
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.600"
          >
            {`${t('auth.alreadyHaveAccount')} `}
            <Link
              href="/login"
              style={{
                fontWeight: 'bold',
                color: 'var(--chakra-colors-chaletGreen)',
                textDecoration: 'none',
              }}
            >
              {t('auth.login')}
            </Link>
          </Text>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormSignUp
