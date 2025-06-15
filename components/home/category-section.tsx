"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group animate-float hover:shadow-lg transition-all duration-300 border border-teal-200 bg-white hover:bg-green-50 transform hover:-translate-y-2 rounded-xl">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4 overflow-hidden rounded-full mx-auto w-32 h-32 bg-teal-50">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}