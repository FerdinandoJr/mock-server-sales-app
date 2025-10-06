import { Cnpj } from "../valueObjects/cnpj";
import { ContactInfo } from "../valueObjects/contact-info";
import { Cpf } from "../valueObjects/cpf";


export interface OrderCustomer {
   customerId: number,
   customerCode: string,
   customerUuId: string,
   customerName: string,
   contactInfo: ContactInfo[],
   cpf: Cpf,
   cnpj: Cnpj,
   orderId: number
}