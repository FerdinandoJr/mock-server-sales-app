import { PropertyValue } from "./property_value"

export interface Property {
    propertyId: number
    name: string
    values: PropertyValue[]
}