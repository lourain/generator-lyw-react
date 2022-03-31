import React, { useContext, useEffect, useState } from 'react'
import { reqLogin, reqLogout } from '../api/login.js'

export const localStorageKey = '__auth_provider_user__'

const bootstrapUser = async () => {
  const user = localStorage.getItem(localStorageKey)
  return user ? JSON.parse(user) : null
}

const AuthContext = React.createContext(undefined)

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    bootstrapUser().then((res) => setUser(res))
  }, [])

  const signIn = async (data) => {
    const res = await reqLogin(data)
    setUser(res.data)
    localStorage.setItem(localStorageKey, JSON.stringify(res.data))
    return res
  }
  const signOut = async (data) => {
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
