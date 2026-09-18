import mongoose from "mongoose";
import User from "./user";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },

    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        crust: String,
        category: {
          type: String,
          enum: ["pizza", "side", "beverage", "dessert", "extra"],
        },
        image: String,
        isVeg: Boolean,
      },
    ],

    quantity: Number,

    totalAmount: Number,

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT-FOR-DELIVEREY",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "PENDING",
    },

    userInfo: {
      name: String,
      phone: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"],
      },
      address: {
        line1: String,
        city: String,
        pincode: {
          type: String,
          required: true,
          match: [/^[1-9][0-9]{5}$/, "Please enter a valid PIN code"],
        },
      },
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD", "NET_BANKING", "WALLET"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
