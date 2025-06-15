import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center font-sans overflow-hidden">
      {/* Animated organic SVG background */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-slow">
          <defs>
            <linearGradient id="organicGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="50%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
          <ellipse cx="400" cy="400" rx="600" ry="320" fill="url(#organicGradient)" fillOpacity="0.5">
            <animate attributeName="rx" values="600;650;600" dur="8s" repeatCount="indefinite" />
            <animate attributeName="ry" values="320;350;320" dur="7s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1200" cy="200" rx="300" ry="180" fill="#bbf7d0" fillOpacity="0.3">
            <animate attributeName="cx" values="1200;1100;1200" dur="10s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="900" cy="700" rx="250" ry="120" fill="#fef9c3" fillOpacity="0.3">
            <animate attributeName="cy" values="700;750;700" dur="9s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Logo, Headline, Description, Buttons */}
          <div className="flex flex-col items-start space-y-8">
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-tr from-lime-400 to-emerald-400 rounded-full p-4 shadow-lg">
                <Leaf className="h-14 w-14 text-white" />
              </div>
              <span className="ml-4 text-3xl font-extrabold text-emerald-700 tracking-tight" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Organin</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-emerald-900 leading-tight" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
              Fresh <span className="text-lime-600">Organic</span> Goodness<br />for a <span className="text-amber-600">Healthier</span> You
            </h1>
            <p className="text-lg text-emerald-800 max-w-lg" style={{fontFamily: 'Inter, sans-serif'}}>
              Discover our curated range of organic fruits, veggies, and eco-friendly products. Sustainably sourced, naturally grown, and delivered fresh to your door.
            </p>
            <div className="flex gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white shadow font-semibold tracking-wide">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold tracking-wide">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Product Image and Features */}
          <div className="flex flex-col items-center w-full space-y-8">
            <div className="relative w-full flex justify-center mb-4">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Fresh organic vegetables and fruits"
                width={400}
                height={400}
                className="rounded-3xl shadow-2xl border-4 border-white/60 bg-white/30 backdrop-blur-xl"
                priority
              />
            </div>
            {/* Features as horizontal cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center bg-white/80 rounded-xl p-4 shadow border border-lime-100 min-w-[160px]">
                <div className="bg-lime-100 p-2 rounded-full mb-2">
                  <Leaf className="h-5 w-5 text-lime-600" />
                </div>
                <h3 className="font-semibold text-emerald-900">100% Organic</h3>
                <p className="text-sm text-emerald-700 text-center">Certified organic products</p>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-xl p-4 shadow border border-amber-100 min-w-[160px]">
                <div className="bg-amber-100 p-2 rounded-full mb-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-emerald-900">Quality Assured</h3>
                <p className="text-sm text-emerald-700 text-center">Premium quality guarantee</p>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-xl p-4 shadow border border-emerald-100 min-w-[160px]">
                <div className="bg-emerald-100 p-2 rounded-full mb-2">
                  <Truck className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-900">Fast Delivery</h3>
                <p className="text-sm text-emerald-700 text-center">Same day delivery available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="bg-gradient-to-r from-lime-400 to-amber-300 text-emerald-900 py-3 shadow font-sans">
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
