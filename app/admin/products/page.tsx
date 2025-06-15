import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ProductManagement } from "@/components/admin/product-management"

export default function AdminProductsPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <ProductManagement />
      </AdminLayout>
    </RouteGuard>
  )
}
