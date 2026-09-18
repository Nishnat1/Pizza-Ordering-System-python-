export type OrderStatus = "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";

export type Order = {
  _id: string;
  orderId: string;
  user: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    size: string;
    crust: string;
    category: string;
    image: string;
    isVeg: boolean;
  }[];
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  userInfo: {
    name: string;
    phone: string;
    address: { line1: string; city: string; pincode: string };
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};



export type StatusConfig = {
  PENDING: {
    label: string;
    bg: string;
    text: string;
    dot: string;
  };
  PREPARING: {
    label: string;
    bg: string;
    text: string;
    dot: string;
  };
  DELIVERED: {
    label: string;
    bg: string;
    text: string;
    dot: string;
  };
  CANCELLED: {
    label: string;
    bg: string;
    text: string;
    dot: string;
  };
};

