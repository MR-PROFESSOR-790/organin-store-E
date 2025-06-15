import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Leaf, Users, Award, Heart } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose <span className="text-green-600">Organic Store</span>?
              </h2>
              <p className="text-lg text-gray-600">
                We're committed to providing you with the highest quality organic products while supporting sustainable
                farming practices and local communities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sustainable</h3>
                  <p className="text-sm text-gray-600">Eco-friendly practices</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community</h3>
                  <p className="text-sm text-gray-600">Supporting local farmers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Certified</h3>
                  <p className="text-sm text-gray-600">Organic certification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Health</h3>
                  <p className="text-sm text-gray-600">Nutritious & pure</p>
                </div>
              </div>
            </div>

            <Button className="bg-green-600 hover:bg-green-700">Learn More About Us</Button>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Organic farming and sustainable practices"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
