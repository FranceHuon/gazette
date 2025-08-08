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
  const [loading, setLoading] = useState(false) // Start with false, only load when needed
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = useCallback(async () => {
    setLoading(true)
    const authenticated = await loadUserProfile(setUser)
    setIsAuthenticated(authenticated)
    setLoading(false)
  }, [])

  // Only check auth on mount if we're not on the landing page
  useEffect(() => {
    // Don't auto-check on the landing page to avoid unnecessary API calls
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      checkAuth()
    }
  }, [checkAuth])

  const login = useCallback(async (email: string, password: string) => {
    await loginUser(email, password)
    await checkAuth()
  }, [checkAuth])

  const logout = useCallback(async () => {
    await logoutUser()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const deleteAccount = useCallback(async () => {
    await deleteUserAccount()
    setUser(null)
    setIsAuthenticated(false)
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
