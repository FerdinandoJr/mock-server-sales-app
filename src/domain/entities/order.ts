import { OrderProduct } from "../orderValueObjects/order_product";
import { OrderStatus } from "../orderValueObjects/order_status";

export interface Order {
   orderId: number,
   orderUuId: string,
   orderCode: string,
   createdAt: Date,
   serverId: number,
   customerId: number,
   customerName: string,
   status: OrderStatus,
   confirmedAt: Date,
   cancelledAt: Date,
   notes: string,
   items: OrderProduct[],
   freight: number,
   itemsSubtotal: number,
   discountTotal: number,
   taxTotal: number,
   grandTotal: number
}