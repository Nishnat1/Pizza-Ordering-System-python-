import AdminDashboardClient from "./AdminDashboardClient";
import { fetchAdminOrders, fetchAdmins } from "@/lib/adminActions";
import { verifyAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/apiClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let authInfo = null;
  try {
    authInfo = await verifyAuth();
  } catch {
    // Falls back gracefully
  }

  const [orders, admins, meResponse] = await Promise.all([
    fetchAdminOrders(),
    fetchAdmins(),
    authInfo ? apiFetch("/api/auth/me") : Promise.resolve(null),
  ]);

  let dbUser = null;
  if (meResponse) {
    const meData = await meResponse.json();
    if (meData.success) {
      dbUser = meData.user;
    }
  }

  const currentUser = {
    name: dbUser?.name || "Pizza Administrator",
    email: dbUser?.email || "admin@pizza.com",
  };

  return (
    <AdminDashboardClient
      initialOrders={orders}
      initialAdmins={admins}
      currentUser={currentUser}
    />
  );
}
