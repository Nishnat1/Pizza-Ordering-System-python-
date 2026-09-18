'use client'

import { createContext, useContext } from "react";
import { Action, CartItem } from "./CartProvider";

export type CartContextType = {
  state: CartItem[];
  dispatch: React.Dispatch<Action>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
