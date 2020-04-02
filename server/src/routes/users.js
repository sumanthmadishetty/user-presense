import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  console.log(req.user);
  const users = await User.find();
  return res.send(users);
});

export default router;
