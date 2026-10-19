"use server";

import { apiFetch } from "./apiClient";
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
    const response = await apiFetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        address,
        city,
        pincode,
        paymentMethod,
        items,
        quantity,
        totalAmount,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Unable to place the order",
    };
  }
}
