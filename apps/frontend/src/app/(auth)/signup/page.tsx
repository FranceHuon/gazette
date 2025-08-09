'use client'

import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'
import Title from '@/components/layout/Title'

export default function SignupPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'auth',
  })

  return (
    <>
      <Title
        text={t('signIn')}
        fontColor="chaletGreen"
        fontSize={{ base: '2rem', md: '5rem' }}
      />
      <FormSignUp />
    </>
  )
}
