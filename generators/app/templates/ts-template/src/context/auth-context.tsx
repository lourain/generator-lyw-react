import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { responseType } from '../api/http'
import { reqLogin, reqLogout } from '../api/login'

export const localStorageKey = '__auth_provider_user__'

const bootstrapUser = async () => {
  const user = localStorage.getItem(localStorageKey)
  return user ? JSON.parse(user) : null
}

interface User {
  user: responseType | null
  signIn: (data: object, cb?: VoidFunction) => Promise<responseType | any>
  signOut: (data: { token: string }) => Promise<responseType | unknown>
}

const AuthContext = React.createContext<User | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<responseType | null>(null)

  useEffect(() => {
    bootstrapUser().then((res) => setUser(res))
  }, [])

  const signIn = async (data: object) => {
    const res = await reqLogin(data)
    setUser(res.data)
    localStorage.setItem(localStorageKey, JSON.stringify(res.data))
    return res
  }
  const signOut = async (data: { token: string }) => {
    const res = await reqLogout(data)
    setUser(null)
    localStorage.clear()
    return res
  }
  const value = { user, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
