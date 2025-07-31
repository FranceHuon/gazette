'use client'

import { UserDto } from '@gazette/shared'
import { createContext, useEffect, useMemo, useState } from 'react'
import { deleteUserAccount, getUserProfile, loginUser, logoutUser } from '@/services/api/user'

interface AuthContextType {
  user: UserDto
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    user: user!,
    loading,
    login,
    logout,
    deleteAccount,
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
