"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OrderNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex text-sm overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin">
      <div className="flex items-center">
        <Link href={"pizzas"}>
          <label
            htmlFor="pizzas"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg font-bold",
              {
                " italic border-b-2 text-green-900":
                  pathname === "/consumer/order/pizzas",
              },
            )}
          >
            Pizzas
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"sides"}>
          <label
            htmlFor="sides"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg font-bold",
              {
                "italic border-b-2 text-green-900":
                  pathname === "/consumer/order/sides",
              },
            )}
          >
            Sides
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"beverages"}>
          <label
            htmlFor="beverages"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg font-bold",
              {
                "italic border-b-2 text-green-900":
                  pathname === "/consumer/order/beverages",
              },
            )}
          >
            Beverages
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"desserts"}>
          <label
            htmlFor="desserts"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg  font-bold",
              {
                "italic border-b-2 text-green-900":
                  pathname === "/consumer/order/desserts",
              },
            )}
          >
            Desserts
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"extras"}>
          <label
            htmlFor="extras"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg font-bold",
              {
                "italic border-b-2 text-green-900":
                  pathname === "/consumer/order/extras",
              },
            )}
          >
            Extras
          </label>
        </Link>
      </div>
    </div>
  );
}
