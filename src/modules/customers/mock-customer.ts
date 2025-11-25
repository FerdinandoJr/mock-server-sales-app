
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CompanyCustomer, Customer, CustomerType, PersonCustomer } from './entities/customer';
import { TaxRegime, TaxRegimeName } from '../../domain/valueObjects/tax-regime';
import { StateRegistration } from '../../domain/valueObjects/state-registration';
import { CreditLimit } from '../../domain/valueObjects/credit-limit';
import { Money } from '../../domain/valueObjects/money';
import { Phone, PhoneType, PhoneTypeName } from '../../domain/valueObjects/phone';
import { ContactInfo } from '../../domain/valueObjects/contact-info';
import { PaymentMethod, PaymentMethodName } from '../../domain/valueObjects/payment-method';
import { Address } from "../../domain/valueObjects/address";
import { BrazilianState } from '../../domain/valueObjects/brazilian-state';

// Função que usa faker para criar dados variados
export function generateMockCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, i) => {
    const customerId = i + 1;
    const runtimeType: CustomerType = faker.datatype.boolean() ? 'person' : 'company';
    const base: Customer = {
      customerId,
      customerUuId: uuidv4(),
      serverId: customerId, // Id do banco de dados
      customerCode: customerId.toString().padStart(5, "0"),
      addresses: generateFakerAddressList(),
      paymentMethods: generateUniquePaymentMethods(),
      taxRegime: faker.helpers.arrayElement(Object.keys(TaxRegime).filter(k => isNaN(Number(k))) as TaxRegimeName[]),
      contacts: generateFakeContactList(),
      notes: faker.datatype.boolean() ? faker.lorem.text() : null,
      creditLimit: generateFakeCreditLimit(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      runtimeType,
    };

    if (runtimeType === 'person') {
      const person: PersonCustomer = {
        ...base,
        runtimeType: 'person',
        fullName: faker.person.fullName(),
        cpf: faker.string.numeric(11),
      };
      return person;
    } 

    const company: CompanyCustomer = {
        ...base,
        runtimeType: 'company',
        legalName: faker.company.name(),
        tradeName: faker.company.name(),
        businessSector: faker.commerce.department(),
        cnpj: faker.string.numeric(14),
        stateRegistration: generateFakeStateRegistration()
      };
      return company;
  });
}

const stateRegRules: Record<BrazilianState, { size: number; format: (s: string) => string }> = {
  [BrazilianState.AC]: { size: 13, format: s => `${s.substring(0,2)}.${s.substring(2,5)}.${s.substring(5,8)}/${s.substring(8,11)}-${s.substring(11)}` },
  [BrazilianState.AL]: { size: 9, format: s => s },
  [BrazilianState.AM]: { size: 9, format: s => `${s.substring(0,2)}.${s.substring(2,5)}.${s.substring(5,8)}-${s.substring(8)}` },
  [BrazilianState.AP]: { size: 9, format: s => s },
  [BrazilianState.BA]: { size: 9, format: s => `${s.substring(0,3)}.${s.substring(3,6)}.${s.substring(6,8)}-${s.substring(8)}` },
  [BrazilianState.CE]: { size: 9, format: s => `${s.substring(0,8)}-${s.substring(8)}` },
  [BrazilianState.DF]: { size: 13, format: s => `${s.substring(0,11)}-${s.substring(11)}` },
  [BrazilianState.ES]: { size: 9, format: s => `${s.substring(0,3)}.${s.substring(3,6)}.${s.substring(6,8)}-${s.substring(8)}` },
  [BrazilianState.GO]: { size: 9, format: s => `${s.substring(0,2)}.${s.substring(2,5)}.${s.substring(5,8)}-${s.substring(8)}` },
  [BrazilianState.MA]: { size: 9, format: s => s },
  [BrazilianState.MG]: { size: 13, format: s => `${s.substring(0,3)}.${s.substring(3,6)}.${s.substring(6,9)}/${s.substring(9)}` },
  [BrazilianState.MS]: { size: 9, format: s => s },
  [BrazilianState.MT]: { size: 9, format: s => s },
  [BrazilianState.PA]: { size: 9, format: s => `${s.substring(0,2)}-${s.substring(2,8)}-${s.substring(8)}` },
  [BrazilianState.PB]: { size: 9, format: s => `${s.substring(0,8)}-${s.substring(8)}` },
  [BrazilianState.PE]: { size: 14, format: s => `${s.substring(0,2)}.${s.substring(2,3)}.${s.substring(3,6)}.${s.substring(6,13)}-${s.substring(13)}` },
  [BrazilianState.PI]: { size: 9, format: s => s },
  [BrazilianState.PR]: { size: 10, format: s => `${s.substring(0,8)}-${s.substring(8)}` },
  [BrazilianState.RJ]: { size: 8, format: s => `${s.substring(0,2)}.${s.substring(2,5)}.${s.substring(5,7)}-${s.substring(7)}` },
  [BrazilianState.RN]: { size: 9, format: s => `${s.substring(0,2)}.${s.substring(2,5)}.${s.substring(5,8)}-${s.substring(8)}` },
  [BrazilianState.RO]: { size: 9, format: s => `${s.substring(0,3)}.${s.substring(3,8)}-${s.substring(8)}` },
  [BrazilianState.RR]: { size: 9, format: s => `${s.substring(0,8)}-${s.substring(8)}` },
  [BrazilianState.RS]: { size: 10, format: s => `${s.substring(0,3)}-${s.substring(3)}` },
  [BrazilianState.SC]: { size: 9, format: s => `${s.substring(0,3)}.${s.substring(3,6)}.${s.substring(6)}` },
  [BrazilianState.SE]: { size: 10, format: s => `${s.substring(0,9)}-${s.substring(9)}` },
  [BrazilianState.SP]: { size: 12, format: s => `${s.substring(0,3)}.${s.substring(3,6)}.${s.substring(6,9)}.${s.substring(9)}` },
  [BrazilianState.TO]: { size: 11, format: s => s },
};

