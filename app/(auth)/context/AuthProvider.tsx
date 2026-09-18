"use client";

import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (loginData: LoginData) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "LOGIN",
        payload: data.user,
      });
      if (data.user.role === "USER") {
        router.push("/consumer");
      } else if (data.user.role === "ADMIN") {
        router.push("/admin");
      }
    }
    return data.success;
  };

  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "LOGIN", payload: data.user });
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
