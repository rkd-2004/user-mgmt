"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loginUser } from "./api"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password)
    const { token } = response

    localStorage.setItem("auth_token", token)
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setToken(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

