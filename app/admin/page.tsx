import AdminDashboardClient from "./AdminDashboardClient";
import { fetchAdminOrders, fetchAdmins } from "@/lib/adminActions";
import { verifyAuth } from "@/lib/auth";
import User from "@/db/models/user";
import { connectDB } from "@/db/db";

export default async function AdminPage() {
  await connectDB();

  // Gateway checks are completed in layout.tsx, but verifyAuth helps load current user profile info.
  let authInfo = null;
  try {
    authInfo = await verifyAuth();
  } catch {
    // Falls back gracefully
  }

  const [orders, admins, dbUser] = await Promise.all([
    fetchAdminOrders(),
    fetchAdmins(),
    authInfo ? User.findById(authInfo.id) : null,
  ]);

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
