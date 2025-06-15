"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Eye, Download, RefreshCw } from "lucide-react"
import Image from "next/image"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 45.99,
    items: [
      { name: "Organic Avocados", quantity: 2, price: 12.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Fresh Spinach", quantity: 1, price: 4.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Almond Milk", quantity: 1, price: 6.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    tracking: "TRK123456789",
    estimatedDelivery: "Delivered on Jan 17, 2024",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 32.5,
    items: [
      { name: "Organic Quinoa", quantity: 1, price: 18.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Coconut Oil", quantity: 1, price: 14.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    tracking: "TRK987654321",
    estimatedDelivery: "Expected Jan 18, 2024",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 78.25,
    items: [
      { name: "Organic Bananas", quantity: 3, price: 3.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Fresh Spinach", quantity: 2, price: 4.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Almond Milk", quantity: 2, price: 6.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    tracking: null,
    estimatedDelivery: "Expected Jan 20, 2024",
  },
]

export function UserOrderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-6">
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Package className="h-5 w-5 text-gray-500" />
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Status and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        {order.tracking && (
                          <p className="text-sm text-gray-600">
                            Tracking: <span className="font-mono">{order.tracking}</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {order.tracking && (
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-1" />
                            Track Order
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Details Modal would go here */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Order Date</h4>
                    <p className="text-gray-600">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Status</h4>
                    <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold">Total</h4>
                    <p className="text-lg font-semibold">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                  {selectedOrder.tracking && (
                    <div>
                      <h4 className="font-semibold">Tracking Number</h4>
                      <p className="font-mono text-sm">{selectedOrder.tracking}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Items Ordered</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
