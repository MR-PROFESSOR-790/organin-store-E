import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <UserManagement />
      </AdminLayout>
    </RouteGuard>
  )
}
