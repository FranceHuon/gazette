'use client'

import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, checkAuth } = use(AuthContext) ?? {}
  const router = useRouter()

  useEffect(() => {
    // Check auth when the guard mounts, but only if not already loading or authenticated
    if (checkAuth && !user && !loading) {
      checkAuth()
    }
  }, [checkAuth, user, loading])

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated (not loading and no user)
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Show loading state
  if (loading) {
    return <div>Chargement...</div>
  }

  // If no user after loading, the redirect should have happened
  if (!user) {
    return null // Don't render anything while redirecting
  }

  return <>{children}</>
}
