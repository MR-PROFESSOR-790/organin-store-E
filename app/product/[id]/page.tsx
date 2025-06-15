import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetails } from "@/components/product/product-details"
import { RelatedProducts } from "@/components/product/related-products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  // This would typically fetch from your API
  const mockProduct = {
    id,
    name: "Organic Avocados",
    price: 12.99,
    originalPrice: 15.99,
    description:
      "Fresh, creamy organic avocados sourced from sustainable farms. Perfect for salads, toast, or smoothies.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "Fresh Produce",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    features: ["100% Organic", "Sustainably Sourced", "Rich in Healthy Fats", "No Pesticides"],
  }

  return mockProduct
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <RelatedProducts categoryId={product.category} currentProductId={product.id} />
      </main>
      <Footer />
    </div>
  )
}
