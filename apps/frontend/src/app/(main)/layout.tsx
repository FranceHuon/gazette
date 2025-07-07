'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (pathname) {
      case '/explore':
        return 'Explorer'
      case '/settings':
        return 'Paramètres'
      default:
        return 'Gazette'
    }
  }

  return (
    <>
      <Header pageTitle={getPageTitle()} />
      {children}
    </>
  )
}
