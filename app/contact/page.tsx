import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">Have questions, feedback, or need support? Fill out the form below or reach out to us directly. We're here to help!</p>
        <form className="max-w-xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
            <input id="name" name="name" type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>
          <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-lg shadow">Send Message</button>
        </form>
        <div className="mt-12 text-gray-600">
          <p>Email: <a href="mailto:hello@organicstore.com" className="text-lime-600 hover:underline">hello@organicstore.com</a></p>
          <p>Phone: <a href="tel:+15551234567" className="text-lime-600 hover:underline">+1 (555) 123-4567</a></p>
        </div>
      </main>
      <Footer />
    </div>
  )
} 