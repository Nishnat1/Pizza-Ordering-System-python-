"use client";

import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useCart } from "@/app/consumer/context/cartcontext/CartContext";
import { CartItem } from "@/app/consumer/context/cartcontext/CartProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categoryColors: Record<CartItem["category"], string> = {
  pizza: "bg-orange-100 text-orange-700",
  side: "bg-yellow-100 text-yellow-700",
  beverage: "bg-blue-100 text-blue-700",
  dessert: "bg-pink-100 text-pink-700",
  extra: "bg-purple-100 text-purple-700",
};

const categoryLabel: Record<CartItem["category"], string> = {
  pizza: "Pizza",
  side: "Side",
  beverage: "Beverage",
  dessert: "Dessert",
  extra: "Extra",
};

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharges = subtotal < 500 ? 50 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharges + taxes;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <button
            id="cart-back-btn"
            onClick={() => router.back()}
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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Your Cart</h1>
            {state.length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>
            )}
          </div>
          {state.length > 0 && (
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-1.5 rounded-full border border-red-200 hover:border-red-400"
            >
              Clear all
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-40">
        {state.length > 0 ? (
          <div className="space-y-3">
            {state.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h2 className="font-semibold text-sm text-gray-900 leading-snug">
                      {item.name}
                    </h2>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: { id: item.id },
                        })
                      }
                      className="shrink-0 ml-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${categoryColors[item.category]}`}
                    >
                      {categoryLabel[item.category]}
                    </span>
                    {item.size && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold">
                        {item.size}
                      </span>
                    )}
                    {item.crust && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                        {item.crust === "original"
                          ? "Original"
                          : "Thin & Crispy"}
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 ${
                        item.isVeg
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-500"}`}
                      />
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  {/* Price + Qty */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, delta: -1 },
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-base transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, delta: 1 },
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-900 hover:bg-green-800 text-white font-bold text-base transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add more items CTA */}
            <button
              onClick={() => router.push("/consumer/order")}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-green-300 text-green-800 text-sm font-medium hover:border-green-500 hover:bg-green-50 transition-all"
            >
              + Add more items
            </button>
          </div>
        ) : (
          /* Empty cart state */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-20 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.3 6h12.6L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Looks like you haven&apos;t added anything yet. Browse our menu
              and add your favourites!
            </p>
            <button
              onClick={() => router.push("/consumer/order")}
              className="mt-8 px-8 py-3 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        )}
      </main>

      {/* Sticky Footer — only when cart has items */}
      {state.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-lg mx-auto px-4 pt-3 pb-5">
            {/* Price breakdown */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery fee</span>
                <span className="text-green-700 font-semibold">
                  {" "}
                  {deliveryCharges > 0 ? `₹${deliveryCharges}` : "FREE"}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxes &amp; charges (5%)</span>
                <span>₹{taxes}</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-bold text-gray-900 border-t border-dashed border-gray-200 py-2 mb-3">
              <span>Total</span>
              <span className="text-lg">₹{total}</span>
            </div>

            <button
              id="cart-page-checkout-btn"
              onClick={() => {
                console.log(isAuthenticated);
                if (isAuthenticated) {
                  router.push("/consumer/checkout");
                } else {
                  router.push("/login");
                }
              }}
              className="w-full py-3.5 rounded-xl bg-green-900 hover:bg-green-800 active:scale-[0.98] text-white font-bold text-base transition-all duration-150 shadow-lg shadow-green-900/20"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
