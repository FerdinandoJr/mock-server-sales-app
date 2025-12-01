import { Router } from 'express';
import { aliquotas } from './tax.mock';


const router = Router();


router.get('/', (req, res) => {
  
  res.json({ 
    aliquotas
  });
});

export default router