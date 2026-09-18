"use client";

import { useState } from "react";

export default function PizzaCustomizerPage({
  params,
}: {
  params: Promise<{ pizzaId: string }>;
}) {
  const [size, setSize] = useState("Large");
  const [crust, setCrust] = useState("Original");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="grid lg:grid-cols-[45%_55%]">
          {/* LEFT PANEL */}
          <div className="border-r border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
              alt="Pizza"
              className="h-80 w-full object-cover"
            />

            <div className="p-6">
              <h1 className="text-4xl font-bold text-gray-900">Margherita</h1>

              <p className="mt-3 text-gray-600">
                Pizza sauce and molten mozzarella cheese in perfect harmony. A
                classic favorite for every pizza lover.
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold">Allergens</h3>

                <div className="flex gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                    Milk
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                    Wheat
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                    Soy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Customize Your Pizza</h2>

              <button className="text-2xl text-gray-500">×</button>
            </div>

            {/* SIZE */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Choose Size</h3>

              <div className="grid grid-cols-3 gap-3">
                {["Small", "Medium", "Large"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`rounded-xl border p-4 transition ${
                      size === item
                        ? "border-green-700 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="font-medium">{item}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* CRUST */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Choose Crust</h3>

              <div className="space-y-3">
                {["Original", "Thin Crust", "Cheese Burst"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCrust(item)}
                    className={`w-full rounded-xl border p-4 text-left ${
                      crust === item
                        ? "border-green-700 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* TOPPINGS */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Included Toppings</h3>

              <div className="space-y-3">
                {["Mozzarella Cheese", "Tomato Sauce", "Oregano"].map(
                  (item) => (
                    <div
                      key={item}
                      className="border rounded-xl p-4 flex items-center justify-between"
                    >
                      <span>{item}</span>

                      <div className="bg-green-800 text-white rounded-lg px-4 py-2 text-sm">
                        Regular
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Quantity</h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-lg border"
                >
                  -
                </button>

                <span className="text-lg font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-10 w-10 rounded-lg border"
                >
                  +
                </button>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mt-8 border rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between">
                <span>Size</span>
                <span>{size}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Crust</span>
                <span>{crust}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
            </div>

            {/* ADD TO CART */}
            <div className="mt-auto pt-8">
              <button className="w-full bg-green-800 hover:bg-green-900 text-white py-4 rounded-2xl text-lg font-semibold">
                Add To Cart ₹399
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
