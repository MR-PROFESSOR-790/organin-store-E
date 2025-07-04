"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/providers/cart-provider"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number | null
    image: string
    rating: number
    reviews: number
    badge?: string | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <Card className="group animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 bg-white rounded-xl overflow-hidden transform hover:-translate-y-2">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          </Link>
          {product.badge && (
            <Badge
              className={`absolute top-3 left-3 text-xs font-semibold ${
                product.badge === "Sale"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : product.badge === "New"
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {product.badge}
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-lg text-gray-800 hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}