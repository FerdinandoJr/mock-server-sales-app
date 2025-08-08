export interface Product {
    productId: number
    code: string
    name: string
    description: string
    price: DoubleRange
    barcode: { value: number }
    unit: { value: string }
    image: { value: string }[]
    category: { value: string }[]
    packing: { value: string }[]
}