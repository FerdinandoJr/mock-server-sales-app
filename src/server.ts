// src/server.ts
import express from 'express';
import path from 'path';
import { generateMockUser } from './mock-user';

const app = express();
app.use(express.json());


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