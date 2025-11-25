import { Money } from "../../../domain/valueObjects/money"
import { Barcode } from "../valuesObjects/barcode"
import { Category } from "../valuesObjects/category"
import { Image } from "../valuesObjects/image"
import { Packing } from "../valuesObjects/packing"
import { Attribute } from "../valuesObjects/property"
import { Unit } from "../valuesObjects/unit"
import { ProductFiscal } from "./product-fiscal"


export interface Product {
   productId: number
   code: string
   name: string
   description: string | null
   companyGroupId: number,
   price: Money
   barcode: Barcode | null
   unit: Unit
   images: Image[]
   categories: Category[]
   packings: Packing[]
   attributes: Attribute[],
   fiscal?: ProductFiscal
}