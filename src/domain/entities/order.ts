import { OrderCustomer } from "../orderValueObjects/order_customer";
import { OrderProduct } from "../orderValueObjects/order_product";
import { OrderStatus } from "../orderValueObjects/order_status";
import { Money } from "../valueObjects/money";
import { PaymentMethod } from "../valueObjects/payment-method";

export interface Order {
   orderId: number,
   orderUuId: string,
   orderCode: string,
   createdAt: Date,
   serverId: number,
   customer: OrderCustomer,
   status: OrderStatus,
   confirmedAt: Date,
   cancelledAt: Date,
   notes: string,
   itemsCount: number,
   items: OrderProduct[],
   paymentMethod: PaymentMethod[]
   freight: Money,
   itemsSubtotal: Money,
   discountTotal: Money,
   taxTotal: Money,
   grandTotal: Money
}