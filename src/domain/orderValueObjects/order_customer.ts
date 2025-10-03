import { Cnpj } from "../valueObjects/cnpj";
import { ContactInfo } from "../valueObjects/contact-info";
import { Cpf } from "../valueObjects/cpf";
import { Phone } from "../valueObjects/phone";


export interface OrderCustomer {
   customerId: number,
   customerCode: string,
   customerUuId: string,
   customerName: string,
   email: ContactInfo[],
   phone: Phone,
   cpf: Cpf,
   cnpj: Cnpj,
   orderId: number
}