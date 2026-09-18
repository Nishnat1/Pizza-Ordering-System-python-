import React, { useState } from "react";
import { ALL_MENU_ITEMS, MenuItem } from "@/lib/menuData";

export default function MenuView() {
  const [activeCategory, setActiveCategory] = useState<"pizza" | "side" | "beverage" | "dessert">("pizza");

  const categories = [
    { id: "pizza", label: "Pizzas", count: ALL_MENU_ITEMS.filter((item) => item.category === "pizza").length },
    { id: "side", label: "Sides", count: ALL_MENU_ITEMS.filter((item) => item.category === "side").length },
    { id: "beverage", label: "Beverages", count: ALL_MENU_ITEMS.filter((item) => item.category === "beverage").length },
    { id: "dessert", label: "Desserts", count: ALL_MENU_ITEMS.filter((item) => item.category === "dessert").length },
  ];

  const filteredItems = ALL_MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Selection Tab Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-green-900 text-white shadow-xs"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {cat.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            {/* Top Info / Image */}
            <div>
              {/* Product Image */}
              <div className="relative h-40 bg-gray-50/50 flex items-center justify-center p-4 overflow-hidden border-b border-gray-100/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback image if source is broken
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop";
                  }}
                />
                
                {/* Veg/Non-veg tag */}
                <span className="absolute top-3 left-3 bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-bold border border-gray-100/80 shadow-xs flex items-center gap-1">
                  <span className={`w-2 h-2 border rounded-xs flex items-center justify-center ${
                    item.isVeg ? "border-green-600" : "border-red-600"
                  }`}>
                    <span className={`w-1.2 h-1.2 rounded-full ${
                      item.isVeg ? "bg-green-600" : "bg-red-600"
                    }`} />
                  </span>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-gray-900 capitalize text-sm group-hover:text-green-800 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">
                  {item.description || "Freshly baked pizza made with finest ingredients."}
                </p>
              </div>
            </div>

            {/* Price list */}
            <div className="p-4 border-t border-gray-50 bg-gray-50/30 space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Prices / Variants</p>
              <div className="space-y-1.5">
                {item.variants.map((v, vIdx) => (
                  <div key={vIdx} className="flex justify-between items-center text-xs text-gray-600">
                    <span className="font-semibold text-gray-500">{v.size}:</span>
                    <span className="font-extrabold text-gray-800">₹{v.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
