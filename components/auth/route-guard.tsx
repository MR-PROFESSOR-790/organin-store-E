"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles?: ("user" | "admin")[]
  redirectTo?: string
}

export function RouteGuard({ children, allowedRoles = ["user", "admin"], redirectTo }: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthorization = () => {
      if (isLoading) {
        return // Still loading, wait
      }

      console.log("RouteGuard: Checking authorization", { user, allowedRoles })

      // User not authenticated
      if (!user) {
        console.log("RouteGuard: No user found, redirecting to login")
        // Get current path for redirect after login
        const currentPath = window.location.pathname
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
        return
      }

      // User authenticated but wrong role
      if (!allowedRoles.includes(user.role)) {
        console.log(`RouteGuard: User role ${user.role} not in allowed roles:`, allowedRoles)

        // Determine correct redirect based on user role
        let correctDashboard: string
        if (user.role === "admin") {
          correctDashboard = "/admin/dashboard"
        } else {
          correctDashboard = "/user/dashboard"
        }

        // Use custom redirect if provided, otherwise use role-based redirect
        const redirectPath = redirectTo || correctDashboard
        console.log(`RouteGuard: Redirecting to: ${redirectPath}`)
        router.push(redirectPath)
        return
      }

      // User is authorized
      console.log(`RouteGuard: User ${user.email} with role ${user.role} is authorized for roles:`, allowedRoles)
      setIsAuthorized(true)
      setIsChecking(false)
    }

    checkAuthorization()
  }, [user, isLoading, allowedRoles, redirectTo, router])

  // Show loading spinner while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          <p className="text-xs text-gray-400 mt-2">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show access denied if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500">Redirecting you to the correct dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