// 🔹 Função para gerar uma inscrição estadual fake
function generateFakeStateRegistration(): StateRegistration {
  const BrazilianStateNames = Object.keys(BrazilianState).filter(k => isNaN(Number(k))) as BrazilianState[];
  const BrazilianStateName = faker.helpers.arrayElement(BrazilianStateNames); // "SP", "MG", ...
  const BrazilianStateValue = BrazilianState[BrazilianStateName as keyof typeof BrazilianState]; // 25 para "SP", p.ex.

  const { size, format } = stateRegRules[BrazilianStateValue]
  const raw = faker.string.numeric(size)
  const formatted = format(raw)
  const isExempt = faker.datatype.boolean() ? faker.datatype.boolean() : faker.datatype.boolean()

  return {
    uf: BrazilianStateName, // <- string
    number: !isExempt ? formatted : null,
    isExempt: isExempt,
  };
}

// Lista básica de moedas comuns
//  "USD", "EUR", "GBP", "JPY", "ARS", "CLP"
const currencies = ["BRL"];

// 🔹 Função para gerar Money fake
export function generateFakeMoney(): Money {
  const currency = faker.helpers.arrayElement(currencies);
  const scale = faker.number.int({ min: 0, max: 3 }); // até 4 casas decimais
  const amount = parseInt(faker.finance.amount({ min: 1, max: 100000, dec: 0 }));

  return {
    amount,
    currency,
    scale,
  };
}

function generateFakeCreditLimit(): CreditLimit {
  const maximum = generateFakeMoney();
  // disponível sempre menor ou igual ao máximo
  const availableAmount = parseInt(faker.finance.amount({ min: 0, max: maximum.amount, dec: 0 }))

  return {
    maximum,
    available: { 
      amount: availableAmount, 
      currency: maximum.currency, 
      scale: maximum.scale
    }
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

// 🔹 Função para gerar um único ContactInfo fake
function generateFakeContactInfo(isPrimary = false): ContactInfo {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: generateFakePhone(),
    isPrimary,
  };
}


// 🔹 Função para gerar uma lista de ContactInfo
function generateFakeContactList(): ContactInfo[] {
  return Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, (_, i) =>
    generateFakeContactInfo(i === 0) // marca o primeiro como principal
  );
}

export function randomBrazilianState(): BrazilianState {
  const values = Object.values(BrazilianState); // ['AC', 'AL', ...]
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

export function generateFakerAddress(index: number): Address {
  return {
    state: randomBrazilianState(),
    city: faker.location.city(),
    street: faker.location.streetAddress(),
    cep: faker.location.zipCode('#####-###'),    
    district: faker.location.continent(),
    isPrimary: index == 1,
    number: faker.number.int({min: 100, max: 2000}),
    type: faker.datatype.boolean() ? 'delivery' :  faker.datatype.boolean() ? 'delivery' : 'others'
  }
}

function generateFakerAddressList(): Address[] {
  return Array.from({length: faker.number.int({min: 1, max: 4})}, (_, i) =>  
    generateFakerAddress(i)
  )
}

function generateUniquePaymentMethods(): PaymentMethodName[] {
  const types = Object.keys(PaymentMethod).filter(k => isNaN(Number(k))) as PaymentMethodName[];

  // embaralha os valores
  const shBrazilianStatefled = faker.helpers.shuffle(types);

  const count = faker.datatype.boolean() ? faker.number.int({min: 1, max: 4 }) : null
  // se não passar count, retorna todos
  return shBrazilianStatefled.slice(0, count ?? types.length);
}

