import { faker } from "@faker-js/faker";
import { Storage } from "./entities/storage";
import { generateMockStorageProducts } from "./mock-storage.product";

export function generateMockStorages(count: number): Storage[] {
   return Array.from({ length: count }, (_, i) => {
      const storageId = i + 1;

      return {
         storageId,
         name: faker.company.name(),
         description: faker.company.catchPhraseDescriptor(),
         isActive: getActive(),
         updatedAt: getTodayDate(),
         products: generateMockStorageProducts(
            faker.number.int({ min: 1, max: 20 })
         )
      }
   });
}

function getActive(): boolean {
   return faker.datatype.boolean();
}

function getTodayDate(): Date {
   return new Date();
}