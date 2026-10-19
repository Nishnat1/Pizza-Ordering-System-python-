"use server";

import { apiFetch } from "./apiClient";
import { revalidatePath } from "next/cache";

export async function cancelOrder(orderId: string) {
  const response = await apiFetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || data.message || "Unable to cancel order");
  }

  revalidatePath("/consumer/orders");
}
