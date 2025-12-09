import { Router } from "express";
import { generateMockCustomers } from "./mock-customer";
import { CompanyCustomer, Customer, PersonCustomer } from "./entities/customer";

const router = Router();

// 1) Gera e armazena em memória apenas uma vez
const INITIAL_COUNT = 2000
const customers: Customer[] = generateMockCustomers(INITIAL_COUNT);

// Rota paginada para obter clientes por intervalo de índices
router.get('/', (req, res) => {  
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 50;
  console.log(`consultou todos os customer (${start} até ${limit + start})`)
  
  const slice = customers.slice(start, start + limit);
  res.json({ total: customers.length, start, limit, data: slice });
});

router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

router.get('/count', (req, res) => {
  const q = req.query.q?.toString().toLowerCase() || '';

  // filtra clientes pelo texto (caso você tenha esse filtro)
  const filtered = customers.filter(c => {
    let name = "";
    if (c.runtimeType === "person") {
      name = (c as PersonCustomer).fullName.toLocaleLowerCase();
    } else {
      const company = c as CompanyCustomer;
      name = (company.tradeName || company.legalName).toLocaleLowerCase();
    }

    return name.includes(q);
  });

  res.json({
    total: filtered.length
  });
});



// router.get(
//   "/",
//   requireAuth,
//   pagination(), // adiciona req.page, req.limit, req.order
// );

// router.get("/:id", requireAuth);

// router.post("/", requireAuth);

// router.put("/:id", requireAuth);

// router.delete("/:id", requireAuth);


// // subrecursos (ex.: /products/:id/stocks)
// router.get("/:id/stocks", requireAuth);

export default router;
