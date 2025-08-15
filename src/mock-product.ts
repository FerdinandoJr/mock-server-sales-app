import { faker } from '@faker-js/faker';
import { Product } from './domain/entities/product';
import { Category } from './domain/productValueObjects/category';
import { Barcode } from './domain/productValueObjects/barcode';
import { Packing } from './domain/productValueObjects/packing';
import { Image } from './domain/productValueObjects/image';

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
            barcode: getRandomBarcode(),
            unit: getRandomUnits()[0],
            images: getRandomImages(),
            categories: getRandomCategories(),
            packings: createRandomPackingList(),            
        }
    });
}

const localImages = [
  'img1.jpg',
  'img2.png',
  'img3.webp',
  'img4.webp',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.webp',
  'img9.webp',
  'img10.webp'
];

// Função para pegar imagem aleatória
function getRandomImages() : Image[] {
  const count = Math.floor(Math.random() * 6); // 0 até 5
  const images = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    images.push({
        imageId: i + 1,
        url: `http://192.168.254.159:3000/images/${localImages[randomIndex]}`
    });
  }
  return images;
}

function getRandomUnits() {
  const unitOptions = ['un', 'kg', 'g', 'L', 'ml', 'm'];
  const count = Math.floor(Math.random() * unitOptions.length) + 1; // Pelo menos 1 unidade
  
  const units = [];
  
  for (let i = 0; i < count; i++) {
    const unitName = faker.helpers.arrayElement(unitOptions);
    units.push({
        unitName,
        abbreviation: unitName.toUpperCase()
    });
  }

  return units;
}

function getRandomCategories(): Category[] {
    const count = Math.floor(Math.random() * 6); // 0 até 5
    const categories: Category[] = [];

    for (let i = 0; i < count; i++) {
        categories.push({
            categoryId: i + 1,
            name: faker.commerce.department() // Nome de categoria aleatório
        });
    }

    return categories;
}

function getRandomBarcode(): Barcode | null {
  // 50% de chance de não ter barcode
  if (Math.random() < 0.5) {
    return null;
  }

  const barcodeTypes = ['EAN-13', 'UPC-A', 'Code128', 'QR'];
  const type = faker.helpers.arrayElement(barcodeTypes);

  return {
    type,
    value: faker.string.numeric(13) // Gera 13 dígitos numéricos
  };
}

function createRandomPackingList(): Packing[] {
    const listLength = faker.number.int({ min: 0, max: 3 }); // até 3 itens
    const packings: Packing[] = [];

    for (let i = 0; i < listLength; i++) {
        const barcode = getRandomBarcode();
        packings.push({
            packingId: i + 1,
            barcode: barcode,
            unit: getRandomUnits()[0],
            quantity: faker.number.int({ min: 1, max: 100 }),
            description: faker.commerce.productDescription()
        });
    }

    return packings;
}