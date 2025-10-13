import { Address } from "../valueObjects/address";
import { ContactInfo } from "../valueObjects/contact-info";
import { CreditLimit } from "../valueObjects/credit-limit";
import { Money } from "../valueObjects/money";
import { PaymentMethod, PaymentMethodName } from "../valueObjects/payment-method";
import { StateRegistration } from "../valueObjects/state-registration";
import { TaxRegime, TaxRegimeName } from "../valueObjects/tax-regime";

export type CustomerType = 'person' | 'company'

export interface Customer {
  customerId: number
  customerUuId: string
  serverId: number  
  customerCode: string
  address: Address
  isActive: boolean
  createdAt: string
  runtimeType: CustomerType
  creditLimit: CreditLimit | null
  paymentMethods: PaymentMethodName[]
  contacts: ContactInfo[]
  taxRegime: TaxRegimeName,
  notes: string | null
}

export interface PersonCustomer extends Customer {
  fullName: string
  cpf: { value: string }
}

export interface CompanyCustomer extends Customer {
  legalName: string
  tradeName: string
  cnpj: { value: string }
  businessSector: string | null
  stateRegistration: StateRegistration
}