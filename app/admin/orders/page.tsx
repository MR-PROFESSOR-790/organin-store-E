import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { OrderManagement } from "@/components/admin/order-management"

export default function AdminOrdersPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <OrderManagement />
      </AdminLayout>
    </RouteGuard>
  )
}
