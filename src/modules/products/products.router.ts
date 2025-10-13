import { Router } from "express";
import { Product } from "./entities/product";
import { generateMockProducts } from "./mock-product";

const router = Router();

// Gera e armazena os produtos em memória apenas uma vez
const PRODUCT_INITIAL_COUNT = 500
// const products: Product[] = []
const products: Product[] = generateMockProducts(PRODUCT_INITIAL_COUNT);

router.get('/', (req, res) => {
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 50;
  console.log(`consultou todos os product (${start} até ${limit + start})`)

  const slice = products.slice(start, start + limit);
  res.json({ total: products.length, start, limit, data: slice });
});

// Rota para pegar um produto por id
// Exemplo: GET http://localhost:3000/get-product/3
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(`consultou product '${id}'`)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  const product = products.find(p => p.productId === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

export default router