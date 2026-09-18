import { connectDB } from "@/db/db";
import { verifyAuth } from "./auth";
import Order from "@/db/models/order";
import { redirect } from "next/navigation";

export default async function fetchOrder() {
  await connectDB();
  const user = await verifyAuth();

  if (!user) {
    redirect("/login");
  }

  try {
    const orders = await Order.find({
      user: user.id,
    }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
  } catch {
    return [];
  }
}
