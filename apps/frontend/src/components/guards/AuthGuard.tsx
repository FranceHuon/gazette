import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (auth && !auth.loading && !auth.user) {
      router.push('/login')
    }
  }, [auth, router])

  if (!auth || auth.loading || !auth.user) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
