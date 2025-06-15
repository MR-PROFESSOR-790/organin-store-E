"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, login, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")

  // If user is already logged in, redirect them
  useEffect(() => {
    if (!authLoading && user) {
      console.log("User already logged in, redirecting...")
      handleRedirectAfterLogin(user, redirectTo)
    }
  }, [user, authLoading, redirectTo])

  const handleRedirectAfterLogin = (user: any, redirectPath: string | null) => {
    console.log("Handling redirect after login:", { user, redirectPath })

    // Determine where to redirect the user
    let targetPath: string

    if (redirectPath) {
      // If there's a specific redirect, use it
      targetPath = redirectPath
    } else {
      // Role-based redirect
      targetPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
    }

    console.log(`Redirecting ${user.role} to: ${targetPath}`)

    // Use setTimeout to ensure the router has time to process
    setTimeout(() => {
      router.push(targetPath)
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting login with:", email)
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })

        // Get user from localStorage to determine role
        const userData = localStorage.getItem("user")
        if (userData) {
          const user = JSON.parse(userData)
          handleRedirectAfterLogin(user, redirectTo)
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // For testing - auto-fill credentials
  const fillAdminCredentials = () => {
    setEmail("admin@example.com")
    setPassword("password")
  }

  const fillUserCredentials = () => {
    setEmail("user@example.com")
    setPassword("password")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {/* Quick login buttons for testing */}
      <div className="flex justify-between pt-4 text-xs text-gray-500">
        <button type="button" onClick={fillAdminCredentials} className="underline">
          Fill Admin
        </button>
        <button type="button" onClick={fillUserCredentials} className="underline">
          Fill User
        </button>
      </div>
    </form>
  )
}
