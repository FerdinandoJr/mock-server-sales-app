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

      const items = generateOrderItems(orderId)

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
         itemsCount: items.length,
         items: items,
         freight: generateFakeMoney(),
         itemsSubtotal: generateFakeMoney(),
         discountTotal: generateFakeMoney(),
         taxTotal: generateFakeMoney(),
         grandTotal: generateFakeMoney(),
      }
   });
}

// Lista básica de moedas comuns
const currencies = ["BRL"];

function generateFakeMoney(): Money {
  const currency = faker.helpers.arrayElement(currencies);
  const scale = faker.number.int({ min: 0, max: 3 }); // até 4 casas decimais
  const amount = parseInt(faker.finance.amount({ min: 20, max: 500, dec: 0 }));

  return {
    amount,
    currency,
    scale,
  };
}

function getTodayDate(): Date {
   return new Date();
}

function getRandomStatus(): OrderStatus {
   const status = Object.values(OrderStatus);
   return status[Math.floor(Math.random() * status.length)];
}

function generateOrderNote(): string {
   if (Math.random() < 0.5) return "";

   return faker.lorem.sentence();
}


function generateOrderProduct(orderId: number): OrderProduct {
   const price = faker.number.float({ min: 1, max: 100 });
   const quantity = faker.number.int({ min: 1, max: 100 });

   return {
    productUuId: faker.string.uuid(),
    productId: faker.number.int({ min: 1, max: 1000 }),
    name: faker.commerce.productName() +" " + faker.commerce.productName() +" "+ faker.commerce.productName(),
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
  }

}

function generateOrderItems(orderId: number): OrderProduct[] {
   return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, (_, i) => 
      generateOrderProduct(orderId)
   );
}