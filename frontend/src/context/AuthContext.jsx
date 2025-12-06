// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react'
import api, { setLogoutHandler } from '../services/api'
import { saveToken, getToken, clearToken, saveUser, getUser, clearUser } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async (email, password) => {},
  register: async (name, email, password) => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUser())
  const [token, setToken] = useState(() => getToken())
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const logout = useCallback(() => {
    clearToken()
    clearUser()
    setToken(null)
    setUser(null)
    // optional redirect
    try {
      navigate('/login')
    } catch (e) {
      // swallow if navigation not available
    }
  }, [navigate])

  // register logout handler for api to call on 401
  useEffect(() => {
    setLogoutHandler(() => logout)
  }, [logout])

  // On mount, if token exists we may attempt to verify or just set state
  useEffect(() => {
    const t = getToken()
    const u = getUser()
    if (t) {
      setToken(t)
      setUser(u)
    }
    setLoading(false)
  }, [])

  // login uses backend API
  const login = async (email, password) => {
    const payload = { email, password }
    const resp = await api.post('/api/auth/login', payload)
    // expecting { token, user } from backend per global spec
    const { token: newToken, user: newUser } = resp.data
    if (!newToken) {
      throw new Error('No token returned from login')
    }
    saveToken(newToken)
    if (newUser) saveUser(newUser)
    setToken(newToken)
    setUser(newUser || null)
    return { token: newToken, user: newUser }
  }

  const register = async (name, email, password) => {
    const payload = { name, email, password }
    const resp = await api.post('/api/auth/register', payload)
    // some backends return token + user, some return user only.
    const { token: newToken, user: newUser } = resp.data
    if (newToken) {
      saveToken(newToken)
      if (newUser) saveUser(newUser)
      setToken(newToken)
      setUser(newUser || null)
      return { token: newToken, user: newUser }
    }
    // if backend only returned user, keep user and expect login separately
    if (newUser) {
      saveUser(newUser)
      setUser(newUser)
      return { user: newUser }
    }
    return resp.data
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
