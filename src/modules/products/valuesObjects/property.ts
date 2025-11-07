import { AttributeValue } from "./property_value"

export interface Attribute {
    id: number
    name: string
    values: AttributeValue[]
}