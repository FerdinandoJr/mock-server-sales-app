import { faker } from "@faker-js/faker";
import { StorageProduct } from "./valueObjects/storage_product";

export function generateMockStorageProducts(count: number): StorageProduct[] {
  return Array.from({ length: count }, (_, i) => {
    const productId = i + 1;

    return {
      productId,
      quantity: generateQuantity(),
    }
  });
}

function generateQuantity(): number {
  const qty = faker.number.int({ min: 1, max: 1000 });

  return qty;
}