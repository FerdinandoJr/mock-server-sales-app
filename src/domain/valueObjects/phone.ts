export enum PhoneType {
  mobile,
  landline,
  whatsapp,
  other
}

export type PhoneTypeName = keyof typeof PhoneType;

export interface Phone {
    value: string
    type: PhoneTypeName
}