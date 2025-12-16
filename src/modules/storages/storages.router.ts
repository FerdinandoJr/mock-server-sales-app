import { Router } from "express";
import { Storage } from "./entities/storage";
import { generateMockStorages } from "./mock-storage";

const router = Router();

const STORAGE_INITIAL_COUNT = 5000
const storages: Storage[] = generateMockStorages(STORAGE_INITIAL_COUNT);

router.get('/', (req, res) => {
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 20;
  console.log(`consultou todos os estoques (${start} até ${limit + start})`)

  const slice = storages.slice(start, start + limit);
  res.json({ total: storages.length, start, limit, data: slice });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(`consultou o estoque '${id}'`)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id paramenter' });
  }

  const storage = storages.find(s => s.storageId === id);

  if (!storage) {
    return res.status(400).json({ error: 'Storage not found' });
  }

  res.json(storage);
});

router.get('/count', (req, res) => {
  const q = req.query.q?.toString().toLowerCase() || '';

  const filtered = storages.filter(s =>
    s.name.toLowerCase().includes(q)
  );

  res.json({
    total: filtered.length
  });
});

export default router