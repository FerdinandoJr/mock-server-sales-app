export interface Product {
    productId: number
    code: string
    name: string
    description: string
    price: number
    barcode: {  }
    unit: { value: string }
    image: { value: string }[]
    category: { value: string }[]
    packing: { value: string }[]
}