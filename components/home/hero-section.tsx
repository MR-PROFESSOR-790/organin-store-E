import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh <span className="text-green-600">Organic</span> Products for a{" "}
                <span className="text-green-600">Healthier</span> You
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Discover our premium collection of organic fruits, vegetables, and eco-friendly products. Sustainably
                sourced, naturally grown, and delivered fresh to your doorstep.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">100% Organic</h3>
                  <p className="text-sm text-gray-600">Certified organic products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Premium quality guarantee</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">Same day delivery available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Fresh organic vegetables and fruits"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-green-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <span>🌱 Free shipping on orders over $50</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">🚚 Same day delivery available</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">💚 100% satisfaction guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
