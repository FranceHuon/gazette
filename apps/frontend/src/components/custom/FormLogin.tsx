'use client'

import type { LoginUserDto } from '@gazette/shared'
import { Flex, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { LogUserSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { Field } from '../ui/field'
import { PasswordInput } from '../ui/password-input'
import Button from './Button'

function FormLogin() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const { login } = useAuth()

  type FormValuesLog = Omit<LoginUserDto, 'role'>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLog>({
    resolver: zodResolver(LogUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormValuesLog) => {
    try {
      await login(data.email, data.password)
      router.push('/articles')
    }
    catch (error) {
      console.error(error)
      toast({
        title: t('auth.loginError'),
        description: t('auth.loginErrorMessage'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" width="100%">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%' }}
        role="form"
        aria-label={t('auth.loginForm')}
        noValidate
      >
        <Stack spacing={6} width="100%">
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
              aria-describedby={errors.email ? 'email-error' : undefined}
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
              autoComplete="current-password"
              _focus={{
                borderColor: 'chaletGreen',
                boxShadow: '0 0 0 1px var(--chakra-colors-chaletGreen)',
              }}
              _hover={{
                borderColor: 'gray.300',
              }}
              bg="white"
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password', { required: t('forms.requiredField') })}
            />
          </Field>

          <Button
            type="submit"
            width="100%"
            height={{ base: '50px', md: '56px' }}
            rounded="xl"
            text={t('auth.login')}
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

          <Text align="center" fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
            {`${t('auth.noAccountYet')} `}
            <Link
              href="/signup"
              style={{
                fontWeight: 'bold',
                color: 'var(--chakra-colors-chaletGreen)',
                textDecoration: 'none',
              }}
              aria-label={`${t('auth.noAccountYet')} ${t('auth.create')}`}
            >
              {t('auth.create')}
            </Link>
          </Text>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormLogin
