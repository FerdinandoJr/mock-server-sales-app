import { Router } from 'express';
import { Order } from './entities/order';
import { generateMockOrders } from './mock-order';


const router = Router();

// Gera e armazena os pedidos em memória apenas uma vez
const ORDER_INITIAL_COUNT = 50
const orders: Order[] = generateMockOrders(ORDER_INITIAL_COUNT);

router.get('/', (req, res) => {
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 10;
  const withProducts = req.query.withProducts || false;
  
  console.log(withProducts)

  const slice = orders.slice(start, start + limit);
  
  if (!withProducts) {
    console.log(`consultou todos os orders (${start} até ${limit + start}) sem produtos (${withProducts})`)
    const filter = slice.map(o => ({
      ...o,
      items: []
    }))

    res.json({ total: orders.length, start, limit, data: filter })
    return;
  }
  
  console.log(`consultou todos os orders (${start} até ${limit + start}) (${withProducts})`)

  res.json({ total: orders.length, start, limit, data: slice });
});

// Rota para pegar um pedido por id
// Exemplo: GET http://localhost:3000/get-order/3
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(`consultou order '${id}'`)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log('Salvando pedido...');

  console.log(body);

  res.json();
})

export default router