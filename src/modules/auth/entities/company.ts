import { Address } from "../../../domain/valueObjects/address";
import { TaxRegime } from "../../../domain/valueObjects/tax-regime";

export interface Company {
    companyId: number,
    tradeName: string,
    realName: string,
    cnpj: string
    address: Address,
    isPrimary: boolean,
    taxRegime: string
}