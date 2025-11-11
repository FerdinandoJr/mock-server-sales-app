import { Router } from "express";
import { StockTransaction } from "./entities/stock_transaction";
import { generateMockTransactions } from "./mock-transaction";

const router = Router();

const TRANSACTION_INITIAL_COUNT = 100

const transactions: StockTransaction[] = generateMockTransactions(TRANSACTION_INITIAL_COUNT);

router.get('/', (req, res) => {
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || 30;
  console.log(`consultou todos as transactions (${start} até ${limit + start})`)

  const slice = transactions.slice(start, start + limit);
  res.json({ total: transactions.length, start, limit, data: slice });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(`consultou transaction '${id}'`)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id paramenter' });
  }

  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.json(transaction);
});

export default router