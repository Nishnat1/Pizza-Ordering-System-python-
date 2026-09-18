import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/db/models/user";
import { connectDB } from "@/db/db";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { name, email, password, role = "USER" } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    return NextResponse.json({
      success: true,
      message: "User Created Successfully",
    });
  }

  return NextResponse.json({
    success: false,
  });
}
