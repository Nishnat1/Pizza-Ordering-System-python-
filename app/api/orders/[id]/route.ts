import { connectDB } from "@/db/db";
import Order from "@/db/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB;
    const { id } = await params;
    console.log(id)
    const orders = await Order.find({
      user: id,
    });
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
    });
  }
}
