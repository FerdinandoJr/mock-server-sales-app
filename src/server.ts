// src/server.ts
import express from 'express';
import { faker } from '@faker-js/faker';
import type { CompanyCustomer, Customer, CustomerType, PersonCustomer } from './domain/entities/customer';
import { error } from 'console';

const app = express();
app.use(express.json());

// 1) Gera e armazena em memória apenas uma vez
const INITIAL_COUNT = 2000;
const customers: Customer[] = generateMockCustomers(INITIAL_COUNT);

// Função que usa faker para criar dados variados
function generateMockCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, i) => {
    const customerId = i + 1;
    const runtimeType: CustomerType = faker.datatype.boolean() ? 'person' : 'company';
    const base = {
      customerId,
      customerCode: customerId.toString().padStart(5, "0"),
      address: {
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.streetAddress(),
        cep: { 'value' :  faker.location.zipCode('#####-###')},
      },
      email: { 'value' :  faker.internet.email()},
      phones: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => ({ 'value' :  faker.phone.number()})
      ),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      runtimeType,
    };

    if (runtimeType === 'person') {
      const person: PersonCustomer = {
        ...base,
        runtimeType: 'person',
        fullName: faker.person.fullName(),
        cpf: { 'value' :  faker.string.numeric(11)},
      };
      return person;
    } else {
      const company: CompanyCustomer = {
        ...base,
        runtimeType: 'company',
        legalName: faker.company.name(),
        tradeName: faker.company.name(),
        cnpj: { 'value' :  faker.string.numeric(14)},
      };
      return company;
    }
  });
}


// Rota paginada para obter clientes por intervalo de índices
app.get('/customers', (req, res) => {  
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 50;
  console.log(`consultou todos os customer (${start} até ${limit + start})`)
  
  const slice = customers.slice(start, start + limit);
  res.json({ total: customers.length, start, limit, data: slice });
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



// Usuário teste
const fakeUsers = [
  { id: 1, name: "Lucas", login: 'lucas', password: '123' },
];

// Rota para efetuar login
app.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (!login) {
    return res.status(400).json({ error: 'Obrigatory login' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Obrigatory password' });
  }

  const user = fakeUsers.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid login' });
  }

  return res.status(200).json({ 
    userId: user.id,
    userCode: user.id.toString(),
    userName: user.name,
    token: "token",
    message: 'Successfully logged in' 
  });
});



// 4) Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mock server rodando em http://localhost:${PORT}`);
});