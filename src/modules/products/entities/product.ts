import { Barcode } from "../valuesObjects/barcode"
import { Category } from "../valuesObjects/category"
import { Image } from "../valuesObjects/image"
import { Packing } from "../valuesObjects/packing"
import { Property } from "../valuesObjects/property"
import { Unit } from "../valuesObjects/unit"


export interface Product {
   productId: number
   code: string
   name: string
   description: string | null
   price: number
   barcode: Barcode | null
   unit: Unit
   images: Image[]
   categories: Category[]
   packings: Packing[]
   properties: Property[]
}