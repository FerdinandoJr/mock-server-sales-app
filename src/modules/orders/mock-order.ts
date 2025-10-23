import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';
import { Order } from "./entities/order";
import { Money } from "../../domain/valueObjects/money";
import { OrderStatus } from "./valuesObjects/order_status";
import { OrderProduct } from "./valuesObjects/order_product";
import { Image } from "../products/valuesObjects/image";
import { OrderCustomer } from "./valuesObjects/order_customer";
import { PaymentMethod, PaymentMethodName } from "../../domain/valueObjects/payment-method";
import { ContactInfo } from "../../domain/valueObjects/contact-info";
import { Phone, PhoneType, PhoneTypeName } from "../../domain/valueObjects/phone";


export function generateMockOrders(count: number): Order[] {
   return Array.from({ length: count }, (_, i) => {
      const orderId = i + 1;
      const customerId = i + 1;

      const items = generateOrderItems(orderId)
      const customers = generateOrderCustomers(orderId)
      const total = items.reduce((acc, it) => {
        return acc + (((it.unitPrice.amount / 100) * it.quantity) - ((it.discountAmount.amount / 100)) + ((it.taxAmount.amount / 100)));
      }, 0);

      const totalMoney = generateFakeMoney()
      totalMoney.amount = total * 100


      // const orderPayment = 0

      return {
         orderId,
         orderUuId: uuidv4(),
         serverId: orderId,
         orderCode: orderId.toString().padStart(5, "0"),
         createdAt: new Date(getTodayDate()),
         status: getRandomStatus(),
         confirmedAt: new Date(getTodayDate()),
         cancelledAt: new Date(getTodayDate()),
         notes: generateOrderNote(),
         itemsCount: items.length,
         total: totalMoney,
         items: items,
         customer: customers,
        //  orderPayment: orderPayment,
         paymentMethod: generateUniquePaymentMethods(),
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
  const scale = 2; // faker.number.int({ min: 0, max: 3 }); // até 4 casas decimais
  const amount = faker.number.int({ min: 20, max: 500});

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
    const productId = faker.number.int({ min: 1, max: 1000 });
    const quantity = faker.number.int({ min: 1, max: 100 });

   return {
    productUuId: faker.string.uuid(),
    productId: productId,
    productCode: productId.toString().padStart(5, "0"),
    name: faker.commerce.productName() +" " + faker.commerce.productName() +" "+ faker.commerce.productName(),
    quantity,
    unitPrice: generateFakeMoney(),
    orderId,
    discountAmount: generateFakeMoney(),
    taxAmount: generateFakeMoney(),
    images: getRandomImage(),
  }
}

const localImages = [
  'img1.jpg',
  'img2.png',
  'img3.webp',
  'img4.webp',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.webp',
  'img9.webp',
  'img10.webp'
];

// Função para pegar imagem aleatória
function getRandomImage() : Image[] {
  const count = Math.floor(Math.random() * 6); // 0 até 5
  const images = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    images.push({
        imageId: i + 1,
        url: `http://192.168.254.26:3000/images/${localImages[randomIndex]}`
    });
  }
  return images;
}

function generateOrderItems(orderId: number): OrderProduct[] {
   return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, (_, i) => 
      generateOrderProduct(orderId)
   );
}

function generateOrderCustomers(orderId: number): OrderCustomer {
   return {
      customerId: faker.number.int({ min: 1, max: 1000 }),
      customerCode: faker.string.alphanumeric(8),
      customerUuId: faker.string.uuid(),
      customerName: faker.person.fullName(),
      contactInfo: [generateFakeContactInfo()],
      cpf: { 'value' :  faker.string.numeric(11)},
      cnpj: { 'value' : faker.string.numeric(14)},
      orderId,
   }
}

function generateUniquePaymentMethods(): PaymentMethodName[] {
  const types = Object.keys(PaymentMethod).filter(k => isNaN(Number(k))) as PaymentMethodName[];

  // embaralha os valores
  const shuffled = faker.helpers.shuffle(types);

  const count = faker.datatype.boolean() ? faker.number.int({min: 1, max: 4 }) : null
  // se não passar count, retorna todos
  return shuffled.slice(0, count ?? types.length);
}

function generateFakeContactInfo(isPrimary = false): ContactInfo {
  return {
    name: faker.person.fullName(),
    email: { value: faker.internet.email() },
    phone: generateFakePhone(),
    isPrimary,
  };
}

function generateFakePhone(): Phone {
  // escolhe tipo de telefone aleatório
  const types = Object.keys(PhoneType).filter(k => isNaN(Number(k))) as PhoneTypeName[];
  const type = faker.helpers.arrayElement(types);

  let number: string;
  switch (type) {
    case 'mobile':
    case 'whatsapp':
      number = faker.location.zipCode('+55 ## 9####-####'); // padrão BR celular
      break;
    case 'landline':
      number = faker.location.zipCode('+55 ## ####-####'); // fixo
      break;
    default:
      number = faker.location.zipCode('+55 ## ####-####'); // fallback
  }

  return {
    value: number,
    type,
  };
}