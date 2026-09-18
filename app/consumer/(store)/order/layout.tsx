"use client";

import Cart from "@/app/components/Cart/Cart";
import OrderNavBar from "@/app/components/NavBar/OrderNavBar";
import SearchBar from "@/app/components/htmlcomponents/SearchBar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  return (
    <div className="flex h-[calc(100vh-72px)] border-t border-gray-300">
      {/* Left Section */}
      <div className="flex flex-col w-full lg:w-3/4 lg:border-r border-gray-300 overflow-hidden">
        <div className="px-4 md:px-10 py-5">
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <OrderNavBar />

        <div className="flex-1 overflow-y-auto scrollbar-thin">{children}</div>
      </div>

      {/* Cart */}
      <div className="hidden lg:block w-1/4 border-l border-gray-300">
        <Cart />
      </div>
    </div>
  );
}
