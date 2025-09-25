import { OrderProduct } from "../orderValueObjects/order_product";
import { OrderStatus } from "../orderValueObjects/order_status";
import { Money } from "../valueObjects/money";

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
   itemsCount: number,
   items: OrderProduct[],
   freight: Money,
   itemsSubtotal: Money,
   discountTotal: Money,
   taxTotal: Money,
   grandTotal: Money
}