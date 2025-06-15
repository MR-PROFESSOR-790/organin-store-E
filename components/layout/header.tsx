"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Menu, X, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/auth/login"
    return user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
  }

  const getDashboardLabel = () => {
    if (!user) return "Login"
    return user.role === "admin" ? "Admin Dashboard" : "My Dashboard"
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Organic Store"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-green-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search organic products..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href={getDashboardLink()}>
                  <Button variant="ghost" size="icon" title={getDashboardLabel()}>
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Show role-specific links */}
                {user.role === "admin" && (
                  <Link href="/admin/dashboard" className="hidden md:inline-flex">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}

                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user.name} ({user.role})
                  </span>
                  <Button variant="ghost" onClick={logout} size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
              </div>
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-green-600 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>

              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" className="w-full justify-start">
                      {getDashboardLabel()}
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={logout} className="w-full justify-start">
                    Logout ({user.name})
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
