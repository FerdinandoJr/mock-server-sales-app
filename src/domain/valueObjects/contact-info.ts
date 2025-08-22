import { Phone } from "./phone"

export interface ContactInfo {
    name: string
    email: { value: string }
    phone: Phone
    isPrimary: boolean
}