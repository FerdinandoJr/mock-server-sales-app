import { Money } from "../valueObjects/money";

export interface OrderProduct {
   productUuId: string,
   productId: number,
   name: string,
   quantity: number,
   unitPrice: Money,
   orderId: number,
   discountAmount: Money,
   taxAmount: Money
}