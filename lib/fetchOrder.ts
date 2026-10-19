import { verifyAuth } from "./auth";
import { apiFetch } from "./apiClient";
import { redirect } from "next/navigation";

export default async function fetchOrder() {
  const user = await verifyAuth();

  if (!user) {
    redirect("/login");
  }

  try {
    const response = await apiFetch(`/api/orders/user/${user.id}`);
    const data = await response.json();
    if (data.success) {
      return data.orders;
    }
    return [];
  } catch {
    return [];
  }
}
