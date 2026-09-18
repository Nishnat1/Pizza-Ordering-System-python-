"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import passwordValidator from "./(utils)/passwordValidator";
import passwordMatching from "./(utils)/passwordMatching";

type ActionState = {
  success: boolean;
  message: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isPasswordValid = passwordValidator(password);
  const isPasswordMatching = passwordMatching(password, confirmPassword);

  const signupAction = async (
    previousState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const signupData = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (data.success) {
        return { success: true, message: "Account created successfully!" };
      }
      return {
        success: false,
        message: data.message || "Unable to create account. Please try again.",
      };
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  };

  const [state, formAction, pending] = useActionState(signupAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state, router]);

  const canSubmit = isPasswordValid && isPasswordMatching && termsAccepted;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex-col items-center justify-center p-12 overflow-hidden">
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
          <h1 className="text-4xl font-bold text-white mb-3">Join Pizza</h1>
          <p className="text-green-200 text-lg max-w-xs">
            Create your account and unlock exclusive deals on your favourite
            pizzas.
          </p>
          <div className="mt-10 space-y-3 text-left">
            {[
              "Free delivery on your first order",
              "Exclusive member-only deals",
              "Track orders in real-time",
              "Save your favourite customizations",
            ].map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-400/30 flex items-center justify-center shrink-0">
                  <Check size={13} className="text-green-300" />
                </div>
                <span className="text-sm text-green-100">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-1 items-start justify-center px-6 py-10 overflow-y-auto">
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
            <h2 className="text-3xl font-bold text-zinc-900">Create account</h2>
            <p className="mt-2 text-zinc-500">
              Join Pizza and start ordering your favourite meals
            </p>
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
              or sign up with email
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Error Banner */}
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
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition-all focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition-all focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-zinc-50 px-4 py-3 pr-12 text-sm outline-none transition-all focus:bg-white focus:ring-2 ${
                    password.length > 0
                      ? isPasswordValid
                        ? "border-green-500 focus:ring-green-900/10 focus:border-green-900"
                        : "border-red-400 focus:ring-red-500/10 focus:border-red-500"
                      : "border-zinc-200 focus:border-green-900 focus:ring-green-900/10"
                  }`}
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

              {/* Password rule*/}
              {password.length > 0 && !isPasswordValid && (
                <div className="text-xs text-red-500 space-y-1.5">
                  Password must contain at least 8 characters, 1 capital letter,
                  1 number and at least a special character.
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="block text-sm font-medium text-zinc-700 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  required
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-zinc-50 px-4 py-3 pr-12 text-sm outline-none transition-all focus:bg-white focus:ring-2 ${
                    confirmPassword.length > 0
                      ? isPasswordMatching
                        ? "border-green-500 focus:ring-green-900/10 focus:border-green-900"
                        : "border-red-400 focus:ring-red-500/10 focus:border-red-500"
                      : "border-zinc-200 focus:border-green-900 focus:ring-green-900/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p
                  className={`mt-1.5 text-xs flex items-center gap-1 ${isPasswordMatching ? "text-green-600" : "text-red-500"}`}
                >
                  {isPasswordMatching ? (
                    <>
                      <Check size={12} /> Passwords match
                    </>
                  ) : (
                    <>
                      <X size={12} /> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-zinc-300 accent-green-900 shrink-0"
              />
              <span className="text-sm text-zinc-600 leading-relaxed">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-green-900 hover:underline"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-green-900 hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending || !canSubmit}
              id="signup-submit-btn"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-900 font-semibold text-white transition-all hover:bg-green-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
            >
              {pending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-900 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
