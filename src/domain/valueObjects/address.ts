export type AddressType = 'billing' | 'delivery' | 'others'

export interface Address {
    state: string
    city: string
    street: string
    cep: string
    district: string
    number: number
    type: AddressType
    isPrimary: boolean
}