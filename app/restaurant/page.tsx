"use client";

import { useState, useEffect } from "react";

type Stage = "NEW" | "PREPARING" | "READY" | "DELIVERED";

type OrderItem = { name: string; qty: number; size: string; crust: string };

type Order = {
  id: string;
  customer: string;
  phone: string;
  items: OrderItem[];
  total: number;
  stage: Stage;
  payment: string;
  placedAt: Date;
};

const STAGE_CONFIG: Record<
  Stage,
  {
    label: string;
    next: Stage | null;
    nextLabel: string | null;
    headerBg: string;
    headerText: string;
    accentColor: string;
    dotColor: string;
    btnBg: string;
    btnText: string;
  }
> = {
  NEW: {
    label: "New Orders",
    next: "PREPARING",
    nextLabel: "Start Preparing",
    headerBg: "bg-amber-500",
    headerText: "text-white",
    accentColor: "border-amber-200",
    dotColor: "bg-amber-400",
    btnBg: "bg-amber-500 hover:bg-amber-600",
    btnText: "text-white",
  },
  PREPARING: {
    label: "Preparing",
    next: "READY",
    nextLabel: "Mark Ready",
    headerBg: "bg-blue-600",
    headerText: "text-white",
    accentColor: "border-blue-200",
    dotColor: "bg-blue-500",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    btnText: "text-white",
  },
  READY: {
    label: "Ready for Pickup",
    next: "DELIVERED",
    nextLabel: "Mark Delivered",
    headerBg: "bg-green-600",
    headerText: "text-white",
    accentColor: "border-green-200",
    dotColor: "bg-green-500",
    btnBg: "bg-green-700 hover:bg-green-800",
    btnText: "text-white",
  },
  DELIVERED: {
    label: "Delivered",
    next: null,
    nextLabel: null,
    headerBg: "bg-gray-400",
    headerText: "text-white",
    accentColor: "border-gray-200",
    dotColor: "bg-gray-400",
    btnBg: "",
    btnText: "",
  },
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "EC2EDB",
    customer: "Sajal Kaundal",
    phone: "8219967998",
    items: [{ name: "Chicken Florentine", qty: 1, size: "Small", crust: "Original" }],
    total: 282,
    stage: "NEW",
    payment: "COD",
    placedAt: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: "EC2EDD",
    customer: "Priya Sharma",
    phone: "9876543210",
    items: [
      { name: "Chicken BBQ", qty: 1, size: "Medium", crust: "Original" },
      { name: "Chicken Florentine", qty: 1, size: "Small", crust: "Thin N' Crispy" },
      { name: "Chicken Hawaiian", qty: 1, size: "Medium", crust: "Original" },
    ],
    total: 816,
    stage: "PREPARING",
    payment: "COD",
    placedAt: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: "EC2EDF",
    customer: "Rahul Mehta",
    phone: "9988776655",
    items: [
      { name: "Chicken BBQ", qty: 2, size: "Large", crust: "Original" },
      { name: "Chicken Hawaiian", qty: 1, size: "Small", crust: "Thin N' Crispy" },
    ],
    total: 816,
    stage: "READY",
    payment: "COD",
    placedAt: new Date(Date.now() - 28 * 60 * 1000),
  },
  {
    id: "EC2EE1",
    customer: "Ananya Gupta",
    phone: "7654321098",
    items: [{ name: "Margherita", qty: 2, size: "Large", crust: "Original" }],
    total: 598,
    stage: "NEW",
    payment: "COD",
    placedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "EC2EE3",
    customer: "Vikram Singh",
    phone: "8899001122",
    items: [{ name: "Pepperoni", qty: 1, size: "Medium", crust: "Thin N' Crispy" }],
    total: 349,
    stage: "DELIVERED",
    payment: "COD",
    placedAt: new Date(Date.now() - 45 * 60 * 1000),
  },
];

function useElapsedMinutes(placedAt: Date) {
  const [minutes, setMinutes] = useState(
    Math.floor((Date.now() - placedAt.getTime()) / 60000)
  );
  useEffect(() => {
    const id = setInterval(
      () => setMinutes(Math.floor((Date.now() - placedAt.getTime()) / 60000)),
      30000
    );
    return () => clearInterval(id);
  }, [placedAt]);
  return minutes;
}

function TimerBadge({ placedAt }: { placedAt: Date }) {
  const minutes = useElapsedMinutes(placedAt);
  const color =
    minutes >= 30
      ? "bg-red-100 text-red-600"
      : minutes >= 20
      ? "bg-orange-100 text-orange-600"
      : "bg-gray-100 text-gray-500";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {minutes}m ago
    </span>
  );
}

