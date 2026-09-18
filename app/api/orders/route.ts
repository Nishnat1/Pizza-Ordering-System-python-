import { connectDB } from "@/db/db";
import Order from "@/db/models/order";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find();
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch {
    return NextResponse.json({
      success: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      address,
      city,
      pincode,
      paymentMethod,
      items,
      quantity,
      totalAmount,
    } = body;

    const orderId = crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase();

    const order = new Order({
      orderId,
      user: user.id,
      items,
      quantity,
      totalAmount,
      userInfo: {
        name,
        phone,
        address: {
          line1: address,
          city,
          pincode,
        },
      },
      paymentMethod,
    });

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to place the order",
      },
      { status: 400 },
    );
  }
}
