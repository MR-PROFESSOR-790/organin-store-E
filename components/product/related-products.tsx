"use client"

import { ProductCard } from "@/components/product/product-card"

const relatedProducts = [
  {
    id: "7",
    name: "Organic Tomatoes",
    price: 5.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 92,
    badge: null,
  },
  {
    id: "8",
    name: "Fresh Lettuce",
    price: 3.49,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 67,
    badge: null,
  },
  {
    id: "9",
    name: "Organic Carrots",
    price: 4.99,
    originalPrice: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 134,
    badge: "Sale",
  },
  {
    id: "10",
    name: "Bell Peppers",
    price: 7.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 89,
    badge: null,
  },
]

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((product) => product.id !== currentProductId)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  )
}