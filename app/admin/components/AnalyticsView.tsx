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
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
};

interface AnalyticsViewProps {
  orders: Order[];
}

export default function AnalyticsView({ orders }: AnalyticsViewProps) {
  // Calculations
  const totalCount = orders.length;
  const completedOrders = orders.filter((o) => o.status === "DELIVERED");
  const completedCount = completedOrders.length;
  const cancelledCount = orders.filter((o) => o.status === "CANCELLED").length;

  const totalRevenue = completedOrders.reduce((s, o) => s + o.totalAmount, 0);
  const avgOrderValue = completedCount > 0 ? Math.round(totalRevenue / completedCount) : 0;

  // Payments summary
  const paymentCounts: Record<string, number> = {};
  completedOrders.forEach((o) => {
    paymentCounts[o.paymentMethod] = (paymentCounts[o.paymentMethod] || 0) + o.totalAmount;
  });

  // Category summary
  const categoryQty: Record<string, number> = {
    pizza: 0,
    side: 0,
    beverage: 0,
    dessert: 0,
  };

  completedOrders.forEach((o) => {
    o.items.forEach((item) => {
      // Map category
      const cat = (item.category || "pizza").toLowerCase();
      if (cat in categoryQty) {
        categoryQty[cat] += item.quantity;
      } else {
        categoryQty.pizza += item.quantity;
      }
    });
  });

  const totalQtySold = Object.values(categoryQty).reduce((s, v) => s + v, 0) || 1;

  const categoriesFormatted = [
    { name: "Pizzas", count: categoryQty.pizza, pct: Math.round((categoryQty.pizza / totalQtySold) * 100), color: "bg-green-700" },
    { name: "Sides & Appetizers", count: categoryQty.side, pct: Math.round((categoryQty.side / totalQtySold) * 100), color: "bg-indigo-600" },
    { name: "Beverages", count: categoryQty.beverage, pct: Math.round((categoryQty.beverage / totalQtySold) * 100), color: "bg-sky-500" },
    { name: "Desserts", count: categoryQty.dessert, pct: Math.round((categoryQty.dessert / totalQtySold) * 100), color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Orders Revenue</p>
          <p className="text-2xl font-black text-green-900 mt-2">₹{totalRevenue.toLocaleString()}</p>
          <div className="h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-green-800 rounded-full w-[80%]" />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Represents gross sales output</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Order Value (AOV)</p>
          <p className="text-2xl font-black text-gray-900 mt-2">₹{avgOrderValue}</p>
          <div className="h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-[65%]" />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Calculated per delivered order</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cancellation Ratio</p>
          <p className="text-2xl font-black text-red-600 mt-2">
            {totalCount > 0 ? Math.round((cancelledCount / totalCount) * 100) : 0}%
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${totalCount > 0 ? Math.round((cancelledCount / totalCount) * 100) : 0}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            {cancelledCount} out of {totalCount} total orders cancelled
          </p>
        </div>
      </div>

      {/* Grid: Sales by Category + Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-gray-950 text-base">Product Category Sales</h3>
            <p className="text-xs text-gray-400 mt-0.5">Item volume sold across categories</p>
          </div>

          <div className="space-y-4">
            {categoriesFormatted.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-700">{cat.name}</span>
                  <span className="font-bold text-gray-900">{cat.count} items ({cat.pct}%)</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payments breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-950 text-base">Revenue by Payment Mode</h3>
            <p className="text-xs text-gray-400 mt-0.5">Transaction split by payment type</p>
          </div>

          <div className="mt-4 space-y-3.5">
            {Object.entries(paymentCounts).map(([method, amount], idx) => {
              const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700 uppercase bg-gray-100 px-2 py-0.5 rounded-md">
                      {method}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{pct}% share</span>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900">₹{amount.toLocaleString()}</span>
                </div>
              );
            })}

            {Object.keys(paymentCounts).length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">No transaction records found</p>
            )}
          </div>

          <p className="text-[10px] text-gray-400 mt-4 leading-normal">
            * Note: Analytics values are based on real-time database orders with status &quot;DELIVERED&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
