import { Image } from "../productValueObjects/image";
import { Money } from "../valueObjects/money";

export interface OrderProduct {
   productUuId: string,
   productId: number,
   productCode: string,
   name: string,
   quantity: number,
   unitPrice: Money,
   images: Image[],
   orderId: number,
   discountAmount: Money,
   taxAmount: Money
}