'use client'

import { useCart } from "@/app/consumer/context/cartcontext/CartContext";
import Image from "next/image";

export default function ExtraCard({
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
  const { dispatch } = useCart();

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

        {/* Bottom: Price + Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-neutral-900">
            ₹{item.variants[0].price}
          </span>

          <button
            className="px-4 py-2 bg-green-900 hover:bg-green-800 active:scale-95 text-white text-sm rounded-lg font-medium transition-all duration-150"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: `${item.name}-${item.variants[0].size}`,
                  name: item.name,
                  quantity: 1,
                  price: item.variants[0].price,
                  size: item.variants[0].size,
                  category: "extra",
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
