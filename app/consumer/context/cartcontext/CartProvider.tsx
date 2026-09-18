'use client'

import { useReducer } from "react";
import { CartContext } from "./CartContext";

export type CartItem = {
  id: string;          // unique: name + size + crust
  name: string;
  price: number;
  quantity: number;
  size: string;
  crust?: string;      // only for pizzas & sides
  category: "pizza" | "side" | "beverage" | "dessert" | "extra";
  image: string;
  isVeg: boolean;
};

export type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; delta: number } }
  | { type: "CLEAR_CART" };

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      }
      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    case "UPDATE_QUANTITY": {
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.delta }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
