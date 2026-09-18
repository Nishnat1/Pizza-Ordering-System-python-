import React from "react";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/db/db";

export const metadata = {
  title: "Admin Dashboard — Pizza",
  description: "Admin control panel for managing orders, menu, and analytics.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();

  let user = null;
  try {
    user = await verifyAuth();
  } catch {
    redirect("/login");
  }

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/consumer");
  }

  return <>{children}</>;
}

