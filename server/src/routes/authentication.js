import { Router } from 'express';
import { login } from '../controllers/auth';
import { createUser } from '../controllers/user';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);

export default router;
