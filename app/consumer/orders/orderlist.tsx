"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EmptyOrder from "./orderempty";
import Image from "next/image";
import { Order, OrderStatus, StatusConfig } from "./ordertypes";
import { cancelOrder } from "@/lib/cancelOrder";

const TABS: { label: string; value: "ALL" | OrderStatus }[] = [
  { label: "All Orders", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const STATUS_CONFIG: StatusConfig = {
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

export default function OrderList({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ALL" | OrderStatus>("ALL");

  const filteredOrders =
    activeTab === "ALL"
      ? orders
      : orders?.filter((o) => o.status === activeTab);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleCancel(orderId: string) {
  try {
    await cancelOrder(orderId);
    console.log("cancelled")
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4 max-w-4xl mx-auto">
          <button
            id="orders-back-btn"
            onClick={() => {
              router.back();
            }}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">My Orders</h1>
            <p className="text-xs text-gray-400">
              {orders?.length} orders placed
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Tab Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => {
            const count = tab.value === "ALL"? orders?.length
            : orders?.filter((o) => o.status === tab.value).length;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                id={`tab-${tab.value.toLowerCase()}`}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        {/* Orders List */}
        {filteredOrders?.length === 0 ? (
          <EmptyOrder activeTab={activeTab} />
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {order.orderId}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(order.createdAt)} ·{" "}
                          {formatTime(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-5 py-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.size} · {item.crust} Crust
                            {item.quantity > 1 && (
                              <span className="ml-1 text-green-700 font-medium">
                                x{item.quantity}
                              </span>
                            )}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer: Address + Payment + Total */}
                  <div className="px-5 py-4 border-t border-gray-50 grid sm:grid-cols-3 gap-4">
                    {/* Delivery Address */}
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-0.5">
                          Delivery Address
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {order.userInfo.address.line1},{" "}
                          {order.userInfo.address.city} –{" "}
                          {order.userInfo.address.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-0.5">
                          Payment
                        </p>
                        <p className="text-xs text-gray-700">
                          {order.paymentMethod}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.userInfo.phone}
                        </p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-start justify-between sm:justify-end sm:text-right gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-0.5">
                          Order Total
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{order.totalAmount}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.quantity}{" "}
                          {order.quantity === 1 ? "item" : "items"} · incl.
                          taxes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Row */}
                  {order.status !== "DELIVERED" &&
                    order.status !== "CANCELLED" && (
                      <div className="px-5 pb-4">
                        <button
                          className="w-full py-2.5 rounded-xl border-2 border-red-900 text-red-900 text-sm font-semibold hover:bg-red-900 hover:text-white transition-all duration-200"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
