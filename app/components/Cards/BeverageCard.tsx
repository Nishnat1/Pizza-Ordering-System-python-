'use client'

import { useCart } from "@/app/consumer/context/cartcontext/CartContext";
import Image from "next/image";
import { useState } from "react";

export default function BeverageCard({
  item,
}: {
  item: {
    image: string;
    name: string;
    description: string;
    variants: {
      size: string;
      price: number;
    }[];
    isVeg: boolean;
  };
}) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { dispatch } = useCart();

  const selectedVariant = item.variants[selectedVariantIndex];

  return (
    <div className="border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all duration-200 rounded-xl flex flex-col w-full bg-white">
      {/* Product Image */}
      <div className="relative h-44 overflow-hidden rounded-t-xl bg-gray-100">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        {/* Veg/Non-Veg badge */}
        <div className="absolute top-2 left-2 bg-white rounded-md p-0.5 shadow-sm">
          <Image
            src={item.isVeg ? "/veg.png" : "/non-veg.png"}
            alt={item.isVeg ? "Veg" : "Non Veg"}
            width={18}
            height={18}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Product Name & Description */}
        <div className="flex-1">
          <h3 className="font-semibold text-base text-gray-900 leading-snug">
            {item.name.toUpperCase()}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Size selector (only shown if multiple variants exist) */}
        {item.variants.length > 1 && (
          <div className="relative mt-4">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-600 z-10">
              Size
            </label>
            <select
              value={selectedVariantIndex}
              className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:border-green-700"
              onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
            >
              {item.variants.map((v, index) => (
                <option key={index} value={index}>
                  {v.size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Bottom: Price + Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-neutral-900">
            ₹{selectedVariant.price}
          </span>

          <button
            className="px-4 py-2 bg-green-900 hover:bg-green-800 active:scale-95 text-white text-sm rounded-lg font-medium transition-all duration-150"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: `${item.name}-${selectedVariant.size}`,
                  name: item.name,
                  quantity: 1,
                  price: selectedVariant.price,
                  size: selectedVariant.size,
                  category: "beverage",
                  image: item.image,
                  isVeg: item.isVeg,
                },
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
