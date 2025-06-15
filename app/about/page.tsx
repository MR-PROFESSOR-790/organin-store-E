import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutSection } from "@/components/home/about-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
} 