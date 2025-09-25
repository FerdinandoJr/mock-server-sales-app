// src/server.ts
import express from 'express';
import type { CompanyCustomer, Customer, CustomerType, PersonCustomer } from './domain/entities/customer';
import { generateMockCustomers } from './mock-customer';
import { Product } from './domain/entities/product';
import { get } from 'http';
import { generateMockProducts } from './mock-product';
import path from 'path';
import { generateMockUser } from './mock-user';
import { OrderStatus } from './domain/orderValueObjects/order_status';
import { generateMockOrders } from './mock-order';
import { Order } from './domain/entities/order';

const app = express();
app.use(express.json());

// 1) Gera e armazena em memória apenas uma vez
const INITIAL_COUNT = 2000
const customers: Customer[] = generateMockCustomers(INITIAL_COUNT);

// Rota paginada para obter clientes por intervalo de índices
app.get('/customers', (req, res) => {  
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 50;
  console.log(`consultou todos os customer (${start} até ${limit + start})`)
  
  const slice = customers.slice(start, start + limit);
  res.json({ total: customers.length, start, limit, data: slice });
});

app.post('/customers', (req, res) => {
  const data = req.body;

  // gera id simples (incremental)
  const newId = customers.length > 0
    ? customers[customers.length - 1].customerId + 1
    : 1;

  const newCustomer = {
    id: newId,
    ...data
  };

  customers.push(newCustomer);

  console.log(`novo customer criado: ${JSON.stringify(newCustomer)}`);

  // retorna apenas o id
  res.status(201).json({ serverId: newId });
});


// 3) Rota para pegar um cliente por id
// Exemplo: GET http://localhost:3000/get-customer/3
app.get('/customer/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(`consultou customer '${id}'`)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }  

  const customer = customers.find(c => c.customerId === id);
  
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

// Gera e armazena os produtos em memória apenas uma vez
const PRODUCT_INITIAL_COUNT = 500
// const products: Product[] = []
const products: Product[] = generateMockProducts(PRODUCT_INITIAL_COUNT);

app.get('/products', (req, res) => {
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 50;
  console.log(`consultou todos os product (${start} até ${limit + start})`)

  const slice = products.slice(start, start + limit);
  res.json({ total: products.length, start, limit, data: slice });
});

// Rota para pegar um produto por id
// Exemplo: GET http://localhost:3000/get-product/3
app.get('/products/:id', (req, res) => {
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

// Gera e armazena os pedidos em memória apenas uma vez
const ORDER_INITIAL_COUNT = 50
const orders: Order[] = generateMockOrders(ORDER_INITIAL_COUNT);

app.get('/orders', (req, res) => {
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
app.get('/order/:id', (req, res) => {
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

// Usuário teste
const fakeUsers = [
  { id: 1, name: "Lucas", login: 'lucas', password: '123' },
];

// Rota para efetuar login
app.post('/login', (req, res) => {
  const { login, password } = req.body;
  console.log('Trying to loggin...');
  if (!login) {
    return res.status(400).json({ error: 'Obligatory login' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Obligatory password' });
  }

  const user = fakeUsers.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid login' });
  }

  return res.status(200).json(generateMockUser());
});

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// 4) Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mock server rodando em http://localhost:${PORT}`);
});