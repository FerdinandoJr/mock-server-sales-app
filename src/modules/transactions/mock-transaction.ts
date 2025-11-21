import { faker } from "@faker-js/faker";
import { StockTransaction } from "./entities/stock_transaction";
import { OwnerTransaction } from "./valueObjects/owner_transaction";
import { StorageEndpoint } from "./valueObjects/storage_endpoint";
import { StockTransactionItem } from "./valueObjects/stock_transaction_item";
import { TransactionType } from "./valueObjects/transaction_type";

export function generateMockTransactions(count: number): StockTransaction[] {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const orderId = i + 1;

    const typeValues = Object.values(TransactionType);
    const type = typeValues[Math.floor(Math.random() * typeValues.length)];

    return {
      id,
      code: id.toString().padStart(5, "0"),
      serverId: id,
      ownerTransaction: generateOwnerTransaction(),
      description: faker.commerce.productDescription(),
      orderId: orderId,
      createAt: getTodayDate(),
      type: type,
      fromStorage: getFromStorage(),
      toStorage: getToStorage(),
      items: generateStockTransactionItem(),
    }
  });
}

function generateOwnerTransaction(): OwnerTransaction {
  const userId = faker.number.int({ min: 1, max: 1000 });

  return {
    userId: userId,
    userCode: userId.toString().padStart(5, "0"),
    userName: faker.person.fullName(),
  }
}

function getFromStorage(): StorageEndpoint {
  const storageId = faker.number.int({ min: 1, max: 1000 });

  return {
    storageId: storageId,
    storageCode: storageId.toString().padStart(5, "0"),
    storageName: faker.company.name(),
    ownerName: faker.person.firstName(),
  }
}

function getToStorage(): StorageEndpoint {
  const storageId = faker.number.int({ min: 1, max: 1000 });

  return {
    storageId: storageId,
    storageCode: storageId.toString().padStart(5, "0"),
    storageName: faker.company.name(),
    ownerName: faker.person.firstName(),
  }
}

function generateStockTransactionItem(): StockTransactionItem[] {
  const id = faker.number.int({ min: 1, max: 1000 });
  const movementId = faker.number.int({ min: 1, max: 1000 });
  const productId = faker.number.int({ min: 1, max: 1000 });
  const quantity = faker.number.int({ min: 1, max: 10000 });

  return [{
    id: id,
    code: id.toString().padStart(5, "0"),
    serverId: id,
    movementId: movementId,
    productId: productId,
    productCode: id.toString().padStart(5, "0"),
    productName: faker.commerce.productName(),
    quantity: quantity,
  }]
}

function getTodayDate(): Date {
  return new Date();
}