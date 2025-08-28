import { Cnpj } from "../valueObjects/cnpj";

export interface Company {
    companyId: number,
    tradeName: string,
    realName: string,
    cnpj: Cnpj
}