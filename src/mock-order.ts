import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from "./domain/orderValueObjects/order_status";
import { Order } from "./domain/entities/order";
import { OrderProduct } from "./domain/orderValueObjects/order_product";
import { Money } from "./domain/valueObjects/money";

export function generateMockOrders(count: number): Order[] {
   return Array.from({ length: count }, (_, i) => {
      const orderId = i + 1;
      const customerId = i + 1;

      return {
         orderId,
         orderUuId: uuidv4(),
         serverId: orderId,
         orderCode: orderId.toString().padStart(5, "0"),
         createdAt: new Date(getTodayDate()),
         customerId,
         customerName: faker.person.fullName(),
         status: getRandomStatus(),
         confirmedAt: new Date(getTodayDate()),
         cancelledAt: new Date(getTodayDate()),
         notes: generateOrderNote(),
         items: [generateOrderItems(orderId)],
         freight: calculateFreight(),
         itemsSubtotal: calculateItemsSubtotal(),
         discountTotal: calculateDiscountTotal(),
         taxTotal: calculateTaxTotal(),
         grandTotal: calculateGrandTotal(),
      }
   });
}

function getTodayDate(): Date {
   return new Date();
}

function getRandomStatus(): OrderStatus {
   const status = Object.values(OrderStatus).filter(
      (value) => typeof value === 'number'
   ) as OrderStatus[];

   const randomIndex = Math.floor(Math.random() * status.length);
   return status[randomIndex];
}

function generateOrderNote(): string {
   if (Math.random() < 0.5) return "";

   return faker.lorem.sentence();
}

/// TODO: Arrumar esse trecho
function generateOrderItems(orderId: number): OrderProduct {
  const price = faker.number.float({ min: 1, max: 100 });
  const quantity = faker.number.int({ min: 1, max: 100 });

  return {
    productUuId: faker.string.uuid(),
    productId: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.productName(),
    quantity,
    unitPrice: {
      amount: price,
      currency: 'BRL',
      scale: 2
    } as Money,
    orderId,
    discountAmount: {
      amount: price,
      currency: 'BRL',
      scale: 2
    } as Money,
    taxAmount: {
      amount: price * 0.1,
      currency: 'BRL',
      scale: 2
    } as Money,
  };
}

function calculateFreight() {
   const freightPrice = faker.number.float({
      min: 0,
      max: 50,
   });

   return freightPrice;
}

function calculateItemsSubtotal() {
   const itemsSubtotalPrice = faker.number.float({
      min: 1,
      max: 100,
   });

   return itemsSubtotalPrice;
}

function calculateDiscountTotal() {
   return faker.number.int({min: 1, max: 100});
}

function calculateTaxTotal() {
   const taxTotalPrice = faker.number.float({
      min: 5,
      max: 80,
   });

   return taxTotalPrice;
}

function calculateGrandTotal() {
   const freight = calculateFreight();
   const itemsSubtotal = calculateItemsSubtotal();
   const discount = calculateDiscountTotal();
   const tax = calculateTaxTotal();

   const discountPercent = discount / 100;

   const discountValue = itemsSubtotal * discountPercent;
   const grandTotal = itemsSubtotal + freight + tax - discountValue;

   return grandTotal;
}
