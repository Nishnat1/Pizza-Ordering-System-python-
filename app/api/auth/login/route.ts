// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";
import { connectDB } from "@/db/db";
import User from "@/db/models/user";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { email, password } = body;
  const user = await User.findOne({ email: email });

  const match = await bcrypt.compare(password, user?.password || "");
  if (match) {
    const token = signToken({
      id: user?._id,
      role: user?.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  }
  return NextResponse.json({
    success: false,
  });
}
