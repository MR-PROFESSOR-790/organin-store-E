import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Organic Avocados",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
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
    badge: "Sale",
  },
  {
    id: "4",
    name: "Almond Milk",
    price: 6.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 203,
    badge: null,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-lime-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular organic products, loved by customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button size="lg" className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
