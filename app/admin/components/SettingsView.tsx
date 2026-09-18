import React, { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface SettingsViewProps {
  admins: AdminUser[];
  onAddAdmin: (adminData: Record<string, string>) => Promise<{ success: boolean; message: string }>;
}

export default function SettingsView({ admins, onAddAdmin }: SettingsViewProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formData.password.length < 8) {
      setMessage({ success: false, text: "Password must be at least 8 characters long" });
      return;
    }

    startTransition(async () => {
      try {
        const result = await onAddAdmin(formData);
        if (result.success) {
          setMessage({ success: true, text: result.message });
          setFormData({ name: "", email: "", password: "" });
        } else {
          setMessage({ success: false, text: result.message });
        }
      } catch (err: any) {
        setMessage({ success: false, text: err.message || "An unexpected error occurred" });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left panel: Add Administrator Form */}
      <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-fit">
        <div>
          <div className="border-b border-gray-50 pb-4 mb-4">
            <h3 className="font-bold text-gray-950 text-base">Add New Admin</h3>
            <p className="text-xs text-gray-400 mt-0.5">Register a real administrative account</p>
          </div>

          {/* Banner notification */}
          {message && (
            <div className={`p-3 rounded-xl text-xs font-semibold mb-4 border ${
              message.success
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <p>{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                disabled={isPending}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@pizza.com"
                disabled={isPending}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                disabled={isPending}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex h-10 items-center justify-center gap-2 rounded-xl bg-green-900 font-semibold text-xs text-white transition-all hover:bg-green-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                "Register Administrator"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right panel: Active Administrators list */}
      <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div className="border-b border-gray-50 pb-4 mb-4">
          <h3 className="font-bold text-gray-950 text-base">Active Administrators</h3>
          <p className="text-xs text-gray-400 mt-0.5">Users holding dashboard and order modification access</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3 text-right">Added Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {admins.map((admin) => {
                const dateStr = new Date(admin.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={admin._id} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center">
                        {admin.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">{admin.name}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-xs">{admin.email}</td>
                    <td className="px-4 py-3.5 text-right text-xs text-gray-400">{dateStr}</td>
                  </tr>
                );
              })}

              {admins.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-xs text-gray-400">
                    No administrators found in system
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
