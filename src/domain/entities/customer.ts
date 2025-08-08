import { Address } from "../valueObjects/address";

export type CustomerType = 'person' | 'company'

export interface Customer {
  customerId: number
  customerUuId: string
  serverId: number  
  customerCode: string
  address: Address
  email: { value: string }
  phones: { value: string }[]
  isActive: boolean
  createdAt: string
  runtimeType: CustomerType
}

export interface PersonCustomer extends Customer {
  fullName: string
  cpf: { value: string }
}

export interface CompanyCustomer extends Customer {
  legalName: string
  tradeName: string
  cnpj: { value: string }
}