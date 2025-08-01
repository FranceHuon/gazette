'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { initI18n } from '@/i18n/config'

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const instance = await initI18n()
        setI18nInstance(instance)
      }
      catch (error) {
        console.error('Failed to initialize i18n:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  if (isLoading || !i18nInstance) {
    return <div>Loading...</div>
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
