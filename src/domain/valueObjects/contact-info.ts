import { Phone } from "./phone"

export interface ContactInfo {
    name: string
    email: string,
    phone: Phone
    isPrimary: boolean
}