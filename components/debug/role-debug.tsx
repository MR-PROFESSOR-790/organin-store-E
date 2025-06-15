"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RoleDebug() {
  const { user, isLoading } = useAuth()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className="mb-4 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-sm text-yellow-800">Debug Info (Development Only)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-yellow-700">
          <p>
            <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
          </p>
          <p>
            <strong>User:</strong> {user ? user.email : "Not logged in"}
          </p>
          <p>
            <strong>Role:</strong> {user ? user.role : "N/A"}
          </p>
          <p>
            <strong>Expected Dashboard:</strong>{" "}
            {user ? (user.role === "admin" ? "/admin/dashboard" : "/user/dashboard") : "Login required"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
