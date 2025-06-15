"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/providers/cart-provider"
import { useToast } from "@/hooks/use-toast"

const mockWishlistItems = [
  {
    id: "1",
    name: "Organic Avocados",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Fresh Spinach",
    price: 4.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    badge: "New",
  },
  {
    id: "3",
    name: "Organic Quinoa",
    price: 18.99,
    originalPrice: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    inStock: false,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Coconut Oil",
    price: 14.99,
    originalPrice: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 145,
    inStock: true,
    badge: "Sale",
  },
]

export function UserWishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const { addItem } = useCart()
  const { toast } = useToast()

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)
    inStockItems.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    })
    toast({
      title: "Added to cart",
      description: `${inStockItems.length} items have been added to your cart.`,
    })
  }

  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Wishlist link copied",
      description: "You can now share your wishlist with others.",
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>
        <Card>
          <CardContent className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save items you love for later by clicking the heart icon</p>
            <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={shareWishlist}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
          <Button onClick={addAllToCart} className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Items ({wishlistItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {item.badge && (
                    <Badge
                      className={`absolute top-2 left-2 ${
                        item.badge === "Sale" ? "bg-red-500" : item.badge === "New" ? "bg-blue-500" : "bg-green-500"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs
                          className={\`text-xs ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
