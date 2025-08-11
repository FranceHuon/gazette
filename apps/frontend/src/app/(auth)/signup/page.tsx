'use client'

import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'
import Title from '@/components/layout/Title'

export default function SignupPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Title
        text={t('auth.signup')}
        fontColor="chaletGreen"
      />
      <FormSignUp />
    </>
  )
}
