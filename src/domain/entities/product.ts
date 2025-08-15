import { Barcode } from "../productValueObjects/barcode"
import { Category } from "../productValueObjects/category"
import { Image } from "../productValueObjects/image"
import { Packing } from "../productValueObjects/packing"
import { Unit } from "../productValueObjects/unit"

export interface Product {
    productId: number
    code: string
    name: string
    description: string
    price: number
    barcode: Barcode | null
    unit: Unit
    images: Image []
    categories: Category[]
    packings: Packing[]
}