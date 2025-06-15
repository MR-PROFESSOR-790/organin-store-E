"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AuthDebugger() {
  const { user, isLoading, logout } = useAuth()
  const [localStorageUser, setLocalStorageUser] = useState<string | null>(null)
  const [localStorageToken, setLocalStorageToken] = useState<string | null>(null)
  const [cookies, setCookies] = useState<string>("")

  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      setLocalStorageUser(localStorage.getItem("user"))
      setLocalStorageToken(localStorage.getItem("token"))
      setCookies(document.cookie)
    }
  }, [user])

  const refreshData = () => {
    setLocalStorageUser(localStorage.getItem("user"))
    setLocalStorageToken(localStorage.getItem("token"))
    setCookies(document.cookie)
  }

  const clearStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    refreshData()
  }

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className="mb-4 border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-sm text-red-800 flex justify-between items-center">
          <span>Auth Debugger (Development Only)</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={refreshData} className="h-6 text-xs">
              Refresh
            </Button>
            <Button size="sm" variant="destructive" onClick={clearStorage} className="h-6 text-xs">
              Clear Storage
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-red-700 space-y-2">
          <div>
            <strong>Auth Context:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-20">
              {JSON.stringify({ user, isLoading }, null, 2)}
            </pre>
          </div>

          <div>
            <strong>LocalStorage User:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-20">{localStorageUser || "null"}</pre>
          </div>

          <div>
            <strong>LocalStorage Token:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-20">
              {localStorageToken ? "exists" : "null"}
            </pre>
          </div>

          <div>
            <strong>Cookies:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto max-h-20">{cookies || "none"}</pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
