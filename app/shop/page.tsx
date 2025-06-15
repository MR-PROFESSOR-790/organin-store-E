import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShopContent } from "@/components/shop/shop-content"
import { Suspense } from "react"
import { ProductGridSkeleton } from "@/components/shop/product-grid-skeleton"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Organic Products</h1>
          <p className="text-gray-600">Discover our premium collection of organic and eco-friendly products</p>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
