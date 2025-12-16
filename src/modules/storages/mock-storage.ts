import { faker } from "@faker-js/faker";
import { Storage } from "./entities/storage";

export function generateMockStorages(count: number): Storage[] {
   return Array.from({ length: count }, (_, i) => {
      const storageId = i + 1;

      return {
         storageId,
         name: faker.company.name(),
         description: faker.company.catchPhraseDescriptor(),
         isActive: getActive(),
         updateAt: new Date(getTodayDate()), // Rever isso aqui
      }
   });
}

function getActive(): boolean {
   return faker.datatype.boolean();
}

function getTodayDate(): Date {
   return new Date();
}