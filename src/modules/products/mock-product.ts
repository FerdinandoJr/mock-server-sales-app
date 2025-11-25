import { faker } from '@faker-js/faker';
import { Image } from './valuesObjects/image';
import { Category } from './valuesObjects/category';
import { Barcode } from './valuesObjects/barcode';
import { Packing } from './valuesObjects/packing';
import { Product } from './entities/product';
import { AttributeValue } from './valuesObjects/property_value';
import { Attribute } from './valuesObjects/property';
import { ProductFiscal } from './entities/product-fiscal';
import { groupCompanys } from '../auth/auth.router';
import { generateFakeMoney } from '../customers/mock-customer';

// Função que usa o faker para criar dados variados
export function generateMockProducts(count: number): Product[] {
    return Array.from({ length: count }, (_, i) => {
        const productId = i + 1;
      
        return {
            productId,
            code: productId.toString().padStart(5, "0"),
            name: faker.commerce.productName(),
            companyGroupId: faker.helpers.arrayElement(groupCompanys).groupId,
            description: faker.commerce.productDescription(),
            price: generateFakeMoney(),
            barcode: getRandomBarcode(),
            unit: getRandomUnits()[0],
            images: getRandomImages(),
            categories: getRandomCategories(),
            packings: createRandomPackingList(),
            attributes: createRandomPropertyList(),
            fiscal: generateFakerProductFiscal()
        }
    });
}

// helpers genéricos
function randomInt(min: number, max: number): number {
  // inclusive [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function randomBool(probTrue = 0.5): boolean {
  return Math.random() < probTrue;
}

// alguns NCM/CEST só pra exemplo
const NCM_CODES = [
  '01012100',
  '02013000',
  '04022110',
  '06029090',
  '10059010',
  '21069090',
  '30049099',
  '61091000',
];

const CEST_CODES = [
  '0100100',
  '0100200',
  '0100300',
  '0200100',
  '0200200',
  '0300100',
];

export function generateFakerProductFiscal(): ProductFiscal {
  const hasST = randomBool(0.4); // 40% das vezes com ST

  return {
    ncm: randomChoice(NCM_CODES),
    cest: hasST ? randomChoice(CEST_CODES) : undefined,
    origem: randomChoice([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    icmsInterno: randomChoice([7, 12, 17, 18, 25]),
    ipi: randomBool(0.3) ? randomInt(0, 20) : undefined,
    hasST,
    mvaPadrao: hasST ? randomInt(10, 80) : undefined,
  };
}

const localImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg',
  'img10.jpg',
  'img11.jpg',
  'img12.jpg',
  'img13.jpg',
  'img14.jpg',
  'img15.jpg',
  'img16.jpg',
  'img17.jpg',
  'img18.jpg'
];

// Função para pegar imagem aleatória
function getRandomImages() : Image[] {
  const count = Math.floor(Math.random() * 6); // 0 até 5
  const images = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    images.push({
        imageId: i + 1,
        url: `http://192.168.254.49:3000/api/v1/images/${localImages[randomIndex]}`
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

/** pools opcionais pra resultados mais “reais” */
const COLOR_POOL = ['Azul', 'Preto', 'Vermelho', 'Branco', 'Verde', 'Amarelo', 'Roxo', 'Cinza'];
const SIZE_POOL = ['PP', 'P', 'M', 'G', 'GG', 'XG', '40', '41', '42', '43', '44'];
const BRAND_POOL = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Fila', 'Asics'];
const MATERIAL_POOL = ['Algodão', 'Poliéster', 'Couro', 'Linho', 'Lã', 'Seda'];

const PROP_NAME_POOL = ['Cor', 'Tamanho', 'Marca', 'Material', 'Estilo'];

/** pega N itens únicos de um array */
function uniqueSample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  faker.helpers.shuffle(copy);
  return copy.slice(0, Math.min(n, copy.length));
}

/** gera valores coerentes com o nome da propriedade */
function createRandomPropertyValues(propName: string): AttributeValue[] {
  let pool: string[] = [];

  const normalized = propName.toLowerCase();
  if (normalized.includes('cor')) pool = COLOR_POOL;
  else if (normalized.includes('tamanho')) pool = SIZE_POOL;
  else if (normalized.includes('marca')) pool = BRAND_POOL;
  else if (normalized.includes('material')) pool = MATERIAL_POOL;

  // fallback: palavras aleatórias do faker
  const count = faker.number.int({ min: 1, max: 6 });
  const values = pool.length
    ? uniqueSample(pool, count)
    : Array.from({ length: count }, () => faker.commerce.productAdjective());

  return values.map((v, i) => ({ id: i + 1, value: v }));
}

/** cria UMA Property aleatória */
export function createRandomProperty(propertyId: number): Attribute {
  const name =
    faker.helpers.maybe(() => faker.helpers.arrayElement(PROP_NAME_POOL), { probability: 0.8 }) ??
    faker.commerce.productMaterial(); // fallback

  return {
    id: propertyId,
    name,
    values: createRandomPropertyValues(name),
  };
}

/** cria uma lista de Properties aleatórias (estilo createRandomPackingList) */
export function createRandomPropertyList(): Attribute[] {
  const listLength = faker.number.int({ min: 0, max: 4 }); // até 4 propriedades
  const props: Attribute[] = [];

  // evitar repetir o mesmo nome seguidamente (opcional)
  const used = new Set<string>();

  for (let i = 0; i < listLength; i++) {
    let name =
      faker.helpers.maybe(() => faker.helpers.arrayElement(PROP_NAME_POOL), { probability: 0.85 }) ??
      faker.commerce.productMaterial();

    // tenta evitar duplicar nomes
    let safety = 5;
    while (used.has(name) && safety-- > 0) {
      name = faker.helpers.arrayElement(PROP_NAME_POOL);
    }
    used.add(name);

    const values = createRandomPropertyValues(name);

    props.push({
      id: i + 1,
      name,
      values: values,
    });
  }

  return props;
}