'use client'

import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function AuthGuard({ children }: AuthGuardProps) {
  const authContext = use(AuthContext)
  const router = useRouter()

  if (!authContext) {
    throw new Error('AuthGuard must be used within an AuthProvider')
  }

  const { user, loading, isAuthenticated } = authContext

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated (not loading and not authenticated)
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  // Show loading state while checking authentication
  if (loading) {
    return <div>Chargement...</div>
  }

  // If not authenticated after loading, redirect should happen
  if (!isAuthenticated || !user) {
    return null // Don't render anything while redirecting
  }

  return <>{children}</>
}
