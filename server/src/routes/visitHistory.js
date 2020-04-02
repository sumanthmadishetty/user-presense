import { Router } from 'express';
import { getAllVisitHistories } from '../controllers/visitHistory';

const router = Router();

router.get('/', getAllVisitHistories);

export default router;
