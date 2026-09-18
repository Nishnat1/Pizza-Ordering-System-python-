import React from "react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "OUT-FOR-DELIVEREY"
  | "DELIVERED"
  | "CANCELLED";

type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  category?: string;
};

type Order = {
  _id: string;
  orderId: string;
  userInfo: {
    name: string;
    phone: string;
    address: { line1: string; city: string; pincode: string };
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
};

interface DashboardViewProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  onNavigate: (tabId: string) => void;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  CONFIRMED: { label: "Confirmed", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  PREPARING: { label: "Preparing", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  "OUT-FOR-DELIVEREY": { label: "Out for Delivery", bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-400" },
  DELIVERED: { label: "Delivered", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-400" },
};

export default function DashboardView({
  orders,
  onUpdateStatus,
  onNavigate,
}: DashboardViewProps) {
  // 1. Calculate stats from real orders
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const kitchenCount = orders.filter((o) => o.status === "PREPARING").length;
  const activeCount = orders.filter(
    (o) => ["PENDING", "CONFIRMED", "PREPARING", "OUT-FOR-DELIVEREY"].includes(o.status)
  ).length;

  const STATS = [
    {
      label: "Total Orders",
      value: totalOrders,
      sub: "All time database orders",
      color: "bg-indigo-50 text-indigo-600",
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      sub: "From Delivered orders only",
      color: "bg-green-50 text-green-700",
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Pending Checks",
      value: pendingCount,
      sub: "Awaiting action",
      color: "bg-amber-50 text-amber-600",
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Active Cooking",
      value: kitchenCount,
      sub: "In the kitchen",
      color: "bg-sky-50 text-sky-600",
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
  ];

  // 2. Calculate Top Selling Items dynamically from orders
  const itemCounts: Record<string, number> = {};
  orders.forEach((o) => {
    // Only count for confirmed/preparing/delivered orders to represent actual sales
    if (o.status !== "CANCELLED") {
      o.items.forEach((item) => {
        const name = item.name;
        itemCounts[name] = (itemCounts[name] || 0) + item.quantity;
      });
    }
  });

  const sortedItems = Object.entries(itemCounts)
    .map(([name, count]) => ({ name, orders: count }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  const maxOrders = sortedItems[0]?.orders || 1;
  const topItemsFormatted = sortedItems.map((item) => ({
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    orders: item.orders,
    pct: Math.round((item.orders / maxOrders) * 100),
  }));

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-gray-900 leading-none">{stat.value}</p>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mt-1.5">{stat.label}</p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Recent Orders Table + Top Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
              <h2 className="font-bold text-gray-950">Recent Orders</h2>
              <p className="text-xs text-gray-400">Latest active entries from customers</p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-semibold text-green-800 hover:text-green-700 transition-colors cursor-pointer"
            >
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                  <th className="px-5 py-3.5">Order</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5 hidden sm:table-cell">Details</th>
                  <th className="px-4 py-3.5">Total</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
                  const dateStr = new Date(order.createdAt).toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-900">#{order.orderId}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{dateStr}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-800 leading-tight">{order.userInfo?.name || "Guest"}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{order.userInfo?.phone || "-"}</p>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <div className="max-w-[150px] truncate text-xs text-gray-600">
                          {order.items.map((item) => `${item.name} (${item.size} x${item.quantity})`).join(", ")}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-900">
                        ₹{order.totalAmount}
                        <p className="text-[10px] text-gray-400 font-normal mt-0.5">{order.paymentMethod}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-hidden focus:border-green-700 cursor-pointer"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="OUT-FOR-DELIVEREY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {recentOrders.length === 0 && (
              <div className="flex flex-col items-center py-16 text-gray-400">
                <svg className="size-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-xs font-semibold">No orders in database yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="font-bold text-gray-950">Top Selling Items</h2>
              <p className="text-xs text-gray-400 mt-0.5">Quantity sold from active orders</p>
            </div>
            <div className="px-5 py-4 space-y-4">
              {topItemsFormatted.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-300 w-4 group-hover:text-green-800 transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-semibold text-gray-700 capitalize">{item.name}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{item.orders} sold</span>
                  </div>
                  <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-900 transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}

              {topItemsFormatted.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-6">No items sold yet</p>
              )}
            </div>
          </div>

          {/* Cooking Panel Summary */}
          <div className="m-5 p-4 rounded-xl bg-green-50/50 border border-green-100/50">
            <p className="text-[11px] font-bold text-green-800 uppercase tracking-wider mb-2">
              Kitchen Operations
            </p>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white rounded-lg p-2 shadow-xs">
                <p className="text-lg font-black text-green-900">{activeCount}</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Active Orders</p>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-xs">
                <p className="text-lg font-black text-green-900">{kitchenCount}</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">In Cooking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
