import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategorySection } from "@/components/home/category-section"
import { AboutSection } from "@/components/home/about-section"
import { TestimonialSection } from "@/components/home/testimonial-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <AboutSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  )
}
