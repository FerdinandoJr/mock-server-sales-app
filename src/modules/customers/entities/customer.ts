import { Address } from "../../../domain/valueObjects/address"
import { ContactInfo } from "../../../domain/valueObjects/contact-info"
import { CreditLimit } from "../../../domain/valueObjects/credit-limit"
import { PaymentMethodName } from "../../../domain/valueObjects/payment-method"
import { StateRegistration } from "../../../domain/valueObjects/state-registration"
import { TaxRegimeName } from "../../../domain/valueObjects/tax-regime"


export type CustomerType = 'person' | 'company'

export interface Customer {
  customerId: number
  customerUuId: string
  serverId: number  
  customerCode: string
  addresses: Address[]
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
  cpf: string
}

export interface CompanyCustomer extends Customer {
  legalName: string
  tradeName: string
  cnpj: string
  businessSector: string | null
  stateRegistration: StateRegistration
}