import { Router } from "express";
import { generateFakerCompanyGroupList, generateFakerCompanyList, generateMockUser } from "./mock-user";

const router = Router();

export const groupCompanys = generateFakerCompanyGroupList();

// Usuário teste
const fakeUsers = [
  { id: 1, name: "Lucas", login: 'lucas', password: '123' },
];

// Rota para efetuar login
router.post('/login', (req, res) => {
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

  return res.status(200).json({
    "user": generateMockUser(),
    "groups": groupCompanys
  });
});

export default router