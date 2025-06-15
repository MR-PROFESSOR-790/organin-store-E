import { RouteGuard } from "@/components/auth/route-guard"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChatManagement } from "@/components/admin/chat-management"

export default function AdminChatPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <ChatManagement />
      </AdminLayout>
    </RouteGuard>
  )
}
