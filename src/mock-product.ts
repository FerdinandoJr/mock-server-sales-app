import { faker } from '@faker-js/faker';
import { Product } from './domain/entities/product';

// Função que usa o faker para criar dados variados
export function generateMockProducts(count: number): Product[] {
    return Array.from({ length: count }, (_, i) => {
        const productId = i + 1;
        
        return {
            productId,
            code: productId.toString().padStart(8, "0"),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
            barcode: {
                type: faker.helpers.arrayElement(['EAN-13', 'UPC-A', 'QR Code', 'Code 128']),
                value: faker.string.numeric(13) // EAN-13
            },
            unit: { 
                value: faker.helpers.arrayElement(['un', 'kg', 'g', 'L', 'ml', 'm']) 
            },
            image: [
                { value: faker.image.urlLoremFlickr({ category: 'food' }) }
            ],
            category: [
                { value: faker.commerce.department() }
            ],
            packing: [
                { value: faker.helpers.arrayElement(['Caixa', 'Pacote', 'Saco']) }
            ]
        }
    });
}
