"use client";

import { useRouter } from "next/navigation";
import { OrderStatus, StatusConfig } from "./ordertypes";

const STATUS_CONFIG: StatusConfig = {
  PENDING: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  PREPARING: {
    label: "Preparing",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  DELIVERED: {
    label: "Delivered",
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
  },
};
export default function EmptyOrder({
  activeTab,
}: {
  activeTab: OrderStatus | "ALL";
}) {
  const router = useRouter();
  return (
    /* Empty State */
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-800">No orders yet</h2>
      <p className="text-sm text-gray-400 mt-1 max-w-xs">
        {activeTab === "ALL"
          ? "You haven't placed any orders. Start exploring our menu!"
          : `No ${STATUS_CONFIG[activeTab as OrderStatus]?.label.toLowerCase()} orders found.`}
      </p>
      <button
        onClick={() => router.push("/consumer/order")}
        className="mt-6 px-8 py-3 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors text-sm"
      >
        Browse Menu
      </button>
    </div>
  );
}