function OrderCard({
  order,
  onAdvance,
}: {
  order: Order;
  onAdvance: (id: string) => void;
}) {
  const cfg = STAGE_CONFIG[order.stage];
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${cfg.accentColor}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-900">#{order.id}</span>
          <TimerBadge placedAt={order.placedAt} />
        </div>
        <span className="text-xs font-semibold text-gray-500">{order.payment}</span>
      </div>

      {/* Customer */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-xs shrink-0">
            {order.customer.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{order.customer}</p>
            <p className="text-xs text-gray-400">{order.phone}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 pb-3 space-y-1.5">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0" />
            <p className="text-xs text-gray-700 leading-relaxed">
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-400">
                {" "}
                · {item.size} · {item.crust}
                {item.qty > 1 && (
                  <span className="text-green-700 font-medium"> ×{item.qty}</span>
                )}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-400">Order Total</span>
        <span className="text-sm font-bold text-gray-900">₹{order.total}</span>
      </div>

      {/* Action Button */}
      {cfg.next && (
        <div className="px-4 pb-4 pt-2">
          <button
            id={`advance-${order.id}`}
            onClick={() => onAdvance(order.id)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${cfg.btnBg} ${cfg.btnText}`}
          >
            {cfg.nextLabel}
          </button>
        </div>
      )}

      {order.stage === "DELIVERED" && (
        <div className="px-4 pb-4 pt-2">
          <div className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-gray-50 text-gray-400 border border-gray-100">
            ✓ Order Complete
          </div>
        </div>
      )}
    </div>
  );
}

const STAGES: Stage[] = ["NEW", "PREPARING", "READY", "DELIVERED"];

export default function RestaurantPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("orders");

  function advanceOrder(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = STAGE_CONFIG[o.stage].next;
        return next ? { ...o, stage: next } : o;
      })
    );
  }

  const activeOrders = orders.filter((o) => o.stage !== "DELIVERED").length;
  const newCount = orders.filter((o) => o.stage === "NEW").length;
  const preparingCount = orders.filter((o) => o.stage === "PREPARING").length;
  const readyCount = orders.filter((o) => o.stage === "READY").length;
  const deliveredCount = orders.filter((o) => o.stage === "DELIVERED").length;

  const RESTAURANT_NAV = [
    {
      id: "orders",
      label: "Live Orders",
      badge: activeOrders > 0 ? activeOrders : null,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: "history",
      label: "Order History",
      badge: null,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "menu",
      label: "My Menu",
      badge: null,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-green-900 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-green-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="size-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight">Pizza Kitchen</p>
              <p className="text-green-300 text-xs">Restaurant Panel</p>
            </div>
          </div>
        </div>

        {/* Status Strip */}
        <div className="px-4 py-4 border-b border-green-800 grid grid-cols-2 gap-2">
          {[
            { label: "New", value: newCount, color: "text-amber-300" },
            { label: "Preparing", value: preparingCount, color: "text-blue-300" },
            { label: "Ready", value: readyCount, color: "text-green-300" },
            { label: "Delivered", value: deliveredCount, color: "text-gray-300" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-lg px-3 py-2 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-green-300/70 text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {RESTAURANT_NAV.map((item) => (
            <button
              key={item.id}
              id={`rest-nav-${item.id}`}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeNav === item.id
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
              {item.badge !== null && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Staff Badge */}
        <div className="px-4 py-4 border-t border-green-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Restaurant Staff</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-green-300 text-[10px]">Online</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                id="restaurant-sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="size-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Live Order Queue</h1>
                <p className="text-xs text-gray-400">
                  {activeOrders} active {activeOrders === 1 ? "order" : "orders"} ·{" "}
                  {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {/* Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "New Orders", value: newCount, color: "bg-amber-500", textColor: "text-white" },
              { label: "In Kitchen", value: preparingCount, color: "bg-blue-600", textColor: "text-white" },
              { label: "Ready", value: readyCount, color: "bg-green-600", textColor: "text-white" },
              { label: "Delivered Today", value: deliveredCount, color: "bg-gray-800", textColor: "text-white" },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-2xl px-5 py-4 ${stat.color} shadow-sm`}>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className={`text-xs font-medium mt-0.5 ${stat.textColor} opacity-80`}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {STAGES.map((stage) => {
              const cfg = STAGE_CONFIG[stage];
              const stageOrders = orders.filter((o) => o.stage === stage);
              return (
                <div key={stage} className="flex flex-col gap-3">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${cfg.headerBg}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-white/60`} />
                      <h2 className={`text-sm font-bold ${cfg.headerText}`}>{cfg.label}</h2>
                    </div>
                    <span className={`text-sm font-bold ${cfg.headerText} bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs`}>
                      {stageOrders.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-3 min-h-[200px]">
                    {stageOrders.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed border-gray-200 text-gray-300">
                        <svg className="size-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-xs">No orders</p>
                      </div>
                    ) : (
                      stageOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onAdvance={advanceOrder} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
