"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // This function will check if the user is authenticated
  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      console.log("AuthProvider: Checking stored auth data")
      console.log("Stored user:", storedUser)
      console.log("Token exists:", !!token)

      if (storedUser && token) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        console.log("AuthProvider: User restored from storage:", userData)

        // Set token in cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
        return true
      }
      return false
    } catch (error) {
      console.error("Error checking auth:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("AuthProvider: Attempting login for:", email)

      // For demo purposes, create mock users
      // Replace this with actual API call to your backend
      let mockUser: User
      let mockToken: string

      if (email.includes("admin")) {
        mockUser = {
          id: "admin-1",
          email,
          name: "Admin User",
          role: "admin",
        }
        mockToken = "admin-token-" + Date.now()
      } else {
        mockUser = {
          id: "user-1",
          email,
          name: "Regular User",
          role: "user",
        }
        mockToken = "user-token-" + Date.now()
      }

      console.log("AuthProvider: Mock login successful:", mockUser)

      // Store user and token
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      localStorage.setItem("token", mockToken)

      // Set token in cookie for middleware
      document.cookie = `token=${mockToken}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days

      return true
    } catch (error) {
      console.error("AuthProvider: Login error:", error)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log("AuthProvider: Attempting signup for:", email)

      // For demo purposes, create mock user
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: "user", // Default role for new signups
      }

      const mockToken = `mock-jwt-token-${Date.now()}`

      console.log("AuthProvider: Mock signup successful:", mockUser)

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      localStorage.setItem("token", mockToken)

      // Set token in cookie for middleware
      document.cookie = `token=${mockToken}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days

      return true
    } catch (error) {
      console.error("AuthProvider: Signup error:", error)
      return false
    }
  }

  const logout = () => {
    console.log("AuthProvider: Logging out user")
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Remove token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Redirect to login page
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
