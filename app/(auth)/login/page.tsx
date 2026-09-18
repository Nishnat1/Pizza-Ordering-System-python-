"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginData } from "../context/AuthProvider";

type ActionState = {
  success: boolean;
  message: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const loginAction = async (
    previousState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const loginData = Object.fromEntries(formData.entries());
    try {
      const success = await login(loginData as LoginData);
      if (success) {
        return { success: true, message: "Login successful" };
      }
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  };

  const [state, formAction, pending] = useActionState(loginAction, {
    success: false,
    message: "",
  });

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-green-950 via-green-900 to-green-800 flex-col items-center justify-center p-12 overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5" />

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
              >
                <path d="M519.232137 503.49783l267.977124-443.100669s195.514642 98.992076 221.338662 334.724454C594.799146 485.36457 519.232137 503.49783 519.232137 503.49783z" />
                <path
                  d="M426.872459 568.340109l209.202784-354.198305c-61.314408-36.26652-132.789086-57.151519-209.202784-57.151519-227.194929 0-411.349824 184.154896-411.349824 411.349824s184.154896 411.349824 411.349824 411.349824 411.349824-184.154896 411.349824-411.349824c0-31.609729-3.668986-62.302212-10.442499-91.865776L426.872459 568.340109z"
                  opacity="0.7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Pizza</h1>
          <p className="text-green-200 text-lg max-w-xs">
            Hot, fresh, delicious — delivered straight to your door.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "50+", label: "Menu Items" },
              { value: "30min", label: "Avg Delivery" },
              { value: "4.8★", label: "Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 rounded-2xl px-4 py-3"
              >
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-green-300 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-zinc-900">Welcome back</h2>
            <p className="mt-2 text-zinc-500">Sign in to your Pizza account</p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="mb-5 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-sm font-medium text-sm text-zinc-700"
          >
            <Image src="/google.svg" alt="Google" height={18} width={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400 font-medium">
              or sign in with email
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Error / Success Banner */}
          {state.message && !state.success && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <svg
                className="size-5 text-red-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-sm text-red-700">{state.message}</p>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition-all focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-green-900 hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                className="w-4 h-4 rounded border-zinc-300 accent-green-900"
              />
              <span className="text-sm text-zinc-600">
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              id="login-submit-btn"
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-900 font-semibold text-white transition-all hover:bg-green-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
            >
              {pending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-900 hover:underline"
            >
              Create Account
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-zinc-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-zinc-600">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-zinc-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
