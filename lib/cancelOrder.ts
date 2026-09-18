"use server";

import { connectDB } from "@/db/db";
import { verifyAuth } from "./auth";
import Order from "@/db/models/order";
import { revalidatePath } from "next/cache";

export async function cancelOrder(orderId: string) {
  await connectDB();
  const user = await verifyAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const order = await Order.findOne({
    _id: orderId,
    user: user.id,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === "DELIVERED") {
    throw new Error("Cannot cancel delivered order");
  }

  order.status = "CANCELLED";
  await order.save();

  revalidatePath("/consumer/orders");
}
