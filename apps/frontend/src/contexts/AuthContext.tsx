'use client'

import { UserDto } from '@gazette/shared'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { deleteUserAccount, getUserProfile, loginUser, logoutUser } from '@/services/api/user'

interface AuthContextType {
  user: UserDto | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

async function loadUserProfile(setUser: (user: UserDto | null) => void): Promise<boolean> {
  try {
    const res = await getUserProfile()
    setUser({
      id: res.user.id,
      email: res.user.email,
      pseudo: res.user.pseudo,
    })
    return true
  }
  catch (error) {
    // User not authenticated or network error
    console.warn('User not authenticated:', error)
    setUser(null)
    return false
  }
}

interface AuthProviderProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [loading, setLoading] = useState(true) // Start with true since we'll check auth on mount
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  const checkAuth = useCallback(async () => {
    if (hasCheckedAuth)
      return // Avoid multiple simultaneous checks

    setLoading(true)
    const authenticated = await loadUserProfile(setUser)
    setIsAuthenticated(authenticated)
    setHasCheckedAuth(true)
    setLoading(false)
  }, [hasCheckedAuth])

  // Check auth on mount, but exclude auth pages and landing page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const isAuthPage = pathname === '/login' || pathname === '/signup'
      const isLandingPage = pathname === '/'

      // Only auto-check if not on auth pages or landing page
      if (!isAuthPage && !isLandingPage && !hasCheckedAuth) {
        checkAuth()
      }
      else if (isAuthPage || isLandingPage) {
        // Don't auto-check, but stop loading state
        setLoading(false)
      }
    }
  }, [checkAuth, hasCheckedAuth])

  const login = useCallback(async (email: string, password: string) => {
    await loginUser(email, password)
    // Reset hasCheckedAuth to allow fresh check after login
    setHasCheckedAuth(false)
    await checkAuth()
  }, [checkAuth])

  const logout = useCallback(async () => {
    await logoutUser()
    setUser(null)
    setIsAuthenticated(false)
    setHasCheckedAuth(false) // Reset check state on logout
  }, [])

  const deleteAccount = useCallback(async () => {
    await deleteUserAccount()
    setUser(null)
    setIsAuthenticated(false)
    setHasCheckedAuth(false) // Reset check state on account deletion
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    deleteAccount,
    checkAuth,
  }), [user, loading, isAuthenticated, login, logout, deleteAccount, checkAuth])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
