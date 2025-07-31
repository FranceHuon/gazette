import type { LoginUserDto } from '@gazette/shared'
import { Flex, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { LogUserSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { Field } from '../ui/field'
import { PasswordInput } from '../ui/password-input'
import Button from './Button'

function FormLogin() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      router.push('/explore')
    }
    catch (error) {
      console.error(error)
      toast({
        title: t('error'),
        description: t('errorCreation'), // a renommer,
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
        <Stack maxWidth="-webkit-fit-content" paddingTop={6} gap="1.5rem">
          <Field
            label={t('mail')}
            isInvalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              rounded="md"
              shadow="none"
              border="1px solid"
              borderColor="color.lightGray"
              padding="0.8rem"
              height="auto"
              variant="flushed"
              placeholder={t('mail')}
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
              placeholder="****************"
              {...register('password', { required: t('requiredField') })}
            />
          </Field>

          <Button
            type="submit"
            width="100%"
            rounded="md"
            textStyle="button"
            fontColor="color.white"
            backgroundColor="color.chaletGreen"
            text={t('login')}
            disabled={isLoading}
            py="1.5rem"
            mt="1rem"
          />
          <Text align="center">
            {`${t('noAccount')} `}
            <Link href="/signin">
              <b>{t('create')}</b>
            </Link>
          </Text>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormLogin
