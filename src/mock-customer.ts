
import { faker } from '@faker-js/faker';
import { CompanyCustomer, Customer, CustomerType, PersonCustomer } from "./domain/entities/customer";

// Função que usa faker para criar dados variados
export function generateMockCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, i) => {
    const customerId = i + 1;
    const runtimeType: CustomerType = faker.datatype.boolean() ? 'person' : 'company';
    const base = {
      customerId,
      customerCode: customerId.toString().padStart(5, "0"),
      address: {
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.streetAddress(),
        cep: { 'value' :  faker.location.zipCode('#####-###')},
      },
      email: { 'value' :  faker.internet.email()},
      phones: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => ({ 'value' :  faker.phone.number()})
      ),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      runtimeType,
    };

    if (runtimeType === 'person') {
      const person: PersonCustomer = {
        ...base,
        runtimeType: 'person',
        fullName: faker.person.fullName(),
        cpf: { 'value' :  faker.string.numeric(11)},
      };
      return person;
    } else {
      const company: CompanyCustomer = {
        ...base,
        runtimeType: 'company',
        legalName: faker.company.name(),
        tradeName: faker.company.name(),
        cnpj: { 'value' :  faker.string.numeric(14)},
      };
      return company;
    }
  });
}