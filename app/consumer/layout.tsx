import React from "react";
import { CartProvider } from "./context/cartcontext/CartProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <CartProvider>{children}</CartProvider>
  );
}
