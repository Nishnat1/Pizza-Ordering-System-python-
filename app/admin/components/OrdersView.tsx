import React, { useState } from "react";

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
  crust?: string;
  category?: string;
  isVeg?: boolean;
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

interface OrdersViewProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
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

export default function OrdersView({ orders, onUpdateStatus }: OrdersViewProps) {
  const [filterStatus, setFilterStatus] = useState<"ALL" | OrderStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter and search
  const filteredOrders = orders.filter((order) => {
    // 1. Status Filter
    const matchesStatus = filterStatus === "ALL" || order.status === filterStatus;

    // 2. Search Query (name, phone, orderId)
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;

    const matchesId = order.orderId.toLowerCase().includes(q);
    const matchesName = order.userInfo?.name?.toLowerCase().includes(q) || false;
    const matchesPhone = order.userInfo?.phone?.includes(q) || false;

    return matchesStatus && (matchesId || matchesName || matchesPhone);
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by ID, name, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-green-800 transition-colors"
          />
        </div>

        {/* Filters Carousel/Row */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(["ALL", "PENDING", "CONFIRMED", "PREPARING", "OUT-FOR-DELIVEREY", "DELIVERED", "CANCELLED"] as const).map((s) => {
            const isActive = filterStatus === s;
            const count = s === "ALL" ? orders.length : orders.filter((o) => o.status === s).length;
            const label = s === "ALL" ? "All" : STATUS_CONFIG[s].label;

            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-green-900 text-white shadow-xs"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-200/60 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-4 py-3.5">Date & Time</th>
                <th className="px-4 py-3.5">Customer Details</th>
                <th className="px-4 py-3.5">Items Summary</th>
                <th className="px-4 py-3.5">Total & Payment</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
                const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/20 transition-colors group"
                  >
                    <td className="px-5 py-4 font-bold text-gray-900">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="hover:text-green-800 transition-colors text-left underline decoration-dotted underline-offset-4 cursor-pointer"
                      >
                        #{order.orderId}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <p className="font-semibold text-gray-700">{formattedDate}</p>
                      <p className="text-gray-400 mt-0.5">{formattedTime}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-800 leading-tight">{order.userInfo?.name || "Guest"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.userInfo?.phone || "-"}</p>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <div className="max-w-[200px] truncate text-gray-600">
                        {order.items.map((item) => `${item.name} (${item.size})`).join(", ")}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Total {order.items.reduce((s, i) => s + i.quantity, 0)} units
                      </p>
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
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 bg-white text-gray-700 focus:outline-hidden focus:border-green-700 cursor-pointer"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="OUT-FOR-DELIVEREY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center py-20 text-gray-400">
              <svg className="size-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm font-semibold">No orders match your filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Side Drawer/Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in p-6 border-l border-gray-100">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Order Details</h3>
                  <p className="text-xs text-gray-400 mt-0.5">#{selectedOrder.orderId}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable details */}
              <div className="mt-5 space-y-6 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin">
                {/* Status Selection Card */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Current Status</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-gray-800">
                      <span className={`w-2 h-2 rounded-full ${
                        (STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.PENDING).dot
                      }`} />
                      {(STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.PENDING).label}
                    </span>
                  </div>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as OrderStatus;
                      onUpdateStatus(selectedOrder.orderId, newStatus);
                      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
                    }}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-hidden focus:border-green-800 cursor-pointer"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PREPARING">Preparing</option>
                    <option value="OUT-FOR-DELIVEREY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                {/* Customer Details */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Customer & Delivery Info</h4>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="font-bold text-gray-800">{selectedOrder.userInfo?.name || "Guest"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="font-bold text-gray-800">{selectedOrder.userInfo?.phone || "-"}</span>
                    </div>
                    <div className="border-t border-gray-50 pt-2 flex flex-col gap-1">
                      <span className="text-gray-400">Delivery Address:</span>
                      <span className="font-semibold text-gray-700">{selectedOrder.userInfo?.address?.line1 || "-"}</span>
                      <span className="font-semibold text-gray-700">
                        {selectedOrder.userInfo?.address?.city || "-"} - {selectedOrder.userInfo?.address?.pincode || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items details */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Items Summary</h4>
                  <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-white flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 border rounded-xs flex items-center justify-center shrink-0 ${
                              item.isVeg ? "border-green-600" : "border-red-600"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                item.isVeg ? "bg-green-600" : "bg-red-600"
                              }`} />
                            </span>
                            <p className="font-bold text-gray-800 capitalize leading-tight">{item.name}</p>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {item.size} {item.crust ? `| ${item.crust}` : ""} ×{item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Total card */}
            <div className="border-t border-gray-100 pt-4 space-y-3.5 bg-white">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Payment Method:</span>
                <span className="font-bold text-gray-800 uppercase bg-gray-100 px-2 py-0.5 rounded-lg text-xs">
                  {selectedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center text-base pt-2">
                <span className="text-gray-900 font-extrabold">Grand Total:</span>
                <span className="text-xl font-black text-green-900">₹{selectedOrder.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
