"use server";

import { connectDB } from "@/db/db";
import { verifyAuth } from "./auth";
import Order from "@/db/models/order";
import User from "@/db/models/user";
import bcrypt from "bcrypt";
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
    await connectDB();
    await requireAdmin();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
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
    await connectDB();
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

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    revalidatePath("/admin");
    return {
      success: true,
      message: `Order status updated to ${status}`,
      order: JSON.parse(JSON.stringify(order)),
    };
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
    await connectDB();
    await requireAdmin();
    const admins = await User.find({ role: "ADMIN" })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(admins));
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
    await connectDB();
    await requireAdmin();

    const { name, email, password } = adminData;

    if (!name || !name.trim()) {
      return { success: false, message: "Name is required" };
    }
    if (!email || !email.trim()) {
      return { success: false, message: "Email is required" };
    }
    if (!password || password.length < 8) {
      return { success: false, message: "Password must be at least 8 characters long" };
    }

    // Check email uniqueness
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return {
        success: false,
        message: `An account with the email ${email} already exists`,
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new administrator
    await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "ADMIN",
    });

    revalidatePath("/admin");
    return { success: true, message: "Administrator added successfully!" };
  } catch (error: any) {
    console.error("Error in addAdmin:", error.message);
    return { success: false, message: error.message || "Failed to add administrator" };
  }
}
