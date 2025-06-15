"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product/product-card" // Assuming this is imported from your previous code

const categories = [
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    description: "Organic fruits & vegetables",
    image: "/placeholder.svg?height=300&width=300",
    href: "/shop?category=fresh-produce",
  },
  {
    id: "pantry",
    name: "Pantry Essentials",
    description: "Grains, oils & spices",
    image: "/placeholder.svg?height=300&width=300",
    href: "/shop?category=pantry",
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    description: "Organic dairy products",
    image: "/placeholder.svg?height=300&width=300",
    href: "/shop?category=dairy",
  },
  {
    id: "snacks",
    name: "Healthy Snacks",
    description: "Nutritious snack options",
    image: "/placeholder.svg?height=300&width=300",
    href: "/shop?category=snacks",
  },
]

// Placeholder product data (replace with your actual data)
const products = [
  {
    id: "1",
    name: "Almond Milk",
    price: 6.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 203,
    badge: null,
  },
  {
    id: "2",
    name: "Coconut Oil",
    price: 14.99,
    originalPrice: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 145,
    badge: "Sale",
  },
  {
    id: "3",
    name: "Fresh Spinach",
    price: 4.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 89,
    badge: "New",
  },
  {
    id: "4",
    name: "Best Seller",
    price: 9.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 120,
    badge: null,
  },
]

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated categories of organic and sustainable products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch py-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group animate-category-float hover:shadow-lg transition-all duration-300 border border-teal-200 bg-white hover:bg-green-50 transform hover:-translate-y-2 rounded-2xl h-full min-h-[270px] min-w-[230px] max-w-[320px] mx-auto">
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="relative mb-4 overflow-hidden rounded-full mx-auto w-36 h-36 bg-teal-50">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-base text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}