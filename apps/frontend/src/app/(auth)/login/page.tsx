'use client'

import { useTranslation } from 'react-i18next'
import FormLogin from '@/components/custom/FormLogin'
import Title from '@/components/layout/Title'

export default function LoginPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Title text={t('auth.login')} fontColor="chaletGreen" as="h1" />
      <FormLogin />
    </>
  )
}
