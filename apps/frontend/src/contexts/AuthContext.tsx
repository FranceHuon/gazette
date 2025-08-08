'use client'

import { UserDto } from '@gazette/shared'
import { createContext, useEffect, useMemo, useState } from 'react'
import { deleteUserAccount, getUserProfile, loginUser, logoutUser } from '@/services/api/user'

interface AuthContextType {
  user: UserDto | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

async function loadUserProfile(setUser: (user: UserDto) => void) {
  try {
    const res = await getUserProfile()
    setUser({
      id: res.user.id,
      email: res.user.email,
      pseudo: res.user.pseudo,
    })
  }
  catch {
    throw new Error('Failed to load user profile')
  }
}

interface AuthProviderProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProfile(setUser).finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    await loginUser(email, password)
    await loadUserProfile(setUser)
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  const deleteAccount = async () => {
    await deleteUserAccount()
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    deleteAccount,
  }), [user, loading])

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  )
}

export { AuthContext }
