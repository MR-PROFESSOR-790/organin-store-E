"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/shop/product-filters"
import { ProductSort } from "@/components/shop/product-sort"
import { Pagination } from "@/components/shop/pagination"

const mockProducts = [
  {
    id: "1",
    name: "Organic Avocados",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    category: "fresh-produce",
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
    category: "fresh-produce",
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
    category: "pantry",
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
    category: "dairy",
  },
  {
    id: "5",
    name: "Organic Bananas",
    price: 3.99,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 78,
    badge: null,
    category: "fresh-produce",
  },
  {
    id: "6",
    name: "Coconut Oil",
    price: 14.99,
    originalPrice: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 145,
    badge: "Sale",
    category: "pantry",
  },
]

export function ShopContent() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("name")
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 100],
    rating: 0,
  })

  const productsPerPage = 6

  useEffect(() => {
    let filtered = products

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, filters, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <ProductFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  )
}
