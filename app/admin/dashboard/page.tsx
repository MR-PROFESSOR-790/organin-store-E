import { RouteGuard } from "@/components/auth/route-guard"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard />
      </div>
    </RouteGuard>
  )
}
