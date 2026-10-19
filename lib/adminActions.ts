"use server";

import { verifyAuth } from "./auth";
import { apiFetch } from "./apiClient";
import { revalidatePath } from "next/cache";

/**
 * Checks if the caller is authorized as an Admin.
 * Throws an error if not authorized.
 */
async function requireAdmin() {
  const user = await verifyAuth();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized. Admin access required.");
  }
  return user;
}

/**
 * Fetches all orders from the database, sorted by newest first.
 */
export async function fetchAdminOrders() {
  try {
    await requireAdmin();
    const response = await apiFetch("/api/orders");
    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to fetch orders");
    }
    return data.orders;
  } catch (error: any) {
    console.error("Error in fetchAdminOrders:", error.message);
    throw error;
  }
}

/**
 * Updates the status of an order.
 */
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await requireAdmin();

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "OUT-FOR-DELIVEREY",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return { success: false, message: `Invalid status: ${status}` };
    }

    const response = await apiFetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (data.success) {
      revalidatePath("/admin");
    }
    return data;
  } catch (error: any) {
    console.error("Error in updateOrderStatus:", error.message);
    return { success: false, message: error.message || "Failed to update order status" };
  }
}

/**
 * Fetches all admin users.
 */
export async function fetchAdmins() {
  try {
    await requireAdmin();
    const response = await apiFetch("/api/admin/admins");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error in fetchAdmins:", error.message);
    throw error;
  }
}

/**
 * Registers a new admin user.
 */
export async function addAdmin(adminData: Record<string, string>) {
  try {
    await requireAdmin();

    const response = await apiFetch("/api/admin/admins", {
      method: "POST",
      body: JSON.stringify(adminData),
    });

    const data = await response.json();
    if (data.success) {
      revalidatePath("/admin");
    }
    return data;
  } catch (error: any) {
    console.error("Error in addAdmin:", error.message);
    return { success: false, message: error.message || "Failed to add administrator" };
  }
}
