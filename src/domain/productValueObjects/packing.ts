import { Unit } from "@faker-js/faker/.";

export interface Packing {
    packingId: number,
    barcode: [],
    unit: Unit
    quantity: number
    description: string
}