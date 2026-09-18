import OrderList from "./orderlist";
import fetchOrder from "@/lib/fetchOrder";
import { Order } from "./ordertypes";

export default async function OrdersPage() {
  
  const orders: Order[] = await fetchOrder();
  return (
          <OrderList orders={orders} />
  );
}
