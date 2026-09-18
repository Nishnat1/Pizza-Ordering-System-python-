"use client";

import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useCart } from "@/app/consumer/context/cartcontext/CartContext";
import { CartItem } from "@/app/consumer/context/cartcontext/CartProvider";
import { createOrder } from "@/lib/createOrder";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PaymentMethod = "UPI" | "CARD" | "COD";

const categoryLabel: Record<CartItem["category"], string> = {
  pizza: "Pizza",
  side: "Side",
  beverage: "Beverage",
  dessert: "Dessert",
  extra: "Extra",
};

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const subtotal = state.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;
  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);

  function validate() {
    const newErrors: Partial<typeof form> = {};
    if (!form.name?.trim()) newErrors.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePlaceOrder() {
    if (state.length === 0) return;
    if (!validate()) return;

    try {
      const data = await createOrder({
        ...form,
        paymentMethod,
        items: state,
        quantity: totalItems,
        totalAmount: total,
      });
      if (data.success) {
        dispatch({ type: "CLEAR_CART" });
        setOrderPlaced(true);
      }
    } catch {
      console.log("unable to process the order");
    }
  }

  /* ── Order Success Screen ── */
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-[bounce_0.6s_ease-in-out]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-14 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 max-w-sm">
          Your pizza is being prepared. Sit tight — it&apos;ll be at your door
          soon!
        </p>
        <div className="mt-4 px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm text-gray-600">
          Estimated delivery:{" "}
          <span className="font-bold text-gray-900">30-40 mins</span>
        </div>
        <button
          onClick={() => router.push("/consumer")}
          className="mt-8 px-8 py-3 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  /* ── Empty Cart Guard ── */
  if (state.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.3 6h12.6L17 13"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Nothing to checkout</h2>
        <p className="text-sm text-gray-400 mt-2">
          Your cart is empty. Add items first!
        </p>
        <button
          onClick={() => router.push("/consumer/order")}
          className="mt-8 px-8 py-3 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4 max-w-5xl mx-auto">
          <button
            id="checkout-back-btn"
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
          <div>
            <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
            <p className="text-xs text-gray-400">
              {totalItems} {totalItems === 1 ? "item" : "items"} · ₹{total}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-32 lg:pb-10 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-5">
          {/* Delivery Details */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-bold text-gray-900">Delivery Details</h2>
              </div>
            </div>
            <div className="px-5 py-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-gray-500 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-green-900/20 focus:border-green-900 ${
                    errors.name
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-gray-500 mb-1.5"
                >
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 font-medium">
                    +91
                  </span>
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="98765 43210"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/, ""),
                      })
                    }
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-green-900/20 focus:border-green-900 ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-gray-500 mb-1.5"
                >
                  Delivery Address
                </label>
                <textarea
                  id="checkout-address"
                  rows={3}
                  placeholder="House / Flat no., Street, Area"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none focus:ring-2 focus:ring-green-900/20 focus:border-green-900 ${
                    errors.address
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="checkout-city"
                  className="block text-xs font-semibold text-gray-500 mb-1.5"
                >
                  City
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  placeholder="Mumbai"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-green-900/20 focus:border-green-900 ${
                    errors.city
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="checkout-pincode"
                  className="block text-xs font-semibold text-gray-500 mb-1.5"
                >
                  Pincode
                </label>
                <input
                  id="checkout-pincode"
                  type="text"
                  placeholder="400001"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pincode: e.target.value.replace(/\D/, ""),
                    })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-green-900/20 focus:border-green-900 ${
                    errors.pincode
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.pincode && (
                  <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-bold text-gray-900">Payment Method</h2>
              </div>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                // {
                //   id: "upi" as PaymentMethod,
                //   label: "UPI",
                //   desc: "Pay via Google Pay, PhonePe, Paytm etc.",
                //   icon: (
                //     <svg
                //       className="size-6 text-indigo-500"
                //       fill="none"
                //       viewBox="0 0 24 24"
                //       stroke="currentColor"
                //       strokeWidth={1.5}
                //     >
                //       <path
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                //       />
                //     </svg>
                //   ),
                // },
                // {
                //   id: "card" as PaymentMethod,
                //   label: "Credit / Debit Card",
                //   desc: "Visa, Mastercard, RuPay",
                //   icon: (
                //     <svg
                //       className="size-6 text-blue-500"
                //       fill="none"
                //       viewBox="0 0 24 24"
                //       stroke="currentColor"
                //       strokeWidth={1.5}
                //     >
                //       <path
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                //       />
                //     </svg>
                //   ),
                // },
                {
                  id: "COD" as PaymentMethod,
                  label: "Cash on Delivery",
                  desc: "Pay when your order arrives",
                  icon: (
                    <svg
                      className="size-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                  ),
                },
              ].map((option) => (
                <label
                  key={option.id}
                  htmlFor={`payment-${option.id}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === option.id
                      ? "border-green-900 bg-green-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <input
                    id={`payment-${option.id}`}
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                    className="sr-only"
                  />
                  <div className="shrink-0">{option.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-400">{option.desc}</p>
                  </div>
                  {/* Custom radio dot */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === option.id
                        ? "border-green-900"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === option.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-900" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Column: Order Summary ── */}
        <div className="space-y-4">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-bold text-gray-900">Order Summary</h2>
              </div>
            </div>

            {/* Items */}
            <div className="px-5 py-3 space-y-3 max-h-72 overflow-y-auto">
              {state.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {categoryLabel[item.category]}
                      {item.size ? ` · ${item.size}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                    <p className="text-xs text-gray-400">×{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="px-5 py-4 border-t border-gray-50 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className="text-green-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxes &amp; charges</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200 text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Delivery estimate */}
            <div className="mx-5 mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 flex items-center gap-3">
              <svg
                className="size-5 text-green-700 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <div>
                <p className="text-xs font-semibold text-green-800">
                  Estimated Delivery
                </p>
                <p className="text-xs text-green-700">30 – 40 minutes</p>
              </div>
            </div>
          </section>

          {/* Place Order button — desktop */}
          <button
            id="place-order-btn"
            onClick={handlePlaceOrder}
            className="hidden lg:flex w-full py-4 rounded-xl bg-green-900 hover:bg-green-800 active:scale-[0.98] text-white font-bold text-base transition-all duration-150 items-center justify-center gap-2 shadow-lg shadow-green-900/20"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Place Order · ₹{total}
          </button>
        </div>
      </main>

      {/* Place Order button — mobile sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 py-4 lg:hidden">
        <button
          id="place-order-mobile-btn"
          onClick={handlePlaceOrder}
          className="w-full py-4 rounded-xl bg-green-900 hover:bg-green-800 active:scale-[0.98] text-white font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
        >
          <svg
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Place Order · ₹{total}
        </button>
      </div>
    </div>
  );
}
