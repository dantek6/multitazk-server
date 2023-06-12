import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken';
import { getTasks, createTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.controllers';

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired, createTasks);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

export default router;