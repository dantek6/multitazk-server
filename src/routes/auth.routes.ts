import { Router } from 'express';
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controllers';
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verifyToken', verifyToken);

router.get('/profile', authRequired, profile);

export default router;