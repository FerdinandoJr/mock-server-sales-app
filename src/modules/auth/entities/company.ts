import { Address } from "../../../domain/valueObjects/address";

export interface Company {
    companyId: number,
    tradeName: string,
    realName: string,
    cnpj: string
    address: Address,
    isPrimary: boolean
}