import { Router } from 'express';
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controllers';
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validator.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get('/verifyToken', verifyToken);

router.get('/profile', authRequired, profile);

export default router;