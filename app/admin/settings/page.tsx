import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminSettings } from "@/components/admin/admin-settings"

export default function AdminSettingsPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    </RouteGuard>
  )
}
