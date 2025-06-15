"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, User, Settings, Heart, ShoppingBag, TrendingUp, Clock, MapPin } from "lucide-react"
import Link from "next/link"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 45.99,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 32.5,
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 78.25,
    items: 5,
  },
]

const quickActions = [
  {
    title: "View Orders",
    description: "Track your recent orders",
    icon: Package,
    href: "/user/orders",
    color: "bg-green-500",
  },
  {
    title: "My Profile",
    description: "Update your information",
    icon: User,
    href: "/user/profile",
    color: "bg-teal-500",
  },
  {
    title: "Wishlist",
    description: "View saved items",
    icon: Heart,
    href: "/user/wishlist",
    color: "bg-orange-500",
  },
  {
    title: "Settings",
    description: "Manage preferences",
    icon: Settings,
    href: "/user/settings",
    color: "bg-yellow-500",
  },
]

export function UserDashboard({ userName = "Mazhar Saeed" }) { // Placeholder for dynamic name
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-teal-100 text-teal-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 transition-all duration-300 hover:text-green-600">
          Welcome back, {userName}!
        </h1>
        <p className="text-lg text-gray-600">Here's what's happening with your account</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg shadow-md p-1">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 p-3 rounded-md transition-all duration-300 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-green-50 hover:text-green-600"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center space-x-2 p-3 rounded-md transition-all duration-300 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-green-50 hover:text-green-600"
          >
            <Package className="h-5 w-5" />
            <span>Recent Orders</span>
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="flex items-center space-x-2 p-3 rounded-md transition-all duration-300 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-green-50 hover:text-green-600"
          >
            <User className="h-5 w-5" />
            <span>Quick Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="flex items-center space-x-2 p-3 rounded-md transition-all duration-300 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-green-50 hover:text-green-600"
          >
            <Clock className="h-5 w-5" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-fade-in">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="animate-float hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">12</p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-green-600 mt-2">+2 this month</p>
              </CardContent>
            </Card>

            <Card className="animate-float hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-800">$456</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
                <p className="text-sm text-teal-600 mt-2">+$78 this month</p>
              </CardContent>
            </Card>

            <Card className="animate-float hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                    <p className="text-3xl font-bold text-gray-800">8</p>
                  </div>
                  <Heart className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-sm text-orange-500 mt-2">3 on sale</p>
              </CardContent>
            </Card>

            <Card className="animate-float hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rewards Points</p>
                    <p className="text-3xl font-bold text-gray-800">1,240</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-sm text-yellow-500 mt-2">$12.40 value</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} href={action.href}>
                    <div className="p-4 border border-teal-200 rounded-lg hover:shadow-md hover:bg-green-50 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${action.color}`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-gray-800">{action.title}</h3>
                          <p className="text-xs text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-8 animate-fade-in">
          <Card className="animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">Recent Orders</CardTitle>
                <Link href="/user/orders">
                  <Button variant="outline" size="sm" className="text-teal-600 hover:bg-teal-50">
                    View All Orders
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-teal-200 rounded-lg hover:bg-green-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <Badge className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${order.total}</p>
                      <p className="text-sm text-gray-600">{order.items} items</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-8 animate-fade-in">
          <Card className="animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">Profile Summary</CardTitle>
                <Link href="/user/profile">
                  <Button variant="outline" size="sm" className="text-teal-600 hover:bg-teal-50">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{userName}</h3>
                    <p className="text-gray-600">{userName.toLowerCase().replace(" ", ".") + "@example.com"}</p>
                    <p className="text-sm text-gray-500">Member since January 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-teal-200">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-800">Default Address</p>
                      <p className="text-sm text-gray-600">123 Main St, New York, NY</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Package className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-800">Delivery Preference</p>
                      <p className="text-sm text-gray-600">Standard shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-8 animate-fade-in">
          <Card className="animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Order ORD-001 delivered</p>
                    <p className="text-sm text-gray-600">Your order of organic avocados and spinach was delivered</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Added items to wishlist</p>
                    <p className="text-sm text-gray-600">You saved 3 items to your wishlist</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Profile updated</p>
                    <p className="text-sm text-gray-600">You updated your shipping address</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-800">Earned reward points</p>
                    <p className="text-sm text-gray-600">You earned 45 points from your recent purchase</p>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}