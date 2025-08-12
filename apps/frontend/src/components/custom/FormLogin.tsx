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
      router.push('/explore')
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
    <Flex direction="column" alignItems="center" justifyContent="center" width={{ base: '100%', md: '60%' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%' }}
        role="form"
        aria-label={t('auth.loginForm')}
        noValidate
      >
        <Stack maxWidth="-webkit-fit-content" paddingTop={6} gap="1.5rem" width="100%">
          <Field
            label={t('auth.email')}
            isInvalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              rounded="md"
              shadow="none"
              border="1px solid"
              borderColor="lightGray"
              padding="0.8rem"
              height="auto"
              variant="flushed"
              placeholder={t('auth.placeholderEmail')}
              type="email"
              autoComplete="email"
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
              minW="md"
              rounded="md"
              shadow="md"
              variant="flushed"
              placeholder="***********"
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password', { required: t('forms.requiredField') })}
            />
          </Field>

          <Button
            type="submit"
            width="100%"
            rounded="md"
            text={t('auth.login')}
            py="1.5rem"
            mt="1rem"
          />
          <Text align="center">
            {`${t('auth.noAccountYet')} `}
            <Link
              href="/signup"
              style={{
                fontWeight: 'bold',
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
