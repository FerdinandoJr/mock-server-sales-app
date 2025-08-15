import { Barcode } from "./barcode";
import { Unit } from "./unit";

export interface Packing {
    packingId: number,
    barcode: Barcode | null,
    unit: Unit
    quantity: number
    description: string
}