import { RouteGuard } from "@/components/auth/route-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { UserDashboard } from "@/components/dashboard/user-dashboard"


export default function UserDashboardPage() {
  return (
    <RouteGuard allowedRoles={["user"]}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          
          <UserDashboard />
        </main>
        <Footer />
      </div>
    </RouteGuard>
  )
}
