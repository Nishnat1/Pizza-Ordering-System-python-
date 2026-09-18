"use server";

import { connectDB } from "@/db/db";
import { verifyAuth } from "./auth";
import Order from "@/db/models/order";
import { CartItem } from "@/app/consumer/context/cartcontext/CartProvider";

export async function createOrder({
  name,
  phone,
  address,
  city,
  pincode,
  paymentMethod,
  items,
  quantity,
  totalAmount,
}: {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  items: CartItem[];
  quantity: number;
  totalAmount: number;
}) {
  try {
    await connectDB();
    const user = await verifyAuth();

    const orderId = crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase();

    const order = new Order({
      orderId,
      user: user?.id,
      items,
      quantity,
      totalAmount,
      userInfo: {
        name,
        phone,
        address: {
          line1: address,
          city,
          pincode,
        },
      },
      paymentMethod,
    });

    await order.save();

    return {
      success: true,
      message: "Order Created Successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Unable to place the order",
    };
  }
}
