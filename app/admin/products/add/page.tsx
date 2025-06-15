import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AddProductForm } from "@/components/admin/add-product-form"

export default function AddProductPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <AddProductForm />
      </AdminLayout>
    </RouteGuard>
  )
}
